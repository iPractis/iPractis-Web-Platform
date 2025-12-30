// app/api/wallet/route.ts
import { NextResponse } from "next/server";
import { requireUser } from "@/src/lib/requireUser";
import { supabaseClient } from "@/src/lib/supabaseClient";

export const runtime = "nodejs";

export async function GET() {
  const { authorized, user } = await requireUser();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseClient
    .from("ledger_entries")
    .select("entry_type, amount")
    .eq("user_id", user.user_id);

  if (error) throw error;

  let available = 0;
  let pending = 0;

  for (const entry of data) {
    if (entry.entry_type === "earning_released") {
      available += Number(entry.amount);
    }
    if (entry.entry_type === "earning_pending") {
      pending += Number(entry.amount);
    }
    if (entry.entry_type === "payout_completed") {
      available -= Number(entry.amount);
    }
  }

  return NextResponse.json({
    available_balance: available,
    pending_balance: pending,
  });
}
