import { describe, expect, it } from "vitest";
import { competitorReview, competitorRows } from "./competitive-position";

describe("public competitor comparison", () => {
  it("keeps one Clout Chaser launch row and official vendor sources", () => {
    expect(competitorRows.filter((row) => row.isClout)).toHaveLength(1);
    expect(competitorRows.filter((row) => !row.isClout).every((row) => row.href.startsWith("https://"))).toBe(true);
  });

  it("carries a dated, non-exclusive evidence caveat", () => {
    expect(competitorReview.checkedAt).toBe("July 16, 2026");
    expect(competitorReview.note).toContain("Not documented");
    expect(JSON.stringify(competitorRows).toLowerCase()).not.toContain("only platform");
  });
});
