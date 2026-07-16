"use client";

import { useState } from "react";
import { trackCloutEvent } from "@/lib/clout/events";

export function PackageFeedback({ opportunityHash }: { opportunityHash: string }) {
  const [feedback, setFeedback] = useState<string>();

  function recordFeedback(label: string) {
    setFeedback(label);
    trackCloutEvent("cc_package_feedback", { opp_hash: opportunityHash });
  }

  return (
    <>
      <div className="feedback-controls" aria-label="Package feedback">
        {["Useful", "Needs revision", "Wrong niche", "Too late", "Source issue", "Rights concern", "Used successfully"].map((label) => (
          <button className="button button-secondary button-small" type="button" key={label} onClick={() => recordFeedback(label)}>{label}</button>
        ))}
      </div>
      {feedback ? <p className="desk-success" role="status">Feedback recorded in this session: {feedback}.</p> : null}
    </>
  );
}
