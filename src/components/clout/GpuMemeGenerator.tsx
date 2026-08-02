"use client";

import Image from "next/image";
import { useState } from "react";

type GenerationResult = {
  ok: boolean;
  generationId?: string;
  prompt?: string;
  imageUrl?: string;
  suggestedCaption?: string;
  gpuProvider?: string;
  computeCostCents?: number;
  userFeeCents?: number;
  error?: string;
};

export function GpuMemeGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/clout/generate-meme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ ok: false, error: "Network error generating image. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="gpu-meme-generator-section py-12 px-6 max-w-6xl mx-auto my-12 border-t border-white/10">
      <div className="text-center mb-8">
        <span className="text-xs font-mono text-[#ff2d95] uppercase tracking-widest bg-[#ff2d95]/10 border border-[#ff2d95]/30 px-3 py-1 rounded-full inline-block mb-3">
          INSTANT GPU MEME &amp; BACKGROUND GENERATOR • FLUX / H100
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          PROMPT TO VIRAL MEME ASSET
        </h2>
        <p className="text-sm text-white/60 max-w-xl mx-auto mt-2 font-mono">
          Enter a topic, scene, or meme premise. Generate high-resolution visuals powered by serverless GPU pods.
        </p>
      </div>

      <div className="bg-[#0a0a14] border border-white/15 rounded-3xl p-6 md:p-8 max-w-4xl mx-auto shadow-2xl">
        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Cyberpunk rabbit mascot in neon dark studio analyzing viral signals..."
            className="flex-1 bg-black/60 border border-white/20 rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-[#00f0ff] font-sans"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="px-8 py-3.5 bg-[#ff2d95] text-white font-mono font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-white hover:text-black transition duration-300 disabled:opacity-50 shadow-[0_0_15px_#ff2d95]"
          >
            {loading ? "RENDERING GPU..." : "GENERATE ($0.25) →"}
          </button>
        </form>

        {result && result.ok && result.imageUrl ? (
          <div className="mt-8 border border-white/10 rounded-2xl p-6 bg-black/40 flex flex-col md:flex-row gap-6 items-center">
            <div className="relative w-full md:w-1/2 aspect-video rounded-xl overflow-hidden border border-white/15">
              <Image
                src={result.imageUrl}
                alt={result.prompt || "Generated Meme"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1 text-left">
              <div className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-wider mb-1">
                {result.gpuProvider} • COGS: ${(result.computeCostCents! / 100).toFixed(3)}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">&quot;{result.prompt}&quot;</h3>
              <p className="text-xs text-white/70 bg-white/5 p-3 rounded-lg border border-white/10 mb-4 font-mono">
                💡 Suggested Caption: {result.suggestedCaption}
              </p>
              <div className="flex gap-3">
                <a
                  href={result.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 text-white font-mono text-xs rounded-full hover:bg-white hover:text-black transition"
                >
                  Download Asset ↗
                </a>
              </div>
            </div>
          </div>
        ) : null}

        {result && !result.ok ? (
          <div className="p-4 bg-[#ff4545]/10 border border-[#ff4545]/30 rounded-xl text-xs text-[#ff4545] font-mono text-center">
            {result.error}
          </div>
        ) : null}
      </div>
    </section>
  );
}
