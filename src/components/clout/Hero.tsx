import Image from "next/image";
import Link from "next/link";
import { CLOUT_PUBLIC_COPY } from "@/lib/clout/copy";
import { seedOpportunities } from "@/lib/clout/seed";

const firstOpportunity = seedOpportunities[0];

export function Hero() {
  return (
    <section className="hero section-shell">
      <div className="hero-copy">
        <span className="eyebrow"><i aria-hidden="true" />Clout Chaser — Enterprise attention intelligence</span>
        <h1>{CLOUT_PUBLIC_COPY.headline}</h1>
        <p className="hero-lead">{CLOUT_PUBLIC_COPY.subhead}</p>
        <p className="hero-directive">{CLOUT_PUBLIC_COPY.directive}</p>
        <ul className="hero-deliverables" aria-label="Your complimentary opportunity package includes">
          <li>Unique opportunity ID</li>
          <li>Why-now market read</li>
          <li>Platform-fit analysis</li>
          <li>Hook, title, and caption options</li>
          <li>Export specifications</li>
          <li>Source-safe cryptographic receipt</li>
        </ul>
        <div className="hero-actions">
          <Link className="button button-primary" href="/sample">
            {CLOUT_PUBLIC_COPY.primaryCta}
          </Link>
          <Link className="button button-secondary" href={`/r/${firstOpportunity.oppHash}`}>
            {CLOUT_PUBLIC_COPY.secondaryCta}
          </Link>
        </div>
        <div className="trust-line">
          <span>{CLOUT_PUBLIC_COPY.pilot}</span>
          <span>{CLOUT_PUBLIC_COPY.receiptProof}</span>
        </div>
      </div>

      <div className="hero-instrument hero-mascot-stage" aria-label="Clout Chaser mascot and seeded opportunity card">
        <Image
          className="hero-mascot-image"
          src="/clout-chaser-mascot.png"
          alt="Clout Chaser rabbit mascot wearing sunglasses beside a red cup under blue and pink neon lights"
          fill
          priority
          sizes="(min-width: 1280px) 46vw, (min-width: 980px) 50vw, 100vw"
        />
        <span className="hero-mascot-scrim" aria-hidden="true" />
        <span className="hero-neon-grid" aria-hidden="true" />
        <div className="instrument-topline">
          <span>Trend radar / content package</span>
          <span className="live-marker"><i /> Seed proof rail</span>
        </div>
        <div className="instrument-record">
          <div>
            <span className="hash-label">{firstOpportunity.oppHash}</span>
            <h2>{firstOpportunity.title}</h2>
          </div>
          <div className="score-orbit">
            <strong>{firstOpportunity.score}</strong>
            <small>{firstOpportunity.recommendation}</small>
          </div>
        </div>
        <div className="instrument-meta">
          <span>{firstOpportunity.platforms.join(" / ")}</span>
          <span>{firstOpportunity.lane}</span>
          <Link href={`/r/${firstOpportunity.oppHash}`}>View receipt →</Link>
        </div>
      </div>
    </section>
  );
}
