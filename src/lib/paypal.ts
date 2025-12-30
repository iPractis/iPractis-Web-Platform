import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

export function getPayPalClient() {
  console.log(`[PayPal Client] Initializing client for env: ${process.env.PAYPAL_ENV || 'sandbox'}`);
  const env =
    process.env.PAYPAL_ENV === "live"
      ? new checkoutNodeJssdk.core.LiveEnvironment(
          process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET
        )
      : new checkoutNodeJssdk.core.SandboxEnvironment(
          process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET
        );

  return new checkoutNodeJssdk.core.PayPalHttpClient(env);
}
