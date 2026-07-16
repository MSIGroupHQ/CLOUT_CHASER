export type SeedOpportunity = {
  oppHash: string;
  title: string;
  entity: string;
  lane: string;
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
    lane: "Music commentary",
    score: 76,
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
      "Use original commentary or original visuals. Do not reuse copyrighted footage, music, logos, or private material unless licensed or allowed.",
  },
  {
    oppHash: "CC-DRK-CENCH-ICEBRIDGE",
    title: "Drake and Central Cee are building the coldest bridge in rap.",
    entity: "Drake x Central Cee",
    lane: "Music / UK rap / luxury visuals",
    score: 78,
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
    oppHash: "CC-ICE-BIGGUY-OK",
    title: "The internet loves lyrics that sound like a typo.",
    entity: "Ice Spice",
    lane: "Meme / music commentary",
    score: 73,
    recommendation: "PACKAGE",
    whyNow:
      "A short absurd phrase can turn into a reaction format faster than a complex lyric.",
    platforms: ["TikTok", "Reels", "Shorts", "X"],
    hook: "Ice Spice proved the internet loves lyrics that sound like a typo.",
    caption: "Some meme phrases win because nobody has to understand them first.",
    riskNote:
      "Avoid using copyrighted cartoon footage or music unless licensed or allowed.",
  },
  {
    oppHash: "CC-CENCH-LUXNOIR",
    title: "UK rap is entering its luxury-noir era.",
    entity: "Central Cee",
    lane: "Music / car culture / VSDNA",
    score: 77,
    recommendation: "PACKAGE",
    whyNow:
      "Central Cee’s cold visuals, cars, night styling, and Iceman framing create a clean music/car/fashion crossover.",
    platforms: ["TikTok", "Reels", "Shorts"],
    hook: "Central Cee’s current visual lane makes rap look expensive again.",
    caption: "UK rap is entering its luxury-noir era.",
    riskNote:
      "Use original night-drive visuals or commentary. Do not reuse protected footage without permission.",
  },
] as const satisfies readonly SeedOpportunity[];

export function getSeedOpportunity(oppHash: string) {
  const normalized = oppHash.trim().toUpperCase();
  return seedOpportunities.find((opportunity) => opportunity.oppHash === normalized);
}
