import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AgenticBunnyDesk } from "@/components/clout/AgenticBunnyDesk";
import { KloutBunnyGallery } from "@/components/clout/KloutBunnyGallery";
import { LeeTwinsSpotlight } from "@/components/clout/LeeTwinsSpotlight";
import { TechInfrastructureFlex } from "@/components/clout/TechInfrastructureFlex";
import { VideoAdGallery } from "@/components/clout/VideoAdGallery";

export const metadata: Metadata = {
  title: "Clout Chaser — Interactive Klout Bunny Mix",
  description: "Official interactive Klout Bunny Mix player, LeeTwins$ fandom passport, and agentic attention showcase.",
};

export default function BunnyMixPage() {
  return (
    <div className="bunny-mix-container bg-[#05050c] text-white min-h-screen">
      {/* HEADER NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a14]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/rdcm_embossed_icon.webp"
            alt="RDCM Seal"
            width={36}
            height={36}
            className="rounded-full"
            unoptimized
          />
          <span className="font-bold tracking-tight text-lg">CLOUT CHASER // BUNNY MIX</span>
          <span className="text-xs bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
            이_트윈스$ LIVE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/showcase" className="text-sm font-medium text-white/80 hover:text-white transition">
            Showcase
          </Link>
          <Link href="/opportunities" className="text-sm font-medium text-white/80 hover:text-white transition">
            Radar
          </Link>
          <a
            href="/media/Klout-Chasers-Bunny-Mix.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#ff2d95] text-white font-bold text-sm px-4 py-2 rounded-full hover:bg-white hover:text-black transition shadow-lg"
          >
            Standalone Mix HTML ↗
          </a>
        </div>
      </header>

      {/* HERO BUNNY MIX HEADER */}
      <section className="pt-28 pb-10 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-3 font-mono">
          KLOUT CHASERS <span className="text-[#00f0ff]">BUNNY MIX</span>
        </h1>
        <p className="text-sm md:text-base font-mono text-white/60 max-w-xl mx-auto mb-6">
          &quot;We print the green, they eat the green.&quot; — Powered by NVIDIA NIM H100 GPUs &amp; MIDAS 1000x WASM scoring.
        </p>

        <div className="relative aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden border border-[#00f0ff]/30 shadow-2xl bg-black mb-12">
          <iframe
            src="/media/Klout-Chasers-Bunny-Mix.html"
            className="w-full h-full border-0"
            title="Klout Chasers Bunny Mix Interactive Player"
          />
        </div>
      </section>

      {/* AGENTIC DESK */}
      <section className="py-6 px-6">
        <AgenticBunnyDesk />
      </section>

      {/* SOUTH KOREAN CULT DUO & MINT PASSPORT GENERATOR */}
      <LeeTwinsSpotlight />

      {/* VIDEO AD GALLERY */}
      <VideoAdGallery />

      {/* FULL KLOUT BUNNY MEDIA GALLERY */}
      <KloutBunnyGallery />

      {/* TECH INFRASTRUCTURE FLEX */}
      <TechInfrastructureFlex />
    </div>
  );
}
