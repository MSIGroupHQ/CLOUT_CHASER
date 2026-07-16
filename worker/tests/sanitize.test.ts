import { describe, expect, it } from "vitest";
import { assertPublicPayloadSafe, assertPublicSafe, publicizeEngineTerms } from "../src/lib/sanitize";

describe("public payload sanitizer", () => {
  it("accepts public outcome language", () => {
    expect(assertPublicPayloadSafe({ label: "Opportunity score", receipt: "Source-backed" })).toBe(true);
  });

  it("rejects internal names and protected implementation language", () => {
    expect(() => assertPublicSafe("Private kernel output")).toThrow(/prohibited internal terms/u);
    expect(() => assertPublicPayloadSafe({ system: "AZARIA" })).toThrow(/prohibited internal terms/u);
  });

  it("maps supported internal adapter labels before public use", () => {
    expect(publicizeEngineTerms("PULSE ATLAS BASILISK MIDAS SOLERA BBS TRIDENT")).toBe(
      "trend radar audience map opportunity score content package safety check source receipt export queue",
    );
  });
});
