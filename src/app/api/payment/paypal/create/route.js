import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { amount, currency, lectureId, studentId, teacherId } = await req.json();

    // Create PayPal order
    const accessToken = await generateAccessToken();
    const order = await createOrder(accessToken, amount, currency);

    return NextResponse.json({
      id: order.id,
      approveLink: order.links.find((l) => l.rel === "approve")?.href,
    });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Generate PayPal Access Token
async function generateAccessToken() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PAYPAL_API_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.PAYPAL_CLIENT_ID}:${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET}`
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

// Create PayPal Order
async function createOrder(accessToken, amount, currency = "USD") {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PAYPAL_API_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: currency, value: amount },
          payee: {
            email_address: process.env.PAYPAL_BUSINESS_EMAIL, // your account
          },
        },
      ],
    }),
  });

  return await response.json();
}
