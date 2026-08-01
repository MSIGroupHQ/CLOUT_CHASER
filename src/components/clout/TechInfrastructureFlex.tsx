import Image from "next/image";

export function TechInfrastructureFlex() {
  return (
    <section className="tech-infrastructure-flex py-16 px-6 max-w-6xl mx-auto border-t border-white/10">
      <div className="text-center mb-10">
        <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-3 py-1 rounded-full inline-block mb-3">
          HEAVY ENTERPRISE INFRASTRUCTURE & COMPUTE
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          POWERED BY WORLD-CLASS NETWORKS & COMPUTE
        </h2>
        <p className="text-sm text-white/60 max-w-xl mx-auto mt-2 font-mono">
          Global edge reach. Massive GPU acceleration. Sub-second response scale.
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
              Delivering global edge availability across 275+ cities worldwide. Zero latency, total reliability, and instant global presence.
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

      {/* EXPANDED 9-PARTNER ENTERPRISE COMPUTE GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* NVIDIA */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#76b900]/50 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-black tracking-tight text-[#76b900] font-mono">NVIDIA</span>
            <span className="text-[10px] font-mono bg-[#76b900]/20 text-[#76b900] border border-[#76b900]/30 px-2 py-0.5 rounded-full uppercase">
              GPU ACCELERATION
            </span>
          </div>
          <h4 className="font-bold text-sm text-white mb-1">NVIDIA Tensor Compute</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            High-throughput GPU inference acceleration & CUDA media synthesis pipelines.
          </p>
        </div>

        {/* AWS */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#ff9900]/50 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-black tracking-tight text-[#ff9900] font-mono">AWS</span>
            <span className="text-[10px] font-mono bg-[#ff9900]/20 text-[#ff9900] border border-[#ff9900]/30 px-2 py-0.5 rounded-full uppercase">
              CLOUD BACKBONE
            </span>
          </div>
          <h4 className="font-bold text-sm text-white mb-1">Amazon Web Services</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Enterprise cloud storage, distributed data streaming, and scalable compute.
          </p>
        </div>

        {/* MICROSOFT */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#00a4ef]/50 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-black tracking-tight text-[#00a4ef] font-mono">MICROSOFT</span>
            <span className="text-[10px] font-mono bg-[#00a4ef]/20 text-[#00a4ef] border border-[#00a4ef]/30 px-2 py-0.5 rounded-full uppercase">
              AZURE INFRA
            </span>
          </div>
          <h4 className="font-bold text-sm text-white mb-1">Microsoft Azure</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Enterprise identity management, secure cloud endpoints, and infrastructure scale.
          </p>
        </div>

        {/* RUNPOD */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#aa00ff]/50 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-black tracking-tight text-[#aa00ff] font-mono">RUNPOD</span>
            <span className="text-[10px] font-mono bg-[#aa00ff]/20 text-[#aa00ff] border border-[#aa00ff]/30 px-2 py-0.5 rounded-full uppercase">
              GPU CLUSTER
            </span>
          </div>
          <h4 className="font-bold text-sm text-white mb-1">RunPod Distributed GPU</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Ultra-low latency serverless GPU pod execution for video and AI workload bursts.
          </p>
        </div>

        {/* T-MOBILE */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#ea0a8e]/50 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-black tracking-tight text-[#ea0a8e] font-mono">T-MOBILE</span>
            <span className="text-[10px] font-mono bg-[#ea0a8e]/20 text-[#ea0a8e] border border-[#ea0a8e]/30 px-2 py-0.5 rounded-full uppercase">
              5G TRANSPORT
            </span>
          </div>
          <h4 className="font-bold text-sm text-white mb-1">T-Mobile 5G Network</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Ultra-capacity 5G cellular transport & mobile edge signal connectivity.
          </p>
        </div>

        {/* WHOP */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#ff2d95]/50 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-black tracking-tight text-white font-mono">WHOP</span>
            <span className="text-[10px] font-mono bg-[#ff2d95]/20 text-[#ff2d95] border border-[#ff2d95]/30 px-2 py-0.5 rounded-full uppercase">
              CREATOR MARKET
            </span>
          </div>
          <h4 className="font-bold text-sm text-white mb-1">Whop Ecosystem</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Official Whop App Store integration & creator monetization marketplace.
          </p>
        </div>

        {/* STRIPE */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#635bff]/50 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-black tracking-tight text-[#635bff] font-mono">STRIPE</span>
            <span className="text-[10px] font-mono bg-[#635bff]/20 text-[#635bff] border border-[#635bff]/30 px-2 py-0.5 rounded-full uppercase">
              FINANCE
            </span>
          </div>
          <h4 className="font-bold text-sm text-white mb-1">Stripe Financial Rails</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Multi-currency institutional payment rails and automated billing infrastructure.
          </p>
        </div>

        {/* GOOGLE ANTIGRAVITY */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#10b981]/50 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-black tracking-tight text-[#10b981] font-mono">AGY SDK</span>
            <span className="text-[10px] font-mono bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 px-2 py-0.5 rounded-full uppercase">
              AGENT CORE
            </span>
          </div>
          <h4 className="font-bold text-sm text-white mb-1">Google Antigravity</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Autonomous multi-agent orchestration architecture & attention synthesis.
          </p>
        </div>

        {/* OPENALEX & SEC EDGAR */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#d97706]/50 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-black tracking-tight text-[#d97706] font-mono">OPENALEX</span>
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
