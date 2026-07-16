import type { Metadata } from "next";
import Link from "next/link";
import { SampleForm } from "@/components/clout/SampleForm";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

export const metadata: Metadata = {
  title: "Free opportunity sample",
  description:
    "Send one public source and request one free Clout Chaser opportunity sample.",
};

export default function SamplePage() {
  assertPublicRouteSafe("/sample", {
    metadata,
    copy: [
      "One source / one free sample",
      "Get a free opportunity sample.",
      "Paste a link, upload a source, or describe the niche you’re chasing. We’ll package the signal into a usable content opportunity.",
      "Your sample is reviewed before any public package appears. No auto-posting. No silent publishing. No unsupported claims.",
      "See the seeded receipt",
    ],
  });
  return (
    <main className="subpage-main">
      <section className="subpage-hero section-shell compact-hero">
        <div>
          <span className="eyebrow">One source / one free sample</span>
          <h1>Get a free opportunity sample.</h1>
          <p className="hero-lead">Paste a link, upload a source, or describe the niche you’re chasing. We’ll package the signal into a usable content opportunity.</p>
        </div>
        <div className="subpage-aside">
          <p>
            Your sample is reviewed before any public package appears. No
            auto-posting. No silent publishing. No unsupported claims.
          </p>
          <Link className="text-link" href="/r/CC-DRK-ICE-FLOOD">See the seeded receipt →</Link>
        </div>
      </section>
      <section className="section-shell sample-page-form">
        <SampleForm />
      </section>
    </main>
  );
}
