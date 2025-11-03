import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { supabaseClient } from "@/src/lib/supabaseClient";

dayjs.extend(utc);

export const PATCH = async (req, { params }) => {
  try {
    const { id } = params;
    const body = await req.json();

    if (!id) return NextResponse.json({ error: "Missing booking ID" }, { status: 400 });

    const { status, new_date, new_time, refund_reason } = body;

    if (!status) {
      return NextResponse.json({ error: "Missing status field" }, { status: 400 });
    }

    // 1️⃣ Fetch booking
    const { data: booking, error: fetchError } = await supabaseClient
      .from("bookings")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    const updates = { updated_at: new Date().toISOString() };

    // 2️⃣ Handle cancellation
    if (status === "cancelled") {
      updates.status = "cancelled";

      const now = dayjs.utc();
      const start = dayjs.utc(booking.start_time);
      const hoursUntilClass = start.diff(now, "hour", true); // fractional hours

      let refundPercentage = 0;
      let refundAmount = 0;

      if (hoursUntilClass > 12) {
        refundPercentage = 1.0; // 100%
      } else if (hoursUntilClass > 1) {
        refundPercentage = 0.5; // 50%
      } else {
        refundPercentage = 0; // No refund
      }

      // For demo, assume class fee = 100 (you can replace with price column later)
      const classPrice = booking.class_price || 100;
      refundAmount = classPrice * refundPercentage;

      const refundStatus = refundPercentage > 0 ? "initiated" : "none";

      // ✅ Create refund record only if applicable
      if (refundPercentage > 0) {
        const { data: refundData, error: refundError } = await supabaseClient
  .from("refunds")
  .insert([
    {
      booking_id: id,
      student_id: booking.student_id,
      teacher_id: booking.teacher_id,
      refund_amount: refundAmount,
      refund_status: "initiated",
      reason: refund_reason || `Auto refund (${refundPercentage * 100}%)`,
    },
  ])
  .select();

console.log("Refund insert response:", { refundData, refundError });

      }

      updates.refund_status = refundStatus;
    }

    // 3️⃣ Handle completion
    else if (status === "completed") {
      updates.status = "completed";
      updates.completed_at = new Date().toISOString();
    }

    // 4️⃣ Handle reschedule
    else if (status === "rescheduled") {
      if (!new_date || !new_time) {
        return NextResponse.json(
          { error: "Missing new_date or new_time for reschedule" },
          { status: 400 }
        );
      }

      const startTime = dayjs.utc(`${new_date}T${new_time}`);
      const endTime = startTime.add(30, "minute");
      const dayOfWeek = startTime.format("ddd");

      // Check teacher availability
      const { data: availability, error: availError } = await supabaseClient
        .from("teacher_availability")
        .select("id")
        .eq("teacher_id", booking.teacher_id)
        .eq("day_of_week", dayOfWeek)
        .eq("hour", new_time)
        .eq("is_available", true)
        .maybeSingle();

      if (availError) throw availError;
      if (!availability) {
        return NextResponse.json({ error: "Teacher not available at that time." }, { status: 400 });
      }

      // Check conflicts
      const { data: conflicts, error: conflictError } = await supabaseClient
        .from("bookings")
        .select("id")
        .eq("teacher_id", booking.teacher_id)
        .eq("status", "booked")
        .filter("start_time", "lt", endTime.toISOString())
        .filter("end_time", "gt", startTime.toISOString())
        .neq("id", id);

      if (conflictError) throw conflictError;

      if (conflicts && conflicts.length > 0) {
        return NextResponse.json({ error: "New slot is already booked." }, { status: 400 });
      }

      updates.status = "rescheduled";
      updates.start_time = startTime.toISOString();
      updates.end_time = endTime.toISOString();
    }

    // 5️⃣ Update booking record
    const { data: updated, error: updateError } = await supabaseClient
      .from("bookings")
      .update(updates)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (updateError) throw updateError;

    return NextResponse.json(
      {
        success: true,
        message: `Booking updated successfully (${status})`,
        booking: updated,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating booking:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
};
