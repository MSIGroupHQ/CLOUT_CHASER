import type { Metadata } from "next";
import Link from "next/link";
import { OpportunityCard } from "@/components/clout/OpportunityCard";
import { ProductNotice, PublicPageHero } from "@/components/content-shell";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";
import { seedOpportunities } from "@/lib/clout/seed";

export const metadata: Metadata = {
  title: "Public opportunities",
  description: "Four seeded Clout Chaser opportunity cards with source-backed content packages and cryptographic proof receipts.",
};

export default function OpportunitiesPage() {
  assertPublicRouteSafe("/opportunities", {
    metadata,
    hero: [
      "Proof of output",
      "Four opportunities. Four content packages. Four source receipts.",
      "Static V0 examples demonstrate what is moving, why it matters, what to publish, and how the source-safe receipt works.",
      "Seeded examples demonstrate the product surface. They are not live market measurements and do not constitute performance guarantees.",
    ],
    opportunities: seedOpportunities,
    notice: "Clout Chaser does not guarantee virality. Opportunity scores indicate timing and market fit, not guaranteed performance.",
  });
  return (
    <main className="subpage-main">
      <PublicPageHero
        eyebrow="Proof of output"
        title="Four opportunities. Four content packages. Four source receipts."
        lead="Static V0 examples demonstrate what is moving, why it matters, what to publish, and how the source-safe receipt works."
        aside="Seeded examples demonstrate the product surface. They are not live market measurements and do not constitute performance guarantees."
      >
        <Link className="button button-primary" href="/sample">Get my free opportunity sample</Link>
        <Link className="button button-secondary" href="/docs/receipts">How receipts work</Link>
      </PublicPageHero>

      <section className="section-shell content-section">
        <div className="opportunity-card-grid">
          {seedOpportunities.map((opportunity) => <OpportunityCard key={opportunity.oppHash} opportunity={opportunity} />)}
        </div>
        <ProductNotice>
          <p>Clout Chaser does not guarantee virality. Opportunity scores indicate timing and market fit, not guaranteed performance.</p>
        </ProductNotice>
      </section>
    </main>
  );
}
