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

  if (event.type !== "payment_intent.succeeded") {
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  }

  const pi = event.data.object;
  const bookingId = pi.metadata.booking_id;
  const payerUserId = pi.metadata.payer_user_id;
  const teacherUserId = pi.metadata.teacher_user_id;

  // ---------------------------------------------------------
  // 1️⃣ Idempotency check
  // ---------------------------------------------------------
  const { data: existingPayment } = await supabaseClient
    .from("payments")
    .select("id")
    .eq("stripe_payment_intent_id", pi.id)
    .maybeSingle();

  if (existingPayment) {
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  }

  // ---------------------------------------------------------
  // 2️⃣ Ledger + Wallet
  // ---------------------------------------------------------
  await handleStripeSuccess({
    bookingId,
    payerUserId,
    teacherUserId,
    stripePaymentIntentId: pi.id,
    total: pi.amount / 100,
    platformFee: Number(pi.metadata.platform_fee),
    teacherAmount: Number(pi.metadata.teacher_amount),
  });

  // ---------------------------------------------------------
  // 3️⃣ Update booking
  // ---------------------------------------------------------
  await supabaseClient
    .from("bookings")
    .update({
      payment_status: "paid",
      status: "confirmed",
    })
    .eq("id", bookingId);

  // ---------------------------------------------------------
  // 4️⃣ Fetch booking + teacher
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  // 5️⃣ Create chat room (IDEMPOTENT)
  // ---------------------------------------------------------
  const { data: existingChat } = await supabaseClient
    .from("chat_rooms")
    .select("id")
    .eq("booking_id", bookingId)
    .maybeSingle();

  if (!existingChat) {
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

    await supabaseClient.from("chat_room_members").insert([
      { room_id: chatRoom.id, user_id: booking.student_id, role: "student" },
      { room_id: chatRoom.id, user_id: teacher.user_id, role: "teacher" },
    ]);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
