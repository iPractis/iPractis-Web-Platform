import { getPayPalClient } from "@/src/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(req) {
  try {
    const { orderID } = await req.json();

    if (!orderID) {
      return Response.json({ error: "orderID required" }, { status: 400 });
    }

    const client = getPayPalClient();

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const captured = await client.execute(request);

    return Response.json({
      status: "success",
      details: captured.result,
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Payment capture failed" },
      { status: 500 }
    );
  }
}
