import { afterEach, describe, expect, it, vi } from "vitest";
import { getPrivatePackage, recordCrmTrialIntent, submitSampleRequest } from "./api";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("private package delivery", () => {
  it("keeps the delivery token out of the URL and sends it as Bearer authorization", async () => {
    vi.stubEnv("NEXT_PUBLIC_CLOUT_API_BASE_URL", "https://api.clout.test");
    const fetchMock = vi.fn<typeof fetch>(async () => new Response(JSON.stringify({
      package_id: "pkg_12345678",
      opp_hash: "CC-DEMO-7QK2",
      status: "PRIVATE_READY",
      package: {
        title: "Authorized package",
        why_now: "The package has enough verified context for authorized review.",
        hooks: ["Hook one"],
        captions: ["Caption one"],
        short_scripts: [],
        clip_targets: [],
        export_specs: ["1080×1920"],
        bilingual_variants: [],
        source_notes: ["Private source note"],
        risk_notes: ["Verify rights"],
        next_action: "Review before publishing",
      },
    }), { status: 200, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await getPrivatePackage("pkg_12345678", "delivery-secret");
    expect(result.ok).toBe(true);
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(String(url)).toBe("https://api.clout.test/api/clout/packages/pkg_12345678");
    expect(String(url)).not.toContain("delivery-secret");
    expect((init as RequestInit).headers).toMatchObject({ Authorization: "Bearer delivery-secret" });
  });
});

describe("sample intake transport", () => {
  const sample = {
    name: "DM",
    email: "dm@example.com",
    handle: "@dm",
    platform: "tiktok" as const,
    creatorType: "other" as const,
    niche: "Car culture",
    sourceUrl: "https://example.com/source",
    language: "english" as const,
    intent: "Create a rights-safe short-form commentary package.",
    sourceType: "url" as const,
  };

  it("uses bounded JSON when no file is attached", async () => {
    vi.stubEnv("NEXT_PUBLIC_CLOUT_API_BASE_URL", "https://api.clout.test");
    const fetchMock = vi.fn<typeof fetch>(async () => new Response(JSON.stringify({
      request_id: "src_12345678",
      opp_hash: "CC-MOTO-1234567",
    }), { status: 202, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitSampleRequest(sample);
    expect(result.ok).toBe(true);
    const [, init] = fetchMock.mock.calls[0]!;
    expect((init as RequestInit).headers).toMatchObject({ "Content-Type": "application/json" });
    expect(JSON.parse(String((init as RequestInit).body))).toMatchObject({ creatorType: "other" });
  });
});

describe("Operations Studio trial receipt", () => {
  it("sends the locked action shape with an idempotency key", async () => {
    vi.stubEnv("NEXT_PUBLIC_CLOUT_API_BASE_URL", "https://api.clout.test");
    const fetchMock = vi.fn<typeof fetch>(async () => new Response(JSON.stringify({ accepted: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));
    vi.stubGlobal("fetch", fetchMock);

    await recordCrmTrialIntent({ opp_hash: "CC-DEMO-7QK2", action: "clicked" });
    const [url, init] = fetchMock.mock.calls[0]!;
    const headers = (init as RequestInit).headers as Record<string, string>;
    expect(String(url)).toBe("https://api.clout.test/api/clout/crm-trial");
    expect(JSON.parse(String((init as RequestInit).body))).toEqual({
      opp_hash: "CC-DEMO-7QK2",
      action: "clicked",
    });
    expect(headers["Idempotency-Key"]).toMatch(/^crm:clicked:/u);
  });
});
