import Image from "next/image";

export function TechInfrastructureFlex() {
  return (
    <section className="tech-infrastructure-flex py-16 px-6 max-w-6xl mx-auto border-t border-white/10">
      <div className="text-center mb-10">
        <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-3 py-1 rounded-full inline-block mb-3">
          GLOBAL INFRASTRUCTURE & PARTNER ECOSYSTEM
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          DEPLOYED ACROSS WORLDWIDE NETWORKS
        </h2>
        <p className="text-sm text-white/60 max-w-xl mx-auto mt-2 font-mono">
          Global reach. Unmatched speed. Ecosystem scale.
        </p>
      </div>

      {/* CLOUDFLARE GLOBAL NETWORK FEATURE CARD */}
      <div className="bg-[#0a0a14] border border-white/15 rounded-3xl overflow-hidden p-6 md:p-8 mb-12 shadow-2xl relative group">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-xs font-mono text-[#ff2d95] font-bold uppercase tracking-wider mb-2">
              GLOBAL EDGE BACKBONE
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Cloudflare Network — 275+ Cities Across 100+ Countries
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Delivering instant global performance and edge availability across 275+ cities worldwide. Zero latency, total reliability, and instant global presence.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-mono">
              <span className="bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/15">
                ⚡ Global Edge Infrastructure
              </span>
              <span className="bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/15">
                🛡️ Verified Receipts
              </span>
              <span className="bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/15">
                🌐 275+ Cities Network
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 group-hover:border-[#00f0ff]/40 transition duration-500">
            <Image
              src="/media/brand/Cloudflare_Network_275__Cities_in_100__Countries.png"
              alt="Cloudflare Network 275+ Cities in 100+ Countries"
              width={800}
              height={450}
              className="w-full h-auto object-cover group-hover:scale-105 transition duration-700"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* PLATFORM PARTNERS GRID: WHOP, STRIPE, GOOGLE ANTIGRAVITY, OPENALEX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* WHOP */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#ff2d95]/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-black tracking-tight text-white font-mono">WHOP</span>
            <span className="text-[10px] font-mono bg-[#ff2d95]/20 text-[#ff2d95] border border-[#ff2d95]/30 px-2 py-0.5 rounded-full uppercase">
              ECOSYSTEM
            </span>
          </div>
          <h4 className="font-bold text-sm text-white mb-1">Whop Marketplace</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Whop App Store integration & creator monetization ecosystem.
          </p>
        </div>

        {/* STRIPE */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#00f0ff]/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-black tracking-tight text-[#635bff] font-mono">Stripe</span>
            <span className="text-[10px] font-mono bg-[#635bff]/20 text-[#635bff] border border-[#635bff]/30 px-2 py-0.5 rounded-full uppercase">
              FINANCE
            </span>
          </div>
          <h4 className="font-bold text-sm text-white mb-1">Stripe Financial Rails</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Multi-currency institutional payment rails and checkout infrastructure.
          </p>
        </div>

        {/* GOOGLE ANTIGRAVITY */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#10b981]/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-black tracking-tight text-[#10b981] font-mono">AGY SDK</span>
            <span className="text-[10px] font-mono bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 px-2 py-0.5 rounded-full uppercase">
              AI CORE
            </span>
          </div>
          <h4 className="font-bold text-sm text-white mb-1">Google Antigravity</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Autonomous multi-agent orchestration architecture.
          </p>
        </div>

        {/* OPENALEX & SEC EDGAR */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#d97706]/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-black tracking-tight text-[#d97706] font-mono">OpenAlex</span>
            <span className="text-[10px] font-mono bg-[#d97706]/20 text-[#d97706] border border-[#d97706]/30 px-2 py-0.5 rounded-full uppercase">
              DATA GRAPH
            </span>
          </div>
          <h4 className="font-bold text-sm text-white mb-1">OpenAlex & SEC EDGAR</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            250M+ scientific paper citations & real-time institutional event streams.
          </p>
        </div>
      </div>
    </section>
  );
}
