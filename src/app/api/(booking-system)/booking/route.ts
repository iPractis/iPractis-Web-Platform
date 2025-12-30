import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Stripe from "stripe";
import { supabaseClient } from "@/src/lib/supabaseClient";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);
dayjs.extend(utc);
export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    /* ----------------------------------------
       1️⃣ Parse & validate input
    ---------------------------------------- */
    const body = await req.json();
    const { teacherId, studentId, date, time, duration, viewerTimezone } = body;

    if (!teacherId || !studentId || !date || !time || !duration) {
      
      console.log("data is missing", teacherId, studentId, date, time, duration)

      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    /* ----------------------------------------
       2️⃣ Calculate times
    ---------------------------------------- */
   const startTime = dayjs
  .tz(`${date}T${time}`, viewerTimezone) // interpret local time correctly
  .utc();                          // convert to UTC

const endTime = startTime.add(duration, "minute");

    /* ----------------------------------------
       3️⃣ Fetch teacher pricing
    ---------------------------------------- */
    const { data: teacher, error: teacherError } =
      await supabaseClient
        .from("teachers")
        .select("user_id, hourly_price")
        .eq("teacher_id", teacherId)
        .single();

    if (teacherError || !teacher) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    const cost = teacher.hourly_price * (duration / 30);

    /* ----------------------------------------
       4️⃣ Create booking (pending)
    ---------------------------------------- */
    const { data: booking, error: bookingError } =
      await supabaseClient
        .from("bookings")
        .insert([
          {
            teacher_id: teacherId,
            student_id: studentId,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            status: "booked",
            payment_status: "pending",
            class_price: cost,
          },
        ])
        .select()
        .single();

    if (bookingError) {
      if(bookingError.code == 23505){
        return NextResponse.json({
          error: "Slot already booked",
        },
      {
        status: 409
      })
      }
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 }
      );
    }

    /* ----------------------------------------
       5️⃣ Stripe PaymentIntent
    ---------------------------------------- */
    const amount = Math.round(
      teacher.hourly_price * 100 * (duration / 30)
    );
    const platformFee = Math.round(amount * 0.2);
    const teacherAmount = amount - platformFee;

    let paymentIntent;

    try {
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        metadata: {
          booking_id: booking.id,
          payer_user_id: studentId,
          teacher_user_id: teacher.user_id,
          teacher_id: teacherId,
          platform_fee: platformFee / 100,
          teacher_amount: teacherAmount / 100,
        },
      });
    } catch (stripeError) {
      return NextResponse.json(
        { error: "Payment initialization failed" },
        { status: 500 }
      );
    }

    /* ----------------------------------------
       6️⃣ Success
    ---------------------------------------- */
    return NextResponse.json({
      bookingId: booking.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
