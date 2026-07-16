import type { Metadata } from "next";
import Link from "next/link";
import { CompetitorMatrix } from "@/components/competitor-matrix";
import { ProductNotice, PublicPageHero } from "@/components/content-shell";
import { MembershipMatrix } from "@/components/membership-matrix";
import { competitorReview, competitorRows } from "@/lib/clout/competitive-position";
import { accessTypes, membershipColumns, membershipRows } from "@/lib/clout/membership";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Clout Chaser free sample and early-access candidate pricing.",
};

const plans = [
  { name: "Free sample", price: "$0", items: ["One source", "One opportunity review", "One short package preview", "One public-safe receipt", "Operator review"], cta: "Get a free sample", href: "/sample" },
  { name: "Proof pack", price: "US$49–US$99", items: ["Full opportunity analysis", "Expanded package", "Source notes", "Export specifications", "Private package view", "Public-safe receipt"], cta: "Request a proof pack", href: "/contact?lane=proof-pack" },
  { name: "Creator", price: "From US$29/month", items: ["Saved opportunities", "Recurring package credits", "Package history", "Exports", "Basic analytics"], cta: "Request early access", href: "/early-access" },
  { name: "Clipper", price: "From US$79/month", items: ["Source queue", "Clip targets", "Timestamp guidance", "Subtitle and export formats", "Advanced package outputs"], cta: "Request early access", href: "/early-access" },
  { name: "Studio", price: "From US$99–US$299/month", items: ["Shared workspace", "Multiple creators", "Campaigns", "Approvals", "Client folders", "Analytics"], cta: "Talk to Prime 88", href: "/contact?lane=studio" },
  { name: "Business", price: "Custom", items: ["Content pipeline", "Campaign and lead follow-up", "Operations Studio connection", "Managed setup", "Commercial implementation"], cta: "Build the business path", href: "/contact?lane=business" },
] as const;

export default function PricingPage() {
  assertPublicRouteSafe("/pricing", {
    metadata,
    plans,
    membership: { accessTypes, membershipColumns, membershipRows },
    competitors: { competitorReview, competitorRows },
    copy: [
      "Early-access pricing",
      "Start with one source. Expand only when the loop is useful.",
      "Here’s what you get when you sign up.",
      "Different tools solve different parts of the workflow.",
      "One source is enough to see whether the loop is useful.",
    ],
  });
  return (
    <main className="subpage-main">
      <PublicPageHero
        eyebrow="Early-access pricing"
        title="Start with one source. Expand only when the loop is useful."
        lead="The free sample is live scope. Paid plan figures are candidate early-access ranges until a checkout is intentionally opened."
        aside="No plan promises unlimited AI, media processing, messaging, storage, enrichment, or third-party provider usage."
      />
      <section className="section-shell content-section">
        <div className="pricing-card-grid">
          {plans.map((plan, index) => (
            <article className={`plan-card ${index === 0 ? "is-primary" : ""}`} key={plan.name}>
              <span className="panel-index">{String(index + 1).padStart(2, "0")}</span>
              <h2>{plan.name}</h2>
              <p className="plan-price">{plan.price}</p>
              <ul className="content-list">
                {plan.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <Link className={`button ${index === 0 ? "button-primary" : "button-secondary"}`} href={plan.href}>{plan.cta}</Link>
            </article>
          ))}
        </div>
        <ProductNotice>
          <p>Pricing may vary during early access. Third-party media, model, messaging, and storage costs may be metered separately.</p>
        </ProductNotice>
      </section>

      <section className="section-shell matrix-section" aria-labelledby="membership-heading">
        <div className="matrix-section-heading">
          <span className="eyebrow">Access and membership</span>
          <h2 id="membership-heading">Here&apos;s what you get when you sign up.</h2>
          <p>
            Guests can browse. Free samples and Proof Packs are one-off deliveries.
            Creator, Clipper, and Studio are the logged-in memberships. Business work
            routes into Prime 88. Operator access remains internal and is never sold as
            a public or lifetime Clout Chaser plan.
          </p>
        </div>
        <MembershipMatrix />
      </section>

      <section className="section-shell matrix-section competitor-section" aria-labelledby="competitor-heading">
        <div className="matrix-section-heading">
          <span className="eyebrow">Adjacent tools / public evidence</span>
          <h2 id="competitor-heading">Different tools solve different parts of the workflow.</h2>
          <p>
            Clout Chaser&apos;s launch scope is one bounded handoff: submit a source,
            receive an operator-reviewed opportunity package, and share a public-safe
            proof record. This table uses vendor-published pages rather than unsupported
            superiority claims.
          </p>
        </div>
        <CompetitorMatrix />
      </section>

      <section className="section-shell pricing-final-cta">
        <div>
          <span className="eyebrow">Start with proof</span>
          <h2>One source is enough to see whether the loop is useful.</h2>
        </div>
        <Link className="button button-primary" href="/sample">Get a free opportunity sample</Link>
      </section>
    </main>
  );
}
