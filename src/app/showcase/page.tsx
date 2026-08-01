import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clout Chaser — Interactive Bunny Mix & Brand Showcase",
  description: "Experience the interactive Klout Bunny Mix, moody bunny pyramid, and attention intelligence showcase.",
};

export default function ShowcasePage() {
  return (
    <div className="showcase-container bg-[#05050c] text-white min-h-screen">
      {/* HEADER NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a14]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/rdcm_embossed_icon.webp"
            alt="RDCM Clout Chaser Seal"
            width={36}
            height={36}
            className="rounded-full"
            unoptimized
          />
          <span className="font-bold tracking-tight text-lg">CLOUT CHASER</span>
          <span className="text-xs bg-[#ff2d95]/20 text-[#ff2d95] border border-[#ff2d95]/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
            SHOWCASE MIX
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
            Get Opportunity Brief
          </Link>
        </div>
      </header>

      {/* HERO BANNER SHOWCASE */}
      <section className="pt-28 pb-16 px-6 max-w-6xl mx-auto text-center">
        <div className="inline-block bg-[#ff2d95]/10 border border-[#ff2d95]/30 text-[#ff2d95] text-xs font-mono px-3 py-1 rounded-full uppercase tracking-widest mb-6">
          ATTENTION INTELLIGENCE ENGINE • DSE S-RANK CERTIFIED
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
          KLOUT CHASERS <span className="text-[#00f0ff]">BUNNY MIX</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10">
          Find tomorrow’s viral content today. Powered by Hawkes process decay mathematics, OpenAlex research graphs, and sub-second signal parsing.
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
              Launch Interactive Mix Player ↗
            </a>
          </div>
        </div>
      </section>

      {/* THREE-COLUMN CHARACTER GALLERY */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 tracking-tight text-white">
          THE KLOUT CHASER CANON CAST
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0a0a14] border border-white/10 rounded-xl overflow-hidden p-4">
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <Image
                src="/media/brand/moody_bunny_portrait.webp"
                alt="Moody Bunny Portrait"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <h3 className="font-bold text-lg text-white">Moody Bunny — Solo Portrait</h3>
            <p className="text-xs text-white/60 mt-1">High-density attention analysis & trend forecasting.</p>
          </div>

          <div className="bg-[#0a0a14] border border-white/10 rounded-xl overflow-hidden p-4">
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <Image
                src="/media/brand/olivia-bunny-fur-color-4c302b-dark-chocolate-brown.webp"
                alt="Olivia Brown Rabbit"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <h3 className="font-bold text-lg text-white">Olivia — Dark Chocolate Edition</h3>
            <p className="text-xs text-white/60 mt-1">Creamy cocoa 4c302b canon colorway & B-roll arrival state.</p>
          </div>

          <div className="bg-[#0a0a14] border border-white/10 rounded-xl overflow-hidden p-4">
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <Image
                src="/media/brand/brother_k_pushing_arcade.webp"
                alt="Brother K Arcade"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <h3 className="font-bold text-lg text-white">Brother K — Arcade Push</h3>
            <p className="text-xs text-white/60 mt-1">Synthwave arcade cabinet & content package compiler.</p>
          </div>
        </div>
      </section>

      {/* VIDEO TRAILER SHOWCASE */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4 tracking-tight text-white">
          30-SECOND COMMERCIAL LAUNCH TRAILER
        </h2>
        <p className="text-sm text-white/60 mb-8 max-w-xl mx-auto">
          Produced via Runway AI. Sliced into 15s Hook, 15s Core, and 6s Bumper A/B testing ad variants.
        </p>

        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
          <video
            controls
            poster="/media/brand/moody_bunny_pyramid.webp"
            className="w-full h-full object-contain"
          >
            <source src="/media/video/runway-clout-chaser-launch-30s-20260731-151332.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="py-12 border-t border-white/10 text-center px-6">
        <div className="flex justify-center items-center gap-3 mb-4">
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
        <p className="text-xs text-white/50 mb-6">
          A Prime 88 Attention-Intelligence & Autonomous Compiler System.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/opportunities" className="text-xs text-white/70 hover:text-white">
            Opportunities
          </Link>
          <Link href="/pricing" className="text-xs text-white/70 hover:text-white">
            Pricing
          </Link>
          <Link href="/sample" className="text-[#00f0ff] text-xs font-bold hover:underline">
            Free Sample Brief
          </Link>
        </div>
      </footer>
    </div>
  );
}
