import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";
import { mapUiToDbAvailability } from "@/src/utils/mapDbAvailability";
import { requireUser } from "@/src/lib/requireUser";

function normalizeNumeric(val) {
  if (val === undefined || val === null || val === "") return null;
  return Number(val);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {  ...draft } = body;

    const { user } = await requireUser();

    if (!user) {

      return NextResponse.json(
        { message: "User not authorized" },
        { status: 401 }
      );
    }
    const userId = user.user_id;

    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }

    /* ----------------------------------------------------
       1️⃣ Upsert TEACHER (capability-only data)
    ---------------------------------------------------- */
    const { data: teacher, error: teacherError } = await supabaseServer
      .from("teachers")
      .upsert(
        {
          user_id: userId,
          profile_title: draft.profileTitle || null,
          subject: draft.subject || null,
          subject_intro: draft.subjectIntroduction || null,
          video_link: draft.videoLink || null,
          hourly_price: normalizeNumeric(draft.hourlyPrice),
          student_level: draft.studentLevel || null,
          teach_amateurs: draft.teachToAmateurPersons ?? false,
          teach_young: draft.teachToYoungPersons ?? false,
          daily_work_time: normalizeNumeric(draft.dailyWorkTime),
          timezone: draft.timeZone || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
      .select()
      .single();

    if (teacherError) {
      console.error("Teacher upsert failed:", teacherError);
      return NextResponse.json(
        { message: "Failed to save teacher data" },
        { status: 500 }
      );
    }

    const teacherId = teacher.teacher_id;

    /* ----------------------------------------------------
       2️⃣ Update USER (identity/profile data)
    ---------------------------------------------------- */
    const { error: userError } = await supabaseServer
      .from("users")
      .update({
        first_name: draft.firstName || null,
        middle_name: draft.middleName || null,
        last_name: draft.lastName || null,
        gender: draft.gender || null,
        nationality: draft.nationality || null,
        country: draft.country || null,
        birth_date: draft.birthDate || null,
        profile_image: draft.profile_url || null,
        introduction: draft.introduction || null,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (userError) {
      console.error("User update failed:", userError);
      return NextResponse.json(
        { message: "Failed to update user info" },
        { status: 500 }
      );
    }

    /* ----------------------------------------------------
       3️⃣ Clear OLD relational data
    ---------------------------------------------------- */
    await Promise.all([
      // user-scoped
      supabaseServer.from("user_languages").delete().eq("user_id", userId),
      supabaseServer.from("user_experiences").delete().eq("user_id", userId),
      supabaseServer.from("user_education").delete().eq("user_id", userId),

      // teacher-scoped
      supabaseServer.from("teacher_sub_subjects").delete().eq("teacher_id", teacherId),
      supabaseServer.from("teacher_availability").delete().eq("teacher_id", teacherId),
    ]);

    /* ----------------------------------------------------
       4️⃣ Insert USER-level relations
    ---------------------------------------------------- */

    // 🌍 Languages
    if (draft.languages?.length) {
      await supabaseServer.from("user_languages").insert(
        draft.languages.map((l) => ({
          user_id: userId,
          name: l.name,
          level: l.level,
        }))
      );
    }

    // 💼 Experiences
    if (draft.careerExperience?.length) {
      await supabaseServer.from("user_experiences").insert(
        draft.careerExperience.map((e) => ({
          user_id: userId,
          company: e.company,
          role: e.role || null,
          year_from: e.from,
          year_to: e.to,
          description: e.description,
        }))
      );
    }

    // 🎓 Education
    if (draft.education?.length) {
      await supabaseServer.from("user_education").insert(
        draft.education.map((ed) => ({
          user_id: userId,
          institution: ed.company,
          year_from: ed.from,
          year_to: ed.to,
          description: ed.description,
        }))
      );
    }

    /* ----------------------------------------------------
       5️⃣ Teacher-only relations
    ---------------------------------------------------- */

    // 📚 Sub-subjects
    if (draft.subSubject?.length) {
      await supabaseServer.from("teacher_sub_subjects").insert(
        draft.subSubject.map((s) => ({
          teacher_id: teacherId,
          name: s.selected,
          description: s.description,
        }))
      );
    }

    // ⏰ Availability (slot-based)
    if (Array.isArray(draft.availability)) {
      const slots = mapUiToDbAvailability(draft.availability, teacherId);

      if (slots.length > 0) {
        await supabaseServer.from("teacher_availability").insert(slots);
      }
    }

    /* ----------------------------------------------------
       6️⃣ Mark draft as published
    ---------------------------------------------------- */
    await supabaseServer
      .from("teacher_drafts")
      .upsert(
        {
          user_id: userId,
          is_published: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    return NextResponse.json(
      { message: "Teacher profile saved successfully", teacherId },
      { status: 201 }
    );
  } catch (err) {
    console.error("Teacher Draft POST API error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
