import Image from "next/image";

export interface BunnyGalleryItem {
  id: string;
  title: string;
  category: "Olivia" | "Brother K" | "The 5 Bunnies" | "Neon & Synthwave" | "Studio Outtakes";
  src: string;
  caption: string;
}

export const KLOUT_BUNNY_GALLERY: readonly BunnyGalleryItem[] = [
  {
    id: "b-01",
    title: "The 5 Klout Bunnies — Studio Pyramid",
    category: "The 5 Bunnies",
    src: "/media/brand/moody_bunny_pyramid.webp",
    caption: "Canon studio pyramid featuring all 5 Klout bunnies in dark matte lighting."
  },
  {
    id: "b-02",
    title: "Olivia — Dark Chocolate 4c302b Edition",
    category: "Olivia",
    src: "/media/brand/olivia-bunny-fur-color-4c302b-dark-chocolate-brown.webp",
    caption: "Creamy cocoa 4c302b fur colorway & arrival state."
  },
  {
    id: "b-03",
    title: "Brother K — Arcade Cabinet Push",
    category: "Brother K",
    src: "/media/brand/brother_k_pushing_arcade.webp",
    caption: "Brother K setting up the arcade content compiler."
  },
  {
    id: "b-04",
    title: "Black Rabbit — All-Black Hoodie Edition",
    category: "The 5 Bunnies",
    src: "/media/brand/black-rabbit-with-black-fur-all-black-hoodie-hood.webp",
    caption: "Black rabbit with black fur in dark hoodie posture."
  },
  {
    id: "b-05",
    title: "Seven Bunnies Selfie",
    category: "Studio Outtakes",
    src: "/media/brand/seven_bunnies_selfie.webp",
    caption: "Wide studio selfie taking in the full crew."
  },
  {
    id: "b-06",
    title: "Neon Rabbits Synthwave Night",
    category: "Neon & Synthwave",
    src: "/media/brand/neon_rabbits_synthwave.webp",
    caption: "Neon synthwave lighting outside MSI Group HQ."
  },
  {
    id: "b-07",
    title: "Olivia — Solo Workstation B-Roll",
    category: "Olivia",
    src: "/media/brand/olivia-o-solo-station-make-her-extra-pretty-girl-b.webp",
    caption: "Olivia at her solo workstation analyzing incoming signals."
  },
  {
    id: "b-08",
    title: "Brother K — Cabinet Push Angle 2",
    category: "Brother K",
    src: "/media/brand/brother_k_pushes_cabinet.webp",
    caption: "Brother K moving arcade hardware outside the studio."
  },
  {
    id: "b-09",
    title: "All 5 Bunnies — Tumbados Chillen Outside Studio",
    category: "The 5 Bunnies",
    src: "/media/brand/all-5-klout-bunnies-tumbados-chillen-outside-studi.webp",
    caption: "Tumbados chillen posture outside MSI Group HQ brick wall."
  },
  {
    id: "b-10",
    title: "Nonchalant Studio Launch Party",
    category: "Studio Outtakes",
    src: "/media/brand/non-chalant-launch-party-outside-msigrouphq-studio.webp",
    caption: "Nonchalant arrival state outside the studio entrance."
  },
  {
    id: "b-11",
    title: "Retro Restored Klout Bunnies Lineup",
    category: "The 5 Bunnies",
    src: "/media/brand/retro-theme-restored-all-5-klout-bunnies-outside-m.webp",
    caption: "Restored 5 Klout bunnies in retro color grading."
  },
  {
    id: "b-12",
    title: "Neon Bunny Arrival State",
    category: "Neon & Synthwave",
    src: "/media/brand/neon_bunny_arrival.webp",
    caption: "Neon arrival lighting at dusk."
  },
  {
    id: "b-13",
    title: "Olivia — Candid Instagram Moment",
    category: "Olivia",
    src: "/media/brand/olivia-bunny-4c302b-candid-instagram-moment-gettin.webp",
    caption: "Candid Instagram moment getting ready for the shoot."
  },
  {
    id: "b-14",
    title: "Vaporwave Bunny Scene",
    category: "Neon & Synthwave",
    src: "/media/brand/vaporwave_bunny_scene.webp",
    caption: "Vaporwave sunset aesthetic."
  },
  {
    id: "b-15",
    title: "Cyberpunk Rabbits Neon",
    category: "Neon & Synthwave",
    src: "/media/brand/cyberpunk_rabbits_neon.webp",
    caption: "Cyberpunk neon street lighting."
  },
  {
    id: "b-16",
    title: "Olivia — Dark Chocolate Close-Up",
    category: "Olivia",
    src: "/media/brand/olivia-bunny-4c302b-dark-chocolate-close-up-fronta.webp",
    caption: "Frontal close-up in 4c302b dark chocolate fur."
  },
  {
    id: "b-17",
    title: "Seven Bunny Lineup Studio Shoot",
    category: "Studio Outtakes",
    src: "/media/brand/seven_bunny_lineup.webp",
    caption: "Full lineup studio pose."
  },
  {
    id: "b-18",
    title: "All 5 Bunnies — Standing Tumbados",
    category: "The 5 Bunnies",
    src: "/media/brand/all-5-klout-bunnies-standing-tumbados-outside-bric.webp",
    caption: "Standing tumbados posture by the studio brick facade."
  }
];

export function KloutBunnyGallery() {
  return (
    <section className="klout-bunny-gallery py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-mono text-[#ff2d95] uppercase tracking-widest bg-[#ff2d95]/10 border border-[#ff2d95]/30 px-3 py-1 rounded-full inline-block mb-3">
          CANON BRAND ARCHIVE • 27+ RENDERS
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          THE KLOUT BUNNY MEDIA GALLERY
        </h2>
        <p className="text-sm text-white/60 max-w-xl mx-auto mt-2 font-mono">
          Olivia, Brother K, Moody Bunny, and the full 5 Klout bunnies canon cast.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {KLOUT_BUNNY_GALLERY.map((item) => (
          <div
            key={item.id}
            className="bg-[#0a0a14] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#00f0ff]/40 transition duration-500 flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
                unoptimized
              />
              <div className="absolute top-3 left-3 bg-[#0a0a14]/80 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full text-[10px] font-mono text-[#00f0ff] uppercase tracking-wider">
                {item.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm text-white mb-1">{item.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
