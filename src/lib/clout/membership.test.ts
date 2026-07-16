import { describe, expect, it } from "vitest";
import { accessTypes, membershipColumns, membershipRows } from "./membership";

describe("Clout Chaser membership contract", () => {
  it("separates public, one-off, member, and internal operator access", () => {
    expect(accessTypes.map((item) => item.label)).toEqual(["Guest", "One-off", "Member", "Operator"]);
    expect(membershipColumns.map((column) => column.key)).toEqual([
      "guest",
      "sample",
      "proof",
      "creator",
      "clipper",
      "studio",
      "business",
    ]);
    expect(membershipColumns.map((column) => column.key)).not.toContain("operator");
  });

  it("defines every published access cell without implying lifetime access", () => {
    const keys = membershipColumns.map((column) => column.key);
    for (const row of membershipRows) {
      expect(Object.keys(row.values)).toEqual(keys);
    }
    expect(JSON.stringify(membershipRows).toLowerCase()).not.toContain("lifetime");
  });
});
