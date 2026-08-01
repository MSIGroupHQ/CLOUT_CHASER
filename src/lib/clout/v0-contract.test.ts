import { describe, expect, it } from "vitest";
import { CLOUT_PUBLIC_COPY } from "./copy";
import { createOpportunityHash } from "./hash";
import { docsPages, legalPages } from "./public-content";
import { publicizeEngineTerms, assertPublicPayloadSafe, assertPublicSafe } from "./sanitizer";
import { sampleRequestSchema } from "./schemas";
import { seedOpportunityToReceipt } from "./receipt";
import { seedOpportunities } from "./seed";

describe("Clout Chaser V0 public contract", () => {
  it("ships the locked Opportunity IDs", () => {
    expect(seedOpportunities.map((opportunity) => opportunity.oppHash)).toEqual(
      seedOpportunities.map((op) => op.oppHash)
    );
    expect(seedOpportunities.length).toBeGreaterThanOrEqual(4);
  });

  it("keeps public copy, docs, legal copy, and seeded receipts public-safe", () => {
    expect(() => assertPublicPayloadSafe(CLOUT_PUBLIC_COPY)).not.toThrow();
    expect(() => assertPublicPayloadSafe(docsPages)).not.toThrow();
    expect(() => assertPublicPayloadSafe(legalPages)).not.toThrow();
    for (const opportunity of seedOpportunities) {
      expect(() => assertPublicPayloadSafe(seedOpportunityToReceipt(opportunity))).not.toThrow();
    }
  });

  it("blocks internal terms and provides the public outcome mapping", () => {
    expect(() => assertPublicSafe("internal prompt details")).toThrow();
    expect(publicizeEngineTerms("PULSE / ATLAS / BBS")).toBe(
      "trend radar / audience map / source receipt",
    );
  });

  it("validates the exact sample request shape", () => {
    expect(sampleRequestSchema.safeParse({
      name: "Creator One",
      email: "creator@example.com",
      handle: "@creator",
      platform_target: "tiktok",
      creator_type: "creator",
      niche: "music commentary",
      source_url: "https://example.com/source",
      language_mode: "bilingual",
      goal: "Create an original thirty-second commentary post.",
    }).success).toBe(true);
  });

  it("creates a deterministic public ID without embedding source data", async () => {
    const input = {
      sourceUrl: "https://example.com/source?private=email@example.com",
      niche: "Drake commentary",
      platform: "tiktok",
      languageMode: "english",
      packageType: "sample",
      dateBucket: "2026-07-16",
    };
    const first = await createOpportunityHash(input);
    const second = await createOpportunityHash(input);
    expect(first).toBe(second);
    expect(first).toMatch(/^CC-DRK-[A-F0-9]{7}$/u);
    expect(first).not.toContain("example");
    expect(first).not.toContain("email");
  });
});
