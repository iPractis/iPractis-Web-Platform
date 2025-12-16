import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Stripe from "stripe";
import { supabaseClient } from "@/src/lib/supabaseClient";

dayjs.extend(utc);

export const runtime = "nodejs";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ---------------------------------------------------------
// 🔑 Generate unique room key
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

    if (startTime.isBefore(dayjs.utc())) {
      return NextResponse.json(
        { error: "Cannot book a past time slot" },
        { status: 400 }
      );
    }

    const roomKey = await generateUniqueRoomKey();

    // ---------------------------------------------------------
    // 1️⃣ Create booking (PENDING PAYMENT)
    // ---------------------------------------------------------
    const { data: booking, error } = await supabaseClient
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

    if (error) throw error;

    // ---------------------------------------------------------
    // 2️⃣ Create Stripe PaymentIntent
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
        teacher_user_id: teacherId,
        platform_fee: platformFee / 100,
        teacher_amount: teacherAmount / 100,
      },
    });

    return NextResponse.json(
      {
        success: true,
        bookingId: booking.id,
        clientSecret: paymentIntent.client_secret,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
};
