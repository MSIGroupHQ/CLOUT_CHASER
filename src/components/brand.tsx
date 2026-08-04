import Image from "next/image";
import Link from "next/link";

/** Landing (clout.prime88) stages into action surface (cloutchaser) until cloutchaser.ai */
const CHASER_APP = "https://cloutchaser.prime88.studio";
const ONLYCLOUT = "https://onlyclout.netlify.app";

export function BrandMark() {
  return (
    <Link className="brand" href="/" aria-label="Clout Chaser home">
      <span className="brand-mark" aria-hidden="true">
        <Image
          src="/assets/rdcm_embossed_icon.webp"
          width={40}
          height={40}
          alt=""
          unoptimized
        />
      </span>
      <span className="brand-wordmark">
        <strong>
          Clout <span style={{ color: "var(--cyan)" }}>Chaser</span>
        </strong>
        <small>Landing · stages the chase</small>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <BrandMark />
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/opportunities">Opportunities</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/sample">Sample</Link>
          <Link href="/showcase">Showcase</Link>
          <Link href="/prime88-surfaces">Prime 88</Link>
          <a href={ONLYCLOUT}>OnlyClout</a>
          <a href={CHASER_APP}>Open desk</a>
        </nav>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <Link className="button button-small button-secondary" href="/sample">
            Free sample
          </Link>
          <a className="button button-small button-primary" href={CHASER_APP}>
            Enter Clout Chaser
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div>
          <BrandMark />
          <p>
            Engineered by Prime 88.{" "}
            <strong style={{ color: "var(--ivory)" }}>clout.prime88.studio</strong> is the
            public landing.{" "}
            <strong style={{ color: "var(--cyan)" }}>cloutchaser.prime88.studio</strong> is
            where the chase runs — until cloutchaser.ai.
          </p>
        </div>
        <div className="footer-proof">
          <span>Operated by Mediator Solutions LLC.</span>
          <span>Neon Klout system · OnlyClout · Clout Chaser</span>
          <span>© {currentYear} Mediator Solutions LLC. All rights reserved.</span>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/sample">Free sample</Link>
          <Link href="/opportunities">Opportunities</Link>
          <Link href="/showcase">Showcase</Link>
          <Link href="/r/CC-DRK-ICE-FLOOD">Example receipt</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/early-access">Early access</Link>
          <Link href="/docs">Documentation</Link>
          <a href={CHASER_APP}>Clout Chaser desk</a>
          <a href={ONLYCLOUT}>OnlyClout copy bank</a>
          <Link href="/prime88-surfaces">Prime 88 surfaces</Link>
          <a href="https://crm.prime88.studio/creator-trial">Creator CRM trial</a>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/privacy">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
