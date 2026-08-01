import Link from "next/link";

export function CTASection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`clout-cta ${compact ? "is-compact" : ""}`}>
      <div>
        <span className="eyebrow">Your vertical / your source</span>
        <h2>Want a package like this for your vertical?</h2>
        <p>Submit one public source. Receive an opportunity ID, content package, export specifications, and a source-safe cryptographic receipt.</p>
      </div>
      <Link className="button button-primary" href="/sample">Get my free opportunity sample</Link>
    </section>
  );
}

