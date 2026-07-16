import type { PublicReceipt } from "@/lib/clout/types";

export function ReceiptPanel({ receipt }: { receipt: PublicReceipt }) {
  return (
    <aside className="source-receipt-panel">
      <span className="panel-index">SOURCE RECEIPT</span>
      <h2>Source-backed. Time-stamped. Public-safe.</h2>
      <dl>
        <div><dt>Opportunity ID</dt><dd>{receipt.oppHash}</dd></div>
        <div><dt>Receipt ID</dt><dd>{receipt.receiptId}</dd></div>
        <div><dt>Visibility</dt><dd>Public preview</dd></div>
      </dl>
    </aside>
  );
}
