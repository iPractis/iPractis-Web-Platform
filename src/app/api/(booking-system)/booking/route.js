import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Stripe from "stripe";
import { supabaseClient } from "@/src/lib/supabaseClient";

dayjs.extend(utc);

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ---------------------------------------------------------
// 🔑 Generate unique room key (used AFTER payment)
// ---------------------------------------------------------
async function generateUniqueRoomKey() {
  let key;
  let exists = true;

  while (exists) {
    key = crypto.randomUUID().replace(/-/g, "").slice(0, 12);

    const { data } = await supabaseClient
      .from("bookings")
      .select("id")
      .eq("room_key", key)
      .maybeSingle();

    exists = !!data;
  }

  return key;
}

// ---------------------------------------------------------
// 📅 POST: Create Booking + Stripe PaymentIntent
// ---------------------------------------------------------
export const POST = async (req) => {
  try {
    const { teacherId, studentId, date, time } = await req.json();

    if (!teacherId || !studentId || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const startTime = dayjs.utc(`${date}T${time}`);
    const endTime = startTime.add(30, "minute");
    const now = dayjs.utc();

    if (startTime.isBefore(now)) {
      return NextResponse.json(
        { error: "Cannot book a past time slot" },
        { status: 400 }
      );
    }

    const dayOfWeek = startTime.format("ddd");

    // ---------------------------------------------------------
    // 1️⃣ Availability check
    // ---------------------------------------------------------
    const { data: availability } = await supabaseClient
      .from("teacher_availability")
      .select("id")
      .eq("teacher_id", teacherId)
      .eq("day_of_week", dayOfWeek)
      .eq("hour", time)
      .eq("is_available", true)
      .maybeSingle();

    if (!availability) {
      return NextResponse.json(
        { error: "Teacher not available" },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // 2️⃣ Conflict check
    // ---------------------------------------------------------
    const { data: conflicts } = await supabaseClient
      .from("bookings")
      .select("id")
      .eq("teacher_id", teacherId)
      .eq("status", "booked")
      .filter("start_time", "lt", endTime.toISOString())
      .filter("end_time", "gt", startTime.toISOString());

    if (conflicts?.length > 0) {
      return NextResponse.json(
        { error: "Slot already booked" },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // 3️⃣ Create booking (PENDING PAYMENT)
    // ---------------------------------------------------------
    const roomKey = await generateUniqueRoomKey();

    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .insert([{
        teacher_id: teacherId,
        student_id: studentId,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        status: "booked",
        payment_status: "pending",
        room_key: roomKey,
      }])
      .select()
      .single();

    if (bookingError) throw bookingError;

    // ---------------------------------------------------------
    // 4️⃣ Fetch teacher user_id
    // ---------------------------------------------------------
    const { data: teacher } = await supabaseClient
      .from("teachers")
      .select("user_id")
      .eq("teacher_id", teacherId)
      .single();

    // ---------------------------------------------------------
    // 5️⃣ Create Stripe PaymentIntent
    // ---------------------------------------------------------
    const classPrice = booking.class_price ?? 15;
    const amount = Math.round(classPrice * 100);
    const platformFee = Math.round(amount * 0.2);
    const teacherAmount = amount - platformFee;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        booking_id: booking.id,
        payer_user_id: studentId,
        teacher_user_id: teacher.user_id,
        platform_fee: platformFee / 100,
        teacher_amount: teacherAmount / 100,
      },
    });

    // ---------------------------------------------------------
    // 6️⃣ Return client secret
    // ---------------------------------------------------------
    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      clientSecret: paymentIntent.client_secret,
    });

  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
};
