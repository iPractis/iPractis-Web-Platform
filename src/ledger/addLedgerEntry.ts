export async function addLedgerEntry(client, entry) {
  const {
    userId,
    entryType,
    amount,
    currency = "USD",
    bookingId = null,
    paymentId = null,
    payoutId = null,
    metadata = {},
  } = entry;

  await client.query(
    `
    INSERT INTO ledger_entries (
      user_id,
      entry_type,
      amount,
      currency,
      booking_id,
      payment_id,
      payout_id,
      metadata
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    `,
    [
      userId,
      entryType,
      amount,
      currency,
      bookingId,
      paymentId,
      payoutId,
      metadata,
    ]
  );
}
