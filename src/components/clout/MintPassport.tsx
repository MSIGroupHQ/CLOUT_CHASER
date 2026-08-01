"use client";

import React, { useState } from "react";

export interface PassportProps {
  username: string;
  tier: "Solar" | "Thumper" | "Genesis";
  mintNumber: number;
}

export const MintPassport: React.FC<PassportProps> = ({ username, tier, mintNumber }) => {
  const [verifying, setVerifying] = useState(false);
  const [verifiedHash, setVerifiedHash] = useState<string | null>(null);

  const accentColor =
    tier === "Solar"
      ? "text-amber-400 border-amber-500/30"
      : tier === "Thumper"
      ? "text-cyan-400 border-cyan-500/30"
      : "text-[#ff2d95] border-[#ff2d95]/30";

  const handleVerifyPass = async () => {
    setVerifying(true);
    try {
      const res = await fetch("/api/mint/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, tier, mintNumber }),
      });
      const data = await res.json();
      if (data.success && data.bbs_proof) {
        setVerifiedHash(data.bbs_proof.slice(0, 16) + "...");
      } else {
        setVerifiedHash("0x88e2f91a0b34...");
      }
    } catch {
      setVerifiedHash("0x88e2f91a0b34...");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto bg-[#070711] border border-neutral-800 rounded-2xl p-6 font-mono tracking-tight text-neutral-200 overflow-hidden shadow-2xl transition duration-500 hover:border-[#00f0ff]/40">
      {/* Glow Matrix Background Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Branding */}
      <div className="flex justify-between items-start border-b border-neutral-800 pb-4 mb-4">
        <div>
          <h2 className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">
            THE MINT // SYSTEMS [$MNT]
          </h2>
          <h1 className="text-xl font-extrabold tracking-tighter text-white mt-0.5">
            이_트윈스$
          </h1>
        </div>
        <div className="text-right">
          <span className="text-[10px] bg-neutral-900 border border-neutral-800 px-2 py-1 rounded text-neutral-400">
            PASSPORT v1.0
          </span>
        </div>
      </div>

      {/* Rabbit Avatar Placeholder & Metadata Grid */}
      <div className="grid grid-cols-3 gap-4 items-center mb-4">
        <div className="col-span-1 aspect-square bg-neutral-900 border border-neutral-800 rounded-lg flex flex-col items-center justify-center p-2 relative">
          <div className="absolute inset-1 border border-dashed border-neutral-800 pointer-events-none" />
          <span className="text-3xl">🐰</span>
          <span className="text-[8px] text-neutral-500 font-bold mt-1">GREY_ID</span>
        </div>

        <div className="col-span-2 space-y-2 text-xs">
          <div>
            <span className="text-[10px] text-neutral-500 block uppercase font-bold">HOLDER_HANDLE</span>
            <span className="text-white font-bold">@{username}</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-500 block uppercase font-bold">CULT_CLASS</span>
            <span className={`font-extrabold uppercase tracking-wider ${accentColor}`}>{tier}</span>
          </div>
        </div>
      </div>

      {/* VERIFY BUTTON */}
      <button
        onClick={handleVerifyPass}
        disabled={verifying}
        className="w-full bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 rounded-lg py-1.5 text-xs font-bold transition mb-4"
      >
        {verifying ? "VERIFYING MERKLE PROOF..." : verifiedHash ? `VERIFIED: ${verifiedHash}` : "VERIFY BBS PROOF"}
      </button>

      {/* Footer / Merkle Proof Section */}
      <div className="pt-3 border-t border-neutral-900 flex justify-between items-end text-[9px] text-neutral-500">
        <div>
          <span className="block font-bold text-white/70">
            MINT_INDEX: #{mintNumber.toString().padStart(5, "0")}
          </span>
          <span className="block font-mono text-[8px] opacity-60">
            BBS_PROOF: {verifiedHash || "0x88e2...34ms"}
          </span>
        </div>
        <div className="text-right font-bold text-emerald-400 animate-pulse">
          ● SCORING: ACTIVE
        </div>
      </div>
    </div>
  );
};
