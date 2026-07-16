"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { trackCloutEvent } from "@/lib/clout/events";

export function ReceiptActions({
  oppHash,
  receiptId,
  compact = false,
}: {
  oppHash: string;
  receiptId: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    };
  }, []);

  async function copyReceipt() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      trackCloutEvent("cc_share_clicked", {
        opp_hash: oppHash,
        receipt_id: receiptId,
      });
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`receipt-actions ${compact ? "is-compact" : ""}`}>
      <Link
        className="button button-primary"
        href={`/sample?ref=${encodeURIComponent(oppHash)}`}
        onClick={() =>
          trackCloutEvent("cc_sample_cta_clicked", {
            opp_hash: oppHash,
            receipt_id: receiptId,
          })
        }
      >
        Get my free opportunity sample
      </Link>
      <button className="button button-secondary" type="button" onClick={copyReceipt}>
        {copied ? "Link copied" : "Copy receipt link"}
      </button>
      {!compact ? <Link className="button button-secondary" href="/early-access">Join early access</Link> : null}
      {!compact ? (
        <a className="button button-secondary" href="https://crm.prime88.studio/creator-trial">
          Turn this into a pipeline
        </a>
      ) : null}
    </div>
  );
}
