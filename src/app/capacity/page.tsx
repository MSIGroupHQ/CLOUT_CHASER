import type { Metadata } from "next";
import Link from "next/link";
import { ContentGrid, PublicPageHero } from "@/components/content-shell";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

export const metadata: Metadata = {
  title: "Capacity",
  description: "Clout Chaser early-access and operator-review capacity.",
};

export default function CapacityPage() {
  assertPublicRouteSafe("/capacity", {
    metadata,
    hero: [
      "Pilot capacity",
      "Early access is intentionally limited.",
      "Clout Chaser begins with a semi-manual, operator-reviewed production process.",
      "Limited capacity protects sample quality, reveals where the workflow fails, and prevents the service from pretending to be more automated than it is.",
    ],
    cards: [
      "Limited weekly capacity",
      "Available by queue",
      "Invite and cohort based",
      "Limited managed capacity",
    ],
  });
  return (
    <main className="subpage-main">
      <PublicPageHero
        eyebrow="Pilot capacity"
        title="Early access is intentionally limited."
        lead="Clout Chaser begins with a semi-manual, operator-reviewed production process."
        aside="Limited capacity protects sample quality, reveals where the workflow fails, and prevents the service from pretending to be more automated than it is."
      >
        <Link className="button button-primary" href="/early-access">Request early access</Link>
        <Link className="button button-secondary" href="/sample">Request a free sample</Link>
      </PublicPageHero>
      <section className="section-shell content-section">
        <ContentGrid
          cards={[
            { eyebrow: "FREE SAMPLES", title: "Limited weekly capacity", body: "One-source sample reviews are accepted until the current operator queue reaches its safe limit." },
            { eyebrow: "PROOF PACKS", title: "Available by queue", body: "Expanded paid reviews are scheduled only when the team can complete and verify the package." },
            { eyebrow: "EARLY ACCESS", title: "Invite and cohort based", body: "Recurring access opens in small cohorts so feedback can be tied to the workflow version that produced it." },
            { eyebrow: "STUDIO SETUP", title: "Limited managed capacity", body: "Agency, studio, and business pipeline setups require a scoped Prime 88 review." },
          ]}
        />
      </section>
    </main>
  );
}
