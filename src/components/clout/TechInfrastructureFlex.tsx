import Image from "next/image";

export function TechInfrastructureFlex() {
  return (
    <section className="tech-infrastructure-flex py-16 px-6 max-w-6xl mx-auto border-t border-white/10">
      <div className="text-center mb-10">
        <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-3 py-1 rounded-full inline-block mb-3">
          GLOBAL INFRASTRUCTURE & TELECOM BACKBONE
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          POWERED BY TIER-1 CLOUD & CARRIER NETWORKS
        </h2>
        <p className="text-sm text-white/60 max-w-xl mx-auto mt-2 font-mono">
          Worldwide edge reach. Massive GPU compute. Enterprise carrier infrastructure.
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

      {/* BRAND LOGO GRID FLEX (13 TIER-1 PARTNERS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
        {/* AT&T */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#00a8e0]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/att.svg" alt="AT&T Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">AT&amp;T Fiber &amp; 5G</h4>
            <p className="text-[11px] text-white/50 leading-tight">Tier-1 backbone &amp; 5G edge transport.</p>
          </div>
        </div>

        {/* ORACLE */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#c74634]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/oracle.svg" alt="Oracle Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">Oracle Cloud</h4>
            <p className="text-[11px] text-white/50 leading-tight">Enterprise autonomous database &amp; cloud infra.</p>
          </div>
        </div>

        {/* VODAFONE */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#e60000]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/vodafone.svg" alt="Vodafone Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">Vodafone Global</h4>
            <p className="text-[11px] text-white/50 leading-tight">European &amp; African mobile carrier network.</p>
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
            <p className="text-[11px] text-white/50 leading-tight">Enterprise cloud storage &amp; scalable compute.</p>
          </div>
        </div>

        {/* MICROSOFT */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#00a4ef]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/microsoft.svg" alt="Microsoft Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">Microsoft Azure</h4>
            <p className="text-[11px] text-white/50 leading-tight">Identity management &amp; cloud endpoints.</p>
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

        {/* YAHOO */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#6001d2]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/yahoo.svg" alt="Yahoo Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">Yahoo Finance</h4>
            <p className="text-[11px] text-white/50 leading-tight">Financial news &amp; market syndication feeds.</p>
          </div>
        </div>

        {/* WHOP */}
        <div className="bg-[#0a0a14] border border-white/10 rounded-2xl p-5 text-left hover:border-[#ff2d95]/50 transition flex flex-col justify-between h-40">
          <Image src="/media/brand/logos/whop.svg" alt="Whop Logo" width={120} height={36} className="h-8 w-auto mb-2" unoptimized />
          <div>
            <h4 className="font-bold text-xs text-white mb-0.5">Whop Marketplace</h4>
            <p className="text-[11px] text-white/50 leading-tight">Whop App Store &amp; monetization ecosystem.</p>
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
      </div>
    </section>
  );
}
