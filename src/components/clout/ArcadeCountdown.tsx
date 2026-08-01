"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ArcadeCountdownProps {
  initialSeconds?: number;
  onExpire?: () => void;
  title?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function ArcadeCountdown({
  initialSeconds = 10,
  onExpire,
  title = "LIMITED PREVIEW TIME",
  ctaText = "CLAIM PACKAGE NOW",
  ctaHref = "/pricing",
}: ArcadeCountdownProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isGameOver, setIsGameOver] = useState(false);
  const [credits, setCredits] = useState(1);

  useEffect(() => {
    if (seconds <= 0) {
      setIsGameOver(true);
      if (onExpire) onExpire();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onExpire]);

  const handleInsertCoin = () => {
    setCredits((prev) => prev + 1);
    setSeconds(15);
    setIsGameOver(false);
  };

  return (
    <div className="arcade-box my-8 p-6 rounded-2xl border-2 border-[#00f0ff]/40 bg-[#07070d] text-center relative overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.15)]">
      {/* SCANLINE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10" />

      {isGameOver ? (
        <div className="py-6 animate-pulse">
          <div className="text-4xl md:text-6xl font-extrabold tracking-widest text-[#ff2d95] drop-shadow-[0_0_20px_#ff2d95] font-mono mb-4">
            GAME OVER
          </div>
          <p className="text-sm font-mono text-white/70 mb-6 uppercase tracking-wider">
            PREVIEW CREDIT EXPIRED • INSERT COIN TO RESTART
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center z-20 relative">
            <button
              onClick={handleInsertCoin}
              type="button"
              className="px-6 py-3 bg-[#00f0ff] text-black font-mono font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition duration-300 shadow-[0_0_15px_#00f0ff]"
            >
              🪙 INSERT COIN (CONTINUE)
            </button>
            <Link
              href={ctaHref}
              className="px-6 py-3 bg-[#ff2d95] text-white font-mono font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition duration-300 shadow-[0_0_15px_#ff2d95]"
            >
              {ctaText} →
            </Link>
          </div>
        </div>
      ) : (
        <div className="relative z-20">
          <div className="flex items-center justify-between text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-3 border-b border-[#00f0ff]/20 pb-2">
            <span>🕹️ ARCADE STUDIO TIMER</span>
            <span>CREDITS: {credits}</span>
          </div>

          <h3 className="text-xs font-mono text-white/70 uppercase tracking-widest mb-2">
            {title}
          </h3>

          <div className="text-5xl md:text-7xl font-extrabold font-mono text-[#00f0ff] tracking-tight drop-shadow-[0_0_25px_#00f0ff] my-4">
            00:{seconds < 10 ? `0${seconds}` : seconds}
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center mt-4">
            <Link
              href={ctaHref}
              className="px-6 py-2.5 bg-[#00f0ff] text-black font-mono font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition duration-300 shadow-[0_0_15px_#00f0ff]"
            >
              {ctaText}
            </Link>
            <button
              onClick={handleInsertCoin}
              type="button"
              className="px-4 py-2.5 bg-white/10 text-white font-mono text-xs uppercase tracking-wider rounded-full border border-white/20 hover:border-[#00f0ff] hover:text-[#00f0ff] transition"
            >
              + ADD 15s CREDIT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
