import { withTransaction } from "../db/withTransaction.js";
import { addLedgerEntry } from "../ledger/addLedgerEntry.js";
import { debitAvailable } from "../wallet/walletHelpers.js";

export async function processPayout({
  teacherUserId,
  payoutId,
  amount,
}) {
  await withTransaction(async (client) => {
    // Debit wallet
    await debitAvailable(client, teacherUserId, amount);

    // Ledger entry
    await addLedgerEntry(client, {
      userId: teacherUserId,
      entryType: "wallet_debit",
      amount: -amount,
      payoutId,
    });
  });

  // Wise transfer should be done AFTER commit
}
