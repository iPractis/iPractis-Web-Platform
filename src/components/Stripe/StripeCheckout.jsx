"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripeCheckout({ clientSecret }) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    console.log(`[Stripe Checkout] Form submitted`);
    e.preventDefault();
    if (!stripe || !elements) {
      console.log(`[Stripe Checkout] Stripe or elements not loaded`);
      return;
    }

    console.log(`[Stripe Checkout] Confirming payment`);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      console.error(`[Stripe Checkout] Payment confirmation error:`, error.message);
      alert(error.message);
    } else {
      console.log(`[Stripe Checkout] Payment confirmed, redirecting`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        disabled={!stripe}
        className="mt-4 w-full bg-black text-white py-2 rounded"
      >
        Pay & Confirm Booking
      </button>
    </form>
  );
}
