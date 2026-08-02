import { assertPublicPayloadSafe } from "./sanitizer";

export type MicroOffer = {
  id: string;
  name: string;
  price: string;
  amountCents: number;
  badge?: string;
  deliverables: readonly string[];
  stripePriceId?: string;
  whopPlanId?: string;
  checkoutUrl: string;
};

export const MICRO_OFFERS: readonly MicroOffer[] = [
  {
    id: "mo-starter-099",
    name: "Viral Starter Pack",
    price: "$0.99",
    amountCents: 99,
    badge: "LOWEST ENTRY BARRIER",
    deliverables: [
      "3 high-retention viral hooks",
      "1 NVIDIA-accelerated meme render ($0 COGS)",
      "CapCut / Premiere XML project preset link",
      "Instant public BBS receipt",
    ],
    checkoutUrl: "https://whop.com/checkout/plan_starter_099",
  },
  {
    id: "mo-hooks-199",
    name: "Instant Hook & Title Pack",
    price: "$1.99",
    amountCents: 199,
    badge: "INSTANT ACCELERATION",
    deliverables: [
      "5 high-retention viral hooks",
      "3 platform-native title options",
      "1 instant downloadable PDF/JSON receipt",
      "Sub-50ms edge delivery",
    ],
    checkoutUrl: "https://whop.com/checkout/plan_hooks_199",
  },
  {
    id: "mo-clipper-999",
    name: "Clipper Export & Subtitle Spec",
    price: "$9.99",
    amountCents: 999,
    badge: "MOST POPULAR FOR CLIPPERS",
    deliverables: [
      "Timestamp cut points & entry markers",
      "CapCut & Premiere XML preset download link",
      "3 short-form script templates (TikTok/Reels/Shorts)",
      "Bilingual variant notes",
    ],
    checkoutUrl: "https://whop.com/checkout/plan_clipper_999",
  },
  {
    id: "mo-proof-2999",
    name: "Full Opportunity Proof Pack",
    price: "$29.99",
    amountCents: 2999,
    badge: "COMPLETE PROOF PACKAGE",
    deliverables: [
      "Full 8-lane cult trend analysis",
      "Cryptographic BBS receipt with Merkle tree proof",
      "Priority edge processing queue slot",
      "Complete export specs & rights disclaimers",
    ],
    checkoutUrl: "https://whop.com/checkout/plan_proof_2999",
  },
] as const;

assertPublicPayloadSafe(MICRO_OFFERS);
