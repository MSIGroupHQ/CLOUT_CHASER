import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/clout/CTASection";
import { OpportunityDetail } from "@/components/clout/OpportunityDetail";
import { PackagePreview } from "@/components/clout/PackagePreview";
import { ReceiptPanel } from "@/components/clout/ReceiptPanel";
import { RiskNote } from "@/components/clout/RiskNote";
import { SourceDrawer } from "@/components/clout/SourceDrawer";
import { PageEvent } from "@/components/page-event";
import { ReceiptActions } from "@/components/receipt-actions";
import { getPublicReceipt } from "@/lib/clout/public-receipt";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

type ReceiptPageProps = { params: Promise<{ oppHash: string }> };

export async function generateMetadata({ params }: ReceiptPageProps): Promise<Metadata> {
  const { oppHash } = await params;
  const lookup = await getPublicReceipt(oppHash);
  const receipt = lookup.receipt;
  if (!receipt) {
    const metadata = {
      title: `Opportunity ${oppHash.toUpperCase()}`,
      description: "Clout Chaser public-safe opportunity receipt.",
      robots: { index: false, follow: false } as const,
    };
    assertPublicRouteSafe("/r/[oppHash]:metadata", metadata);
    return metadata;
  }
  const metadata = {
    title: `Opportunity ${receipt.oppHash}`,
    description: `${receipt.title}. ${receipt.whyNow}`,
    openGraph: {
      title: `Opportunity ${receipt.oppHash}`,
      description: receipt.title,
      url: `/r/${receipt.oppHash}`,
      type: "article",
    },
  } as const;
  assertPublicRouteSafe("/r/[oppHash]:metadata", metadata);
  return metadata;
}

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  const { oppHash } = await params;
  const normalizedHash = oppHash.toUpperCase();
  const lookup = await getPublicReceipt(normalizedHash);

  if (!lookup.receipt) {
    const copy = lookup.state === "not_found"
      ? {
          eyebrow: "Receipt not found",
          heading: "No public-safe record matches this Opportunity ID.",
          body: "The opportunity may still be private, may not have passed review, or may not exist.",
        }
      : {
          eyebrow: "Receipt not public yet",
          heading: "This opportunity is still under review.",
          body: "Clout Chaser will not display an unverified package as though it were an approved public record.",
        };
    assertPublicRouteSafe("/r/[oppHash]", {
      oppHash: normalizedHash,
      copy,
      actions: ["Get my free opportunity sample", "View the seeded receipt"],
    });
    return (
      <main className="subpage-main receipt-page">
        <section className="receipt-unavailable section-shell">
          <span className="eyebrow">{copy.eyebrow}</span>
          <span className="hash-badge">Opportunity ID: {normalizedHash}</span>
          <h1>{copy.heading}</h1>
          <p>{copy.body}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/sample">Get my free opportunity sample</Link>
            <Link className="button button-secondary" href="/r/CC-DRK-ICE-FLOOD">View the seeded receipt</Link>
          </div>
        </section>
      </main>
    );
  }

  const receipt = lookup.receipt;
  assertPublicRouteSafe("/r/[oppHash]", {
    receipt,
    copy: [
      "WHY NOW",
      "Want a pack like this for your niche?",
      "PACKAGE PREVIEW",
      "Seeded proof receipt — not a live market claim.",
      "Public trend evidence does not grant rights to reuse third-party clips, music, images, or logos.",
    ],
  });
  return (
    <main className="subpage-main receipt-page">
      <PageEvent
        name="cc_receipt_viewed"
        properties={{
          opp_hash: receipt.oppHash,
          receipt_id: receipt.receiptId,
          score_band: receipt.scoreBand,
          crm_trial_eligible: receipt.crmTrialEligible,
        }}
      />

      <section className="receipt-hero section-shell">
        <div className="receipt-hero-copy">
          <div className="receipt-badge-row">
            <span className="hash-badge">Opportunity ID: {receipt.oppHash}</span>
            <span className="lane-badge">{receipt.lane ?? "Public signal"}</span>
            <span className="score-badge">Score: {receipt.scoreBand ?? "Public-safe"}</span>
          </div>
          <h1>{receipt.title}</h1>
          <div className="receipt-why-block">
            <span className="panel-index">WHY NOW</span>
            <p>{receipt.whyNow}</p>
          </div>
          <p className="receipt-above-fold-cta">Want a pack like this for your niche?</p>
          <ReceiptActions oppHash={receipt.oppHash} receiptId={receipt.receiptId} compact />
        </div>
        <aside className="receipt-package-card">
          <span className="panel-index">PACKAGE PREVIEW</span>
          <ul>{receipt.packagePreview.map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="platform-row">{receipt.platforms.map((platform) => <span key={platform}>{platform}</span>)}</div>
        </aside>
      </section>

      {receipt.mode === "demo" ? (
        <section className="demo-disclosure section-shell" role="note">
          <b>Seeded proof receipt — not a live market claim.</b>
          <p>This V0 example proves the card, content package, safety note, and receipt/share loop. It does not guarantee performance or represent live measurement.</p>
        </section>
      ) : null}

      <div className="section-shell receipt-detail-shell">
        <OpportunityDetail receipt={receipt} />
        <PackagePreview receipt={receipt} />
        <section className="receipt-source-safety">
          <div>
            <span className="panel-index">SOURCE NOTE</span>
            <SourceDrawer sourceNote={receipt.sourceNote} />
          </div>
          <RiskNote>
            {receipt.riskNote} Public trend evidence does not grant rights to reuse third-party clips, music, images, or logos.
          </RiskNote>
        </section>
        <ReceiptPanel receipt={receipt} />
        <CTASection />
      </div>
    </main>
  );
}
