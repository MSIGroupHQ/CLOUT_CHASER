import { assertPublicPayloadSafe } from "./sanitizer";

export const CLOUT_PUBLIC_COPY = {
  headline: "Find tomorrow’s viral content today.",
  subhead:
    "Clout Chaser finds fast-moving public signals, scores the opportunity before saturation, and turns them into creator-ready hooks, captions, scripts, titles, clip targets, and export specs.",
  directive: "Send one source. Get one free opportunity sample.",
  primaryCta: "Get my free opportunity sample",
  secondaryCta: "See example receipt",
  receiptCta:
    "Want a pack like this for your niche? Get your free opportunity sample.",
  pilot: "A Prime 88 attention-intelligence pilot.",
  receiptProof: "Receipts powered by BBS.",
} as const;

assertPublicPayloadSafe(CLOUT_PUBLIC_COPY);
