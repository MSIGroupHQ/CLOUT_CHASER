export async function createOpportunityHash(input: {
  sourceUrl?: string;
  niche?: string;
  platform?: string;
  languageMode?: string;
  packageType?: string;
  dateBucket?: string;
}) {
  const canonical = [
    input.sourceUrl ?? "",
    input.niche ?? "",
    input.platform ?? "",
    input.languageMode ?? "",
    input.packageType ?? "sample",
    input.dateBucket ?? new Date().toISOString().slice(0, 10),
  ]
    .map((value) => value.trim().toLowerCase())
    .join("|");

  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(canonical),
  );
  const bytes = Array.from(new Uint8Array(digest));
  const hex = bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const short = hex.slice(0, 7).toUpperCase();
  const niche = input.niche?.toLowerCase() ?? "";
  const prefix = niche.includes("drake")
    ? "DRK"
    : niche.includes("car")
      ? "MOTO"
      : niche.includes("ice")
        ? "ICE"
        : "SIG";

  return `CC-${prefix}-${short}`;
}
