import { getSeedPackage } from "./package";
import { assertPublicPayloadSafe } from "./sanitizer";
import type { SeedOpportunity } from "./seed";
import type { PublicReceipt } from "./types";

export function seedOpportunityToReceipt(opportunity: SeedOpportunity): PublicReceipt {
  const contentPackage = getSeedPackage(opportunity.oppHash);
  const receipt: PublicReceipt = {
    oppHash: opportunity.oppHash,
    receiptId: `SRC-${opportunity.oppHash.slice(3)}`,
    title: opportunity.title,
    entity: opportunity.entity,
    lane: opportunity.lane,
    score: opportunity.score,
    recommendation: opportunity.recommendation,
    whyNow: opportunity.whyNow,
    platforms: [...opportunity.platforms],
    languageLane: "English",
    packagePreview: opportunity.packagePreview
      ? [...opportunity.packagePreview]
      : ["primary hook", "caption angle", "short script", "title options", "export notes", "source-safe receipt"],
    hook: opportunity.hook,
    caption: opportunity.caption,
    script: contentPackage?.script,
    titleOptions: contentPackage ? [...contentPackage.titleOptions] : [],
    carouselOutline: contentPackage ? [...contentPackage.carouselOutline] : [],
    exportSpecs: contentPackage ? [...contentPackage.exportSpecs] : [],
    recommendedFormats: contentPackage ? [...contentPackage.recommendedFormats] : [],
    sourceNote: contentPackage?.sourceNote ?? "Public signal context only. Verify the source before publishing.",
    riskNote: opportunity.riskNote,
    createdAt: "2026-07-16T00:00:00.000Z",
    scoreBand: `${opportunity.score} / ${opportunity.recommendation}`,
    crmTrialEligible: false,
    mode: "demo",
  };

  assertPublicPayloadSafe(receipt);
  return receipt;
}
