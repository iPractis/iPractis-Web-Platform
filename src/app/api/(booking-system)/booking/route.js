import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Stripe from "stripe";
import { supabaseClient } from "@/src/lib/supabaseClient";

dayjs.extend(utc);
export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { teacherId, studentId, date, time , duration } = await req.json();

    if (!teacherId || !studentId || !date || !time) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const startTime = dayjs.utc(`${date}T${time}`);
    const endTime = startTime.add(duration, "minute");

      const { data: teacher } = await supabaseClient
      .from("teachers")
      .select("user_id , hourly_price")
      .eq("teacher_id", teacherId)
      .single();

      const cost = teacher.hourly_price * (duration/30)
    // 1️⃣ Create booking (PENDING)
    const { data: booking , error: bookingError } = await supabaseClient
      .from("bookings")
      .insert([{
        teacher_id: teacherId,
        student_id: studentId,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        status: "booked",
        payment_status: "pending",
        class_price : cost
      }])
      .select()
      .single();

      if(bookingError){
        console.log(bookingError)
      }

    // 2️⃣ Resolve teacher USER ID
  
    // 3️⃣ Create Stripe PaymentIntent
    const amount = Math.round(teacher.hourly_price * 100 * (duration/30));
    const platformFee = Math.round(amount * 0.2);
    const teacherAmount = amount - platformFee;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        booking_id: booking.id,
        payer_user_id: studentId,
        teacher_user_id: teacher.user_id, // ✅ users.user_id
        teacher_id: teacherId,             // ✅ teachers.teacher_id
        platform_fee: platformFee / 100,
        teacher_amount: teacherAmount / 100,
      },
    });

    return NextResponse.json({
      bookingId: booking.id,
      clientSecret: paymentIntent.client_secret,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
