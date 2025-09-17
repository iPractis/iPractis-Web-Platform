import { supabaseServer } from "@/src/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req, { params } ) {
  const teacherId = params.id;

  const { data, error } = await supabaseServer
    .from("teachers")
    .select(`
      *,
      teacher_languages(*),
      teacher_sub_subjects(*),
      teacher_experiences(*),
      teacher_education(*),
      teacher_availability(*)
    `)
    .eq("teacher_id", teacherId)
    .single();

  if (error) {
    return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}
