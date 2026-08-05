import Link from "next/link";
import { CTASection } from "@/components/clout/CTASection";
import { Hero } from "@/components/clout/Hero";
import { GlobalFeed } from "@/components/clout/GlobalFeed";
import { SampleForm } from "@/components/clout/SampleForm";
import { TechInfrastructureFlex } from "@/components/clout/TechInfrastructureFlex";
import { PageEvent } from "@/components/page-event";
import { CLOUT_PUBLIC_COPY } from "@/lib/clout/copy";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";
import { seedOpportunities } from "@/lib/clout/seed";

const packageOutputs = [
  "Trend radar",
  "Audience map",
  "Opportunity score",
  "Content package",
  "Safety check",
  "Source receipt",
  "Export notes",
] as const;

const audiences = [
  { index: "01", title: "Creators", body: "Identify the angle before the format becomes saturated. Transform the signal into a publishable post with full source backing." },
  { index: "02", title: "Clippers", body: "Know what to cut, where the entry point is, how to frame it, and which export specifications matter for each platform." },
  { index: "03", title: "Fan pages", body: "Convert fandom signals into repeatable commentary without replicating the source material." },
  { index: "04", title: "Studios", body: "Organize viable opportunities across creators, clients, approvals, and campaigns at enterprise scale." },
  { index: "05", title: "Businesses", body: "Transform attention opportunities into campaigns, responses, leads, and follow-up pipelines." },
] as const;

export default function Home() {
  assertPublicRouteSafe("/", {
    hero: CLOUT_PUBLIC_COPY,
    packageOutputs,
    audiences,
    opportunities: seedOpportunities,
    copy: [
      "From source to publishable output",
      "What is moving. Why it matters. What to publish.",
      "Four packages you can inspect now.",
      "One signal. Five enterprise verticals.",
      "Convert repeat output into a working pipeline.",
      "Start the creator CRM trial",
    ],
  });
  return (
    <main>
      <PageEvent name="cc_landing_view" />
      <Hero />

      <section className="marquee-rail" aria-label="Clout Chaser outcome types">
        <div>
          {packageOutputs.map((output) => <span key={output}>{output}<i aria-hidden="true" /></span>)}
        </div>
      </section>

      <section className="section-shell split-section" id="how-it-works">
        <div className="section-intro sticky-intro">
          <span className="eyebrow">From source to publishable output</span>
          <h2>What is moving. Why it matters. What to publish.</h2>
          <p>Clout Chaser transforms a public signal into a bounded content opportunity with a source-safe cryptographic proof record.</p>
        </div>
        <div className="process-stack">
          {[
            ["01", "Submit a source", "Paste a public link, upload an owned clip, or describe the vertical you are targeting."],
            ["02", "Receive an Opportunity ID", "The request receives a stable public identifier. No private data is embedded in the ID."],
            ["03", "Receive a content package", "Includes the why-now market read, platform fit, hooks, captions, scripts, title options, and export specifications."],
            ["04", "Share the source receipt", "The public-safe receipt page displays the approved outcome. Private sources and operator notes remain private."],
          ].map(([index, title, body]) => (
            <article className="process-card" key={index}><span>{index}</span><div><h3>{title}</h3><p>{body}</p></div></article>
          ))}
        </div>
      </section>

      <GlobalFeed opportunities={seedOpportunities} />

      <section className="audience-section section-shell">
        <div className="section-heading-row">
          <div><span className="eyebrow">Built for motion</span><h2>One signal. Five enterprise verticals.</h2></div>
          <p>Clout Chaser packages the opportunity. You retain control of the source, voice, rights, and final publish decision.</p>
        </div>
        <div className="audience-grid">
          {audiences.map((audience) => (
            <article key={audience.title}><span>{audience.index}</span><h3>{audience.title}</h3><p>{audience.body}</p></article>
          ))}
        </div>
      </section>

      <section className="sample-section section-shell" id="sample"><SampleForm /></section>

      <section className="crm-bridge section-shell">
        <div><span className="eyebrow">Prime 88 operating surfaces</span><h2>Convert repeat output into a working pipeline.</h2></div>
        <div>
          <p>Identifying the opportunity is step one. Track campaigns, responses, leads, and follow-up across the Prime 88 CRM when the work becomes repeatable.</p>
          <div className="hero-actions">
            <a className="button button-secondary" href="https://crm.prime88.studio/creator-trial">Start the creator CRM trial</a>
            <Link className="text-link" href="/prime88-surfaces">View every Prime 88 surface →</Link>
          </div>
        </div>
      </section>

      <section className="section-shell final-clout-cta">
        <TechInfrastructureFlex />
        <CTASection />
      </section>
    </main>
  );
}
