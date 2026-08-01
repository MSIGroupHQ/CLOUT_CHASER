import { assertPublicPayloadSafe } from "./sanitizer";

export const CLOUT_PUBLIC_COPY = {
  headline: "Find tomorrow's viral content today.",
  subhead:
    "Clout Chaser scores fast-moving public signals before saturation, then delivers creator-ready opportunity packages — hooks, captions, scripts, titles, clip targets, and export specs — backed by cryptographic proof receipts.",
  directive: "Send one source. Receive one complimentary opportunity package.",
  primaryCta: "Get my free opportunity sample",
  secondaryCta: "View example receipt",
  receiptCta:
    "Want a package like this for your vertical? Request your complimentary opportunity sample.",
  pilot: "Engineered by Prime 88. Operated by Mediator Solutions LLC.",
  receiptProof: "Receipts verified by BBS cryptographic proof.",
} as const;

assertPublicPayloadSafe(CLOUT_PUBLIC_COPY);
