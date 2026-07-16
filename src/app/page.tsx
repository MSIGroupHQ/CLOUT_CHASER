import Link from "next/link";
import { CTASection } from "@/components/clout/CTASection";
import { Hero } from "@/components/clout/Hero";
import { OpportunityCard } from "@/components/clout/OpportunityCard";
import { SampleForm } from "@/components/clout/SampleForm";
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
  { index: "01", title: "Creators", body: "Find the angle before the format becomes tired, then turn the signal into a post you can actually make." },
  { index: "02", title: "Clippers", body: "Know what to cut, where to start, how to frame it, and which export notes matter." },
  { index: "03", title: "Fan pages", body: "Turn fandom signals into repeatable commentary without copying the source blindly." },
  { index: "04", title: "Studios", body: "Organize useful opportunities across creators, clients, approvals, and campaigns." },
  { index: "05", title: "Businesses", body: "Turn attention opportunities into campaigns, replies, leads, and follow-up." },
] as const;

export default function Home() {
  assertPublicRouteSafe("/", {
    hero: CLOUT_PUBLIC_COPY,
    packageOutputs,
    audiences,
    opportunities: seedOpportunities,
    copy: [
      "From source to usable post",
      "What is moving. Why it matters. What to publish.",
      "Four packages you can inspect now.",
      "One signal. Five useful lanes.",
      "Turn repeat output into a working pipeline.",
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
          <span className="eyebrow">From source to usable post</span>
          <h2>What is moving. Why it matters. What to publish.</h2>
          <p>Clout Chaser turns a public signal into a clear, bounded content opportunity with a source-safe proof record.</p>
        </div>
        <div className="process-stack">
          {[
            ["01", "Send a source", "Paste a public link, upload an owned clip, or describe the niche you are chasing."],
            ["02", "Get an Opportunity ID", "The request receives a stable public identifier without placing private data in the ID."],
            ["03", "Receive a content package", "Get the why-now read, platform fit, hooks, captions, scripts, title options, and export notes."],
            ["04", "Share the source receipt", "The public-safe page shows the approved outcome while private sources and operator notes stay private."],
          ].map(([index, title, body]) => (
            <article className="process-card" key={index}><span>{index}</span><div><h3>{title}</h3><p>{body}</p></div></article>
          ))}
        </div>
      </section>

      <section className="section-shell seed-opportunities-section" id="opportunities">
        <div className="section-heading-row">
          <div><span className="eyebrow">Seed proof rail</span><h2>Four packages you can inspect now.</h2></div>
          <p>Static V0 examples prove the opportunity card, package output, safety note, and receipt/share loop without pretending external data is live.</p>
        </div>
        <div className="opportunity-card-grid">
          {seedOpportunities.map((opportunity) => <OpportunityCard key={opportunity.oppHash} opportunity={opportunity} />)}
        </div>
      </section>

      <section className="audience-section section-shell">
        <div className="section-heading-row">
          <div><span className="eyebrow">Built for motion</span><h2>One signal. Five useful lanes.</h2></div>
          <p>Clout Chaser packages the opportunity. You keep control of the source, voice, rights, and final publish decision.</p>
        </div>
        <div className="audience-grid">
          {audiences.map((audience) => (
            <article key={audience.title}><span>{audience.index}</span><h3>{audience.title}</h3><p>{audience.body}</p></article>
          ))}
        </div>
      </section>

      <section className="sample-section section-shell" id="sample"><SampleForm /></section>

      <section className="crm-bridge section-shell">
        <div><span className="eyebrow">Prime 88 operating surfaces</span><h2>Turn repeat output into a working pipeline.</h2></div>
        <div>
          <p>Finding the opportunity is step one. Track campaigns, replies, leads, and follow-up in Prime 88 CRM when the work becomes repeatable.</p>
          <div className="hero-actions">
            <a className="button button-secondary" href="https://crm.prime88.studio/creator-trial">Start the creator CRM trial</a>
            <Link className="text-link" href="/prime88-surfaces">See every Prime 88 surface →</Link>
          </div>
        </div>
      </section>

      <section className="section-shell final-clout-cta"><CTASection /></section>
    </main>
  );
}
