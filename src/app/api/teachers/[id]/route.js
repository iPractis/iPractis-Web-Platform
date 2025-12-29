import { requireUser } from "@/src/lib/requireUser";
import { supabaseServer } from "@/src/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const { params } = context;
    const { id: teacherId } = params;

    if (!teacherId) {
      return NextResponse.json(
        { message: "teacherId is required" },
        { status: 400 }
      );
    }

    /* ----------------------------------------------------
       1️⃣ Fetch TEACHER (capability data only)
    ---------------------------------------------------- */
    const { data: teacher, error: teacherError } = await supabaseServer
      .from("teachers")
      .select(`
        teacher_id,
        user_id,
        profile_title,
        subject,
        subject_intro,
        hourly_price,
        student_level,
        teach_amateurs,
        teach_young,
        daily_work_time,
        timezone,
        video_link,
        teacher_sub_subjects (*)
      `)
      .eq("teacher_id", teacherId)
      .single();

    if (teacherError || !teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    /* ----------------------------------------------------
       2️⃣ Fetch USER profile
    ---------------------------------------------------- */
    const { data: userData, error: userError } = await supabaseServer
      .from("users")
      .select(`
        user_id,
        first_name,
        middle_name,
        last_name,
        email,
        country,
        nationality,
        timezone,
        profile_image,
        role,
        introduction
      `)
      .eq("user_id", teacher.user_id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    /* ----------------------------------------------------
       3️⃣ Fetch USER-level relations
    ---------------------------------------------------- */
    const [
      { data: education },
      { data: experiences },
      { data: languages },
    ] = await Promise.all([
      supabaseServer
        .from("user_education")
        .select("*")
        .eq("user_id", teacher.user_id)
        .order("year_from", { ascending: false }),

      supabaseServer
        .from("user_experiences")
        .select("*")
        .eq("user_id", teacher.user_id)
        .order("year_from", { ascending: false }),

      supabaseServer
        .from("user_languages")
        .select("*")
        .eq("user_id", teacher.user_id),
    ]);

    /* ----------------------------------------------------
       4️⃣ Merge response
    ---------------------------------------------------- */
    const combined = {
      ...teacher,
      ...userData,
      education: education || [],
      experiences: experiences || [],
      languages: languages || [],
      name: `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
    };

    return NextResponse.json(combined, { status: 200 });

  } catch (err) {
    console.error("GET /api/teachers/:id error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
