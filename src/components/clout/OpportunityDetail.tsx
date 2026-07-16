import type { PublicReceipt } from "@/lib/clout/types";

export function OpportunityDetail({ receipt }: { receipt: PublicReceipt }) {
  return (
    <section className="opportunity-detail">
      <article>
        <span className="panel-index">RECOMMENDED FORMATS</span>
        <ul className="content-list">
          {(receipt.recommendedFormats ?? ["30-second commentary", "short-form storyboard", "title / caption pack"]).map((format) => (
            <li key={format}>{format}</li>
          ))}
        </ul>
      </article>
      <article>
        <span className="panel-index">PACKAGE PREVIEW</span>
        <ul className="content-list">
          {receipt.packagePreview.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </article>
    </section>
  );
}
