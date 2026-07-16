import type { Metadata } from "next";
import Link from "next/link";
import { ContentGrid, PublicPageHero } from "@/components/content-shell";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

export const metadata: Metadata = {
  title: "Early access",
  description: "Request Clout Chaser early access for creators, clippers, fan pages, studios, and small content teams.",
};

export default function EarlyAccessPage() {
  assertPublicRouteSafe("/early-access", {
    metadata,
    hero: [
      "Clout Chaser early access",
      "Help shape the first useful version.",
      "We are opening the operator-reviewed pilot to creators, clippers, fan pages, studios, agencies, and small content teams.",
      "Access is cohort based. A request does not guarantee immediate admission, automation, posting, payouts, or a permanent workspace.",
    ],
    topics: [
      "Opportunity feeds",
      "Package formats",
      "Creator workflows",
      "Receipt pages",
      "Team collaboration",
      "Performance tracking",
    ],
  });
  return (
    <main className="subpage-main">
      <PublicPageHero
        eyebrow="Clout Chaser early access"
        title="Help shape the first useful version."
        lead="We are opening the operator-reviewed pilot to creators, clippers, fan pages, studios, agencies, and small content teams."
        aside="Access is cohort based. A request does not guarantee immediate admission, automation, posting, payouts, or a permanent workspace."
      >
        <Link className="button button-primary" href="/contact?lane=early-access">Request early access</Link>
        <Link className="button button-secondary" href="/capacity">See current capacity</Link>
      </PublicPageHero>
      <section className="section-shell content-section">
        <ContentGrid
          cards={[
            { eyebrow: "01", title: "Opportunity feeds", body: "Help determine which signal summaries are useful and which create noise." },
            { eyebrow: "02", title: "Package formats", body: "Shape hooks, scripts, captions, cut notes, exports, and bilingual variants around real production work." },
            { eyebrow: "03", title: "Creator workflows", body: "Test the path from source to review, package delivery, revision, and feedback." },
            { eyebrow: "04", title: "Receipt pages", body: "Improve what a public-safe receipt should prove, omit, and invite the next person to do." },
            { eyebrow: "05", title: "Team collaboration", body: "Define the approvals and client boundaries that studios and agencies actually need." },
            { eyebrow: "06", title: "Performance tracking", body: "Connect useful feedback to packages without turning early estimates into unsupported claims." },
          ]}
        />
      </section>
    </main>
  );
}
