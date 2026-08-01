import Image from "next/image";

export function TechInfrastructureFlex() {
  return (
    <section className="tech-infrastructure-flex py-16 px-6 max-w-6xl mx-auto border-t border-white/10">
      <div className="text-center mb-10">
        <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-3 py-1 rounded-full inline-block mb-3">
          ENTERPRISE COMPUTE & PARTNER NETWORK
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          POWERED BY WORLD-CLASS INFRASTRUCTURE
        </h2>
        <p className="text-sm text-white/60 max-w-xl mx-auto mt-2 font-mono">
          Global edge reach. Heavy GPU compute. Institutional scale.
        </p>
      </div>

      {/* CLOUDFLARE GLOBAL NETWORK FEATURE CARD */}
      <div className="bg-[#0a0a14] border border-white/15 rounded-3xl overflow-hidden p-6 md:p-8 mb-12 shadow-2xl relative group">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/media/brand/logos/cloudflare.svg"
                alt="Cloudflare Logo"
                width={160}
                height={40}
                className="h-9 w-auto"
                unoptimized
              />
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

      {/* BRAND LOGO GRID FLEX */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        {/* YAHOO */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#6001d2]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/yahoo.svg" alt="Yahoo Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">Yahoo Finance</h4>
            <p className="text-[11px] text-white/50 leading-tight">Financial news & market syndication feeds.</p>
          </div>
        </div>

        {/* NVIDIA */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#76b900]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/nvidia.svg" alt="NVIDIA Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">NVIDIA Compute</h4>
            <p className="text-[11px] text-white/50 leading-tight">CUDA GPU tensor acceleration pipelines.</p>
          </div>
        </div>

        {/* AWS */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#ff9900]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/aws.svg" alt="AWS Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">AWS Cloud</h4>
            <p className="text-[11px] text-white/50 leading-tight">Enterprise cloud storage & scalable compute.</p>
          </div>
        </div>

        {/* MICROSOFT */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#00a4ef]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/microsoft.svg" alt="Microsoft Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">Microsoft Azure</h4>
            <p className="text-[11px] text-white/50 leading-tight">Identity management & cloud endpoints.</p>
          </div>
        </div>

        {/* RUNPOD */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#aa00ff]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/runpod.svg" alt="RunPod Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">RunPod GPU</h4>
            <p className="text-[11px] text-white/50 leading-tight">Serverless GPU pod execution for media bursts.</p>
          </div>
        </div>

        {/* T-MOBILE */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#ea0a8e]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/tmobile.svg" alt="T-Mobile Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">T-Mobile 5G</h4>
            <p className="text-[11px] text-white/50 leading-tight">Ultra-capacity 5G cellular transport.</p>
          </div>
        </div>

        {/* WHOP */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#ff2d95]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/whop.svg" alt="Whop Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">Whop Marketplace</h4>
            <p className="text-[11px] text-white/50 leading-tight">Whop App Store & monetization ecosystem.</p>
          </div>
        </div>

        {/* STRIPE */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#635bff]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/stripe.svg" alt="Stripe Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">Stripe Rails</h4>
            <p className="text-[11px] text-white/50 leading-tight">Multi-currency financial checkout rails.</p>
          </div>
        </div>

        {/* GOOGLE AGY */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#10b981]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/google.svg" alt="Google AGY Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">Google AGY SDK</h4>
            <p className="text-[11px] text-white/50 leading-tight">Autonomous multi-agent orchestration.</p>
          </div>
        </div>

        {/* OPENALEX */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#d97706]/50 transition flex flex-col justify-between h-40">
          <div className="text-base font-black tracking-tight text-[#d97706] font-mono h-8 flex items-center">OpenAlex</div>
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">OpenAlex & EDGAR</h4>
            <p className="text-[11px] text-white/50 leading-tight">250M+ citations & real-time 8-K streams.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
