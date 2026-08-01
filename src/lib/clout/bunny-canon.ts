/**
 * KLOUT BUNNY CANON PROMPT BIBLE & DRIFT CORRECTION SPECIFICATION (bunny-canon.ts)
 * Enforces zero-drift visual invariance for Olivia, Lisa, Brother K, Moody Bunny, and Noir.
 */

export interface BunnyCanonSpec {
  id: string;
  name: string;
  furHex: string;
  furDescription: string;
  eyewearOrAccent: string;
  attire: string;
  personalityVibe: string;
  midjourneyTokens: string;
  driftChecklist: readonly string[];
}

export const KLOUT_BUNNY_CANON_SPECS: Record<string, BunnyCanonSpec> = {
  olivia: {
    id: "olivia",
    name: "Olivia",
    furHex: "#4c302b",
    furDescription: "Dark Chocolate Brown #4c302b with soft creamy highlights",
    eyewearOrAccent: "Amber eye reflections, studio rim light",
    attire: "Sleek dark chocolate brown studio jacket or hoodie",
    personalityVibe: "Cringeless TMZ Editor, sharp, nonchalant ('thanks hawkes.')",
    midjourneyTokens: "photorealistic female rabbit, dark chocolate brown fur #4c302b, ARRI Alexa 35, neon rim light, 8k",
    driftChecklist: [
      "Must maintain exact #4c302b dark chocolate fur color (never grey or light brown)",
      "Must have sharp amber eyes with studio reflection",
      "Must maintain nonchalant, confident editorial posture"
    ]
  },
  lisa: {
    id: "lisa",
    name: "Lisa",
    furHex: "#f5e6d3",
    furDescription: "Champagne Cream #f5e6d3 with warm undertones",
    eyewearOrAccent: "Expressive hazel eyes, subtle neon hairpiece/accessory",
    attire: "Cute streetwear crop jacket, broadcast co-host outfit",
    personalityVibe: "Pop Culture Co-Host & Cutest Bunny (Chanel West Coast energy)",
    midjourneyTokens: "photorealistic cute female rabbit, champagne cream fur, broadcast desk, Sony FX9, 8k",
    driftChecklist: [
      "Must maintain bright champagne cream fur (never dark brown)",
      "Must feature expressive, cute, high-energy smile/expression",
      "Must include broadcast microphone or co-host desk setting"
    ]
  },
  brother_k: {
    id: "brother_k",
    name: "Brother K",
    furHex: "#2b221e",
    furDescription: "Deep Espresso Brown with grey chest accents",
    eyewearOrAccent: "Focused dark brown eyes, operator gloves",
    attire: "Heavyweight black arcade hoodie",
    personalityVibe: "Studio Engineer & Arcade Hardware Compiler",
    midjourneyTokens: "photorealistic male rabbit, espresso brown fur, black arcade hoodie, RED Komodo, synthwave arcade, 8k",
    driftChecklist: [
      "Must maintain heavy-set muscular build",
      "Must feature retro-futuristic arcade cabinet or compiler hardware",
      "Must wear signature black arcade hoodie"
    ]
  },
  moody_bunny: {
    id: "moody_bunny",
    name: "Moody Bunny",
    furHex: "#1a1a24",
    furDescription: "Matte Dark Charcoal #1a1a24",
    eyewearOrAccent: "Cool blue analytical eyes",
    attire: "Minimalist matte black vest",
    personalityVibe: "High-Density Data & Virality Analyst",
    midjourneyTokens: "photorealistic rabbit, matte dark charcoal fur #1a1a24, studio pyramid lighting, dark mood, Leica SL2, 8k",
    driftChecklist: [
      "Must maintain matte dark charcoal fur tone",
      "Must have high-contrast studio pyramid lighting",
      "Must project calm, analytical demeanor"
    ]
  },
  noir_bunny: {
    id: "noir_bunny",
    name: "Black Rabbit (Noir)",
    furHex: "#08080c",
    furDescription: "Pure Obsidian Black #08080c",
    eyewearOrAccent: "Shadowed dark eyes",
    attire: "All-black oversized hoodie with hood pulled up",
    personalityVibe: "Underground Subculture & Archive Curator",
    midjourneyTokens: "photorealistic black rabbit, pure obsidian black fur #08080c, oversized black hoodie, hood up, 35mm film, 8k",
    driftChecklist: [
      "Must maintain pure obsidian black fur",
      "Hood must be pulled up covering ears/head",
      "Underground low-key shadow lighting"
    ]
  }
};
