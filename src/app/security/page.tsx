import type { Metadata } from "next";
import Link from "next/link";
import { ContentGrid, PublicPageHero } from "@/components/content-shell";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

export const metadata: Metadata = {
  title: "Security",
  description: "Clout Chaser source privacy, separation, storage, access, and security reporting.",
};

export default function SecurityPage() {
  assertPublicRouteSafe("/security", {
    metadata,
    hero: [
      "Security and source privacy",
      "Your source should not become everybody’s source.",
      "Raw uploads are private by default. Public receipt pages contain only sanitized summaries and approved preview material.",
      "Security is a boundary, not a marketing badge. Public pages, private packages, operator tools, and internal infrastructure remain separated.",
    ],
    controls: [
      "Private by default",
      "Different boundaries",
      "Bodies stay separate",
      "Authorized package delivery",
      "Protected context stays bounded",
      "Tell us safely",
    ],
  });
  return (
    <main className="subpage-main">
      <PublicPageHero
        eyebrow="Security and source privacy"
        title="Your source should not become everybody’s source."
        lead="Raw uploads are private by default. Public receipt pages contain only sanitized summaries and approved preview material."
        aside="Security is a boundary, not a marketing badge. Public pages, private packages, operator tools, and internal infrastructure remain separated."
      >
        <a className="button button-primary" href="mailto:security@mediatorsolutions.io">Report an issue</a>
        <Link className="button button-secondary" href="/legal/privacy">Read the privacy notice</Link>
      </PublicPageHero>
      <section className="section-shell content-section">
        <ContentGrid
          cards={[
            { eyebrow: "SOURCE PRIVACY", title: "Private by default", body: "Raw uploads and complete source sets are not published as part of a receipt." },
            { eyebrow: "SEPARATION", title: "Different boundaries", body: "Public pages, private packages, operator tools, and internal infrastructure use separate access paths." },
            { eyebrow: "STORAGE", title: "Bodies stay separate", body: "Uploads and generated artifacts are stored separately from sanitized public receipt data." },
            { eyebrow: "ACCESS", title: "Authorized package delivery", body: "Only authorized users and operators may retrieve private package material." },
            { eyebrow: "AI USE", title: "Protected context stays bounded", body: "Private internal systems and protected source material are not intentionally exposed through public model interfaces." },
            { eyebrow: "REPORTING", title: "Tell us safely", body: "Report security or privacy issues to security@mediatorsolutions.io. Do not include sensitive credentials or source files in the first message." },
          ]}
        />
      </section>
    </main>
  );
}
