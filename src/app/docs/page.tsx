import type { Metadata } from "next";
import Link from "next/link";
import { ContentGrid, PublicPageHero } from "@/components/content-shell";
import { docsPages } from "@/lib/clout/public-content";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Clout Chaser workflow, scores, receipts, sources, rights, and user guides.",
};

export default function DocsPage() {
  const cards = Object.entries(docsPages).map(([slug, page], index) => ({
    eyebrow: `DOC ${String(index + 1).padStart(2, "0")}`,
    title: page.title,
    body: page.description,
    href: `/docs/${slug}`,
    linkLabel: "Read guide",
  }));
  assertPublicRouteSafe("/docs", {
    metadata,
    hero: [
      "Clout Chaser documentation",
      "Understand the package before you use it.",
      "Learn how opportunities are created, what receipts contain, how scores should be interpreted, and how to use packages responsibly.",
      "Documentation explains public behavior and user responsibilities. It does not publish private scoring weights, protected source sets, or internal infrastructure.",
    ],
    cards,
  });

  return (
    <main className="subpage-main">
      <PublicPageHero
        eyebrow="Clout Chaser documentation"
        title="Understand the package before you use it."
        lead="Learn how opportunities are created, what receipts contain, how scores should be interpreted, and how to use packages responsibly."
        aside="Documentation explains public behavior and user responsibilities. It does not publish private scoring weights, protected source sets, or internal infrastructure."
      >
        <Link className="button button-primary" href="/docs/how-it-works">Start with the workflow</Link>
        <Link className="button button-secondary" href="/sample">Request a sample</Link>
      </PublicPageHero>
      <section className="section-shell content-section">
        <ContentGrid cards={cards} />
      </section>
    </main>
  );
}
