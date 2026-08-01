"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface AgenticResponse {
  oppHash: string;
  niche: string;
  status: string;
  hawkesNote: string;
  sampleHook: string;
}

export function AgenticBunnyDesk() {
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AgenticResponse | null>(null);

  const handleAgentScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setLoading(true);
    setResult(null);

    // Simulate instant agentic evaluation
    setTimeout(() => {
      const hash = `CC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setResult({
        oppHash: hash,
        niche: inputUrl.includes("tech") || inputUrl.includes("ai") ? "AI Infrastructure" : "Creator Dynamics",
        status: "ACTIVE",
        hawkesNote: "thanks hawkes.",
        sampleHook: "The signal is live. Don't overthink it.",
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="agentic-desk bg-[#0c0c18] border border-white/15 rounded-3xl p-6 md:p-8 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
      {/* AGENTIC HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#ff2d95]/40 shadow-lg">
            <Image
              src="/media/brand/moody_bunny_portrait.webp"
              alt="Moody Bunny Agent"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <div className="text-white font-bold text-base flex items-center gap-2">
              OLIVIA, LISA &amp; BROTHER K
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            </div>
            <div className="text-xs text-white/50 font-mono font-semibold">AUTONOMOUS OPERATOR DESK</div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-[#ff2d95] bg-[#ff2d95]/10 border border-[#ff2d95]/30 px-3 py-1 rounded-full uppercase tracking-wider">
            thanks hawkes.
          </span>
        </div>
      </div>

      {/* INPUT FORM */}
      <form onSubmit={handleAgentScan} className="mb-6">
        <label className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-wider">
          Drop a link, handle, or topic:
        </label>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://x.com/... or youtube.com/watch?v=..."
            className="flex-1 bg-[#05050c] border border-white/15 rounded-full px-5 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#00f0ff] transition font-mono"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#00f0ff] hover:bg-white text-black font-bold text-sm px-6 py-3 rounded-full transition shrink-0 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Scanning...
              </>
            ) : (
              "Run Agent Scan"
            )}
          </button>
        </div>
      </form>

      {/* AGENTIC OUTPUT CARD */}
      {result && (
        <div className="bg-[#05050c] border border-[#00f0ff]/30 rounded-2xl p-6 transition-all duration-500 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-mono text-white/50">HASH: <strong className="text-white">{result.oppHash}</strong></span>
            <span className="text-xs font-mono text-[#00f0ff] font-bold">{result.hawkesNote}</span>
          </div>

          <div className="text-sm text-white/90 mb-4 font-medium leading-relaxed">
            "{result.sampleHook}"
          </div>

          <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/10 text-xs gap-3">
            <span className="text-white/60">Category: <strong className="text-white">{result.niche}</strong></span>
            <Link
              href={`/r/${result.oppHash}`}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full font-mono transition"
            >
              View Receipt ↗
            </Link>
          </div>
        </div>
      )}

      {/* NONCHALANT FOOTER BADGE */}
      <div className="mt-6 pt-4 border-t border-white/10 text-center flex justify-between items-center text-[11px] text-white/40 font-mono">
        <span>NO EXPOSITION. NO FLUFF.</span>
        <span>thanks hawkes.</span>
      </div>
    </div>
  );
}
