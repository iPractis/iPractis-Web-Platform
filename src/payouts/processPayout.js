import { withTransaction } from "../db/withTransaction.js";
import { addLedgerEntry } from "../ledger/addLedgerEntry.js";
import { debitAvailable } from "../wallet/walletHelpers.js";

export async function processPayout({
  teacherUserId,
  payoutId,
  amount,
}) {
  console.log(`[ProcessPayout] Starting for teacherUserId=${teacherUserId}, payoutId=${payoutId}, amount=${amount}`);

  await withTransaction(async (client) => {
    console.log(`[ProcessPayout] Debiting wallet`);
    // Debit wallet
    await debitAvailable(client, teacherUserId, amount);

    // Ledger entry
    console.log(`[ProcessPayout] Adding ledger entry`);
    await addLedgerEntry(client, {
      userId: teacherUserId,
      entryType: "wallet_debit",
      amount: -amount,
      payoutId,
    });
  });

  console.log(`[ProcessPayout] Transaction committed, Wise transfer should be done after`);
  // Wise transfer should be done AFTER commit
}
