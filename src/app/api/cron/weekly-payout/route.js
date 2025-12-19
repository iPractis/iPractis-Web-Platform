import { NextResponse } from "next/server";
import { supabaseClient } from "@/src/lib/supabaseClient";
import axios from "axios";

export const runtime = "nodejs";

/* ---------------------------------------------------------
   CONFIG
--------------------------------------------------------- */
const WISE_API_URL = process.env.WISE_API_URL;
const WISE_API_TOKEN = process.env.WISE_API_TOKEN;
const WISE_PROFILE_ID = Number(process.env.WISE_PROFILE_ID);

/* ---------------------------------------------------------
   POST /api/cron/weekly-payout
--------------------------------------------------------- */
export async function POST(req) {
  try {
    /* -------------------- FETCH PAYABLE EARNINGS -------------------- */
    const { data: earnings, error } = await supabaseClient.rpc(
      "get_weekly_teacher_earnings"
    );

    if (error) throw error;
    if (!earnings || earnings.length === 0) {
      return NextResponse.json({ message: "No payouts this week" });
    }

    const results= [];

    /* -------------------- PROCESS PER TEACHER -------------------- */
    for (const row of earnings) {
      const { teacher_id, teacher_user_id, total_amount } = row;

      try {
        /* ---------- IDEMPOTENCY CHECK ---------- */
        const { data: existing } = await supabaseClient
          .from("teacher_payouts")
          .select("id")
          .eq("teacher_id", teacher_id)
          .eq("payout_status", "completed")
          .gte("created_at", new Date(Date.now() - 7 * 86400000).toISOString())
          .maybeSingle();

        if (existing) continue;

        /* ---------- FETCH RECIPIENT ---------- */
        const { data: recipient } = await supabaseClient
          .from("payout_recipients")
          .select("wise_recipient_id, currency")
          .eq("user_id", teacher_user_id)
          .eq("is_active", true)
          .single();

        if (!recipient) {
          console.warn("Missing recipient:", teacher_user_id);
          continue;
        }

        /* ---------- CREATE PAYOUT RECORD ---------- */
        const { data: payout, error: payoutErr } = await supabaseClient
          .from("teacher_payouts")
          .insert({
            teacher_id,
            total_amount,
            currency: recipient.currency,
            payout_status: "processing",
            period_start: new Date(Date.now() - 7 * 86400000),
            period_end: new Date(),
          })
          .select()
          .single();

        if (payoutErr) throw payoutErr;

        /* ---------- CREATE WISE QUOTE ---------- */
        const quoteRes = await axios.post(
          `${WISE_API_URL}/v2/quotes`,
          {
            profile: WISE_PROFILE_ID,
            sourceCurrency: "USD",
            targetCurrency: recipient.currency,
            sourceAmount: total_amount,
            payOut: "BANK_TRANSFER",
          },
          {
            headers: {
              Authorization: `Bearer ${WISE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        const quoteId = quoteRes.data.id;

        /* ---------- CREATE TRANSFER ---------- */
        const transferRes = await axios.post(
          `${WISE_API_URL}/v1/transfers`,
          {
            targetAccount: recipient.wise_recipient_id,
            quoteUuid: quoteId,
            customerTransactionId: payout.id,
            details: { reference: "Weekly teacher payout" },
          },
          {
            headers: {
              Authorization: `Bearer ${WISE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        const transferId = transferRes.data.id;

        /* ---------- FUND TRANSFER ---------- */
        await axios.post(
          `${WISE_API_URL}/v3/profiles/${WISE_PROFILE_ID}/transfers/${transferId}/payments`,
          { type: "BALANCE" },
          {
            headers: {
              Authorization: `Bearer ${WISE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        /* ---------- LEDGER UPDATES ---------- */
        await supabaseClient
          .from("ledger_entries")
          .update({ payout_id: payout.id })
          .eq("user_id", teacher_user_id)
          .eq("entry_type", "earning_released")
          .is("payout_id", null);

        await supabaseClient.from("ledger_entries").insert({
          user_id: teacher_user_id,
          payout_id: payout.id,
          entry_type: "payout_completed",
          amount: total_amount,
          currency: recipient.currency,
        });

        /* ---------- WALLET UPDATE ---------- */
        await supabaseClient.rpc("apply_payout_to_wallet", {
          p_user_id: teacher_user_id,
          p_amount: total_amount,
        });

        /* ---------- FINALIZE PAYOUT ---------- */
        await supabaseClient
          .from("teacher_payouts")
          .update({
            payout_status: "completed",
            payout_batch_id: transferId,
            processed_at: new Date(),
          })
          .eq("id", payout.id);

        results.push({
          teacher_id,
          payout_id: payout.id,
          amount: total_amount,
        });

      } catch (teacherErr) {
        console.error(
          "❌ Teacher payout failed:",
          teacherErr.response?.data || teacherErr.message
        );
      }
    }

    return NextResponse.json({
      success: true,
      payouts_processed: results.length,
      results,
    });

  } catch (err) {
    console.error("🔥 Weekly payout failed:", err.message);
    return NextResponse.json({ error: "Weekly payout failed" }, { status: 500 });
  }
}
v 