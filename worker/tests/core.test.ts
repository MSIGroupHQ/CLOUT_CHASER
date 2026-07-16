import { describe, expect, it } from "vitest";
import {
  InputValidationError,
  canonicalJson,
  createDeliveryToken,
  createOpportunityHash,
  deliveryTokenFromAuthorization,
  hashDeliveryToken,
  isDeliveryToken,
  isIngestQueueMessage,
  isOpportunityHash,
  sha256Hex,
  validateCloutAnalyticsEvent,
  validateCrmTrialRequest,
  validateIdempotencyKey,
  validateManualApproveInput,
  validateSourceSubmission,
} from "../src/core";

const validSubmission = {
  name_or_handle: "DM",
  email: "dm@example.com",
  platform: "tiktok",
  creator_type: "creator",
  niche: "Car culture",
  source_url: "https://example.com/public-source",
  language: "bilingual",
  intent: "Create a short-form opportunity package.",
} as const;

describe("source validation", () => {
  it("normalizes a valid public sample request", () => {
    const value = validateSourceSubmission({ ...validSubmission, email: " DM@EXAMPLE.COM " });
    expect(value.email).toBe("dm@example.com");
    expect(value.source_url).toBe("https://example.com/public-source");
  });

  it("accepts the public studio lane and MP4 intake shape", () => {
    const value = validateSourceSubmission({
      ...validSubmission,
      creator_type: "studio",
      source_type: "mp4",
      source_url: undefined,
    });
    expect(value.creator_type).toBe("studio");
    expect(value.source_type).toBe("mp4");
  });

  it("accepts the public other creator lane", () => {
    const value = validateSourceSubmission({
      ...validSubmission,
      creator_type: "other",
    });
    expect(value.creator_type).toBe("other");
  });

  it("rejects unknown fields and non-HTTPS source URLs", () => {
    expect(() =>
      validateSourceSubmission({ ...validSubmission, source_url: "http://example.com/source", engine: "MIDAS" }),
    ).toThrow(InputValidationError);
  });

  it("requires a bounded idempotency key", () => {
    expect(validateIdempotencyKey("cc:web:request-0001")).toBe("cc:web:request-0001");
    expect(() => validateIdempotencyKey("short")).toThrow(InputValidationError);
  });
});

describe("deterministic identifiers", () => {
  it("returns the same opportunity hash for the same normalized input and idempotency key", async () => {
    const submission = validateSourceSubmission(validSubmission);
    const input = {
      ...(submission.source_url === undefined ? {} : { sourceUrl: submission.source_url }),
      niche: submission.niche,
      platform: submission.platform,
      languageMode: submission.language,
      packageType: "sample",
      dateBucket: "2026-07-16",
    };
    const first = await createOpportunityHash(input);
    const second = await createOpportunityHash(input);
    expect(first).toBe(second);
    expect(first).toMatch(/^CC-MOTO-[0-9A-F]{7}$/u);
    expect(isOpportunityHash(first)).toBe(true);
    expect(isOpportunityHash("CC-DEMO-7QK2")).toBe(true);
  });

  it("canonicalizes object keys before hashing", async () => {
    const left = canonicalJson({ b: 2, a: 1 });
    const right = canonicalJson({ a: 1, b: 2 });
    expect(left).toBe(right);
    expect(await sha256Hex(left)).toHaveLength(64);
  });
});

describe("public receipt approval validation", () => {
  it("accepts only the bounded public-safe fields", () => {
    const result = validateManualApproveInput({
      package_id: "pkg_12345678",
      public_title: "Early public format",
      why_now: "This bounded explanation is approved for the public receipt.",
      platform_fit: ["TikTok", "Reels"],
      language_lane: "bilingual",
      source_notes: ["Public source note."],
      risk_notes: ["Review source rights before publishing."],
    });
    expect(result.platform_fit).toEqual(["TikTok", "Reels"]);
  });

  it("rejects internal fields from a public approval payload", () => {
    expect(() =>
      validateManualApproveInput({
        package_id: "pkg_12345678",
        public_title: "Early public format",
        why_now: "This bounded explanation is approved for the public receipt.",
        platform_fit: ["TikTok"],
        language_lane: "en",
        source_notes: ["Public source note."],
        risk_notes: ["Public risk note."],
        internal_score: 99,
      }),
    ).toThrow(InputValidationError);
  });
});

