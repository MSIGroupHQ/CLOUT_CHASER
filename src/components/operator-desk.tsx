"use client";

import { FormEvent, useState } from "react";
import {
  compileOperatorPackage,
  getOperatorQueue,
  issueOperatorReceipt,
  verifyOperatorToken,
} from "@/lib/clout/api";
import { trackCloutEvent } from "@/lib/clout/events";
import type { ManualPackageInput, OperatorOpportunity } from "@/lib/clout/types";

type AccessState =
  | { phase: "locked" | "verifying" }
  | { phase: "denied"; message: string }
  | { phase: "unlocked"; operator: string };

type QueueState =
  | { phase: "idle" | "loading" }
  | { phase: "error"; message: string }
  | { phase: "ready"; opportunities: OperatorOpportunity[] };

type WorkState = {
  phase: "idle" | "compiling" | "compiled" | "issuing" | "issued" | "error";
  packageId?: string;
  receiptId?: string;
  publicUrl?: string;
  privatePackageUrl?: string;
  deliveryExpiresAt?: string;
  message?: string;
};

function field(form: FormData, key: string) {
  return String(form.get(key) || "").trim();
}

function lines(form: FormData, key: string) {
  return field(form, key).split(/\r?\n/u).map((item) => item.trim()).filter(Boolean);
}

function timestamp(value?: string | null) {
  if (!value) return "Not recorded";
  try { return new Date(value).toLocaleString(); } catch { return value; }
}

