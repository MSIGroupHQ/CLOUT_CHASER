/**
 * KLOUT BUNNY CANON LORE & EXPANDED ROSTER SPECIFICATION (bunny-canon.ts)
 * Defines Cecee (Founder), Brother K, Olivia, Lisa, Tango (Noir), and LEE_TWINS$ (이_트윈스$).
 */

export interface BunnyCanonSpec {
  id: string;
  name: string;
  hangulName?: string;
  roleTitle: string;
  agencyOwnership: string;
  furHex: string;
  furDescription: string;
  eyewearOrAccent: string;
  attire: string;
  personalityVibe: string;
  signatureCatchphrase: string;
  midjourneyTokens: string;
  imageSrc: string;
  driftChecklist: readonly string[];
}

export const MANDATORY_ANATOMY_RULES = [
  "ZERO HUMANS: No humans in the universe. Everything is operated and populated by rabbits.",
  "RABBIT ANATOMY BARS: Paws, fur, rabbit ears only. NO human fingers, NO human legs, NO human feet.",
  "NO PET POSTURE: Stand, sit, and dress with humanized posture. Never depicted as pets, on leashes, or in cages.",
  "PREFERRED CAMERA ANGLES: Over-the-shoulder camera guy, candid shots, or direct selfies. NO backshots.",
  "DUAL-RABBIT PREFERENCE: Render two rabbits together (e.g. Olivia + Lisa, Lee_Twins$) to preserve the social illusion."
] as const;

