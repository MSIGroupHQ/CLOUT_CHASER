import { describe, expect, it } from "vitest";
import { CLOUT_QUEUE_NAMES } from "../src/lib/queues";
import { r2Keys } from "../src/lib/r2";
import { isInternalApproveRoute } from "../src/routes/internal-approve";
import { isOpportunityRoute } from "../src/routes/opportunity";
import { isPackageRoute } from "../src/routes/package";
import { isReceiptCreateRoute, receiptIdFromRoute } from "../src/routes/receipt";
import { opportunityHashFromShareRoute } from "../src/routes/share";
import { isSourceRoute } from "../src/routes/source";
import { isWhopWebhookRoute } from "../src/routes/webhook-whop";

describe("locked V0 Worker route surface", () => {
  it("matches every required route without widening methods", () => {
    expect(isSourceRoute("POST", "/source")).toBe(true);
    expect(isOpportunityRoute("POST", "/opportunity")).toBe(true);
    expect(isPackageRoute("POST", "/package")).toBe(true);
    expect(isReceiptCreateRoute("POST", "/receipt")).toBe(true);
    expect(receiptIdFromRoute("GET", "/receipt/rcpt_12345678")).toBe("rcpt_12345678");
    expect(receiptIdFromRoute("GET", "/api/clout/receipts/rcpt_12345678")).toBe("rcpt_12345678");
    expect(opportunityHashFromShareRoute("GET", "/share/CC-DRK-123ABCD")).toBe("CC-DRK-123ABCD");
    expect(isInternalApproveRoute("POST", "/internal/approve")).toBe(true);
    expect(isWhopWebhookRoute("POST", "/webhooks/whop")).toBe(true);
    expect(isSourceRoute("GET", "/source")).toBe(false);
    expect(receiptIdFromRoute("POST", "/receipt/rcpt_12345678")).toBeNull();
  });

  it("locks the exact queue and object-key contracts", () => {
    expect(CLOUT_QUEUE_NAMES).toEqual([
      "clout-ingest-q",
      "clout-classify-q",
      "clout-score-q",
      "clout-compile-q",
      "clout-receipt-q",
      "clout-notify-q",
      "clout-deadletter-q",
    ]);
    expect(r2Keys.source("CC-DRK-123ABCD", "src_1234")).toBe(
      "sources/CC-DRK-123ABCD/src_1234/source.mp4",
    );
    expect(r2Keys.package("CC-DRK-123ABCD", "pkg_1234")).toBe(
      "packages/CC-DRK-123ABCD/pkg_1234.json",
    );
    expect(r2Keys.receipt("CC-DRK-123ABCD", "rcpt_1234")).toBe(
      "receipts/public/CC-DRK-123ABCD/rcpt_1234.json",
    );
    expect(r2Keys.share("CC-DRK-123ABCD")).toBe("share/CC-DRK-123ABCD.json");
  });
});
