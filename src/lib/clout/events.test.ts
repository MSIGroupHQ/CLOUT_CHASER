import { describe, expect, it } from "vitest";
import { buildCloutEventEnvelope, sanitizeCloutEventProperties } from "./events";

describe("Clout analytics envelope", () => {
  it("uses the exact first-party event contract", () => {
    const envelope = buildCloutEventEnvelope(
      "cc_receipt_viewed",
      { opp_hash: "CC-DEMO-7QK2", authenticated: false },
      { event_id: "evt_test_123", occurred_at: "2026-07-16T00:00:00.000Z" },
    );

    expect(Object.keys(envelope)).toEqual(["name", "properties", "event_id", "occurred_at"]);
    expect(envelope).toEqual({
      name: "cc_receipt_viewed",
      properties: { opp_hash: "CC-DEMO-7QK2", authenticated: false },
      event_id: "evt_test_123",
      occurred_at: "2026-07-16T00:00:00.000Z",
    });
  });

  it("drops unknown properties and redacts PII, tokens, and URLs", () => {
    const input = {
      niche: "person@example.com",
      ref: "https://example.com/?token=secret",
      utm_campaign: "launch",
      company_id: "company_123",
      unexpected: "must not pass",
    } as Parameters<typeof sanitizeCloutEventProperties>[0] & { unexpected: string };

    expect(sanitizeCloutEventProperties(input)).toEqual({
      niche: "[redacted]",
      utm_campaign: "launch",
      ref: "[redacted]",
      company_id: "company_123",
    });
  });
});
