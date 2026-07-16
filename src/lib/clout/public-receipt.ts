import { getLivePublicReceipt } from "./api";
import { DEMO_OPPORTUNITY_HASH, DEMO_RECEIPT } from "./demo";
import { seedOpportunityToReceipt } from "./receipt";
import { assertPublicPayloadSafe } from "./sanitizer";
import { getSeedOpportunity } from "./seed";
import type { ReceiptLookup } from "./types";

export async function getPublicReceipt(oppHash: string): Promise<ReceiptLookup> {
  const normalizedHash = oppHash.trim().toUpperCase();
  const seedOpportunity = getSeedOpportunity(normalizedHash);
  if (seedOpportunity) {
    return { state: "ready", receipt: seedOpportunityToReceipt(seedOpportunity) };
  }
  if (normalizedHash === DEMO_OPPORTUNITY_HASH) {
    assertPublicPayloadSafe(DEMO_RECEIPT);
    return { state: "ready", receipt: DEMO_RECEIPT };
  }

  const lookup = await getLivePublicReceipt(normalizedHash);
  if (lookup.receipt) assertPublicPayloadSafe(lookup.receipt);
  return lookup;
}
