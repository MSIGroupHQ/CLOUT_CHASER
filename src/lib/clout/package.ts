export type SeedContentPackage = {
  script: string;
  titleOptions: readonly string[];
  carouselOutline: readonly string[];
  exportSpecs: readonly string[];
  recommendedFormats: readonly string[];
  sourceNote: string;
};

const defaultExportSpecs = [
  "9:16 vertical",
  "30–45 seconds",
  "burned-in captions",
] as const;

export const seedPackages: Record<string, SeedContentPackage> = {
  "CC-DRK-ICE-FLOOD": {
    script:
      "Drake’s Iceman era is interesting because the music is only half the story. The real move is volume plus spectacle. Ice visuals, livestreams, fan chaos, critic fatigue — all of it keeps him inside the feed. Whether people love it or think it is too much, they still have to react. That is the point.",
    titleOptions: [
      "Drake’s Iceman Strategy Explained",
      "Is Drake Overexposed or Winning?",
      "Drake Flooded the Zone. Did It Work?",
    ],
    carouselOutline: [
      "The spectacle",
      "The volume strategy",
      "Why fatigue still creates reactions",
      "What creators can comment on",
      "The rights-safe visual lane",
      "The final question",
    ],
    exportSpecs: [...defaultExportSpecs, "ice / black / blue visual style"],
    recommendedFormats: [
      "30-second talking-head script",
      "6-slide carousel",
      "short-form storyboard",
      "title / caption pack",
    ],
    sourceNote:
      "This package was generated from public media signals and source notes. It is a content opportunity package, not a guarantee of performance.",
  },
  "CC-DRK-CENCH-ICEBRIDGE": {
    script:
      "The strongest angle in the Drake and Central Cee overlap is not a release rumor. It is the shared cold-world visual language connecting Toronto and London. Frame it as a culture and styling observation, then ask whether that bridge becomes the next dominant rap visual.",
    titleOptions: ["The Coldest Bridge in Rap", "Toronto to London, One Visual Language", "Why the Iceman Look Travels"],
    carouselOutline: ["Toronto", "London", "Cold luxury", "Shared visual codes", "Creator angle", "Rights-safe execution"],
    exportSpecs: [...defaultExportSpecs, "cold luxury / silver / black visual style"],
    recommendedFormats: ["30-second commentary", "visual comparison carousel", "original fashion storyboard", "title / caption pack"],
    sourceNote: "This package uses public visual and culture context. Verify every claim and produce original commentary and visuals.",
  },
  "CC-ICE-BIGGUY-OK": {
    script:
      "Some phrases travel because they make sense. Others travel because the audience can repeat them before deciding what they mean. That low-friction absurdity is the format: quote the reaction pattern, explain why it sticks, and keep the output in your own voice.",
    titleOptions: ["Why Typo Lyrics Become Memes", "The Internet Rewards Instant Confusion", "Absurd Phrases Travel Faster"],
    carouselOutline: ["The phrase", "The instant reaction", "Why repetition wins", "Meme adaptation", "Original commentary", "Rights check"],
    exportSpecs: [...defaultExportSpecs, "reaction-led pacing with original graphics"],
    recommendedFormats: ["reaction commentary", "meme-analysis carousel", "original text-led storyboard", "title / caption pack"],
    sourceNote: "This package uses public conversation as context. Do not present generated wording as a direct quote.",
  },
  "CC-CENCH-LUXNOIR": {
    script:
      "Central Cee’s current visual lane combines cars, night styling, and cold luxury without turning into a generic flex edit. The useful creator angle is to explain the visual grammar, then rebuild it with original footage rather than lifting the protected source.",
    titleOptions: ["UK Rap’s Luxury-Noir Era", "Why Cold Visuals Look Expensive Again", "The New Grammar of UK Rap Visuals"],
    carouselOutline: ["Night styling", "Car culture", "Cold color", "Luxury restraint", "Original production", "Export direction"],
    exportSpecs: [...defaultExportSpecs, "luxury-noir / black / cyan visual style"],
    recommendedFormats: ["night-drive commentary", "visual grammar carousel", "original car-culture storyboard", "title / caption pack"],
    sourceNote: "This package uses public visual context. Use original footage, owned media, or properly licensed assets.",
  },
};

export function getSeedPackage(oppHash: string) {
  return seedPackages[oppHash.trim().toUpperCase()];
}
