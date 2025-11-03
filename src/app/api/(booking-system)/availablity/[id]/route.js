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

    // 1️⃣ Fetch teacher’s availability slots
    const { data: availability, error: availError } = await supabaseClient
      .from("teacher_availability")
      .select("day_of_week, hour")
      .eq("teacher_id", teacherId)
      .eq("is_available", true);

    if (availError) throw availError;

    // 2️⃣ Fetch booked slots for the next 7 days
    const startOfToday = dayjs().utc().startOf("day");
    const weekLater = startOfToday.add(7, "day");

    const { data: bookings, error: bookError } = await supabaseClient
      .from("bookings")
      .select("start_time, end_time")
      .eq("teacher_id", teacherId)
      .eq("status", "booked")
      .gte("start_time", startOfToday.toISOString())
      .lte("start_time", weekLater.toISOString());

    if (bookError) throw bookError;

    const booked = bookings ?? [];

    // 3️⃣ Build a Set of booked slots (in 30-min increments)
    const bookedSet = new Set(
      booked.map((b) => dayjs.utc(b.start_time).format("YYYY-MM-DDTHH:mm"))
    );

    // 4️⃣ Generate next 7 days (including today)
    const freeSlotsByDate = {};
    let totalFreeSlots = 0;

    for (let i = 0; i < 7; i++) {
      const currentDate = startOfToday.add(i, "day");
      const weekday = currentDate.format("ddd"); // e.g. Mon, Tue, etc.
      const dateKey = currentDate.format("YYYY-MM-DD");

      // Initialize day with empty array (important!)
      freeSlotsByDate[dateKey] = [];

      // Find availability for this weekday
      const daySlots = availability.filter(
        (slot) => slot.day_of_week === weekday
      );

      for (const slot of daySlots) {
        const slotTime = dayjs.utc(`${dateKey}T${slot.hour}`);
        const slotKey = slotTime.format("YYYY-MM-DDTHH:mm");

        // Skip if already booked or in the past
        if (!bookedSet.has(slotKey) && slotTime.isAfter(dayjs().utc())) {
          freeSlotsByDate[dateKey].push(slot.hour);
          totalFreeSlots++;
        }
      }
    }

    // 5️⃣ Return clean response
    return NextResponse.json(
      {
        teacherId,
        freeSlotsByDate,
        totalFreeSlots,
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
