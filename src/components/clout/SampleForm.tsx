"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { hasCloutApi, submitSampleRequest } from "@/lib/clout/api";
import { trackCloutEvent } from "@/lib/clout/events";
import { createOpportunityHash } from "@/lib/clout/hash";
import { sampleRequestFromFormData } from "@/lib/clout/schemas";
import type { SampleRequest, SampleSubmission, SourceType } from "@/lib/clout/types";

type FormState =
  | { phase: "idle" | "submitting" }
  | { phase: "success"; submission: SampleSubmission; local: boolean }
  | { phase: "error"; message: string; fields?: Record<string, string> };

function firstFieldErrors(error: { flatten: () => { fieldErrors: Record<string, string[] | undefined> } }) {
  const errors: Record<string, string> = {};
  for (const [key, messages] of Object.entries(error.flatten().fieldErrors)) {
    if (messages?.[0]) errors[key] = messages[0];
  }
  return errors;
}

export function SampleForm() {
  const [state, setState] = useState<FormState>({ phase: "idle" });
  const [sourceFile, setSourceFile] = useState<File>();
  const apiConnected = hasCloutApi();

  async function localSubmission(request: SampleRequest) {
    const oppHash = await createOpportunityHash({
      sourceUrl: request.sourceUrl,
      niche: request.niche,
      platform: request.platform,
      languageMode: request.language,
      packageType: "sample",
    });
    return {
      request_id: `local_${oppHash}`,
      ccid: oppHash,
      opp_hash: oppHash,
      status: "queued_for_review",
    } satisfies SampleSubmission;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const parsed = sampleRequestFromFormData(form);
    if (!parsed.success) {
      setState({
        phase: "error",
        message: "Check the highlighted fields and try again.",
        fields: firstFieldErrors(parsed.error),
      });
      return;
    }

    const values = parsed.data;
    const sourceType: SourceType = sourceFile
      ? "mp4"
      : values.source_url
        ? "url"
        : "description";
    const request: SampleRequest = {
      name: values.name,
      email: values.email,
      handle: values.handle,
      platform: values.platform_target,
      creatorType: values.creator_type,
      niche: values.niche,
      sourceUrl: values.source_url,
      language: values.language_mode,
      intent: values.goal,
      sourceType,
    };
    const analytics = {
      source_type: sourceType,
      niche: request.niche,
      platform: request.platform,
      language: request.language,
      persona: request.creatorType,
    };

    trackCloutEvent("cc_sample_requested", analytics);
    setState({ phase: "submitting" });

    const result = await submitSampleRequest(request, sourceFile);
    const useLocal = !result.ok && ["not_configured", "network"].includes(result.kind);
    if (!result.ok && !useLocal) {
      setState({ phase: "error", message: result.message });
      return;
    }

    const submission = result.ok ? result.data : await localSubmission(request);
    trackCloutEvent("cc_source_submitted", {
      ...analytics,
      ccid: submission.ccid,
      opp_hash: submission.opp_hash,
    });
    if (submission.opp_hash) {
      trackCloutEvent("cc_opportunity_created", {
        ...analytics,
        ccid: submission.ccid,
        opp_hash: submission.opp_hash,
      });
    }
    setState({ phase: "success", submission, local: useLocal });
    formElement.reset();
    setSourceFile(undefined);
  }

  const fields = state.phase === "error" ? state.fields : undefined;
  return (
    <div className="intake-shell">
      <form className="sample-form" onSubmit={onSubmit} noValidate>
        <div className="form-heading">
          <span className="eyebrow">One source / one free sample</span>
          <h2>Get a free opportunity sample.</h2>
          <p>Paste a link, upload a source, or describe the niche you’re chasing. We’ll package the signal into a usable content opportunity.</p>
        </div>

        <div className="form-grid two-columns">
          <label>
            <span>Name</span>
            <input name="name" autoComplete="name" aria-invalid={Boolean(fields?.name)} aria-describedby={fields?.name ? "name-error" : undefined} />
            {fields?.name ? <small className="field-error" id="name-error">{fields.name}</small> : null}
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" aria-invalid={Boolean(fields?.email)} aria-describedby={fields?.email ? "email-error" : undefined} />
            {fields?.email ? <small className="field-error" id="email-error">{fields.email}</small> : null}
          </label>
        </div>

        <label>
          <span>Handle</span>
          <input name="handle" autoComplete="nickname" placeholder="@yourhandle" />
        </label>

        <div className="form-grid two-columns">
          <label>
            <span>Platform target</span>
            <select name="platform_target" defaultValue="tiktok">
              <option value="tiktok">TikTok</option>
              <option value="reels">Reels</option>
              <option value="shorts">Shorts</option>
              <option value="x">X</option>
              <option value="youtube">YouTube</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            <span>Creator type</span>
            <select name="creator_type" defaultValue="creator">
              <option value="clipper">Clipper</option>
              <option value="creator">Creator</option>
              <option value="fan_page">Fan page</option>
              <option value="business">Business</option>
              <option value="agency">Agency</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="form-grid two-columns">
          <label>
            <span>Niche</span>
            <input name="niche" placeholder="Music, cars, beauty, sports…" aria-invalid={Boolean(fields?.niche)} aria-describedby={fields?.niche ? "niche-error" : undefined} />
            {fields?.niche ? <small className="field-error" id="niche-error">{fields.niche}</small> : null}
          </label>
          <label>
            <span>Language mode</span>
            <select name="language_mode" defaultValue="english">
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="bilingual">Bilingual</option>
            </select>
          </label>
        </div>

        <label>
          <span>Source URL</span>
          <input name="source_url" type="url" inputMode="url" placeholder="https://" aria-invalid={Boolean(fields?.source_url)} aria-describedby={fields?.source_url ? "source-url-error" : undefined} />
          {fields?.source_url ? <small className="field-error" id="source-url-error">{fields.source_url}</small> : <small>Public source only. Leave blank if you are describing a niche.</small>}
        </label>

        <label className="file-input">
          <span>Upload source</span>
          <input name="source_file" type="file" accept="video/mp4" onChange={(event) => setSourceFile(event.target.files?.[0])} />
          <small>{sourceFile ? sourceFile.name : "Optional MP4 attachment"}</small>
        </label>

        <label>
          <span>What are you trying to make?</span>
          <textarea name="goal" rows={5} placeholder="Tell us what you want to publish, who it is for, and the useful result you need." aria-invalid={Boolean(fields?.goal)} aria-describedby={fields?.goal ? "goal-error" : undefined} />
          {fields?.goal ? <small className="field-error" id="goal-error">{fields.goal}</small> : null}
        </label>

        {state.phase === "error" ? <p className="gate-error" role="alert">{state.message}</p> : null}
        <div className="form-submit-row">
          <button className="button button-primary button-wide" type="submit" disabled={state.phase === "submitting"}>
            {state.phase === "submitting" ? "Creating opportunity…" : "Generate my sample"}
          </button>
          <span className={`connection-state ${apiConnected ? "is-live" : ""}`}>
            <i aria-hidden="true" />
            {apiConnected ? "Live intake connected" : "Local proof mode"}
          </span>
        </div>
      </form>

      <aside className="intake-output" aria-live="polite">
        {state.phase === "idle" || state.phase === "submitting" || state.phase === "error" ? (
          <>
            <span className="eyebrow">What comes back</span>
            <ol className="output-list">
              <li><b>01</b><span>Opportunity ID</span></li>
              <li><b>02</b><span>Why-now summary</span></li>
              <li><b>03</b><span>Platform fit</span></li>
              <li><b>04</b><span>Hooks / captions / scripts</span></li>
              <li><b>05</b><span>Export notes</span></li>
              <li><b>06</b><span>Source-safe receipt</span></li>
            </ol>
          </>
        ) : null}

        {state.phase === "success" ? (
          <div className="form-notice is-success">
            <span className="eyebrow">Source received</span>
            <h3>{state.submission.opp_hash}</h3>
            <p>Thanks. Your source is in the queue.</p>
            <p>We’ll return an opportunity sample with an opportunity ID, why-now summary, platform fit, hooks, captions, scripts, and a source-safe receipt.</p>
            {state.local ? <p className="local-proof-note">This local proof created the Opportunity ID without sending your source anywhere.</p> : null}
            {state.submission.public_url ? (
              <a className="text-link" href={state.submission.public_url}>Open receipt →</a>
            ) : (
              <Link className="text-link" href="/r/CC-DRK-ICE-FLOOD">See the seeded receipt format →</Link>
            )}
          </div>
        ) : null}
      </aside>
    </div>
  );
}
