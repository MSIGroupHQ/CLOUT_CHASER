import Image from "next/image";

/**
 * Partner / infrastructure strip for clout.prime88.studio + cloutchaser.prime88.studio
 * Logos: public/media/brand/logos/* (brand-kit SVGs — self-contained, Arial fallback text)
 * Note: Vercel must NOT vercelignore logos/ (see .vercelignore). Marks = class of infra, not partnership claims.
 * Canon: CLOUT_CHASER_CANON · MSIGroupHQ/CLOUT_CHASER
 */

type Partner = {
  id: string;
  name: string;
  blurb: string;
  logo: string;
  accent: string;
};

const PARTNERS: Partner[] = [
  {
    id: "cloudflare",
    name: "Cloudflare",
    blurb: "Global edge network — 275+ cities across 100+ countries.",
    logo: "/media/brand/logos/cloudflare.svg",
    accent: "#f38020",
  },
  {
    id: "aws",
    name: "AWS",
    blurb: "Enterprise cloud compute, storage, and activation-ready stack.",
    logo: "/media/brand/logos/aws.svg",
    accent: "#ff9900",
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    blurb: "GPU tensor acceleration for media and model pipelines.",
    logo: "/media/brand/logos/nvidia.svg",
    accent: "#76b900",
  },
  {
    id: "microsoft",
    name: "Microsoft Azure",
    blurb: "Identity, cloud endpoints, and enterprise tenancy.",
    logo: "/media/brand/logos/microsoft.svg",
    accent: "#00a4ef",
  },
  {
    id: "google",
    name: "Google",
    blurb: "Agent and multi-model orchestration surfaces.",
    logo: "/media/brand/logos/google.svg",
    accent: "#4285f4",
  },
  {
    id: "oracle",
    name: "Oracle Cloud",
    blurb: "Enterprise database and cloud infrastructure.",
    logo: "/media/brand/logos/oracle.svg",
    accent: "#c74634",
  },
  {
    id: "runpod",
    name: "RunPod",
    blurb: "Serverless GPU pods for burst media workloads.",
    logo: "/media/brand/logos/runpod.svg",
    accent: "#aa00ff",
  },
  {
    id: "stripe",
    name: "Stripe",
    blurb: "Checkout rails and multi-currency settlement.",
    logo: "/media/brand/logos/stripe.svg",
    accent: "#635bff",
  },
  {
    id: "whop",
    name: "Whop",
    blurb: "Marketplace distribution and creator monetization.",
    logo: "/media/brand/logos/whop.svg",
    accent: "#ff2d95",
  },
  {
    id: "att",
    name: "AT&T",
    blurb: "Tier-1 fiber and 5G transport backbone.",
    logo: "/media/brand/logos/att.svg",
    accent: "#00a8e0",
  },
  {
    id: "tmobile",
    name: "T-Mobile",
    blurb: "High-capacity 5G cellular transport.",
    logo: "/media/brand/logos/tmobile.svg",
    accent: "#ea0a8e",
  },
  {
    id: "vodafone",
    name: "Vodafone",
    blurb: "International mobile carrier network.",
    logo: "/media/brand/logos/vodafone.svg",
    accent: "#e60000",
  },
  {
    id: "yahoo",
    name: "Yahoo Finance",
    blurb: "Market and news syndication context feeds.",
    logo: "/media/brand/logos/yahoo.svg",
    accent: "#6001d2",
  },
];

export function TechInfrastructureFlex() {
  return (
    <section
      className="tech-infrastructure-flex"
      id="infrastructure"
      aria-labelledby="infra-heading"
    >
      <div className="tech-infra-intro">
        <span className="tech-infra-eyebrow">Infrastructure</span>
        <h2 id="infra-heading" className="tech-infra-title">
          Built on tier-1 cloud, GPU, and carrier networks
        </h2>
        <p className="tech-infra-lede">
          Clout Chaser runs on the same class of edge, compute, and rails we
          operate across Prime&nbsp;88 — not a toy demo stack.
        </p>
      </div>

      <div className="tech-infra-feature">
        <div className="tech-infra-feature-copy">
          <Image
            src="/media/brand/logos/cloudflare.svg"
            alt="Cloudflare"
            width={168}
            height={40}
            className="tech-infra-feature-logo"
            unoptimized
          />
          <h3>Cloudflare Network — 275+ cities, 100+ countries</h3>
          <p>
            Edge delivery, workers, and media surfaces for low-latency global
            presence. Receipts and public pages ship from the same backbone.
          </p>
          <ul className="tech-infra-chips">
            <li>Global edge</li>
            <li>Workers + R2</li>
            <li>Verified delivery path</li>
          </ul>
        </div>
        <div className="tech-infra-feature-media">
          <Image
            src="/media/brand/Cloudflare_Network_275__Cities_in_100__Countries.png"
            alt="Cloudflare global network map — 275+ cities in 100+ countries"
            width={800}
            height={450}
            className="tech-infra-map"
            unoptimized
          />
        </div>
      </div>

      <div className="tech-infra-grid" role="list">
        {PARTNERS.map((partner) => (
          <article
            key={partner.id}
            className="tech-infra-card"
            role="listitem"
            style={{ ["--partner-accent" as string]: partner.accent }}
          >
            <div className="tech-infra-card-logo">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={140}
                height={40}
                unoptimized
              />
            </div>
            <h4>{partner.name}</h4>
            <p>{partner.blurb}</p>
          </article>
        ))}
      </div>

      <p className="tech-infra-footnote">
        Marks are property of their respective owners. Shown to describe the
        infrastructure class Clout Chaser deploys on — not an endorsement claim.
        Surface:{" "}
        <a href="https://clout.prime88.studio">clout.prime88.studio</a>
        {" · "}
        <a href="https://cloutchaser.prime88.studio">cloutchaser.prime88.studio</a>
        {" · "}
        <a href="https://github.com/MSIGroupHQ/CLOUT_CHASER">source</a>
      </p>
    </section>
  );
}
