"use client";

import { MICRO_OFFERS } from "@/lib/clout/micro-offers";

export function MicroOfferGrid() {
  return (
    <section className="micro-offer-grid-section py-12 px-6 max-w-6xl mx-auto my-12 border-t border-b border-white/10">
      <div className="text-center mb-10">
        <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-3 py-1 rounded-full inline-block mb-3">
          INSTANT STANDALONE MICRO-OFFERS • NO ACCOUNT NEEDED
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          FAST FRICTIONLESS ACCESS PACKS
        </h2>
        <p className="text-sm text-white/60 max-w-xl mx-auto mt-2 font-mono">
          Pick a package. Pay once. Get your source receipt &amp; export specs delivered instantly worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MICRO_OFFERS.map((offer) => (
          <div
            key={offer.id}
            className="bg-[#0a0a14] border border-white/12 rounded-2xl p-6 flex flex-col justify-between hover:border-[#00f0ff]/50 transition duration-300 relative group shadow-xl"
          >
            {offer.badge ? (
              <span className="absolute -top-3 left-4 bg-[#00f0ff] text-black text-[9px] font-mono font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-[0_0_10px_#00f0ff]">
                {offer.badge}
              </span>
            ) : null}

            <div>
              <h3 className="text-lg font-bold text-white mt-2 mb-1">{offer.name}</h3>
              <div className="text-3xl font-extrabold font-mono text-[#00f0ff] my-3">
                {offer.price}
                <span className="text-xs text-white/50 font-normal ml-1">one-time</span>
              </div>

              <ul className="space-y-2 mb-6">
                {offer.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-white/70">
                    <span className="text-[#00f0ff] font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={offer.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#00f0ff] text-black font-mono font-bold text-xs uppercase tracking-widest rounded-full text-center hover:bg-white transition duration-300 shadow-[0_0_15px_#00f0ff]/50 block"
            >
              PURCHASE NOW ({offer.price}) →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
