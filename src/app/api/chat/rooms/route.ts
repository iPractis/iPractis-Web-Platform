import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { supabaseServer } from "@/src/lib/supabaseClient";

export async function GET() {
  try {
    // Read JWT from cookie (custom auth)
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const supabase = supabaseServer;

    // Get teacher ID (if user is a teacher)
    const { data: teacher } = await supabase
      .from("teachers")
      .select("teacher_id")
      .eq("user_id", userId)
      .maybeSingle();

    const teacherId = teacher?.teacher_id;

    // Fetch chat rooms where user is student OR teacher
    const { data: rooms, error } = await supabase
      .from("chat_rooms")
      .select("*")
      .or(
        teacherId
          ? `student_id.eq.${userId},teacher_id.eq.${teacherId}`
          : `student_id.eq.${userId}`
      );

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.log("Fetched rooms:", rooms);
    return NextResponse.json({ rooms });
  } catch (err) {
    console.error("Rooms API error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
