import { getPayPalClient } from "@/src/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(req) {
  try {
    const body = await req.json();
    const amount = body.amount;

    if (!amount) {
      return Response.json({ error: "Amount required" }, { status: 400 });
    }

    const client = getPayPalClient();

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: String(amount),
          },
        },
      ],
    });

    const order = await client.execute(request);

    return Response.json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
}
