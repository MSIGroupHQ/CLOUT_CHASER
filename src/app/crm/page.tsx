"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface SavedOpportunity {
  id: string;
  title: string;
  niche: string;
  subculture: string;
  status: "SAVED" | "IN_PRODUCTION" | "PUBLISHED";
  hawkesScore: string;
  whopConversions: number;
}

const INITIAL_PIPELINE: SavedOpportunity[] = [
  {
    id: "CC-POP-881",
    title: "Corridos Tumbados & LatAm Streamer Audio Spike",
    niche: "LatAm Pop Culture",
    subculture: "LatAm & Spanish-Language Pop",
    status: "IN_PRODUCTION",
    hawkesScore: "4.9 (A+)",
    whopConversions: 14
  },
  {
    id: "CC-POP-742",
    title: "UK Drill & Archive Streetwear Drop Reaction",
    niche: "Streetwear & Music",
    subculture: "UK & European Subcultures",
    status: "SAVED",
    hawkesScore: "3.2 (A)",
    whopConversions: 8
  },
  {
    id: "CC-POP-904",
    title: "VTuber & Anime Season Launch Clip Cascade",
    niche: "Anime & Gaming",
    subculture: "Asia-Pacific & Gaming",
    status: "PUBLISHED",
    hawkesScore: "2.8 (A)",
    whopConversions: 27
  }
];

export default function CreatorCrmPage() {
  const [pipeline, setPipeline] = useState<SavedOpportunity[]>(INITIAL_PIPELINE);
  const [activeTab, setActiveTab] = useState<"pipeline" | "cult_signals">("pipeline");

  const totalWhopConversions = pipeline.reduce((acc, curr) => acc + curr.whopConversions, 0);

  return (
    <div className="subpage-main bg-[#05050c] text-white min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
              NATIVE CREATOR COMMAND CENTER
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              CREATOR MINI-CRM
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                activeTab === "pipeline"
                  ? "bg-[#00f0ff] text-black"
                  : "bg-white/10 text-white/70 hover:text-white"
              }`}
            >
              My Content Pipeline
            </button>
            <button
              onClick={() => setActiveTab("cult_signals")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                activeTab === "cult_signals"
                  ? "bg-[#ff2d95] text-white"
                  : "bg-white/10 text-white/70 hover:text-white"
              }`}
            >
              8-Lane Cult Signals
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5">
            <div className="text-xs font-mono text-white/50 uppercase tracking-wider mb-1">Active Pipeline</div>
            <div className="text-2xl font-bold font-mono text-white">{pipeline.length} Signals</div>
            <div className="text-xs text-[#00f0ff] mt-1">3 In Production</div>
          </div>

          <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5">
            <div className="text-xs font-mono text-white/50 uppercase tracking-wider mb-1">Whop Member Signups</div>
            <div className="text-2xl font-bold font-mono text-[#ff2d95]">{totalWhopConversions} Members</div>
            <div className="text-xs text-white/60 mt-1">From published opportunity clips</div>
          </div>

          <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5">
            <div className="text-xs font-mono text-white/50 uppercase tracking-wider mb-1">Hawkes Engine Posture</div>
            <div className="text-2xl font-bold font-mono text-[#10b981]">ACTIVE</div>
            <div className="text-xs text-white/60 mt-1">thanks hawkes.</div>
          </div>
        </div>

        {/* PIPELINE TAB */}
        {activeTab === "pipeline" && (
          <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Saved Opportunities & Clip Pipeline</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-mono text-white/50 uppercase">
                    <th className="py-3 px-4">Signal ID</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Subculture Lane</th>
                    <th className="py-3 px-4">Hawkes Grade</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Whop Leads</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pipeline.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition">
                      <td className="py-3.5 px-4 font-mono text-xs text-[#00f0ff]">{item.id}</td>
                      <td className="py-3.5 px-4 font-semibold text-white">{item.title}</td>
                      <td className="py-3.5 px-4 text-xs text-white/70">{item.subculture}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-[#10b981]">{item.hawkesScore}</td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase ${
                          item.status === "IN_PRODUCTION"
                            ? "bg-[#ff2d95]/20 text-[#ff2d95] border border-[#ff2d95]/30"
                            : item.status === "PUBLISHED"
                            ? "bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30"
                            : "bg-white/10 text-white/60"
                        }`}>
                          {item.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-white/90">{item.whopConversions} members</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CULT SIGNALS TAB */}
        {activeTab === "cult_signals" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { lane: "LANE 01", title: "US Underground & Viral Memes", desc: "TikTok audio trends, Kick/Twitch streamer clips, reaction metas." },
              { lane: "LANE 02", title: "UK & European Subcultures", desc: "Drill instrumentals, Corteiz streetwear drops, Premier League banter." },
              { lane: "LANE 03", title: "LatAm & Spanish Pop", desc: "Corridos Tumbados audio, Peso Pluma style, Spanish Kick/Twitch drops." },
              { lane: "LANE 04", title: "Asia-Pacific & Anime/Gaming", desc: "Solo Leveling season drops, VTubers, K-Pop comeback teasers." },
              { lane: "LANE 05", title: "Middle East & Gulf Trends", desc: "Arabic X discourse, Dubai luxury drops, eSports World Cup." },
              { lane: "LANE 06", title: "High-Fashion & Streetwear", desc: "Archive fashion, Paris Fashion Week memes, Grailed sneaker drops." },
              { lane: "LANE 07", title: "Crypto & Internet Money", desc: "Solana/Base metas, FinTwit discourse, trader meme lore." },
              { lane: "LANE 08", title: "Underground Music & Micro-Niches", desc: "Phonk beats, speed-up compilations, underground rap drops." },
            ].map((sub) => (
              <div key={sub.lane} className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 hover:border-[#ff2d95]/40 transition">
                <div className="text-xs font-mono text-[#ff2d95] font-bold mb-1">{sub.lane}</div>
                <h3 className="text-base font-bold text-white mb-2">{sub.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{sub.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
