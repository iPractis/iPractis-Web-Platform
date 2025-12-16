"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StripeCheckout from "@/src/components/Stripe/StripeCheckout";
import { useAuth } from "@/src/hooks/useAuth";

export default function BookLessonClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const teacherId = searchParams.get("teacherId");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const amount = searchParams.get("amount");

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!teacherId || !date || !time) {
      setError("Missing booking information");
      return;
    }

    createBooking();
  }, [user, teacherId, date, time]);

  async function createBooking() {
    try {
      setLoading(true);

      const res = await fetch("/api/(booking-system)/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId,
          studentId: user.user_id,
          date,
          time,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-6 text-center">Creating booking…</div>;

  if (error)
    return (
      <div className="p-6 text-center text-red-600">
        {error}
      </div>
    );

  if (!clientSecret)
    return <div className="p-6 text-center">Preparing payment…</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold mb-4">Confirm Booking</h1>

        <div className="space-y-2 mb-6">
          <div>Date: {date}</div>
          <div>Time: {time}</div>
          <div>Amount: ${amount}</div>
        </div>

        <StripeCheckout clientSecret={clientSecret} />

        <button
          onClick={() => router.back()}
          className="mt-4 text-sm underline text-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
