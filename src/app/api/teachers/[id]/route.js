import { requireUser } from "@/src/lib/requireUser";
import { supabaseServer } from "@/src/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const { params } = context;
    const { id: teacherId } = params;

    const {user } = await requireUser();

    if(user.authorized){
      return NextResponse.json(
        {message : "User not authorized"},
        {status : 401}
      )
    }

    if (!teacherId) {
      return NextResponse.json({ message: "teacherId is required" }, { status: 400 });
    }

    console.log("Fetching data for teacherId:", teacherId);

    // 🟩 Fetch teacher info WITHOUT availability
    const { data: teacher, error: teacherError } = await supabaseServer
      .from("teachers")
      .select(`
        *,
        teacher_languages(*),
        teacher_sub_subjects(*),
        teacher_experiences(*),
        teacher_education(*)
      `)
      .eq("teacher_id", teacherId)
      .single();

    if (teacherError) {
      console.error("Supabase teacher fetch error:", teacherError);
      return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
    }

    // 🟦 Fetch user profile of the teacher
    const { data: userData, error: userError } = await supabaseServer
      .from("users")
      .select(`
        user_id,
        first_name,
        last_name,
        email,
        country,
        nationality,
        timezone,
        profile_image,
        role
      `)
      .eq("user_id", teacher.user_id)
      .single();

    if (userError) {
      console.error("User fetch error:", userError);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 🧠 Merge user + teacher info (NO AVAILABILITY INCLUDED)
    const combined = {
      ...userData,
      ...teacher,
      name: `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
    };

    return NextResponse.json(combined, { status: 200 });

  } catch (err) {
    console.error("GET /api/teachers/:id error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
