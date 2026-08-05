import Link from "next/link";
import type { SeedOpportunity } from "@/lib/clout/seed";

export function OpportunityCard({ opportunity }: { opportunity: SeedOpportunity }) {
  const receiptHref = `/r/${opportunity.oppHash}`;
  return (
    <article className="opportunity-card">
      <div className="opportunity-card-topline">
        <span className="hash-badge">{opportunity.oppHash}</span>
        {opportunity.region ? <span className="region-badge">{opportunity.region}</span> : null}
        <span className="lane-badge">{opportunity.lane}</span>
      </div>
      <h3>{opportunity.title}</h3>
      <div className="opportunity-score">
        <span>Opportunity Score</span>
        <strong>{opportunity.score} / {opportunity.recommendation}</strong>
      </div>
      <div className="opportunity-why">
        <small>Why now</small>
        <p>{opportunity.whyNow}</p>
      </div>
      <div className="platform-row" aria-label="Best platforms">
        {opportunity.platforms.map((platform) => <span key={platform}>{platform}</span>)}
      </div>
      <blockquote>{opportunity.hook}</blockquote>
      <div className="opportunity-actions">
        <Link className="button button-primary button-small" href={`${receiptHref}#package-output`}>Generate pack</Link>
        <Link className="button button-secondary button-small" href={receiptHref}>View receipt</Link>
        <Link className="button button-secondary button-small" href="/early-access">Save</Link>
      </div>
    </article>
  );
}
