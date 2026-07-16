import Link from "next/link";

export function CTASection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`clout-cta ${compact ? "is-compact" : ""}`}>
      <div>
        <span className="eyebrow">Your niche / your source</span>
        <h2>Want a pack like this for your niche?</h2>
        <p>Send one public source. Get an opportunity ID, content package, export notes, and a source-safe receipt.</p>
      </div>
      <Link className="button button-primary" href="/sample">Get my free opportunity sample</Link>
    </section>
  );
}
