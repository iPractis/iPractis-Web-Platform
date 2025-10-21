import { supabaseServer } from "@/src/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { params } = await context; // ✅ explicitly await
  const { id: teacherId } = params;

  const { data:teacher, error:teacher_error } = await supabaseServer
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

  if (teacher_error) {
    console.error("Supabase error:", teacher_error);
    return NextResponse.json({ message: "Teacher not found" }, { status: 200 });
  }


  const {data: profile , error: profile_error} = await supabaseServer
    .from("profiles")
    .select(`*`)
    .eq("user_id", teacherId)
    .single();

    console.log("PROFILE DATA FROM GET TEACHER API:", profile);

  return NextResponse.json({...teacher, ...profile}, { status: 200 });
}
