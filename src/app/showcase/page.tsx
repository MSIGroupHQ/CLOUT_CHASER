import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { AgenticBunnyDesk } from "@/components/clout/AgenticBunnyDesk";
import { GpuMemeGenerator } from "@/components/clout/GpuMemeGenerator";
import { KloutBunnyGallery } from "@/components/clout/KloutBunnyGallery";
import { LeeTwinsSpotlight } from "@/components/clout/LeeTwinsSpotlight";
import { TechInfrastructureFlex } from "@/components/clout/TechInfrastructureFlex";
import { VideoAdGallery } from "@/components/clout/VideoAdGallery";
import { assertPublicRouteSafe } from "@/lib/clout/public-route-safety";

export const metadata: Metadata = {
  title: "Clout Chaser — Agentic Showcase",
  description: "Nonchalant attention intelligence. Drop a link. Thanks Hawkes.",
};

export default function ShowcasePage() {
  assertPublicRouteSafe("/showcase", { page: "showcase" });
  return (
    <div className="showcase-container bg-[#05050c] text-white min-h-screen">
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
          <span className="font-bold tracking-tight text-lg">CLOUT CHASER</span>
          <span className="text-xs bg-[#ff2d95]/20 text-[#ff2d95] border border-[#ff2d95]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
            thanks hawkes.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/opportunities"
            className="text-sm font-medium text-white/80 hover:text-white transition"
          >
            Radar
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-white/80 hover:text-white transition"
          >
            Pricing
          </Link>
          <Link
            href="/sample"
            className="bg-[#00f0ff] text-black font-bold text-sm px-4 py-2 rounded-full hover:bg-white transition"
          >
            Opportunity Brief
          </Link>
        </div>
      </header>

      {/* HERO BANNER SHOWCASE */}
      <section className="pt-28 pb-12 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          KLOUT CHASERS <span className="text-[#00f0ff]">BUNNY MIX</span>
        </h1>
        <p className="text-base md:text-lg text-white/60 max-w-lg mx-auto mb-8 font-mono">
          thanks hawkes.
        </p>

        {/* HERO IMAGE SHOWCASE */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl max-w-4xl mx-auto mb-12 group">
          <Image
            src="/media/brand/moody_bunny_pyramid.webp"
            alt="Moody Bunny Pyramid"
            width={1200}
            height={675}
            className="w-full h-auto object-cover group-hover:scale-105 transition duration-700"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="text-left">
              <div className="text-xs text-[#00f0ff] font-mono font-bold uppercase tracking-wider mb-1">
                CANON BRAND ASSET
              </div>
              <div className="text-xl font-bold text-white">The 5 Klout Bunnies — Studio Pyramid</div>
            </div>
            <a
              href="/media/Klout-Chasers-Bunny-Mix.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ff2d95] text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition shadow-lg"
            >
              Launch Bunny Mix Player ↗
            </a>
          </div>
        </div>
      </section>

      {/* GPU MEME GENERATOR */}
      <GpuMemeGenerator />

      {/* AGENTIC INTERACTIVE DESK */}
      <section className="py-8 px-6">
        <AgenticBunnyDesk />
      </section>

      {/* THREE-COLUMN CHARACTER GALLERY */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0a0a14] border border-white/10 rounded-2xl overflow-hidden p-4">
            <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
              <Image
                src="/media/brand/moody_bunny_portrait.webp"
                alt="Moody Bunny Portrait"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <h3 className="font-bold text-base text-white">Moody Bunny</h3>
            <p className="text-xs font-mono text-white/50 mt-1">thanks hawkes.</p>
          </div>

          <div className="bg-[#0a0a14] border border-white/10 rounded-2xl overflow-hidden p-4">
            <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
              <Image
                src="/media/brand/olivia-bunny-fur-color-4c302b-dark-chocolate-brown.webp"
                alt="Olivia Brown Rabbit"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <h3 className="font-bold text-base text-white">Olivia</h3>
            <p className="text-xs font-mono text-white/50 mt-1">thanks hawkes.</p>
          </div>

          <div className="bg-[#0a0a14] border border-white/10 rounded-2xl overflow-hidden p-4">
            <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
              <Image
                src="/media/brand/brother_k_pushing_arcade.webp"
                alt="Brother K Arcade"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <h3 className="font-bold text-base text-white">Brother K</h3>
            <p className="text-xs font-mono text-white/50 mt-1">thanks hawkes.</p>
          </div>
        </div>
      </section>

      {/* RUNWAY AI VIDEO AD GALLERY */}
      <VideoAdGallery />

      {/* LEE_TWINS$ SOUTH KOREAN CULT DUO & CECEE FOUNDER SPOTLIGHT */}
      <LeeTwinsSpotlight />

      {/* KLOUT BUNNY MEDIA GALLERY */}
      <KloutBunnyGallery />

      {/* TECH INFRASTRUCTURE FLEX */}
      <TechInfrastructureFlex />

      {/* FOOTER CTA */}
      <footer className="py-12 border-t border-white/10 text-center px-6">
        <div className="flex justify-center items-center gap-3 mb-3">
          <Image
            src="/assets/rdcm_embossed_icon.webp"
            alt="RDCM Seal"
            width={32}
            height={32}
            className="rounded-full"
            unoptimized
          />
          <span className="font-bold text-white">CLOUT CHASER</span>
        </div>
        <p className="text-xs font-mono text-[#ff2d95] mb-6">
          thanks hawkes.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/opportunities" className="text-xs text-white/70 hover:text-white">
            Opportunities
          </Link>
          <Link href="/pricing" className="text-xs text-white/70 hover:text-white">
            Pricing
          </Link>
          <Link href="/sample" className="text-[#00f0ff] text-xs font-bold hover:underline">
            Opportunity Brief
          </Link>
        </div>
      </footer>
    </div>
  );
}
