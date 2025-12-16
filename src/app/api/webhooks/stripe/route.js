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

  if (!bookingId || !payerUserId) {
    console.error("❌ Missing Stripe metadata:", pi.metadata);
    return new Response("Missing metadata", { status: 400 });
  }

  try {
    /* ---------------------------------------------------------
       3️⃣ Fetch booking (source of truth)
    --------------------------------------------------------- */
    const { data: booking, error: bookingErr } = await supabaseClient
      .from("bookings")
      .select("id, teacher_id, student_id, end_time")
      .eq("id", bookingId)
      .single();

    if (bookingErr || !booking) {
      throw new Error("Booking not found");
    }

    /* ---------------------------------------------------------
       4️⃣ Resolve teacher → user → name
    --------------------------------------------------------- */
    const { data: teacher, error: teacherErr } = await supabaseClient
      .from("teachers")
      .select("user_id")
      .eq("teacher_id", booking.teacher_id)
      .single();

    if (teacherErr || !teacher?.user_id) {
      throw new Error("Teacher user not found");
    }

    const teacherUserId = teacher.user_id;

    const { data: teacherUser, error: userErr } = await supabaseClient
      .from("users")
      .select("first_name, last_name")
      .eq("user_id", teacherUserId)
      .single();

    if (userErr || !teacherUser) {
      throw new Error("Teacher profile not found");
    }

    const teacherName = `${teacherUser.first_name ?? ""} ${teacherUser.last_name ?? ""}`.trim();
    const roomName = `Chat with ${teacherName || "Teacher"}`;

    /* ---------------------------------------------------------
       5️⃣ Idempotency check (payments)
    --------------------------------------------------------- */
    const { data: existingPayment } = await supabaseClient
      .from("payments")
      .select("id")
      .eq("stripe_payment_intent_id", pi.id)
      .maybeSingle();

    if (existingPayment) {
      console.log("⚠️ Payment already processed:", pi.id);
      return new Response("Already processed", { status: 200 });
    }

    /* ---------------------------------------------------------
       6️⃣ Ensure wallets exist (VALID users only)
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
       7️⃣ Insert payment record
    --------------------------------------------------------- */
    const { data: payment, error: paymentError } = await supabaseClient
      .from("payments")
      .insert([
        {
          booking_id: bookingId,
          payer_user_id: payerUserId,
          teacher_id: booking.teacher_id,
          stripe_payment_intent_id: pi.id,
          amount_total: pi.amount / 100,
          platform_fee: Number(platform_fee),
          teacher_amount: Number(teacher_amount),
          currency: pi.currency.toUpperCase(),
          status: "paid",
        },
      ])
      .select()
      .single();

    if (paymentError) throw paymentError;

    /* ---------------------------------------------------------
       8️⃣ Ledger entries
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
       9️⃣ Update booking (VALID enum)
    --------------------------------------------------------- */
    const { error: bookingUpdateError } = await supabaseClient
      .from("bookings")
      .update({
        payment_status: "paid",
        status: "booked",
        updated_at: new Date().toISOString(),
      })
      .eq("id", bookingId);

    if (bookingUpdateError) throw bookingUpdateError;

    /* ---------------------------------------------------------
       🔟 Create chat room (IDEMPOTENT + NAMED)
    --------------------------------------------------------- */
    const { data: existingRoom } = await supabaseClient
      .from("chat_rooms")
      .select("id")
      .eq("booking_id", bookingId)
      .maybeSingle();

    if (!existingRoom) {
      const { data: room, error: roomErr } = await supabaseClient
        .from("chat_rooms")
        .insert([
          {
            room_name: roomName,
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
