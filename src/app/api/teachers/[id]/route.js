import { supabaseServer } from "@/src/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const { params } = context;
    const { id: teacherId } = params;

    if (!teacherId) {
      return NextResponse.json({ message: "teacherId is required" }, { status: 400 });
    }

    // 🟩 Fetch teacher info + related tables
    const { data: teacher, error: teacherError } = await supabaseServer
      .from("teachers")
      .select(`
        *,
        teacher_languages(*),
        teacher_sub_subjects(*),
        teacher_experiences(*),
        teacher_education(*),
        teacher_availability(*)
      `)
      .eq("user_id", teacherId)
      .single();

    if (teacherError) {
      console.error("Supabase teacher fetch error:", teacherError);
      return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
    }

    // 🟦 Fetch user profile (from unified users table)
    const { data: user, error: userError } = await supabaseServer
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
      .eq("user_id", teacherId)
      .single();

    if (userError) {
      console.error("User fetch error:", userError);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("Fetched teacher:", teacher);
    console.log("Fetched user profile:", user);

    // 🧩 Combine teacher + user info
    const combined = {
      ...user,
      ...teacher,
      name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
    };

    return NextResponse.json(combined, { status: 200 });
  } catch (err) {
    console.error("GET /api/teacher/:id error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
