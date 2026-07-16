"use client";

import { recordCrmTrialIntent } from "@/lib/clout/api";
import { trackCloutEvent } from "@/lib/clout/events";

const DESTINATION = "https://crm.prime88.studio/creator-trial";

export function OperationsTrialCta({ className }: { className?: string }) {
  async function startTrial() {
    const query = new URLSearchParams(window.location.search);
    const oppHash = query.get("opp_hash")?.trim().toUpperCase() || undefined;
    const ref = query.get("ref")?.trim() || undefined;

    trackCloutEvent("cc_crm_trial_clicked", {
      ...(oppHash ? { opp_hash: oppHash } : {}),
      ...(ref ? { ref } : {}),
      crm_trial_eligible: true,
    });

    if (oppHash) {
      await Promise.race([
        recordCrmTrialIntent({ opp_hash: oppHash, action: "clicked" }),
        new Promise((resolve) => window.setTimeout(resolve, 500)),
      ]).catch(() => undefined);
    }
    window.location.assign(DESTINATION);
  }

  return (
    <button className={className} type="button" onClick={startTrial}>
      Start free Operations Studio trial
    </button>
  );
}
