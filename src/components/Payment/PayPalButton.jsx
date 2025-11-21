"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

export default function PayPalPayment({ amount, description, onSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState("");

  const createOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: { value: amount.toFixed(2), currency_code: "USD" },
          description,
        },
      ],
    });

  const onApprove = async (data, actions) => {
    setIsProcessing(true);
    try {
      const order = await actions.order.get();

      const paymentData = {
        name: order?.payer?.name?.given_name || "",
        email: order?.payer?.email_address || "",
        amount: amount.toFixed(2),
        orderID: data.orderID,
      };

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) throw new Error("API error");
      const result = await response.json();

      onSuccess?.(result);
    } catch (err) {
      setPaypalError("Payment failed. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      {isProcessing && (
        <p className="text-sm text-center mb-2">Processing payment…</p>
      )}

      {paypalError && (
        <p className="text-sm text-center mb-2 text-red-600">{paypalError}</p>
      )}

      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          currency: "USD",
          intent: "capture",
        }}
      >
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={() => setPaypalError("PayPal error. Try again.")}
          style={{ layout: "vertical" }}
          disabled={isProcessing}
        />
      </PayPalScriptProvider>
    </div>
  );
}
