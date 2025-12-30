import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const { orderId, lectureId, studentId, teacherId } = await req.json();

    console.log(`[PayPal Verify] Received request: orderId=${orderId}, lectureId=${lectureId}, studentId=${studentId}, teacherId=${teacherId}`);

    const accessToken = await generateAccessToken();
    console.log(`[PayPal Verify] Generated access token`);

    const response = await fetch(`${process.env.NEXT_PUBLIC_PAYPAL_API_URL}/v2/checkout/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const order = await response.json();
    console.log(`[PayPal Verify] Fetched order: status=${order.status}, id=${order.id}`);

    if (order.status === "COMPLETED") {
      const paymentData = {
        student_id: studentId,
        lecture_id: lectureId,
        teacher_id: teacherId,
        amount: order.purchase_units[0].amount.value,
        currency: order.purchase_units[0].amount.currency_code,
        status: "COMPLETED",
        method: "paypal",
      };

      console.log(`[PayPal Verify] Inserting payment: amount=${paymentData.amount}, currency=${paymentData.currency}`);
      const { data, error } = await supabase.from("payments").insert(paymentData);

      if (error) throw error;

      console.log(`[PayPal Verify] Payment inserted successfully: data=${JSON.stringify(data)}`);
      return NextResponse.json({ success: true, data });
    } else {
      console.log(`[PayPal Verify] Order not completed: status=${order.status}`);
      return NextResponse.json({ success: false, status: order.status });
    }
  } catch (error) {
    console.error("[PayPal Verify] Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function generateAccessToken() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PAYPAL_API_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET}`
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}
