export function opportunityScoreBand(score: number) {
  if (score >= 80) return "Package now";
  if (score >= 70) return "Package";
  if (score >= 55) return "Watch";
  return "Hold";
}

export function formattedOpportunityScore(score: number, recommendation: string) {
  return `${score} / ${recommendation}`;
}
