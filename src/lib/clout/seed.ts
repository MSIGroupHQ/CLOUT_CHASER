import type { CloutRegionId } from "./regions";

export type SeedOpportunity = {
  oppHash: string;
  title: string;
  entity: string;
  lane: string;
  /** Global region spine — required for worldwide feed */
  region: CloutRegionId;
  /** Optional market / country code e.g. JP, IN, BR, AU */
  market?: string;
  score: number;
  recommendation: "PACKAGE";
  whyNow: string;
  platforms: readonly string[];
  packagePreview?: readonly string[];
  hook: string;
  caption: string;
  riskNote: string;
};

export const seedOpportunities = [
  {
    oppHash: "CC-DRK-ICE-FLOOD",
    title: "Drake isn’t dropping music. He’s dropping weather.",
    entity: "Drake",
    lane: "US Underground & Music",
    region: "US",
    score: 86,
    recommendation: "PACKAGE",
    whyNow:
      "Drake’s Iceman cycle is creating a debate around overexposure, spectacle, and whether volume itself is the strategy.",
    platforms: ["TikTok", "Reels", "Shorts"],
    packagePreview: [
      "5 hooks",
      "3 captions",
      "1 30-second script",
      "title options",
      "export notes",
      "source-safe receipt",
    ],
    hook:
      "Drake’s rollout feels less like an album and more like a weather system.",
    caption:
      "Drake is testing whether attention fatigue still converts into dominance.",
    riskNote:
      "Use original commentary or original visuals. Do not reuse copyrighted footage, music, logos, or private material unless licensed.",
  },
  {
    oppHash: "CC-DRK-CENCH-ICEBRIDGE",
    title: "Drake and Central Cee are building the coldest bridge in rap.",
    entity: "Drake x Central Cee",
    lane: "UK & European Subcultures",
    region: "UK_EU",
    score: 88,
    recommendation: "PACKAGE",
    whyNow:
      "Drake’s Iceman rollout and Central Cee’s cold luxury visuals create a Toronto-to-London music/culture angle.",
    platforms: ["TikTok", "Reels", "Shorts"],
    hook: "The Iceman aesthetic makes more sense when you add Central Cee.",
    caption: "Toronto-to-London is the coldest rap bridge right now.",
    riskNote:
      "Create original commentary and visual framing. Do not reuse copyrighted video or music without permission.",
  },
  {
    oppHash: "CC-TRAVIS-UTOPIA-STORM",
    title: "Travis Scott’s Circus Maximus is an architectural spectacle.",
    entity: "Travis Scott",
    lane: "US Underground & Music",
    region: "US",
    score: 85,
    recommendation: "PACKAGE",
    whyNow:
      "Stadium visuals and pyrotechnics are redefining live concert rollouts as cinematic trailers.",
    platforms: ["TikTok", "Reels", "Shorts"],
    hook: "Travis Scott turned concert security footage into a box office movie.",
    caption: "Live shows are no longer tours—they are real-time movie premieres.",
    riskNote: "Ensure fan commentary uses original or licensed event clips.",
  },
  {
    oppHash: "CC-CARTI-OPIUM-NOIR",
    title: "Playboi Carti’s Opium rollout is a masterclass in stealth marketing.",
    entity: "Playboi Carti",
    lane: "US Underground & Music",
    region: "US",
    score: 92,
    recommendation: "PACKAGE",
    whyNow:
      "Low-fidelity Instagram spam accounts and unreleased snippets generate higher hype than $10M PR campaigns.",
    platforms: ["TikTok", "Reels", "X"],
    hook: "Carti proved that total silence creates 10x more noise than a promo tour.",
    caption: "The Opium aesthetic wins by giving the audience zero context.",
    riskNote: "Focus commentary on rollout strategy rather than unreleased leaks.",
  },
  {
    oppHash: "CC-[#00F0FF]-KAI-MARATHON",
    title: "Kai Cenat’s subathons are live 24/7 reality television.",
    entity: "Kai Cenat",
    lane: "US Underground & Streaming",
    region: "US",
    score: 94,
    recommendation: "PACKAGE",
    whyNow:
      "Unscripted 30-day stream marathons generate hundreds of millions of clip views daily across TikTok.",
    platforms: ["TikTok", "Reels", "Shorts"],
    hook: "Kai Cenat built a bigger television studio in his bedroom than network TV.",
    caption: "Continuous live streaming has completely replaced traditional late-night television.",
    riskNote: "Attribute stream clips accurately and focus on creator economy insights.",
  },
  {
    oppHash: "CC-KENDRICK-NOT-LIKE-US",
    title: "Kendrick Lamar’s West Coast anthem redefined beef as cultural geography.",
    entity: "Kendrick Lamar",
    lane: "US Underground & Culture",
    region: "US",
    score: 96,
    recommendation: "PACKAGE",
    whyNow:
      "Local dancing, community cameos, and West Coast production turned a diss track into a global stadium chant.",
    platforms: ["TikTok", "Reels", "Shorts"],
    hook: "Kendrick proved that local authentic culture will always beat global pop polish.",
    caption: "When a diss track becomes a national holiday, the strategy shifted.",
    riskNote: "Use original commentary; avoid duplicating copyrighted master audio.",
  },
  {
    oppHash: "CC-PESO-CORRIDOS-GLOBAL",
    title: "Peso Pluma and Corridos Tumbados are taking over global Spotify charts.",
    entity: "Peso Pluma",
    lane: "LatAm & Spanish Pop",
    region: "LATAM",
    score: 89,
    recommendation: "PACKAGE",
    whyNow:
      "Traditional Mexican brass and acoustic guitars fused with trap beats are topping global charts in real time.",
    platforms: ["TikTok", "Reels", "Shorts"],
    hook: "Regional Mexican music just out-streamed global pop on Spotify.",
    caption: "Corridos Tumbados is the fastest growing global subculture sound right now.",
    riskNote: "Provide cultural and musical commentary with proper artist attributions.",
  },
  {
    oppHash: "CC-SPEED-IRL-WORLD",
    title: "IShowSpeed’s IRL world tours are unscripted global diplomacy.",
    entity: "IShowSpeed",
    lane: "US Underground & Streaming",
    region: "US",
    score: 91,
    recommendation: "PACKAGE",
    whyNow:
      "Speed visiting Norway, Brazil, and Japan creates instant viral crowd surges and country-level cultural moments.",
    platforms: ["TikTok", "Reels", "Shorts"],
    hook: "Speed is doing more international outreach on Kick than diplomats on TV.",
    caption: "IRL streaming has turned global travel into real-time interactive video games.",
    riskNote: "Focus on crowd dynamics and streaming culture analysis.",
  },
  {
    oppHash: "CC-VTUBER-[#FF2D95]-HOLOLIVE",
    title: "VTubers are generating multi-million dollar superchats and merch drops.",
    entity: "Ironmouse / Hololive",
    lane: "Asia-Pacific & Gaming",
    region: "ASIA_KPOP",
    score: 87,
    recommendation: "PACKAGE",
    whyNow:
      "Anime avatars streaming 12 hours a day are beating human creators in channel sub counts and revenue.",
    platforms: ["YouTube", "Twitch", "TikTok"],
    hook: "Virtual anime streamers are pulling higher revenue than Hollywood actors.",
    caption: "The avatar economy is no longer niche—it is a mainstream streaming powerhouse.",
    riskNote: "Respect VTuber lore and IP guidelines when publishing commentary.",
  },
  {
    oppHash: "CC-CENCH-LUXNOIR",
    title: "UK rap is entering its luxury-noir era.",
    entity: "Central Cee",
    lane: "UK & European Subcultures",
    region: "UK_EU",
    score: 82,
    recommendation: "PACKAGE",
    whyNow:
      "Central Cee’s cold visuals, cars, night styling, and Iceman framing create a clean music/car/fashion crossover.",
    platforms: ["TikTok", "Reels", "Shorts"],
    hook: "Central Cee’s current visual lane makes rap look expensive again.",
    caption: "UK rap is entering its luxury-noir era.",
    riskNote: "Use original night-drive visuals or commentary. Do not reuse protected footage.",
  },
  {
    oppHash: "CC-BALENCIAGA-ARCHIVE",
    title: "High-fashion archive wear is becoming the default creator uniform.",
    entity: "Balenciaga / Rick Owens",
    lane: "High-Fashion & Streetwear",
    region: "GLOBAL",
    score: 84,
    recommendation: "PACKAGE",
    whyNow:
      "Oversized silhouettes and dystopian runway aesthetics are dominating TikTok outfit breakdowns.",
    platforms: ["TikTok", "Instagram", "Reels"],
    hook: "Creators are spending $3,000 on vintage boots just to shoot a 15-second reel.",
    caption: "Dystopian luxury is officially the new creator streetwear standard.",
    riskNote: "Focus commentary on fashion styling trends and aesthetic breakdowns.",
  },
  {
    oppHash: "CC-SOLANA-MEME-CASINO",
    title: "Solana & Base memecoins are generating real-time internet lore.",
    entity: "Solana / Base",
    lane: "Crypto & FinTwit Lore",
    region: "GLOBAL",
    score: 90,
    recommendation: "PACKAGE",
    whyNow:
      "Sub-second token launches paired with X memes create 24-hour liquidity events and viral narratives.",
    platforms: ["X", "TikTok", "YouTube"],
    hook: "A dog wearing a hat generated more daily trading volume than mid-cap stocks.",
    caption: "Internet lore is converting directly into 24-hour financial liquidity.",
    riskNote: "Include clear non-financial advice disclaimers on all crypto culture content.",
  },
  {
    oppHash: "CC-MRBEAST-STUDIO-SCALE",
    title: "MrBeast’s $5M video budget vs low-fi phone creators.",
    entity: "MrBeast",
    lane: "US Underground & Creator Economy",
    region: "US",
    score: 89,
    recommendation: "PACKAGE",
    whyNow:
      "The divide between Hollywood-scale YouTube productions and raw iPhone clips is forcing creators to pick a lane.",
    platforms: ["YouTube", "TikTok", "X"],
    hook: "MrBeast spent $5M on a video, while a 16-year-old out-viewed him with an iPhone.",
    caption: "Production budget no longer guarantees retention—authenticity does.",
    riskNote: "Analyze creator economy trends; do not copy thumbnail or video IP.",
  },
  {
    oppHash: "CC-DUBAI-ESPORTS-CROWN",
    title: "Saudi Arabia and UAE are buying the global gaming and eSports industry.",
    entity: "eSports World Cup / Dubai",
    lane: "Middle East & Gulf Trends",
    region: "GULF_MENA",
    score: 86,
    recommendation: "PACKAGE",
    whyNow:
      "Multi-million dollar prize pools and global club acquisitions are anchoring the Gulf as the capital of gaming.",
    platforms: ["X", "YouTube", "TikTok"],
    hook: "The capital of competitive video gaming just moved from LA to Riyadh.",
    caption: "Gulf sovereign investments are reshaping global eSports and streaming.",
    riskNote: "Focus commentary on gaming industry investment and tournament logistics.",
  },
  {
    oppHash: "CC-ICE-BIGGUY-OK",
    title: "The internet loves lyrics that sound like a typo.",
    entity: "Ice Spice",
    lane: "US Underground & Memes",
    region: "US",
    score: 79,
    recommendation: "PACKAGE",
    whyNow:
      "A short absurd phrase can turn into a reaction format faster than a complex lyric.",
    platforms: ["TikTok", "Reels", "Shorts", "X"],
    hook: "Ice Spice proved the internet loves lyrics that sound like a typo.",
    caption: "Some meme phrases win because nobody has to understand them first.",
    riskNote: "Avoid using copyrighted cartoon footage or music unless licensed.",
  },
  {
    oppHash: "CC-PHONK-DRIFT-UNDERGROUND",
    title: "Brazilian Phonk and Speed-Up tracks dominate GymTok and CarTok.",
    entity: "Phonk / Underground",
    lane: "Underground Music & Micro-Niches",
    region: "GLOBAL",
    score: 88,
    recommendation: "PACKAGE",
    whyNow:
      "Distorted cowl bells and aggressive basslines are driving billions of video edits globally.",
    platforms: ["TikTok", "Reels", "Shorts"],
    hook: "A distorted bell loop from 1990 Memphis just became the global workout anthem.",
    caption: "Underground Phonk is the highest converting background audio format on Reels.",
    riskNote: "Ensure audio commentary uses licensed or fair-use snippet commentary.",
  },
  {
    oppHash: "CC-AI-AGENT-CREATOR-SCALE",
    title: "Autonomous AI creator agents are running 24/7 faceless YouTube channels.",
    entity: "AI Agents",
    lane: "US Underground & Creator Economy",
    region: "US",
    score: 93,
    recommendation: "PACKAGE",
    whyNow:
      "Multi-agent automation frameworks allow solo creators to produce 50 shorts daily with zero manual editing.",
    platforms: ["YouTube", "TikTok", "X"],
    hook: "This channel published 500 videos this month without a single human employee.",
    caption: "Faceless automated channels are out-pacing traditional creator studios.",
    riskNote: "Maintain transparency regarding automated synthesis and AI generated content.",
  },
  {
    oppHash: "CC-CORTEIZ-PARIS-DROP",
    title: "Corteiz guerrilla streetwear drops trigger city-wide scavenger hunts in Paris.",
    entity: "Corteiz",
    lane: "High-Fashion & Streetwear",
    region: "GLOBAL",
    score: 91,
    recommendation: "PACKAGE",
    whyNow:
      "Unannounced stealth coordinates posted on X drive thousands of kids to sprint across metropolitan streets.",
    platforms: ["TikTok", "Reels", "X"],
    hook: "A single tweet just caused 5,000 people to sprint through the streets of Paris.",
    caption: "Guerrilla location drops generate 100x more engagement than traditional retail releases.",
    riskNote: "Ensure safety commentary when documenting crowd events.",
  },
  {
    oppHash: "CC-SOLANA-BLIND-DROPS",
    title: "Solana meme token trading circles dominate micro-finance FinTwit.",
    entity: "Solana Trading",
    lane: "Crypto & Internet Money",
    region: "GLOBAL",
    score: 87,
    recommendation: "PACKAGE",
    whyNow:
      "Ultra-low transaction fees enable instant viral token creation tied to breaking internet news within 10 minutes.",
    platforms: ["X", "Telegram", "TikTok"],
    hook: "A new token was minted, hit a $10M market cap, and crashed all before lunch.",
    caption: "Internet speed trading metas are turning viral memes into instant liquid assets.",
    riskNote: "Include mandatory financial disclaimers; do not provide investment advice.",
  },
] as const satisfies readonly SeedOpportunity[];

