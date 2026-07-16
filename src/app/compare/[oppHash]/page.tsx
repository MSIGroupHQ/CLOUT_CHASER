import type { Metadata } from "next";
import Link from "next/link";
import { ContentGrid, ProductNotice, PublicPageHero } from "@/components/content-shell";
import { DEMO_OPPORTUNITY_HASH } from "@/lib/clout/demo";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

type ComparePageProps = { params: Promise<{ oppHash: string }> };

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { oppHash } = await params;
  const copy = {
    title: `Opportunity neighborhood ${oppHash.toUpperCase()}`,
    description: "Public-safe opportunity neighborhood snapshot.",
  };
  assertPublicRouteSafe("/compare/[oppHash]:metadata", copy);
  return copy;
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { oppHash } = await params;
  const normalizedHash = oppHash.trim().toUpperCase();
  const isDemo = normalizedHash === DEMO_OPPORTUNITY_HASH;

  if (!isDemo) {
    assertPublicRouteSafe("/compare/[oppHash]", {
      oppHash: normalizedHash,
      copy: [
        "Opportunity neighborhood",
        "No public comparison is available.",
        `${normalizedHash} does not have an approved public neighborhood snapshot.`,
        "Private comparisons and operator notes are never used as an automatic public fallback.",
      ],
    });
    return (
      <main className="subpage-main">
        <PublicPageHero
          eyebrow="Opportunity neighborhood"
          title="No public comparison is available."
          lead={`${normalizedHash} does not have an approved public neighborhood snapshot.`}
          aside="Private comparisons and operator notes are never used as an automatic public fallback."
        >
          <Link className="button button-primary" href={`/sample?ref=${encodeURIComponent(normalizedHash)}`}>Generate a pack like this for my niche</Link>
          <Link className="button button-secondary" href="/opportunities">See public opportunities</Link>
        </PublicPageHero>
      </main>
    );
  }

  assertPublicRouteSafe("/compare/[oppHash]", {
    oppHash: normalizedHash,
    copy: [
      "Adjacent formats, without publishing private weights.",
      "This demonstration maps the public neighborhood around the example opportunity. It is an illustrative snapshot, not a live market measurement.",
      "Neighborhood labels help explain context. They do not expose the complete source set, operator notes, or scoring weights.",
      "Demonstration data only. No current saturation, demand, or performance result is asserted.",
    ],
  });

  return (
    <main className="subpage-main">
      <PublicPageHero
        eyebrow={`Opportunity neighborhood / ${normalizedHash}`}
        title="Adjacent formats, without publishing private weights."
        lead="This demonstration maps the public neighborhood around the example opportunity. It is an illustrative snapshot, not a live market measurement."
        aside="Neighborhood labels help explain context. They do not expose the complete source set, operator notes, or scoring weights."
      >
        <Link className="button button-primary" href={`/sample?ref=${normalizedHash}`}>Generate a pack like this for my niche</Link>
        <Link className="button button-secondary" href={`/r/${normalizedHash}`}>Open receipt</Link>
      </PublicPageHero>
      <section className="section-shell content-section">
        <ContentGrid
          cards={[
            { eyebrow: "ADJACENT 01", title: "Night-drive edits", body: "Visual identity built around motion, light, pace, and after-dark atmosphere." },
            { eyebrow: "ADJACENT 02", title: "Moto lifestyle clips", body: "Rider, machine, fashion, sound, and location cues packaged as repeatable short-form scenes." },
            { eyebrow: "ADJACENT 03", title: "Bilingual identity captions", body: "Language choice becomes part of the hook rather than a translation added after production." },
            { eyebrow: "ADJACENT 04", title: "Aspirational visual edits", body: "Luxury, speed, relationship, and self-image cues shaped into concise visual formats." },
          ]}
        />
        <div className="comparison-matrix" aria-label="Demonstration comparison ratings">
          {[
            ["Originality", "High"],
            ["Visual repeatability", "High"],
            ["English saturation", "Low"],
            ["Source availability", "Medium"],
            ["Rights complexity", "Medium"],
            ["Commercial fit", "Medium"],
          ].map(([label, value]) => (
            <div key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
        </div>
        <ProductNotice>
          <p>Demonstration data only. No current saturation, demand, or performance result is asserted.</p>
        </ProductNotice>
      </section>
    </main>
  );
}
