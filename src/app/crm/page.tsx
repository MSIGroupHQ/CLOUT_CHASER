import type { Metadata } from "next";
import Link from "next/link";
import { OperationsTrialCta } from "@/components/crm-trial-cta";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

export const metadata: Metadata = {
  title: "Turn outputs into a pipeline",
  description:
    "Move Clout Chaser opportunities, leads, replies, campaigns, and follow-ups into Prime 88 Operations Studio.",
};

export default function OperationsStudioPage() {
  assertPublicRouteSafe("/crm", {
    metadata,
    copy: [
      "Prime 88 Operations Studio",
      "Turn your Clout Chaser outputs into a pipeline.",
      "Finding the opportunity is step one. Managing the follow-up is where money gets made.",
      "Track content opportunities, leads, replies, campaigns, and follow-ups in one company workspace.",
      "Create another sample",
    ],
    pipeline: [
      ["Opportunity", "Source-backed output"],
      ["Campaign", "Ownership and schedule"],
      ["Response", "Replies and leads"],
      ["Follow-up", "Next action recorded"],
    ],
  });
  return (
    <main className="subpage-main">
      <section className="crm-page section-shell">
        <div className="crm-page-copy">
          <span className="eyebrow">Prime 88 Operations Studio</span>
          <h1>Turn your Clout Chaser outputs into a pipeline.</h1>
          <p className="hero-lead">
            Finding the opportunity is step one. Managing the follow-up is where
            money gets made.
          </p>
          <p>
            Track content opportunities, leads, replies, campaigns, and follow-ups
            in one company workspace.
          </p>
          <div className="hero-actions">
            <OperationsTrialCta className="button button-primary" />
            <Link className="button button-secondary" href="/sample">Create another sample</Link>
          </div>
        </div>
        <div className="pipeline-visual" aria-label="Content opportunity pipeline">
          {[
            ["01", "Opportunity", "Source-backed output"],
            ["02", "Campaign", "Ownership and schedule"],
            ["03", "Response", "Replies and leads"],
            ["04", "Follow-up", "Next action recorded"],
          ].map(([index, title, subtitle]) => (
            <div key={index}>
              <span>{index}</span><b>{title}</b><small>{subtitle}</small>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
