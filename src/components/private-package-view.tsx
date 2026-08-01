import Link from "next/link";
import { PackageFeedback } from "@/components/package-feedback";
import { ArcadeCountdown } from "@/components/clout/ArcadeCountdown";
import type { ApiResult, PrivatePackage } from "@/lib/clout/types";

function PackageList({ items, empty }: { items: readonly string[]; empty: string }) {
  return items.length ? (
    <ol className="package-output-list">
      {items.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}
    </ol>
  ) : <p className="empty-desk-state">{empty}</p>;
}

export function PrivatePackageView({
  packageId,
  result,
}: {
  packageId: string;
  result: ApiResult<PrivatePackage>;
}) {
  if (!result.ok) {
    const phase = result.kind === "unauthorized" || result.kind === "not_found" ? "closed" : "error";
    return (
      <section className="private-package-state section-shell" data-package-state={phase}>
        <span className="eyebrow">Private package / access closed</span>
        <span className="hash-badge">{packageId}</span>
        <h1>Package unavailable.</h1>
        <p>{result.message}</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/contact?lane=package-access">Request delivery help</Link>
          <Link className="button button-secondary" href="/sample">Request a new sample</Link>
        </div>
      </section>
    );
  }

  const record = result.data;
  const sections = [
    ["hooks", "Hooks"],
    ["captions", "Captions"],
    ["scripts", "Scripts"],
    ["clip-targets", "Clip targets"],
    ["export", "Export"],
    ["sources", "Sources"],
    ["receipt", "Receipt"],
    ["feedback", "Feedback"],
  ] as const;

  return (
    <div className="private-package" data-package-state="ready">
      <header className="package-header section-shell">
        <div>
          <span className="eyebrow">Authorized package delivery</span>
          <span className="hash-badge">{record.opportunityHash}</span>
          <h1>{record.title}</h1>
          <p className="hero-lead">{record.whyNow}</p>
        </div>
        <dl className="package-summary">
          <div><dt>Package</dt><dd>{record.packageId}</dd></div>
          <div><dt>Status</dt><dd>{record.status}</dd></div>
          <div><dt>Primary platform</dt><dd>{record.primaryPlatform || "Package-defined"}</dd></div>
          <div><dt>Language</dt><dd>{record.language || "Package-defined"}</dd></div>
        </dl>
      </header>

      <nav className="package-tabs section-shell" aria-label="Package sections">
        <a href="#overview">Overview</a>
        {sections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
      </nav>

      <div className="section-shell package-sections">
        <section className="package-section package-overview" id="overview">
          <span className="panel-index">OVERVIEW</span>
          <div>
            <h2>Recommended action</h2>
            <p className="package-action">{record.recommendedAction}</p>
            {record.contentType ? <p>Recommended content type: {record.contentType}</p> : null}
            {record.secondaryPlatforms.length ? <p>Secondary platforms: {record.secondaryPlatforms.join(" / ")}</p> : null}
            
            <ArcadeCountdown
              initialSeconds={15}
              title="DELIVERY ACCESS PREVIEW COUNTDOWN"
              ctaText="CLAIM ENTERPRISE LICENSE"
              ctaHref="/pricing"
            />
          </div>
        </section>
        <section className="package-section" id="hooks"><span className="panel-index">HOOKS</span><div><h2>Opening angles</h2><PackageList items={record.hooks} empty="No hooks were included in this package." /></div></section>
        <section className="package-section" id="captions"><span className="panel-index">CAPTIONS</span><div><h2>Caption options</h2><PackageList items={[...record.captions, ...record.bilingualVariants]} empty="No captions were included in this package." /></div></section>
        <section className="package-section" id="scripts"><span className="panel-index">SCRIPTS</span><div><h2>Short scripts</h2><PackageList items={record.scripts} empty="No scripts were included in this package." /></div></section>
        <section className="package-section" id="clip-targets"><span className="panel-index">CLIP TARGETS</span><div><h2>Cut guidance</h2><PackageList items={record.clipTargets} empty="No clip targets were included in this package." /></div></section>
        <section className="package-section" id="export"><span className="panel-index">EXPORT</span><div><h2>Export specifications</h2><PackageList items={record.exportSpecs} empty="No export specifications were included in this package." /></div></section>
        <section className="package-section" id="sources"><span className="panel-index">SOURCES</span><div><h2>Source and risk notes</h2><PackageList items={[...record.sourceNotes, ...record.riskNotes]} empty="No source notes were included." /></div></section>
        <section className="package-section" id="receipt">
          <span className="panel-index">RECEIPT</span>
          <div>
            <h2>Proof relationship</h2>
            {record.receiptId ? <p>Receipt: {record.receiptId}</p> : <p>The public receipt has not been issued or is not included in this delivery response.</p>}
            <p>Private package details do not appear on the public receipt.</p>
          </div>
        </section>
        <section className="package-section" id="feedback">
          <span className="panel-index">FEEDBACK</span>
          <div>
            <h2>Was this package useful?</h2>
            <PackageFeedback opportunityHash={record.opportunityHash} />
          </div>
        </section>
      </div>
    </div>
  );
}
