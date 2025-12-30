import { withTransaction } from "../db/withTransaction.js";
import { addLedgerEntry } from "../ledger/addLedgerEntry.js";
import {
  creditPending,
  trackSpend,
} from "../wallet/walletHelpers.js";

export async function handleStripeSuccess({
  bookingId,
  payerUserId,
  teacherUserId,
  stripePaymentIntentId,
  total,
  platformFee,
  teacherAmount,
}) {
  console.log(`[HandleStripeSuccess] Starting for bookingId=${bookingId}, total=${total}, platformFee=${platformFee}, teacherAmount=${teacherAmount}`);

  await withTransaction(async (client) => {
    console.log(`[HandleStripeSuccess] Ensuring wallets exist for teacher=${teacherUserId} and payer=${payerUserId}`);
    // ---------------------------------------------------------
    // Ensure wallets exist
    // ---------------------------------------------------------
    await client.query(
      `INSERT INTO wallets (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,
      [teacherUserId]
    );
    await client.query(
      `INSERT INTO wallets (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,
      [payerUserId]
    );

    // ---------------------------------------------------------
    // Create payment record
    // ---------------------------------------------------------
    console.log(`[HandleStripeSuccess] Creating payment record`);
    const paymentRes = await client.query(
      `
      INSERT INTO payments (
        booking_id,
        payer_user_id,
        teacher_id,
        stripe_payment_intent_id,
        amount_total,
        platform_fee,
        teacher_amount,
        status
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,'paid')
      RETURNING id
      `,
      [
        bookingId,
        payerUserId,
        teacherUserId,
        stripePaymentIntentId,
        total,
        platformFee,
        teacherAmount,
      ]
    );

    const paymentId = paymentRes.rows[0].id;
    console.log(`[HandleStripeSuccess] Payment record created: paymentId=${paymentId}`);

    // ---------------------------------------------------------
    // Ledger entries
    // ---------------------------------------------------------
    console.log(`[HandleStripeSuccess] Adding ledger entries`);
    await addLedgerEntry(client, {
      userId: teacherUserId,
      entryType: "payment_received",
      amount: total,
      bookingId,
      paymentId,
    });

    await addLedgerEntry(client, {
      userId: teacherUserId,
      entryType: "platform_fee",
      amount: -platformFee,
      bookingId,
      paymentId,
    });

    await addLedgerEntry(client, {
      userId: teacherUserId,
      entryType: "earning_pending",
      amount: teacherAmount,
      bookingId,
      paymentId,
    });

    // ---------------------------------------------------------
    // Wallet updates
    // ---------------------------------------------------------
    console.log(`[HandleStripeSuccess] Updating wallets`);
    await creditPending(client, teacherUserId, teacherAmount);
    await trackSpend(client, payerUserId, total);
  });

  console.log(`[HandleStripeSuccess] Completed for bookingId=${bookingId}`);
}
