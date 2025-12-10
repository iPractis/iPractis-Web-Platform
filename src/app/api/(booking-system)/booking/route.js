import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { supabaseClient } from "@/src/lib/supabaseClient";

dayjs.extend(utc);

// ---------------------------------------------------------
// 🔑 STEP 1 — Generate a unique room key (Supabase-verified)
// ---------------------------------------------------------
async function generateUniqueRoomKey() {
  let key;
  let exists = true;

  while (exists) {
    // Create a 12-character random ID
    key = crypto.randomUUID().replace(/-/g, "").slice(0, 12);

    // Check in Supabase if the key already exists
    const { data } = await supabaseClient
      .from("bookings")
      .select("id")
      .eq("room_key", key)
      .maybeSingle();

    exists = !!data; // If found → regenerate
  }

  return key;
}

// ---------------------------------------------------------
// 📅 POST: Create Booking
// ---------------------------------------------------------
export const POST = async (req) => {
  try {
    const { teacherId, studentId, date, time } = await req.json();

    // Basic validation
    if (!teacherId || !studentId || !date || !time) {
      return NextResponse.json(
        { error: "Missing teacherId, studentId, date, or time" },
        { status: 400 }
      );
    }

    const startTime = dayjs.utc(`${date}T${time}`);
    const endTime = startTime.add(30, "minute");
    const now = dayjs.utc();

    // Prevent past bookings
    if (startTime.isBefore(now)) {
      return NextResponse.json(
        { error: "Cannot book a past time slot." },
        { status: 400 }
      );
    }

    const dayOfWeek = startTime.format("ddd");

    // 1️⃣ Check teacher availability
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

    // 2️⃣ Check overlapping bookings for the teacher
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

    // 3️⃣ Generate guaranteed unique room key
    const roomKey = await generateUniqueRoomKey();

    // 4️⃣ Create booking
    const { data: booking, error: insertError } = await supabaseClient
      .from("bookings")
      .insert([
        {
          teacher_id: teacherId,
          student_id: studentId,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          status: "booked",
          room_key: roomKey, // 🔥 Insert here
        },
      ])
      .select()
      .maybeSingle();

    if (insertError) throw insertError;

    // Success
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
