import type { Metadata } from "next";
import { ContentGrid, PublicPageHero } from "@/components/content-shell";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

export const metadata: Metadata = {
  title: "Contact and routing",
  description: "Route a Clout Chaser sample, proof pack, team, business, rights, or technical request.",
};

export default function ContactPage() {
  assertPublicRouteSafe("/contact", {
    metadata,
    hero: [
      "Contact and routing",
      "Tell us which lane you’re in.",
      "Choose the closest route. We will keep the request on the correct product surface.",
      "Do not include passwords, access tokens, private customer records, or sensitive source bodies in an initial contact request.",
    ],
    lanes: [
      "I want one opportunity review",
      "I need the expanded package",
      "I run creators or clients",
      "I need campaign follow-up",
      "I have a source question",
      "I found a technical or privacy issue",
    ],
  });
  return (
    <main className="subpage-main">
      <PublicPageHero
        eyebrow="Contact and routing"
        title="Tell us which lane you’re in."
        lead="Choose the closest route. We will keep the request on the correct product surface."
        aside="Do not include passwords, access tokens, private customer records, or sensitive source bodies in an initial contact request."
      />
      <section className="section-shell content-section">
        <ContentGrid
          cards={[
            { eyebrow: "FREE SAMPLE", title: "I want one opportunity review", body: "Send one public source, owned upload, or niche description.", href: "/sample", linkLabel: "Open sample intake" },
            { eyebrow: "PROOF PACK", title: "I need the expanded package", body: "Request full analysis, expanded outputs, source notes, export specifications, and a private package view.", href: "https://prime88.studio/contact?intent=clout-proof-pack", linkLabel: "Open Prime 88 contact" },
            { eyebrow: "TEAM / AGENCY", title: "I run creators or clients", body: "Describe the team size, client boundary, approval path, and package volume you need.", href: "/early-access", linkLabel: "Request early access" },
            { eyebrow: "BUSINESS PIPELINE", title: "I need campaign follow-up", body: "Route recurring content opportunities, replies, leads, and follow-up into Operations Studio.", href: "/crm", linkLabel: "See Operations Studio path" },
            { eyebrow: "RIGHTS / SOURCE", title: "I have a source question", body: "Review how ownership, licensing, permission, attribution, and removal work before submitting.", href: "/legal/source-policy", linkLabel: "Read the Source Policy" },
            { eyebrow: "TECHNICAL / SECURITY", title: "I found a technical or privacy issue", body: "Security and privacy reports go to security@mediatorsolutions.io. General product issues can use the Prime 88 contact route.", href: "/security", linkLabel: "Open security guidance" },
          ]}
        />
      </section>
    </main>
  );
}
