import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialSections, ProductNotice, PublicPageHero } from "@/components/content-shell";
import { docsPages, type DocsSlug } from "@/lib/clout/public-content";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

type DocsPageProps = { params: Promise<{ slug: string }> };

function isDocsSlug(slug: string): slug is DocsSlug {
  return slug in docsPages;
}

export function generateStaticParams() {
  return Object.keys(docsPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isDocsSlug(slug)) return {};
  return { title: docsPages[slug].title, description: docsPages[slug].description };
}

export default async function DocsDetailPage({ params }: DocsPageProps) {
  const { slug } = await params;
  if (!isDocsSlug(slug)) notFound();
  const page = docsPages[slug];
  assertPublicRouteSafe("/docs/[slug]", {
    page,
    notice: "Clout Chaser does not grant source rights or guarantee performance. Verify sources, claims, permissions, and platform rules before publishing.",
  });

  return (
    <main className="subpage-main">
      <PublicPageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead}>
        <Link className="button button-secondary" href="/docs">All documentation</Link>
      </PublicPageHero>
      <section className="section-shell editorial-page">
        <EditorialSections sections={page.sections} />
        <ProductNotice>
          <p>Clout Chaser does not grant source rights or guarantee performance. Verify sources, claims, permissions, and platform rules before publishing.</p>
        </ProductNotice>
      </section>
    </main>
  );
}
