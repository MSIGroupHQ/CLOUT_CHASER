"use client";

import { useMemo, useState } from "react";
import { OpportunityCard } from "@/components/clout/OpportunityCard";
import type { SeedOpportunity } from "@/lib/clout/seed";
import { CLOUT_REGIONS, type CloutRegionId } from "@/lib/clout/regions";

type Props = {
  opportunities: readonly SeedOpportunity[];
};

export function GlobalFeed({ opportunities }: Props) {
  const [region, setRegion] = useState<CloutRegionId | "ALL">("ALL");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const o of opportunities) {
      const r = o.region || "GLOBAL";
      map.set(r, (map.get(r) || 0) + 1);
    }
    return map;
  }, [opportunities]);

  const filtered = useMemo(() => {
    if (region === "ALL") return [...opportunities].sort((a, b) => b.score - a.score);
    return opportunities
      .filter((o) => (o.region || "GLOBAL") === region)
      .sort((a, b) => b.score - a.score);
  }, [opportunities, region]);

  return (
    <section className="section-shell seed-opportunities-section" id="opportunities">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">Global feed · every country has a Beyoncé</span>
          <h2>Tomorrow&apos;s viral content — ranked worldwide.</h2>
        </div>
        <p>
          Not a US-only feed. Filter by region. Paste a public link once; Open Claw + REACH heat
          do the rest. You post the output.
        </p>
      </div>

      <div className="global-feed-filters" role="tablist" aria-label="Filter by region">
        <button
          type="button"
          role="tab"
          aria-selected={region === "ALL"}
          className={region === "ALL" ? "global-feed-chip active" : "global-feed-chip"}
          onClick={() => setRegion("ALL")}
        >
          All · {opportunities.length}
        </button>
        {CLOUT_REGIONS.map((r) => {
          const n = counts.get(r.id) || 0;
          if (n === 0 && r.id !== "GLOBAL") return null;
          return (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={region === r.id}
              className={region === r.id ? "global-feed-chip active" : "global-feed-chip"}
              onClick={() => setRegion(r.id)}
              title={r.blurb}
            >
              {r.flag} {r.label}
              {n > 0 ? ` · ${n}` : ""}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="global-feed-empty">
          No packages in this region yet. Paste a public source link below — Open Claw will
          region-tag it and queue a package.
        </p>
      ) : (
        <div className="opportunity-card-grid">
          {filtered.map((opportunity) => (
            <OpportunityCard key={opportunity.oppHash} opportunity={opportunity} />
          ))}
        </div>
      )}
    </section>
  );
}
