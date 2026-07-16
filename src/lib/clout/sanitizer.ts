const forbiddenPublicTerms = [
  "AZARIA",
  "SOLERA",
  "BASILISK",
  "MIDAS",
  "PULSE",
  "TRIDENT",
  "private kernel",
  "doctrine",
  "internal prompt",
  ".env",
  "API key",
  "lead list",
  "secret",
] as const;

export function publicSafetyHits(text: string) {
  const normalized = text.toLowerCase();
  return forbiddenPublicTerms.filter((term) =>
    normalized.includes(term.toLowerCase()),
  );
}

export function assertPublicSafe(text: string) {
  const hits = publicSafetyHits(text);
  if (hits.length > 0) {
    throw new Error(
      `Public copy contains forbidden internal terms: ${hits.join(", ")}`,
    );
  }
  return true;
}

export function assertPublicPayloadSafe(value: unknown) {
  assertPublicSafe(JSON.stringify(value));
  return value;
}

export function publicizeEngineTerms(text: string) {
  return text
    .replaceAll("PULSE", "trend radar")
    .replaceAll("ATLAS", "audience map")
    .replaceAll("BASILISK", "opportunity score")
    .replaceAll("MIDAS", "content package")
    .replaceAll("SOLERA", "safety check")
    .replaceAll("BBS", "source receipt")
    .replaceAll("TRIDENT", "export queue");
}

export { forbiddenPublicTerms };
