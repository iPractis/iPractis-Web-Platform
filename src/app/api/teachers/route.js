// POST /api/teacher-draft
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

    // 1. Upsert into teachers
    const { data: teacher, error: teacherError } = await supabaseServer
      .from("teachers")
      .upsert(
        {
          user_id: userId,
          profile_title: draft.profileTitle,
          introduction: draft.introduction,
          subject: draft.subject,
          subject_intro: draft.subjectIntroduction,
          video_link: draft.videoLink,
          hourly_price: normalizeNumeric(draft.hourlyPrice),
          student_level: draft.studentLevel,
          teach_amateurs: draft.teachToAmateurPersons,
          teach_young: draft.teachToYoungPersons,
          daily_work_time: normalizeNumeric(draft.dailyWorkTime),
          timezone: draft.timeZone,
          profile_image: draft.profile_url,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
      .select()
      .single();

    if (teacherError) {
      console.error("Teacher insert failed:", teacherError);
      return NextResponse.json({ message: "Failed to save teacher" }, { status: 500 });
    }

    const teacherId = teacher.teacher_id;

    // 2. Update profile
    await supabaseServer.from("profiles").upsert(
      {
        user_id: userId,
        first_name: draft.firstName,
        middle_name: draft.middleName,
        last_name: draft.lastName,
        gender: draft.gender,
        nationality: draft.nationality,
        country: draft.country,
        birth_date: draft.birthDate,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    // 3. Clear + re-insert relations
    await supabaseServer.from("teacher_languages").delete().eq("teacher_id", teacherId);
    await supabaseServer.from("teacher_sub_subjects").delete().eq("teacher_id", teacherId);
    await supabaseServer.from("teacher_experiences").delete().eq("teacher_id", teacherId);
    await supabaseServer.from("teacher_education").delete().eq("teacher_id", teacherId);
    await supabaseServer.from("teacher_availability").delete().eq("teacher_id", teacherId);

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

    if (draft.availability?.length) {
      const slots = mapUiToDbAvailability(draft.availability).map((slot) => ({
        teacher_id: teacherId,
        ...slot,
      }));
      console.log("AVAILABILITY SLOTS TO INSERT:", slots);
      if (slots.length) {
        await supabaseServer.from("teacher_availability").insert(slots);
      }
    }

   await supabaseServer
  .from("teacher_drafts")
  .upsert(
    {
      user_id: userId,        // 👈 must include this!
      is_published: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );


    return NextResponse.json({ message: "Draft normalized and saved", teacherId }, { status: 201 });
  } catch (err) {
    console.error("Teacher Draft API error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
