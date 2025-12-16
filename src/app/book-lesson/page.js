'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import StripeCheckout from '@/src/components/Stripe/StripeCheckout';
import { useAuth } from '@/src/hooks/useAuth';

export default function BookLessonPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const teacherId = searchParams.get('teacherId');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const amount = searchParams.get('amount');

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!teacherId || !date || !time) {
      setError('Missing booking information');
      return;
    }

    handleCreateBooking();
  }, [user, teacherId, date, time]);

  const handleCreateBooking = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log(`[Book Lesson] Creating booking for teacherId=${teacherId}, date=${date}, time=${time}`);

      const response = await fetch('/api/(booking-system)/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teacherId: parseInt(teacherId),
          studentId: user.user_id,
          date,
          time,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      console.log(`[Book Lesson] Booking created: bookingId=${data.bookingId}, clientSecret present=${!!data.clientSecret}`);
      setClientSecret(data.clientSecret);
      setBookingId(data.bookingId);
    } catch (err) {
      console.error('[Book Lesson] Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Creating booking...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h2 className="text-red-800 font-semibold mb-2">Booking Error</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => router.back()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Preparing payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Confirm Your Booking</h1>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <p className="text-gray-900">{date}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <p className="text-gray-900">{time}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <p className="text-gray-900">${amount}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
          <StripeCheckout clientSecret={clientSecret} />
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800 underline"
          >
            Cancel and go back
          </button>
        </div>
      </div>
    </div>
  );
}