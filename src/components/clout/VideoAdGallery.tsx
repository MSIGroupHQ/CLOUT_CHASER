import Image from "next/image";

export interface VideoItem {
  id: string;
  title: string;
  category: "Master Launch" | "A/B Ad Variant" | "Runway Scene Cut";
  duration: string;
  src: string;
  poster: string;
  description: string;
}

export const VIDEO_GALLERY_ITEMS: readonly VideoItem[] = [
  {
    id: "v-master",
    title: "30-Second Master Commercial Launch Trailer",
    category: "Master Launch",
    duration: "0:30",
    src: "/media/video/runway-clout-chaser-launch-30s-20260731-151332.mp4",
    poster: "/media/brand/moody_bunny_pyramid.webp",
    description: "Official 30-second Runway AI commercial launch trailer featuring all 5 Klout bunnies."
  },
  {
    id: "v-ad-a",
    title: "Commercial Variant A — 15s Viral Hook",
    category: "A/B Ad Variant",
    duration: "0:15",
    src: "/media/video/clout_ad_hook_variant_a_15s.mp4",
    poster: "/media/brand/olivia-bunny-fur-color-4c302b-dark-chocolate-brown.webp",
    description: "High-retention 15-second opening hook variant for TikTok and Reels ads."
  },
  {
    id: "v-ad-b",
    title: "Commercial Variant B — 15s Core Proof",
    category: "A/B Ad Variant",
    duration: "0:15",
    src: "/media/video/clout_ad_core_variant_b_15s.mp4",
    poster: "/media/brand/brother_k_pushing_arcade.webp",
    description: "15-second core proof demonstration featuring opportunity cards and score breakdown."
  },
  {
    id: "v-ad-c",
    title: "Commercial Variant C — 15s Outro CTA",
    category: "A/B Ad Variant",
    duration: "0:15",
    src: "/media/video/clout_ad_outro_variant_c_15s.mp4",
    poster: "/media/brand/black-rabbit-with-black-fur-all-black-hoodie-hood.webp",
    description: "15-second high-converting call-to-action outro variant."
  },
  {
    id: "v-ad-d",
    title: "Commercial Variant D — 6s Fast Bumper",
    category: "A/B Ad Variant",
    duration: "0:06",
    src: "/media/video/clout_ad_bumper_6s.mp4",
    poster: "/media/brand/neon_bunny_arrival.webp",
    description: "6-second rapid bumper ad for YouTube Shorts and Instagram Stories."
  },
  {
    id: "v-cut-1",
    title: "Find Tomorrow's Viral Content Today",
    category: "Runway Scene Cut",
    duration: "0:08",
    src: "/media/video/Find_Tomorrows_Viral_Content_Today.mp4",
    poster: "/media/brand/neon_rabbits_synthwave.webp",
    description: "Runway AI cinematic scene cut 1."
  },
  {
    id: "v-cut-2",
    title: "Console Opening & Arcade Setup",
    category: "Runway Scene Cut",
    duration: "0:08",
    src: "/media/video/Console_Opening.mp4",
    poster: "/media/brand/brother_k_pushes_cabinet.webp",
    description: "Runway AI console opening scene cut."
  },
  {
    id: "v-cut-3",
    title: "Brother K Arcade Machine Sequence",
    category: "Runway Scene Cut",
    duration: "0:09",
    src: "/media/video/Arcade.mp4",
    poster: "/media/brand/another-variation-of-letter-u-giant-arcade-machine.webp",
    description: "Brother K arcade sequence scene cut."
  }
];

export function VideoAdGallery() {
  return (
    <section className="video-ad-gallery py-16 px-6 max-w-6xl mx-auto border-t border-white/10">
      <div className="text-center mb-10">
        <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-3 py-1 rounded-full inline-block mb-3">
          RUNWAY AI COMMERCIAL & A/B AD CUTS
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          VIDEO TRAILERS & COMMERCIAL CUTS
        </h2>
        <p className="text-sm text-white/60 max-w-xl mx-auto mt-2 font-mono">
          30s Master Launch Trailer + 15s Hook, Core, Outro & 6s Bumper A/B Testing Ad Cuts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {VIDEO_GALLERY_ITEMS.slice(0, 2).map((item) => (
          <div key={item.id} className="bg-[#0a0a14] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="relative aspect-video bg-black">
              <video controls poster={item.poster} className="w-full h-full object-cover">
                <source src={item.src} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
              <div className="absolute top-3 left-3 bg-[#0a0a14]/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-xs font-mono text-[#00f0ff] font-bold uppercase">
                {item.category} • {item.duration}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* A/B AD VARIANTS GRID */}
      <h3 className="text-xl font-bold text-white mb-6 text-center tracking-tight">
        A/B TESTING COMMERCIAL AD CUTS
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {VIDEO_GALLERY_ITEMS.slice(2).map((item) => (
          <div key={item.id} className="bg-[#0a0a14] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#ff2d95]/40 transition">
            <div className="relative aspect-video bg-black">
              <video controls poster={item.poster} className="w-full h-full object-cover">
                <source src={item.src} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
              <div className="absolute top-2 left-2 bg-[#0a0a14]/80 backdrop-blur-md border border-white/15 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#ff2d95] uppercase">
                {item.category} • {item.duration}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-sm text-white mb-1">{item.title}</h4>
              <p className="text-xs text-white/50 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
