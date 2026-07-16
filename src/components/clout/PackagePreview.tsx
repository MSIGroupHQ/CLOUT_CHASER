import type { PublicReceipt } from "@/lib/clout/types";

function OutputList({ items }: { items?: readonly string[] }) {
  return items?.length ? (
    <ul className="package-output-list">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  ) : null;
}

export function PackagePreview({ receipt }: { receipt: PublicReceipt }) {
  return (
    <section className="package-output-grid" id="package-output" aria-labelledby="package-output-title">
      <div className="package-output-heading">
        <span className="eyebrow">Content package</span>
        <h2 id="package-output-title">Here is the post you can make.</h2>
        <p>Adapt every output to your own voice, verify the source, and use original or properly licensed media.</p>
      </div>
      <article className="package-output-feature">
        <span className="panel-index">HOOK</span>
        <p>{receipt.hook ?? receipt.title}</p>
      </article>
      <article className="package-output-feature package-script">
        <span className="panel-index">30-SECOND SCRIPT</span>
        <p>{receipt.script ?? "A reviewed script appears with the approved private package."}</p>
      </article>
      <article className="package-output-feature">
        <span className="panel-index">CAPTION</span>
        <p>{receipt.caption ?? receipt.whyNow}</p>
      </article>
      <article className="package-output-feature">
        <span className="panel-index">TITLE OPTIONS</span>
        <OutputList items={receipt.titleOptions} />
      </article>
      <article className="package-output-feature">
        <span className="panel-index">CAROUSEL OUTLINE</span>
        <OutputList items={receipt.carouselOutline} />
      </article>
      <article className="package-output-feature">
        <span className="panel-index">EXPORT NOTES</span>
        <OutputList items={receipt.exportSpecs} />
      </article>
    </section>
  );
}
