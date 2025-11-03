import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { supabaseClient } from "@/src/lib/supabaseClient";

dayjs.extend(utc);

export const GET = async (req, { params }) => {
  try {
    const userId = params.id;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // 1️⃣ Get user role (teacher / student)
    const { data: user, error: userError } = await supabaseClient
      .from("users")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();

    if (userError) throw userError;
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const now = dayjs.utc().toISOString();

    // 2️⃣ Build query
    let query = supabaseClient
      .from("bookings")
      .select(
        `
        id,
        teacher_id,
        student_id,
        start_time,
        end_time,
        status,
        teacher:users!bookings_teacher_id_fkey(first_name, last_name),
        student:users!bookings_student_id_fkey(first_name, last_name)
      `
      )
      .in("status", ["booked", "rescheduled"])
      .gte("start_time", now)
      .order("start_time", { ascending: true });

    // 3️⃣ Filter based on user role
    if (user.role === "teacher") {
      query = query.eq("teacher_id", userId);
    } else {
      query = query.eq("student_id", userId);
    }

    const { data: bookings, error: bookingError } = await query;

    if (bookingError) throw bookingError;

    // 4️⃣ Format response
    const formatted = bookings.map((b) => ({
      id: b.id,
      start_time: b.start_time,
      end_time: b.end_time,
      status: b.status,
      teacher_name:
        b.teacher?.first_name || b.teacher?.last_name
          ? `${b.teacher.first_name ?? ""} ${b.teacher.last_name ?? ""}`.trim()
          : null,
      student_name:
        b.student?.first_name || b.student?.last_name
          ? `${b.student.first_name ?? ""} ${b.student.last_name ?? ""}`.trim()
          : null,
    }));

    return NextResponse.json(
      {
        userId,
        role: user.role,
        total_upcoming: formatted.length,
        upcoming_meetings: formatted,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching user upcoming bookings:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
};