describe("analytics event contract", () => {
  it("accepts the canonical first-party payload", () => {
    const event = validateCloutAnalyticsEvent({
      name: "cc_landing_view",
      properties: { utm_source: "launch", authenticated: false },
      event_id: "browser-event-0001",
      occurred_at: "2026-07-16T00:00:00.000Z",
    });
    expect(event.name).toBe("cc_landing_view");
    expect(event.properties.authenticated).toBe(false);
  });

  it("accepts the bounded legacy event_type and path without promoting path to properties", () => {
    const event = validateCloutAnalyticsEvent({
      event_type: "cc_receipt_viewed",
      properties: { opp_hash: "CC-DEMO-7QK2" },
      occurred_at: "2026-07-16T00:00:00.000Z",
      path: "/r/CC-DEMO-7QK2",
    });
    expect(event.name).toBe("cc_receipt_viewed");
    expect(event.path).toBe("/r/CC-DEMO-7QK2");
    expect(event.properties).not.toHaveProperty("path");
  });

  it("rejects conflicting names, query-bearing paths, and unknown private properties", () => {
    expect(() =>
      validateCloutAnalyticsEvent({
        name: "cc_landing_view",
        event_type: "cc_receipt_viewed",
        properties: { private_score_weight: "never" },
        path: "/?secret=value",
      }),
    ).toThrow(InputValidationError);
  });
});

describe("private package delivery tokens", () => {
  it("creates a bounded random-token shape and stores only a stable hash", async () => {
    const token = createDeliveryToken(new Uint8Array(32).fill(7));
    expect(isDeliveryToken(token)).toBe(true);
    expect(token).toHaveLength(49);
    expect(await hashDeliveryToken(token)).toMatch(/^[0-9a-f]{64}$/u);
    expect(await hashDeliveryToken(token)).not.toContain(token);
  });

  it("accepts only the dedicated package bearer format", () => {
    const token = createDeliveryToken(new Uint8Array(32).fill(11));
    expect(deliveryTokenFromAuthorization(`Bearer ${token}`)).toBe(token);
    expect(deliveryTokenFromAuthorization("Bearer operator-secret")).toBeNull();
    expect(deliveryTokenFromAuthorization(`bearer ${token}`)).toBeNull();
    expect(deliveryTokenFromAuthorization(`Bearer ${token} extra`)).toBeNull();
  });
});

describe("workflow message validation", () => {
  const validMessage = {
    schema_version: "clout.ingest.v1",
    opportunity_id: "opp_0123456789abcdef01234567",
    opp_hash: "CC-MOTO-7QK2",
    requested_at: "2026-07-16T00:00:00.000Z",
  };

  it("accepts only the exact bounded ingest envelope", () => {
    expect(isIngestQueueMessage(validMessage)).toBe(true);
    expect(isIngestQueueMessage({ ...validMessage, engine: "private" })).toBe(false);
    expect(isIngestQueueMessage({ ...validMessage, requested_at: "not-a-date" })).toBe(false);
    expect(isIngestQueueMessage({ ...validMessage, opportunity_id: "opp_invalid" })).toBe(false);
  });
});

describe("CRM trial eligibility request validation", () => {
  it("accepts only a public opportunity hash and click/start action", () => {
    expect(validateCrmTrialRequest({ opp_hash: "cc-moto-7qk2", action: "clicked" })).toEqual({
      opp_hash: "CC-MOTO-7QK2",
      action: "clicked",
    });
    expect(() =>
      validateCrmTrialRequest({
        opp_hash: "CC-MOTO-7QK2",
        action: "started",
        email: "private@example.com",
      }),
    ).toThrow(InputValidationError);
  });
});
