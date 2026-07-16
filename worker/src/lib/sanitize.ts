const forbiddenPublicTerms = [
  "AZARIA",
  "SOLERA",
  "BASILISK",
  "MIDAS",
  "PULSE",
  "ATLAS",
  "TRIDENT",
  "VERA",
  "BBS",
  "BLACKBOX",
  "private kernel",
  "doctrine",
  "internal prompt",
  "private source registry",
  ".env",
  "API key",
  "lead list",
  "secret",
] as const;

export function assertPublicSafe(text: string): true {
  const normalized = text.toLowerCase();
  const hits = forbiddenPublicTerms.filter((term) => normalized.includes(term.toLowerCase()));
  if (hits.length > 0) {
    throw new Error(`Public payload contains prohibited internal terms: ${hits.join(", ")}`);
  }
  return true;
}

export function publicizeEngineTerms(text: string): string {
  return text
    .replaceAll("PULSE", "trend radar")
    .replaceAll("ATLAS", "audience map")
    .replaceAll("BASILISK", "opportunity score")
    .replaceAll("MIDAS", "content package")
    .replaceAll("SOLERA", "safety check")
    .replaceAll("BBS", "source receipt")
    .replaceAll("BLACKBOX", "source receipt")
    .replaceAll("TRIDENT", "export queue");
}

export function assertPublicPayloadSafe(value: unknown): true {
  return assertPublicSafe(JSON.stringify(value));
}
