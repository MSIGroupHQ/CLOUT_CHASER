/**
 * Global region spine — Clout is worldwide.
 * Every opportunity / entity / heat signal carries a region.
 * "Every country has a Beyoncé."
 */

export const CLOUT_REGIONS = [
  { id: "GLOBAL", label: "Global", flag: "🌍", blurb: "Cross-border attention" },
  { id: "US", label: "United States", flag: "🇺🇸", blurb: "US pop / hip-hop / streamers" },
  { id: "UK_EU", label: "UK & Europe", flag: "🇪🇺", blurb: "UK rap, EU pop, football culture" },
  { id: "LATAM", label: "LatAm & Spanish", flag: "🌎", blurb: "Reggaeton, corridos, Spanish streamers" },
  { id: "ASIA_KPOP", label: "Asia & K-Pop", flag: "🌏", blurb: "K-Pop, VTubers, JP/KR/SEA" },
  { id: "JP", label: "Japan", flag: "🇯🇵", blurb: "J-Pop, anime, stream culture" },
  { id: "IN", label: "India & South Asia", flag: "🇮🇳", blurb: "Bollywood, Punjabi, desi internet" },
  { id: "OCEANIA", label: "Australia & NZ", flag: "🇦🇺", blurb: "AU/NZ creators & sports" },
  { id: "AFRICA", label: "Africa", flag: "🌍", blurb: "Afrobeats, Amapiano, Naija" },
  { id: "GULF_MENA", label: "Gulf & MENA", flag: "🏜️", blurb: "Arabic internet, Gulf capital culture" },
  { id: "GLOBAL_SPORTS", label: "Global Sports", flag: "⚽", blurb: "Football, esports, athletes" },
] as const;

export type CloutRegionId = (typeof CLOUT_REGIONS)[number]["id"];

export function isCloutRegionId(value: string): value is CloutRegionId {
  return CLOUT_REGIONS.some((r) => r.id === value);
}

export function regionLabel(id: string): string {
  return CLOUT_REGIONS.find((r) => r.id === id)?.label ?? id;
}

/** Map legacy lane strings → region ids */
export function regionFromLane(lane: string): CloutRegionId {
  const l = lane.toLowerCase();
  if (l.includes("uk") || l.includes("europe") || l.includes("eu ")) return "UK_EU";
  if (l.includes("latam") || l.includes("spanish") || l.includes("mexican") || l.includes("brasil") || l.includes("brazil"))
    return "LATAM";
  if (l.includes("k-pop") || l.includes("kpop") || l.includes("vtuber") || l.includes("anime") || l.includes("asia"))
    return "ASIA_KPOP";
  if (l.includes("japan") || l.includes("j-pop") || l.includes("tokyo")) return "JP";
  if (l.includes("india") || l.includes("punjabi") || l.includes("bollywood") || l.includes("desi")) return "IN";
  if (l.includes("australia") || l.includes("nz") || l.includes("oceania")) return "OCEANIA";
  if (l.includes("africa") || l.includes("afrobeat") || l.includes("amapiano") || l.includes("naija") || l.includes("lagos"))
    return "AFRICA";
  if (l.includes("gulf") || l.includes("mena") || l.includes("dubai") || l.includes("saudi") || l.includes("arabic"))
    return "GULF_MENA";
  if (l.includes("sport") || l.includes("esport") || l.includes("football") || l.includes("soccer"))
    return "GLOBAL_SPORTS";
  if (l.includes("crypto") || l.includes("global") || l.includes("fashion") || l.includes("underground music"))
    return "GLOBAL";
  if (l.includes("us ") || l.startsWith("us") || l.includes("america")) return "US";
  return "GLOBAL";
}

/** Heuristic from free-text source URL / niche (operator paste ceiling) */
export function regionFromSourceHint(sourceUrl: string, niche: string): CloutRegionId {
  const s = `${sourceUrl} ${niche}`.toLowerCase();
  if (/\b(india|bollywood|mumbai|delhi|punjabi|desi|srk|diljit)\b/.test(s)) return "IN";
  if (/\b(japan|tokyo|j-pop|anime|hololive|vtuber|jp)\b/.test(s)) return "JP";
  if (/\b(korea|k-pop|kpop|bts|blackpink|seoul)\b/.test(s)) return "ASIA_KPOP";
  if (/\b(brazil|brasil|phonk|funk|mexico|corridos|reggaeton|bad bunny|peso|latam|spanish)\b/.test(s))
    return "LATAM";
  if (/\b(uk|london|central cee|stormzy|grime|europe|france|spain|germany)\b/.test(s)) return "UK_EU";
  if (/\b(nigeria|lagos|afrobeats|amapiano|south africa|burna|wizkid|tyla)\b/.test(s)) return "AFRICA";
  if (/\b(dubai|riyadh|saudi|uae|qatar|mena|arabic)\b/.test(s)) return "GULF_MENA";
  if (/\b(australia|sydney|melbourne|nz|auckland)\b/.test(s)) return "OCEANIA";
  if (/\b(messi|ronaldo|premier league|nba|nfl|esports|fifa)\b/.test(s)) return "GLOBAL_SPORTS";
  if (/\b(us|usa|drake|taylor|kai cenat|tiktok\.com\/@)\b/.test(s)) return "US";
  return regionFromLane(niche) || "GLOBAL";
}
