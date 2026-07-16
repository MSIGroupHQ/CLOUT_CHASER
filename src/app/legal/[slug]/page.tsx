import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialSections, PublicPageHero } from "@/components/content-shell";
import { legalPages, type LegalSlug } from "@/lib/clout/public-content";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

type LegalPageProps = { params: Promise<{ slug: string }> };

function isLegalSlug(slug: string): slug is LegalSlug {
  return slug in legalPages;
}

export function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isLegalSlug(slug)) return {};
  return { title: legalPages[slug].title, description: legalPages[slug].description };
}

export default async function LegalDetailPage({ params }: LegalPageProps) {
  const { slug } = await params;
  if (!isLegalSlug(slug)) notFound();
  const page = legalPages[slug];
  assertPublicRouteSafe("/legal/[slug]", {
    page,
    aside: "Effective July 16, 2026. Publisher: Mediator Solutions LLC.",
  });

  return (
    <main className="subpage-main">
      <PublicPageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        aside="Effective July 16, 2026. Publisher: Mediator Solutions LLC."
      >
        <Link className="button button-secondary" href="/legal/privacy">Privacy</Link>
        <Link className="button button-secondary" href="/legal/source-policy">Source Policy</Link>
      </PublicPageHero>
      <section className="section-shell editorial-page">
        <EditorialSections sections={page.sections} />
      </section>
    </main>
  );
}
