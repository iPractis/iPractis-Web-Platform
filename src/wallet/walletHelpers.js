export async function creditPending(client, userId, amount) {
  await client.query(
    `
    UPDATE wallets
    SET earned_pending = earned_pending + $1,
        updated_at = now()
    WHERE user_id = $2
    `,
    [amount, userId]
  );
}

export async function releasePending(client, userId, amount) {
  await client.query(
    `
    UPDATE wallets
    SET
      earned_pending = earned_pending - $1,
      earned_available = earned_available + $1,
      updated_at = now()
    WHERE user_id = $2
    `,
    [amount, userId]
  );
}

export async function debitAvailable(client, userId, amount) {
  const res = await client.query(
    `
    UPDATE wallets
    SET earned_available = earned_available - $1,
        updated_at = now()
    WHERE user_id = $2
      AND earned_available >= $1
    RETURNING *
    `,
    [amount, userId]
  );

  if (res.rowCount === 0) {
    throw new Error("Insufficient balance");
  }
}

export async function trackSpend(client, userId, amount) {
  await client.query(
    `
    UPDATE wallets
    SET spent_total = spent_total + $1,
        updated_at = now()
    WHERE user_id = $2
    `,
    [amount, userId]
  );
}
