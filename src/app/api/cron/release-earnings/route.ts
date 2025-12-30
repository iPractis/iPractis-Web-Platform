import { NextResponse } from "next/server";
import { supabaseClient } from "@/src/lib/supabaseClient";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    /* ---------------------------------------------------------
       🔐 CRON AUTH
    --------------------------------------------------------- */
    // const authHeader = req.headers.get("authorization");
    // if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return NextResponse.json(
    //     { error: "Unauthorized cron access" },
    //     { status: 401 }
    //   );
    // }

    /* ---------------------------------------------------------
       1️⃣ Find ended, paid, active bookings
    --------------------------------------------------------- */
    const { data: bookings, error: bookingErr } = await supabaseClient
      .from("bookings")
      .select("id, teacher_id")
      .eq("status", "booked")
      .eq("payment_status", "paid")
      .lt("end_time", new Date().toISOString());

    if (bookingErr) throw bookingErr;

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({
        success: true,
        released: 0,
        message: "No sessions to release",
      });
    }

    let releasedCount = 0;

    /* ---------------------------------------------------------
       2️⃣ Release earnings per booking
    --------------------------------------------------------- */
    for (const booking of bookings) {
      /* ---- Release ledger entries (idempotent) ---- */
      const { data: released, error: ledgerErr } = await supabaseClient
        .from("ledger_entries")
        .update({ entry_type: "earning_released" })
        .eq("booking_id", booking.id)
        .eq("entry_type", "earning_pending")
        .select("id");

      if (ledgerErr) {
        console.error(
          `[CRON][LEDGER] Failed for booking ${booking.id}`,
          ledgerErr
        );
        continue;
      }

      if (released?.length > 0) {
        releasedCount += released.length;
      }

      /* ---- Mark booking completed (safe + idempotent) ---- */
      await supabaseClient
        .from("bookings")
        .update({
          status: "completed",
          refund_status : "not applicable",
          updated_at: new Date().toISOString(),
        })
        .eq("id", booking.id);
    }

    /* ---------------------------------------------------------
       ✅ DONE
    --------------------------------------------------------- */
    return NextResponse.json({
      success: true,
      released_entries: releasedCount,
      bookings_processed: bookings.length,
    });

  } catch (err) {
    console.error("🔥 Release earnings cron failed:", err);
    return NextResponse.json(
      { error: "Cron execution failed" },
      { status: 500 }
    );
  }
}