import { findGlobalEntity } from "./global-entities";

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


export function getSeedOpportunity(oppHash: string): SeedOpportunity | undefined {
  const normalized = oppHash.trim().toUpperCase();
  const directMatch = seedOpportunities.find((opportunity) => opportunity.oppHash === normalized);
  if (directMatch) return directMatch;

  // Check dynamic global entity matrix (US & International Celeb Equivalents)
  const entityMatch = findGlobalEntity(normalized);
  if (entityMatch) {
    return {
      oppHash: `CC-${entityMatch.id}`,
      title: `${entityMatch.name} — Global Pop Culture Signal Shift`,
      entity: entityMatch.name,
      lane: entityMatch.subculture,
      region: mapEntityRegion(entityMatch.region, entityMatch.subculture),
      score: 88,
      recommendation: "PACKAGE",
      whyNow: `${entityMatch.name} (${entityMatch.archetype}) is driving high-velocity viral discourse across ${entityMatch.region} pop culture channels.`,
      platforms: ["TikTok", "Reels", "Shorts", "X"],
      packagePreview: [
        "5 hooks",
        "3 captions",
        "1 30-second script",
        "title options",
        "export notes",
        "source-safe receipt",
      ],
      hook: entityMatch.defaultHook,
      caption: entityMatch.defaultCaption,
      riskNote: `Ensure commentary on ${entityMatch.name} uses original analysis and proper attributions.`,
    };
  }

  return undefined;
}