export function OperatorDesk() {
  const [token, setToken] = useState("");
  const [access, setAccess] = useState<AccessState>({ phase: "locked" });
  const [queue, setQueue] = useState<QueueState>({ phase: "idle" });
  const [selected, setSelected] = useState<OperatorOpportunity>();
  const [work, setWork] = useState<WorkState>({ phase: "idle" });
  const [oppHash, setOppHash] = useState("");
  const [copiedDelivery, setCopiedDelivery] = useState(false);

  async function loadQueue(candidate = token) {
    setQueue({ phase: "loading" });
    const result = await getOperatorQueue(candidate);
    if (!result.ok) {
      setQueue({ phase: "error", message: result.message });
      return;
    }
    setQueue({ phase: "ready", opportunities: result.data });
    setSelected((current) => result.data.find((item) => item.id === current?.id) ?? result.data[0]);
  }

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const candidate = token.trim();
    if (!candidate) {
      setAccess({ phase: "denied", message: "An operator token is required." });
      return;
    }

    setAccess({ phase: "verifying" });
    const result = await verifyOperatorToken(candidate);
    if (!result.ok || result.data.authorized !== true) {
      setAccess({
        phase: "denied",
        message: result.ok ? "Authorization was not confirmed." : result.message,
      });
      return;
    }

    setAccess({ phase: "unlocked", operator: result.data.operator || "Authorized operator" });
    await loadQueue(candidate);
  }

  async function compile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (access.phase !== "unlocked") return;

    const form = new FormData(event.currentTarget);
    const normalizedHash = field(form, "oppHash").toUpperCase();
    const packageType = field(form, "packageType") || "creator";
    const packageInput: ManualPackageInput = {
      title: field(form, "title"),
      why_now: field(form, "whyNow"),
      hooks: lines(form, "hooks"),
      captions: lines(form, "captions"),
      short_scripts: lines(form, "shortScripts"),
      clip_targets: lines(form, "clipTargets"),
      export_specs: lines(form, "exportSpecs"),
      bilingual_variants: lines(form, "bilingualVariants"),
      source_notes: lines(form, "sourceNotes"),
      risk_notes: lines(form, "riskNotes"),
      next_action: field(form, "nextAction"),
    };
    setOppHash(normalizedHash);
    setWork({ phase: "compiling" });
    trackCloutEvent("cc_package_compile_started", { opp_hash: normalizedHash });

    const result = await compileOperatorPackage(token, {
      opp_hash: normalizedHash,
      package_type: packageType,
      package: packageInput,
    });
    if (!result.ok || !result.data.package_id) {
      setWork({ phase: "error", message: result.ok ? "No package record was returned." : result.message });
      return;
    }

    trackCloutEvent("cc_package_compiled", { opp_hash: normalizedHash });
    setWork({ phase: "compiled", packageId: result.data.package_id });
    void loadQueue();
  }

  async function issueReceipt() {
    if (access.phase !== "unlocked" || !work.packageId || !oppHash) return;
    setWork({ phase: "issuing", packageId: work.packageId });

    const result = await issueOperatorReceipt(token, { opp_hash: oppHash, package_id: work.packageId });
    if (!result.ok || !result.data.receipt_id) {
      setWork({ phase: "error", packageId: work.packageId, message: result.ok ? "No receipt record was returned." : result.message });
      return;
    }

    trackCloutEvent("cc_receipt_created", { opp_hash: oppHash, receipt_id: result.data.receipt_id });
    const privatePackageUrl = result.data.private_package_url && result.data.delivery_token
      ? `${result.data.private_package_url}?token=${encodeURIComponent(result.data.delivery_token)}`
      : undefined;
    setWork({
      phase: "issued",
      packageId: work.packageId,
      receiptId: result.data.receipt_id,
      publicUrl: result.data.public_url,
      privatePackageUrl,
      deliveryExpiresAt: result.data.delivery_token_expires_at,
    });
    void loadQueue();
  }

  async function copyPrivateDelivery() {
    if (!work.privatePackageUrl) return;
    try {
      await navigator.clipboard.writeText(work.privatePackageUrl);
      setCopiedDelivery(true);
      window.setTimeout(() => setCopiedDelivery(false), 1800);
    } catch {
      setCopiedDelivery(false);
    }
  }

  if (access.phase !== "unlocked") {
    return (
      <section className="operator-gate">
        <div className="operator-gate-copy">
          <span className="eyebrow">Restricted surface</span>
          <h1>Clout Desk</h1>
          <p>Manual package compilation and receipt issuance are available only to an authenticated Prime 88 operator.</p>
        </div>
        <form className="operator-token-form" onSubmit={unlock}>
          <label>
            <span>Operator token</span>
            <input type="password" value={token} onChange={(event) => setToken(event.target.value)} autoComplete="current-password" spellCheck={false} required />
          </label>
          <button className="button button-primary button-wide" type="submit" disabled={access.phase === "verifying"}>
            {access.phase === "verifying" ? "Verifying…" : "Verify access"}
          </button>
          {access.phase === "denied" ? <p className="gate-error" role="alert">{access.message}</p> : null}
          <small>The token is held only in this browser tab. It is not logged, persisted, or included in analytics.</small>
        </form>
      </section>
    );
  }

  return (
    <section className="desk-shell">
      <header className="desk-header">
        <div><span className="eyebrow">Restricted surface</span><h1>Clout Desk</h1></div>
        <div className="operator-identity"><i aria-hidden="true" />{access.operator}</div>
      </header>

      <div className="operator-state-rail" aria-label="Operator workflow states">
        {["new", "classified", "scored", "packaged", "receipt_created", "published", "held"].map((state) => (
          <span key={state}>{state.replaceAll("_", " ")}</span>
        ))}
      </div>

      <section className="operator-queue-panel" aria-labelledby="queue-heading">
        <div className="desk-section-heading">
          <div><span className="panel-index">01 / QUEUE</span><h2 id="queue-heading">Operator review queue</h2></div>
          <button className="button button-secondary button-small" type="button" onClick={() => loadQueue()} disabled={queue.phase === "loading"}>Refresh queue</button>
        </div>
        {queue.phase === "loading" || queue.phase === "idle" ? <p className="empty-desk-state">Loading verified queue records…</p> : null}
        {queue.phase === "error" ? <p className="gate-error" role="alert">{queue.message}</p> : null}
        {queue.phase === "ready" && queue.opportunities.length === 0 ? <p className="empty-desk-state">No opportunities are waiting in the current queue.</p> : null}
        {queue.phase === "ready" && queue.opportunities.length ? (
          <div className="operator-queue-list">
            {queue.opportunities.map((opportunity) => (
              <button
                className={`operator-queue-card ${selected?.id === opportunity.id ? "is-selected" : ""}`}
                type="button"
                key={opportunity.id}
                onClick={() => { setSelected(opportunity); setWork({ phase: "idle" }); }}
              >
                <span className="hash-badge">{opportunity.opp_hash}</span>
                <strong>{opportunity.title}</strong>
                <small>{opportunity.status.replaceAll("_", " ")} · {opportunity.platform} · {timestamp(opportunity.created_at)}</small>
              </button>
            ))}
          </div>
        ) : null}
      </section>

      <div className="desk-grid operator-work-grid">
        <form className="desk-panel structured-package-editor" onSubmit={compile} key={selected?.id || "manual"}>
          <span className="panel-index">02 / COMPILE</span>
          <h2>Build the manual package</h2>
          <p className="desk-helper">One line becomes one list item. Required fields are marked; nothing is published until receipt approval.</p>
          <div className="editor-grid two-columns">
            <label><span>Opportunity hash *</span><input name="oppHash" defaultValue={selected?.opp_hash || ""} placeholder="CC-XXXX-0000" required /></label>
            <label><span>Package type *</span><select name="packageType" defaultValue="creator"><option value="creator">Creator Talk Package</option><option value="clipper">Clipper Cut Package</option><option value="business">Business Post Package</option><option value="owned_brand">Owned Brand Package</option></select></label>
          </div>
          <label><span>Package title *</span><input name="title" defaultValue={selected?.title || ""} required minLength={3} maxLength={160} /></label>
          <label><span>Why now *</span><textarea name="whyNow" rows={4} required minLength={10} placeholder="Explain the observable timing, fit, and limits." /></label>
          <div className="editor-grid two-columns">
            <label><span>Hooks * — one per line</span><textarea name="hooks" rows={7} required /></label>
            <label><span>Captions * — one per line</span><textarea name="captions" rows={7} required /></label>
            <label><span>Short scripts — one per line</span><textarea name="shortScripts" rows={7} /></label>
            <label><span>Clip targets — one per line</span><textarea name="clipTargets" rows={7} /></label>
            <label><span>Export specs * — one per line</span><textarea name="exportSpecs" rows={6} required placeholder="1080×1920; 15–25 seconds; burned captions…" /></label>
            <label><span>Bilingual variants — one per line</span><textarea name="bilingualVariants" rows={6} /></label>
            <label><span>Source notes * — one per line</span><textarea name="sourceNotes" rows={6} required placeholder={selected?.source_url ? `Review source: ${selected.source_url}` : "Record safe source context."} /></label>
            <label><span>Risk notes * — one per line</span><textarea name="riskNotes" rows={6} required placeholder="Rights, claims, attribution, timing, or platform risks." /></label>
          </div>
          <label><span>Recommended next action *</span><textarea name="nextAction" rows={3} required minLength={3} /></label>
          <button className="button button-primary button-wide" type="submit" disabled={work.phase === "compiling" || work.phase === "issuing"}>{work.phase === "compiling" ? "Compiling…" : "Compile package"}</button>
        </form>

        <section className="desk-panel receipt-issue-panel">
          <span className="panel-index">03 / RECEIPT</span>
          <h2>Issue the public-safe record</h2>
          {work.packageId ? (
            <dl className="desk-record">
              <div><dt>Opportunity</dt><dd>{oppHash}</dd></div>
              <div><dt>Package</dt><dd>{work.packageId}</dd></div>
              <div><dt>Status</dt><dd>{work.phase}</dd></div>
              {work.receiptId ? <div><dt>Receipt</dt><dd>{work.receiptId}</dd></div> : null}
              {work.deliveryExpiresAt ? <div><dt>Private delivery expires</dt><dd>{timestamp(work.deliveryExpiresAt)}</dd></div> : null}
            </dl>
          ) : <p className="empty-desk-state">A verified package must exist before a receipt can be issued.</p>}
          <button className="button button-secondary button-wide" type="button" onClick={issueReceipt} disabled={!work.packageId || !["compiled", "error"].includes(work.phase)}>{work.phase === "issuing" ? "Issuing…" : "Issue receipt"}</button>
          {work.phase === "issued" ? (
            <div className="delivery-actions">
              <p className="desk-success">Receipt issued.</p>
              {work.publicUrl ? <a className="text-link" href={work.publicUrl}>Open public receipt →</a> : null}
              {work.privatePackageUrl ? <button className="button button-secondary button-small" type="button" onClick={copyPrivateDelivery}>{copiedDelivery ? "Private link copied" : "Copy private delivery link"}</button> : null}
            </div>
          ) : null}
          {work.phase === "error" ? <p className="gate-error">{work.message}</p> : null}
        </section>
      </div>
    </section>
  );
}
