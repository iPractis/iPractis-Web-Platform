import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";
import { mapUiToDbAvailability } from "@/src/utils/mapDbAvailability";

function normalizeNumeric(val) {
  if (val === undefined || val === null || val === "") return null;
  return Number(val);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, ...draft } = body;

    if (!userId) {
      return NextResponse.json({ message: "userId is required" }, { status: 400 });
    }

    // 1️⃣ Upsert into teachers
    const { data: teacher, error: teacherError } = await supabaseServer
      .from("teachers")
      .upsert(
        {
          user_id: userId,
          profile_title: draft.profileTitle || null,
          introduction: draft.introduction || null,
          subject: draft.subject || null,
          subject_intro: draft.subjectIntroduction || null,
          video_link: draft.videoLink || null,
          hourly_price: normalizeNumeric(draft.hourlyPrice),
          student_level: draft.studentLevel || null,
          teach_amateurs: draft.teachToAmateurPersons ?? false,
          teach_young: draft.teachToYoungPersons ?? false,
          daily_work_time: normalizeNumeric(draft.dailyWorkTime),
          timezone: draft.timeZone || null,
          profile_image: draft.profile_url || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
      .select()
      .single();

    if (teacherError) {
      console.error("Teacher upsert failed:", teacherError);
      return NextResponse.json({ message: "Failed to save teacher" }, { status: 500 });
    }

    const teacherId = teacher.teacher_id;

    // 2️⃣ Update user details (since profiles merged → users)
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
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (userError) {
      console.error("User update failed:", userError);
      return NextResponse.json({ message: "Failed to update user info" }, { status: 500 });
    }

    // 3️⃣ Clear old relational data
    const deleteOps = [
      supabaseServer.from("teacher_languages").delete().eq("teacher_id", teacherId),
      supabaseServer.from("teacher_sub_subjects").delete().eq("teacher_id", teacherId),
      supabaseServer.from("teacher_experiences").delete().eq("teacher_id", teacherId),
      supabaseServer.from("teacher_education").delete().eq("teacher_id", teacherId),
      supabaseServer.from("teacher_availability").delete().eq("teacher_id", teacherId),
    ];
    await Promise.all(deleteOps);

    // 4️⃣ Re-insert new relations (if present)
    if (draft.languages?.length) {
      await supabaseServer.from("teacher_languages").insert(
        draft.languages.map((l) => ({
          teacher_id: teacherId,
          name: l.name,
          level: l.level,
        }))
      );
    }

    if (draft.subSubject?.length) {
      await supabaseServer.from("teacher_sub_subjects").insert(
        draft.subSubject.map((s) => ({
          teacher_id: teacherId,
          name: s.selected,
          description: s.description,
        }))
      );
    }

    if (draft.careerExperience?.length) {
      await supabaseServer.from("teacher_experiences").insert(
        draft.careerExperience.map((e) => ({
          teacher_id: teacherId,
          company: e.company,
          year_from: e.from,
          year_to: e.to,
          description: e.description,
          file_url: e.uploadFile?.url,
        }))
      );
    }

    if (draft.education?.length) {
      await supabaseServer.from("teacher_education").insert(
        draft.education.map((ed) => ({
          teacher_id: teacherId,
          institution: ed.company,
          year_from: ed.from,
          year_to: ed.to,
          description: ed.description,
          file_url: ed.uploadFile?.url,
        }))
      );
    }

    // 5️⃣ Optimized Availability — save as JSON instead of many rows

    // 5️⃣ Optimized Availability — save as multiple rows (per half-hour slot)
console.log("Saving availability for teacher:", draft.availability);
console.log("Teacher ID:", teacherId);

if (draft.availability && Array.isArray(draft.availability)) {
  // Map UI format to DB-ready rows
  const slots = mapUiToDbAvailability(draft.availability, teacherId);

  // Clear old records
  const { error: delError } = await supabaseServer
    .from("teacher_availability")
    .delete()
    .eq("teacher_id", teacherId);

  if (delError) {
    console.error("Failed to clear previous availability:", delError);
  }

  // Insert new records
  if (slots.length > 0) {
    const { error: insertError } = await supabaseServer
      .from("teacher_availability")
      .insert(slots);

    if (insertError) {
      console.error("Availability insert failed:", insertError);
    }
  }
}


    // 6️⃣ Mark draft as published
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
      { message: "Teacher draft saved successfully", teacherId },
      { status: 201 }
    );
  } catch (err) {
    console.error("Teacher Draft POST API error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
