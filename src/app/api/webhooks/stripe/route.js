import Stripe from "stripe";
import { headers } from "next/headers";
import { supabaseClient } from "@/src/lib/supabaseClient";
import { handleStripeSuccess } from "@/src/payments/handleStripeSuccess";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const sig = headers().get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object;

    const bookingId = pi.metadata.booking_id;
    const studentId = pi.metadata.payer_user_id;
    const teacherUserId = pi.metadata.teacher_user_id;

    // 1️⃣ Ledger + wallet update
    await handleStripeSuccess({
      bookingId,
      payerUserId: studentId,
      teacherUserId,
      stripePaymentIntentId: pi.id,
      total: pi.amount / 100,
      platformFee: Number(pi.metadata.platform_fee),
      teacherAmount: Number(pi.metadata.teacher_amount),
    });

    // 2️⃣ Mark booking as paid
    await supabaseClient
      .from("bookings")
      .update({ payment_status: "paid" })
      .eq("id", bookingId);

    // 3️⃣ Fetch booking + teacher
    const { data: booking } = await supabaseClient
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    const { data: teacher } = await supabaseClient
      .from("teachers")
      .select("user_id")
      .eq("teacher_id", booking.teacher_id)
      .single();

    const { data: teacherUser } = await supabaseClient
      .from("users")
      .select("first_name")
      .eq("user_id", teacher.user_id)
      .single();

    // 4️⃣ Create chat room
    const { data: chatRoom } = await supabaseClient
      .from("chat_rooms")
      .insert([{
        booking_id: bookingId,
        room_name: `Lesson with ${teacherUser.first_name}`,
        student_id: booking.student_id,
        teacher_id: booking.teacher_id,
        type: "lesson",
        expires_at: booking.end_time,
      }])
      .select()
      .single();

    // 5️⃣ Insert chat members
    await supabaseClient.from("chat_room_members").insert([
      { room_id: chatRoom.id, user_id: booking.student_id, role: "student" },
      { room_id: chatRoom.id, user_id: teacher.user_id, role: "teacher" },
    ]);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
