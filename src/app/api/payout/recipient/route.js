import { NextResponse } from "next/server";
import axios from "axios";
import { requireUser } from "@/src/lib/requireUser";
import { supabaseServer } from "@/src/lib/supabaseClient";

const WISE_API_URL = process.env.WISE_BASE_URL;
const WISE_API_TOKEN = process.env.WISE_API_KEY;
const WISE_PROFILE_ID = Number(process.env.WISE_PROFILE_ID);

export async function POST(req) {
  try {
    const {user, authorized } = requireUser();

    if(!authorized ){
       return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
    }
    const body = await req.json();
console.log("[WISE][RECIPIENT][PAYLOAD]", JSON.stringify({
  profile: WISE_PROFILE_ID,
  accountHolderName: body.accountHolderName,
  currency: body.currency,
  type: body.type,
  accountType: body.accountType,
  address: body.address,
  details: body.details,
}, null, 2));

    /* -------------------- CREATE WISE RECIPIENT -------------------- */
    const wiseRes = await axios.post(
      `${WISE_API_URL}/v1/accounts`,
      {
        profile: WISE_PROFILE_ID,
        accountHolderName: body.accountHolderName,
        currency: body.currency,
        type: body.type, // aba / iban / sort_code / etc
        details: body.details, // country-specific
      },
      {
        headers: {
          Authorization: `Bearer ${WISE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const recipientId = wiseRes.data.id;

    /* -------------------- SAVE RECIPIENT -------------------- */
    const {data , error } = await supabaseServer
      .from("payout_recipients")
      .upsert({
        user_id: user.user_id,
        wise_recipient_id: recipientId,
        currency: body.currency,
      });

      console.log(data || error)
    return NextResponse.json({
      success: true,
      recipient_id: recipientId,
    });
  } catch (err) {
    console.error(
      "[WISE][RECIPIENT] Failed",
      err.response?.data || err.message
    );
    return NextResponse.json(
      { error: "Failed to create payout recipient" },
      { status: 500 }
    );
  }
}
