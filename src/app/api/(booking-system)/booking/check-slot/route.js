import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { supabaseClient } from "@/src/lib/supabaseClient";

dayjs.extend(utc);

export const POST = async (req) => {
  try {
    const { teacherId, date, time } = await req.json();

    if (!teacherId || !date || !time) {
      return NextResponse.json(
        { error: "Missing teacherId, date, or time" },
        { status: 400 }
      );
    }

    const startTime = dayjs.utc(`${date}T${time}`);
    const endTime = startTime.add(30, "minute");

    // 1️⃣ Check teacher availability (teacher marked available)
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
        { available: false, reason: "Teacher not available at that time." },
        { status: 200 }
      );
    }

    // 2️⃣ Check if already booked by someone else
    const { data: existing, error: existingError } = await supabaseClient
      .from("bookings")
      .select("id")
      .eq("teacher_id", teacherId)
      .eq("status", "booked")
      .or(
        `and(start_time.gte.${startTime.toISOString()},start_time.lt.${endTime.toISOString()}),
         and(end_time.gt.${startTime.toISOString()},end_time.lte.${endTime.toISOString()})`
      );

    if (existingError) throw existingError;

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { available: false, reason: "Slot already booked." },
        { status: 200 }
      );
    }

    // ✅ Slot is free
    return NextResponse.json(
      { available: true, message: "Slot is available for booking." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error checking slot availability:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
};