export const KLOUT_BUNNY_CANON_SPECS: Record<string, BunnyCanonSpec> = {
  cecee: {
    id: "cecee",
    name: "Cecee",
    roleTitle: "Founder & Agency Owner — Clout Studio",
    agencyOwnership: "100% Equity / Real Founder & Owner of Clout Studio & The Agency",
    furHex: "#ffffff",
    furDescription: "Pure Pristine Snow White Fur #ffffff",
    eyewearOrAccent: "Executive posture, gold chain / brand seal accent",
    attire: "Sleek executive jacket / pristine white tee",
    personalityVibe: "Sister to Brother K; holds the keys, contracts, and agency equity. Quiet ultimate authority.",
    signatureCatchphrase: "Check the agency charter.",
    midjourneyTokens: "photorealistic pristine snow white female rabbit, founder executive posture, ARRI Alexa 35, studio lighting, 8k",
    imageSrc: "/media/brand/CloutChaser/generate-one-single-image-of-the-same-white-bunny.webp",
    driftChecklist: [
      "Must remain pure pristine snow white fur #ffffff",
      "Sister to Brother K, owner of Clout Studio",
      "Executive stance, quiet authority posture"
    ]
  },
  olivia: {
    id: "olivia",
    name: "Olivia",
    roleTitle: "Dark Chocolate TMZ Editor",
    agencyOwnership: "Lead Culture Editor & Break-News Director",
    furHex: "#4c302b",
    furDescription: "Dark Chocolate Brown #4c302b with soft creamy highlights",
    eyewearOrAccent: "Amber eye reflections, studio rim light",
    attire: "Sleek dark chocolate brown studio jacket or hoodie",
    personalityVibe: "Cringeless TMZ Editor, sharp, nonchalant ('thanks hawkes.')",
    signatureCatchphrase: "thanks hawkes.",
    midjourneyTokens: "photorealistic female rabbit, dark chocolate brown fur #4c302b, ARRI Alexa 35, neon rim light, over-the-shoulder candid, 8k",
    imageSrc: "/media/brand/CloutChaser/olivia_bunny_selfie_1024.jpg",
    driftChecklist: [
      "Must maintain exact #4c302b dark chocolate fur color (never grey or light brown)",
      "Must have sharp amber eyes with studio reflection",
      "Must follow rabbit paws anatomy (NO human fingers/legs)",
      "Must be shot candid or over-the-shoulder (NO backshots)",
      "Prefer paired with Lisa or Brother K for dual-rabbit illusion preservation"
    ]
  },
  lisa: {
    id: "lisa",
    name: "Lisa",
    roleTitle: "Pop Culture Co-Host & Cutest Bunny",
    agencyOwnership: "Lead On-Air Presenter & Fan-Favorite Co-Host",
    furHex: "#f5e6d3",
    furDescription: "Champagne Cream #f5e6d3 with warm undertones",
    eyewearOrAccent: "Expressive hazel eyes, subtle neon hairpiece/accessory",
    attire: "Cute streetwear crop jacket, arcade console outfit",
    personalityVibe: "Pop Culture Co-Host & Cutest Bunny (Chanel West Coast energy, distinct from Olivia)",
    signatureCatchphrase: "Okay wait, this is actually crazy!",
    midjourneyTokens: "photorealistic cute female rabbit, champagne cream fur, seated at arcade console, Sony FX9, 8k",
    imageSrc: "/media/brand/CloutChaser/lisa_arcade_seated_1024.jpg",
    driftChecklist: [
      "Must maintain bright champagne cream fur (never dark brown)",
      "Must feature expressive, cute, high-energy smile/expression",
      "Must include broadcast microphone or arcade console setting"
    ]
  },
  brother_k: {
    id: "brother_k",
    name: "Brother K",
    roleTitle: "Studio Engineer & Heavy Hardware Compiler",
    agencyOwnership: "Head of Infrastructure & Older Brother to Cecee",
    furHex: "#2b221e",
    furDescription: "Dirty Greyish-Brown Patched Fur",
    eyewearOrAccent: "Focused dark brown eyes, operator gloves",
    attire: "Heavyweight black arcade hoodie",
    personalityVibe: "Older brother to Cecee; takes over when things get rowdy, runs heavy hardware & arcade compilers.",
    signatureCatchphrase: "Hardware locked. Let's run it.",
    midjourneyTokens: "photorealistic male rabbit, dirty greyish brown fur, black arcade hoodie, RED Komodo, synthwave arcade, 8k",
    imageSrc: "/media/brand/CloutChaser/neon_bunny_k.webp",
    driftChecklist: [
      "Must maintain heavy-set muscular build & greyish brown patched fur",
      "Must feature retro-futuristic arcade cabinet or compiler hardware",
      "Must wear signature black arcade hoodie"
    ]
  },
  tango: {
    id: "tango",
    name: "Tango (Noir)",
    roleTitle: "Underground Subculture Curator",
    agencyOwnership: "Archive & Underground Trend Lead",
    furHex: "#08080c",
    furDescription: "Pure Obsidian Black #08080c",
    eyewearOrAccent: "Shadowed dark eyes",
    attire: "All-black oversized hoodie with hood pulled up",
    personalityVibe: "Underground Subculture & Archive Curator (Phonk, UK Drill, Opium aesthetic)",
    signatureCatchphrase: "Archive shift verified.",
    midjourneyTokens: "photorealistic black rabbit, pure obsidian black fur #08080c, oversized black hoodie, hood up, 35mm film, 8k",
    imageSrc: "/media/brand/CloutChaser/black_rabbit_neon_synthwave.webp",
    driftChecklist: [
      "Must maintain pure obsidian black fur",
      "Hood must be pulled up covering ears/head",
      "Underground low-key shadow lighting"
    ]
  },
  taeyang_lee: {
    id: "taeyang_lee",
    name: "Taeyang Lee",
    hangulName: "이태양 (Ee Tae-yang)",
    roleTitle: "LEE_TWINS$ — Co-Lead & Sun Lee",
    agencyOwnership: "Global Cult Guest Duo (South Korea / Far East Culture)",
    furHex: "#7a7a85",
    furDescription: "Sleek Silver-Grey Fur",
    eyewearOrAccent: "Deadpan cool eyes, Far East streetwear, Kachina jersey",
    attire: "Grey Kachina jersey / Far East Seoul streetwear",
    personalityVibe: "Deadpan co-lead of LEE_TWINS$. Smoothly interrupts anyone saying 'the twins' via ad-lib: 'L-e-e-e Twins!'",
    signatureCatchphrase: "L-e-e-e Twins! (이~~~트윈스)",
    midjourneyTokens: "photorealistic grey male rabbit, Seoul streetwear, Kachina jersey, deadpan cool, Seoul press desk, 8k",
    imageSrc: "/media/brand/CloutChaser/grey_rabbit_kachina_jersey.webp",
    driftChecklist: [
      "Must maintain sleek silver-grey fur color",
      "Always interrupts 'the twins' with elongated 'L-e-e-e Twins!'",
      "Must be paired with Gigi Lee for official LEE_TWINS$ press desk posture"
    ]
  },
  gigi_lee: {
    id: "gigi_lee",
    name: "Gigi Lee (Ji-gi)",
    hangulName: "이지지 (Ee Ji-ji)",
    roleTitle: "LEE_TWINS$ — Co-Lead & Hype Enforcer",
    agencyOwnership: "Global Cult Guest Duo (South Korea / Far East Culture)",
    furHex: "#8e8e99",
    furDescription: "Feminine Soft Grey Fur",
    eyewearOrAccent: "Clever sharp eyes, white jersey / vaporwave style",
    attire: "White sports jersey / Seoul vaporwave fit",
    personalityVibe: "Witty & clever hype enforcer for LEE_TWINS$. Thumps back leg like a bass drop: '💵 Lee_Twins$! 💵 Check the contract.'",
    signatureCatchphrase: "💵 Lee_Twins$! 💵 Check the spelling on the contract, bro.",
    midjourneyTokens: "photorealistic grey female rabbit, white jersey, vaporwave Seoul aesthetic, sharp witty stance, 8k",
    imageSrc: "/media/brand/CloutChaser/feminine_rabbit_vaporwave.webp",
    driftChecklist: [
      "Must maintain feminine soft grey fur",
      "Background hype & contract enforcer stance",
      "Must be paired with Taeyang Lee for official LEE_TWINS$ press desk posture"
    ]
  }
};
