import { BriefcaseBusiness, MessageSquareText, Radar, ScrollText } from "lucide-react";

export const prime88SurfaceCards = [
  { title: "Clout Chaser", body: "Attention intelligence for creators and short-form teams.", Icon: Radar },
  { title: "CRM", body: "Pipeline, follow-up, campaign tracking, and lead state.", Icon: BriefcaseBusiness },
  { title: "Contact Flow", body: "AI-assisted intake, qualification, routing, booking, and follow-up.", Icon: MessageSquareText },
  { title: "Receipts", body: "Source-backed proof for output chains.", Icon: ScrollText },
] as const;

export const PRIME88_SURFACES_COPY = {
  eyebrow: "Prime 88 operating surfaces",
  title: "Operating surfaces launched from Prime 88.",
  body: "Prime 88 builds public-facing operating surfaces that turn signals, leads, content, and client work into trackable systems.",
  cta: "Open Clout Chaser pilot",
} as const;

export function Prime88Surfaces() {
  return (
    <section className="prime88-surfaces-block">
      <div className="section-heading-row compact-heading-row">
        <div>
          <span className="eyebrow">{PRIME88_SURFACES_COPY.eyebrow}</span>
          <h2>{PRIME88_SURFACES_COPY.title}</h2>
        </div>
        <p>{PRIME88_SURFACES_COPY.body}</p>
      </div>
      <div className="surface-card-grid">
        {prime88SurfaceCards.map(({ title, body, Icon }) => (
          <article key={title}>
            <Icon className="surface-icon" aria-hidden="true" />
            <span className="panel-index">CURRENT SURFACE</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <a className="button button-primary" href="https://clout.prime88.studio">{PRIME88_SURFACES_COPY.cta}</a>
    </section>
  );
}
