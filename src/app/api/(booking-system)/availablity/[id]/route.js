import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { supabaseClient } from "@/src/lib/supabaseClient";

dayjs.extend(utc);

export const GET = async (req, context) => {
  try {
    const teacherId = context?.params?.id;

    if (!teacherId) {
      return NextResponse.json({ error: "Missing teacherId" }, { status: 400 });
    }

    // 1️⃣ Fetch all teacher weekly availability
    const { data: availability, error: availError } = await supabaseClient
      .from("teacher_availability")
      .select("day_of_week, hour")
      .eq("teacher_id", teacherId)
      .eq("is_available", true);

    if (availError) throw availError;

    // 2️⃣ Fetch all future bookings (not limited to 7 days)
    const now = dayjs().utc().toISOString();

    const { data: bookings, error: bookError } = await supabaseClient
      .from("bookings")
      .select("start_time")
      .eq("teacher_id", teacherId)
      .eq("status", "booked")
      .gte("start_time", now);

    if (bookError) throw bookError;

    // Build a Set of booked weekday+hour (e.g. "Mon|06:00")
    const bookedSet = new Set();

    bookings.forEach((b) => {
      const dt = dayjs.utc(b.start_time);
      const weekday = dt.format("ddd");
      const hour = dt.format("HH:mm");
      bookedSet.add(`${weekday}|${hour}`);
    });

    // 3️⃣ Group: weekday → free hours
    const slotMap = {};

    for (const slot of availability) {
      const weekday = slot.day_of_week;
      const hour = slot.hour.slice(0, 5); // HH:MM

      const key = `${weekday}|${hour}`;

      // Skip booked times
      if (bookedSet.has(key)) continue;

      if (!slotMap[weekday]) slotMap[weekday] = [];
      slotMap[weekday].push(hour);
    }

    // Sort hours
    Object.keys(slotMap).forEach((d) => {
      slotMap[d].sort();
    });

    // Convert to array format
    const result = Object.entries(slotMap).map(([day, hours]) => ({
      day,
      hours,
    }));

    return NextResponse.json(
      {
        teacherId,
        availability: result, // <-- final output
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching teacher availability:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
};
