from pathlib import Path
import re

p = Path(__file__).resolve().parents[1] / "src/lib/clout/seed.ts"
t = p.read_text(encoding="utf-8")


def region_for_lane(lane: str) -> str:
    l = lane.lower()
    if "uk" in l or "europe" in l:
        return "UK_EU"
    if "latam" in l or "spanish" in l or "mexican" in l:
        return "LATAM"
    if "asia" in l or "vtuber" in l or "k-pop" in l:
        return "ASIA_KPOP"
    if "africa" in l or "afro" in l:
        return "AFRICA"
    if "middle east" in l or "gulf" in l:
        return "GULF_MENA"
    if "crypto" in l or "fashion" in l or "underground music" in l or "micro" in l:
        return "GLOBAL"
    if "us " in l or l.startswith("us"):
        return "US"
    return "GLOBAL"


def add_region(m: re.Match[str]) -> str:
    lane = m.group(1)
    return f'lane: "{lane}",\n    region: "{region_for_lane(lane)}",\n    score'


t2 = re.sub(r'lane: "([^"]+)",\n    score', add_region, t)

# Clean type import block at top - ensure regions import once
if 'from "./regions"' not in t2.split("export const seedOpportunities")[0]:
    t2 = t2.replace(
        'import type { CloutRegionId } from "./regions";\nimport { regionFromLane } from "./regions";\n',
        'import type { CloutRegionId } from "./regions";\n',
    )

# Entity dynamic match region
t2 = t2.replace(
    """      entity: entityMatch.name,
      lane: entityMatch.subculture,
      score: 88,""",
    """      entity: entityMatch.name,
      lane: entityMatch.subculture,
      region: mapEntityRegion(entityMatch.region, entityMatch.subculture),
      score: 88,""",
)

if "function mapEntityRegion" not in t2:
    t2 = t2.replace(
        'import { findGlobalEntity } from "./global-entities";',
        '''import { findGlobalEntity } from "./global-entities";

function mapEntityRegion(region: string, subculture: string): CloutRegionId {
  const s = (subculture + " " + region).toLowerCase();
  if (/india|punjabi|bollywood|desi/.test(s)) return "IN";
  if (/japan|vtuber|hololive|anime/.test(s) && !/k-pop|kpop/.test(s)) return "JP";
  const allowed = new Set([
    "US", "UK_EU", "LATAM", "ASIA_KPOP", "AFRICA", "GULF_MENA", "GLOBAL_SPORTS", "GLOBAL", "JP", "IN", "OCEANIA",
  ]);
  if (allowed.has(region)) return region as CloutRegionId;
  return "GLOBAL";
}
''',
    )

# Ensure CloutRegionId import exists once at top of file for SeedOpportunity type
if t2.count('import type { CloutRegionId }') == 0:
    t2 = 'import type { CloutRegionId } from "./regions";\n' + t2
elif t2.count('import type { CloutRegionId }') > 1:
    # keep first only
    parts = t2.split('import type { CloutRegionId } from "./regions";\n')
    t2 = parts[0] + 'import type { CloutRegionId } from "./regions";\n' + "".join(parts[1:])

p.write_text(t2, encoding="utf-8")
print("region lines", len(re.findall(r'region: "', t2)))
print("ok")
