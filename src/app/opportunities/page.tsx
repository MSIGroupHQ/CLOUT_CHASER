import type { Metadata } from "next";
import Link from "next/link";
import { OpportunityCard } from "@/components/clout/OpportunityCard";
import { ProductNotice, PublicPageHero } from "@/components/content-shell";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";
import { seedOpportunities } from "@/lib/clout/seed";

export const metadata: Metadata = {
  title: "Public opportunities",
  description: "Four seeded Clout Chaser opportunity cards with public-safe package receipts.",
};

export default function OpportunitiesPage() {
  assertPublicRouteSafe("/opportunities", {
    metadata,
    hero: [
      "Seed proof gallery",
      "Four opportunities. Four content packages. Four source receipts.",
      "These static V0 examples show what is moving, why it matters, what to publish, and how the source-safe receipt works.",
      "Seeded examples prove the product surface. They are not live market measurements and do not guarantee performance.",
    ],
    opportunities: seedOpportunities,
    notice: "Clout Chaser does not guarantee virality. Opportunity scores indicate timing and fit, not guaranteed performance.",
  });
  return (
    <main className="subpage-main">
      <PublicPageHero
        eyebrow="Seed proof gallery"
        title="Four opportunities. Four content packages. Four source receipts."
        lead="These static V0 examples show what is moving, why it matters, what to publish, and how the source-safe receipt works."
        aside="Seeded examples prove the product surface. They are not live market measurements and do not guarantee performance."
      >
        <Link className="button button-primary" href="/sample">Get my free opportunity sample</Link>
        <Link className="button button-secondary" href="/docs/receipts">How receipts work</Link>
      </PublicPageHero>

      <section className="section-shell content-section">
        <div className="opportunity-card-grid">
          {seedOpportunities.map((opportunity) => <OpportunityCard key={opportunity.oppHash} opportunity={opportunity} />)}
        </div>
        <ProductNotice>
          <p>Clout Chaser does not guarantee virality. Opportunity scores indicate timing and fit, not guaranteed performance.</p>
        </ProductNotice>
      </section>
    </main>
  );
}
