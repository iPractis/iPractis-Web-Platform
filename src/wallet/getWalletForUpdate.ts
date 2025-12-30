export async function getWalletForUpdate(client, userId) {
  const res = await client.query(
    `
    SELECT *
    FROM wallets
    WHERE user_id = $1
    FOR UPDATE
    `,
    [userId]
  );

  if (res.rows.length === 0) {
    await client.query(
      `
      INSERT INTO wallets (user_id)
      VALUES ($1)
      `,
      [userId]
    );

    return {
      earned_pending: 0,
      earned_available: 0,
      spent_total: 0,
    };
  }

  return res.rows[0];
}
