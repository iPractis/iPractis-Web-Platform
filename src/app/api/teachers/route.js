import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabaseClient";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      userId,
      profileTitle,
      introduction,
      subject,
      subjectIntroduction,
      videoLink,
      hourlyPrice,
      profile_url,
      studentLevel,
      teachToAmateurPersons,
      teachToYoungPersons,
      dailyWorkTime,
      timeZone,
      languages,
      subSubject,
      careerExperience,
      education,
      workSchedule,
    } = body;

    console.log("body data", body)

    // 1. Insert teacher
    const { data: teacher, error: teacherError } = await supabaseServer
      .from("teachers")
      .insert({
        user_id: userId,
        profile_title: profileTitle,
        introduction,
        subject,
        subject_intro: subjectIntroduction,
        video_link: videoLink,
        hourly_price: hourlyPrice,
        student_level: studentLevel,
        teach_amateurs: teachToAmateurPersons,
        teach_young: teachToYoungPersons,
        daily_work_time: dailyWorkTime,
        timezone: timeZone,
        profile_image: profile_url,
      })
      .select()
      .single();

    if (teacherError) {
      console.error("Teacher insert failed:", teacherError);
      return NextResponse.json({ message: "Failed to create teacher", code: "23505" }, { status: 400 });
    }

    const teacherId = teacher.teacher_id;

    // 2. Insert related entities
    if (languages?.length) {
      await supabaseServer.from("teacher_languages").insert(
        languages.map((l) => ({
          teacher_id: teacherId,
          name: l.name,
          level: l.level,
        }))
      );
    }

    if (subSubject?.length) {
      await supabaseServer.from("teacher_sub_subjects").insert(
        subSubject.map((s) => ({
          teacher_id: teacherId,
          name: s.selected,
          description: s.description,
        }))
      );
    }

    if (careerExperience?.length) {
      await supabaseServer.from("teacher_experiences").insert(
        careerExperience.map((e) => ({
          teacher_id: teacherId,
          company: e.company,
          year_from: e.from,
          year_to: e.to,
          description: e.description,
          file_url: e.uploadFile.url
        }))
      );
    }

    if (education?.length) {
      await supabaseServer.from("teacher_education").insert(
        education.map((ed) => ({
          teacher_id: teacherId,
          institution: ed.company,
          year_from: ed.from,
          file_url:ed.uploadFile.url,
          year_to: ed.to,
          description: ed.description,
        }))
      );
    }

    if (workSchedule?.length) {
      const slots = workSchedule.flatMap((w) =>
        w.hour.map((h) => ({
          teacher_id: teacherId,
          day_of_week: w.day,
          hour: h,
        }))
      );
      if (slots.length) {
        await supabaseServer.from("teacher_availability").insert(slots);
      }
    }

    return NextResponse.json({ teacherId }, { status: 201 });
  } catch (err) {
    console.error("Teacher API error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
