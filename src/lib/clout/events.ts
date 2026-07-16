"use client";

import {
  CLOUT_EVENT_NAMES,
  type CloutEventEnvelope,
  type CloutEventName,
  type CloutEventProperties,
} from "./types";

type PostHogLike = {
  capture: (name: string, properties?: Record<string, unknown>) => void;
};

type AnalyticsWindow = typeof window & {
  __cloutPostHog?: PostHogLike;
  __cloutPostHogQueue?: CloutEventEnvelope[];
};

const ALLOWED_PROPERTY_KEYS = [
  "opp_hash",
  "ccid",
  "receipt_id",
  "source_type",
  "niche",
  "platform",
  "language",
  "persona",
  "score_band",
  "saturation_state",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "ref",
  "crm_trial_eligible",
  "authenticated",
  "company_id",
  "offer_id",
  "experiment_variant",
] as const satisfies readonly (keyof CloutEventProperties)[];

export function safeEventValue(value: string | boolean | undefined) {
  if (typeof value === "boolean" || value === undefined) return value;
  const trimmed = value.trim().slice(0, 160);
  if (
    /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(trimmed) ||
    /(?:\+?\d[\s().-]*){8,}/.test(trimmed) ||
    /\b(?:sk-|ghp_|xoxb-|bearer\s|token[=:])/i.test(trimmed) ||
    /(?:https?:\/\/|www\.)/i.test(trimmed)
  ) {
    return "[redacted]";
  }
  return trimmed || undefined;
}

export function sanitizeCloutEventProperties(properties: CloutEventProperties) {
  const output: CloutEventProperties = {};
  for (const key of ALLOWED_PROPERTY_KEYS) {
    const value = safeEventValue(properties[key]);
    if (value !== undefined) Object.assign(output, { [key]: value });
  }
  return output;
}

function browserAttribution(): CloutEventProperties {
  if (typeof window === "undefined") return {};
  const query = new URLSearchParams(window.location.search);
  return {
    utm_source: query.get("utm_source") || undefined,
    utm_medium: query.get("utm_medium") || undefined,
    utm_campaign: query.get("utm_campaign") || undefined,
    utm_content: query.get("utm_content") || undefined,
    ref: query.get("ref") || undefined,
  };
}

function firstPartyEventEndpoint() {
  const base = process.env.NEXT_PUBLIC_CLOUT_API_BASE_URL?.trim().replace(/\/+$/, "");
  return base ? `${base}/api/clout/events` : null;
}

function eventId() {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? `evt_${crypto.randomUUID()}`
    : `evt_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

export function buildCloutEventEnvelope(
  name: CloutEventName,
  properties: CloutEventProperties = {},
  receipt: { event_id?: string; occurred_at?: string } = {},
): CloutEventEnvelope {
  return {
    name,
    properties: sanitizeCloutEventProperties(properties),
    event_id: receipt.event_id || eventId(),
    occurred_at: receipt.occurred_at || new Date().toISOString(),
  };
}

function postFirstPartyEvent(envelope: CloutEventEnvelope) {
  const url = firstPartyEventEndpoint();
  if (!url || !CLOUT_EVENT_NAMES.includes(envelope.name)) return;
  void fetch(url, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(envelope),
    keepalive: true,
  }).catch(() => undefined);
}

function capturePostHog(envelope: CloutEventEnvelope) {
  const analyticsWindow = window as AnalyticsWindow;
  if (analyticsWindow.__cloutPostHog) {
    analyticsWindow.__cloutPostHog.capture(envelope.name, {
      ...envelope.properties,
      $insert_id: envelope.event_id,
    });
    return;
  }
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim()) {
    analyticsWindow.__cloutPostHogQueue = [
      ...(analyticsWindow.__cloutPostHogQueue || []).slice(-24),
      envelope,
    ];
  }
}

export function trackCloutEvent(
  name: CloutEventName,
  properties: CloutEventProperties = {},
) {
  if (typeof window === "undefined" || !CLOUT_EVENT_NAMES.includes(name)) return;
  const envelope = buildCloutEventEnvelope(name, { ...browserAttribution(), ...properties });
  capturePostHog(envelope);
  postFirstPartyEvent(envelope);
  document.documentElement.dataset.cloutAnalyticsEvent = envelope.name;
  document.documentElement.dataset.cloutAnalyticsReceipt = envelope.event_id;
  window.dispatchEvent(new CustomEvent("prime88:clout-event", { detail: envelope }));
}

export { CloutEvents } from "./types";
