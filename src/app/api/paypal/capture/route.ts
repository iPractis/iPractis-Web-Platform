import { getPayPalClient } from "@/src/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(req) {
  try {
    const { orderID } = await req.json();

    console.log(`[PayPal Capture] Received request: orderID=${orderID}`);

    if (!orderID) {
      console.log(`[PayPal Capture] Missing orderID`);
      return Response.json({ error: "orderID required" }, { status: 400 });
    }

    const client = getPayPalClient();

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    console.log(`[PayPal Capture] Executing capture for orderID=${orderID}`);
    const captured = await client.execute(request);

    console.log(`[PayPal Capture] Capture successful: status=${captured.result.status}, id=${captured.result.id}`);

    return Response.json({
      status: "success",
      details: captured.result,
    });
  } catch (err) {
    console.error(`[PayPal Capture] Error:`, err);
    return Response.json(
      { error: "Payment capture failed" },
      { status: 500 }
    );
  }
}
