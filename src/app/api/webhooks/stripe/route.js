import Stripe from "stripe";
import { supabaseClient } from "@/src/lib/supabaseClient";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  let event;

  /* ---------------------------------------------------------
     0️⃣ Verify webhook signature
  --------------------------------------------------------- */
  let body;
  let sig;

  try {
    body = await req.text();
    sig = req.headers.get("stripe-signature");

    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Stripe signature verification failed:", err.message);
    return new Response("Invalid signature", { status: 400 });
  }

  /* ---------------------------------------------------------
     1️⃣ Only handle successful payments
  --------------------------------------------------------- */
  if (event.type !== "payment_intent.succeeded") {
    return new Response("Ignored event", { status: 200 });
  }

  const pi = event.data.object;

  /* ---------------------------------------------------------
     2️⃣ Validate required metadata
  --------------------------------------------------------- */
  const {
    booking_id: bookingId,
    payer_user_id: payerUserId,
    teacher_user_id: teacherUserId,
    teacher_id: teacherId,
    platform_fee,
    teacher_amount,
  } = pi.metadata || {};

  if (!bookingId || !payerUserId || !teacherUserId || !teacherId) {
    console.error("❌ Missing required Stripe metadata", pi.metadata);
    return new Response("Missing metadata", { status: 400 });
  }

  try {
    /* ---------------------------------------------------------
       3️⃣ Idempotency check (payments table)
    --------------------------------------------------------- */
    const { data: existingPayment, error: idempotencyError } =
      await supabaseClient
        .from("payments")
        .select("id")
        .eq("stripe_payment_intent_id", pi.id)
        .maybeSingle();

    if (idempotencyError) throw idempotencyError;

    if (existingPayment) {
      console.log("⚠️ Payment already processed:", pi.id);
      return new Response("Already processed", { status: 200 });
    }

    /* ---------------------------------------------------------
       4️⃣ Ensure wallets exist (users only)
    --------------------------------------------------------- */
    const { error: walletError } = await supabaseClient
      .from("wallets")
      .upsert(
        [
          { user_id: payerUserId },
          { user_id: teacherUserId },
        ],
        { onConflict: "user_id" }
      );

    if (walletError) throw walletError;

    /* ---------------------------------------------------------
       5️⃣ Insert payment record
    --------------------------------------------------------- */
    const { data: payment, error: paymentError } = await supabaseClient
      .from("payments")
      .insert([{
        booking_id: bookingId,
        payer_user_id: payerUserId,
        teacher_id: teacherId,
        stripe_payment_intent_id: pi.id,
        amount_total: pi.amount / 100,
        platform_fee: Number(platform_fee),
        teacher_amount: Number(teacher_amount),
        currency: pi.currency.toUpperCase(),
        status: "paid",
      }])
      .select()
      .single();

    if (paymentError) throw paymentError;

    /* ---------------------------------------------------------
       6️⃣ Ledger entries
    --------------------------------------------------------- */
    const { error: ledgerError } = await supabaseClient
      .from("ledger_entries")
      .insert([
        {
          user_id: payerUserId,
          booking_id: bookingId,
          payment_id: payment.id,
          entry_type: "payment_received",
          amount: pi.amount / 100,
          currency: pi.currency.toUpperCase(),
        },
        {
          user_id: teacherUserId,
          booking_id: bookingId,
          payment_id: payment.id,
          entry_type: "earning_pending",
          amount: Number(teacher_amount),
          currency: pi.currency.toUpperCase(),
        },
      ]);

    if (ledgerError) throw ledgerError;

    /* ---------------------------------------------------------
       7️⃣ Update booking status
    --------------------------------------------------------- */
    const { error: bookingUpdateError } = await supabaseClient
      .from("bookings")
      .update({
        payment_status: "paid",
        status: "confirmed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", bookingId);

    if (bookingUpdateError) throw bookingUpdateError;

    /* ---------------------------------------------------------
       8️⃣ Create chat room (IDEMPOTENT)
    --------------------------------------------------------- */
    const { data: existingRoom, error: roomCheckError } =
      await supabaseClient
        .from("chat_rooms")
        .select("id")
        .eq("booking_id", bookingId)
        .maybeSingle();

    if (roomCheckError) throw roomCheckError;

    if (!existingRoom) {
      const { data: booking, error: bookingFetchError } =
        await supabaseClient
          .from("bookings")
          .select("id, student_id, teacher_id, end_time")
          .eq("id", bookingId)
          .single();

      if (bookingFetchError) throw bookingFetchError;

      const { data: room, error: roomCreateError } =
        await supabaseClient
          .from("chat_rooms")
          .insert([{
            booking_id: booking.id,
            student_id: booking.student_id,
            teacher_id: booking.teacher_id,
            type: "booking",
            expires_at: booking.end_time,
          }])
          .select()
          .single();

      if (roomCreateError) throw roomCreateError;

      const { error: memberError } = await supabaseClient
        .from("chat_room_members")
        .insert([
          { room_id: room.id, user_id: booking.student_id, role: "student" },
          { room_id: room.id, user_id: teacherUserId, role: "teacher" },
        ]);

      if (memberError) throw memberError;
    }

    console.log("✅ Stripe payment fully processed:", pi.id);
    return new Response("OK", { status: 200 });

  } catch (err) {
    console.error("🔥 Stripe webhook failed:", err);
    return new Response("Webhook processing failed", { status: 500 });
  }
}
