import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { supabaseClient } from "@/src/lib/supabaseClient";

dayjs.extend(utc);

export const POST = async (req) => {
  try {
    const { teacherId, studentId, date, time } = await req.json();

    if (!teacherId || !studentId || !date || !time) {
      return NextResponse.json(
        { error: "Missing teacherId, studentId, date, or time" },
        { status: 400 }
      );
    }

    const startTime = dayjs.utc(`${date}T${time}`);
    const endTime = startTime.add(30, "minute");
    const now = dayjs.utc();

    if (startTime.isBefore(now)) {
      return NextResponse.json(
        { error: "Cannot book a past time slot." },
        { status: 400 }
      );
    }

    // 1️⃣ Check teacher availability
    const dayOfWeek = startTime.format("ddd");

    const { data: availability, error: availError } = await supabaseClient
      .from("teacher_availability")
      .select("id")
      .eq("teacher_id", teacherId)
      .eq("day_of_week", dayOfWeek)
      .eq("hour", time)
      .eq("is_available", true)
      .maybeSingle();

    if (availError) throw availError;
    if (!availability) {
      return NextResponse.json(
        { error: "Teacher not available at that time." },
        { status: 400 }
      );
    }

    // 2️⃣ Supabase-safe overlap check
    const { data: conflicts, error: conflictError } = await supabaseClient
      .from("bookings")
      .select("id")
      .eq("teacher_id", teacherId)
      .eq("status", "booked")
      .filter("start_time", "lt", endTime.toISOString())
      .filter("end_time", "gt", startTime.toISOString());

    if (conflictError) throw conflictError;

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json(
        { error: "This time slot is already booked." },
        { status: 400 }
      );
    }

    // 3️⃣ Create booking
    const { data: booking, error: insertError } = await supabaseClient
      .from("bookings")
      .insert([
        {
          teacher_id: teacherId,
          student_id: studentId,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          status: "booked",
        },
      ])
      .select()
      .maybeSingle();

    if (insertError) throw insertError;

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully",
        booking,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating booking:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
};
