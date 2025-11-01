"use client"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function CheckoutButton({ amount, lectureId, studentId, teacherId }) {
  const createOrder = async () => {
    const res = await fetch("/api/payment/paypal/create", {
      method: "POST",
      body: JSON.stringify({ amount, lectureId, studentId, teacherId }),
    });
    const data = await res.json();
    return data.id; // order ID
  };

  const onApprove = async (data) => {
    await fetch("/api/payment/paypal/verify", {
      method: "POST",
      body: JSON.stringify({
        orderId: data.orderID,
        lectureId,
        studentId,
        teacherId,
      }),
    });
    alert("Payment completed successfully!");
  };

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
}
