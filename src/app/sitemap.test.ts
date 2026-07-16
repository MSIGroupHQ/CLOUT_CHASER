import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("public sitemap", () => {
  it("omits the retired status surface", () => {
    const source = readFileSync(new URL("./sitemap.ts", import.meta.url), "utf8");
    expect(source).not.toContain("${root}/status");
    expect(source).toContain("${root}/pricing");
  });

  it("includes all four seeded receipt routes", () => {
    const sitemapSource = readFileSync(new URL("./sitemap.ts", import.meta.url), "utf8");
    const seedSource = readFileSync(new URL("../lib/clout/seed.ts", import.meta.url), "utf8");
    expect(sitemapSource).toContain("seedOpportunities.map");
    expect(seedSource).toContain("CC-DRK-ICE-FLOOD");
    expect(seedSource).toContain("CC-DRK-CENCH-ICEBRIDGE");
    expect(seedSource).toContain("CC-ICE-BIGGUY-OK");
    expect(seedSource).toContain("CC-CENCH-LUXNOIR");
  });
});
