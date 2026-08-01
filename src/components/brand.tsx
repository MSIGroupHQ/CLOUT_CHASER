import Image from "next/image";
import Link from "next/link";

export function BrandMark() {
  return (
    <Link className="brand" href="/" aria-label="Clout Chaser home">
      <span className="brand-mark" aria-hidden="true">
        <Image src="/assets/rdcm_embossed_icon.webp" width={40} height={40} alt="RDCM Clout Chaser Seal" unoptimized />
      </span>
      <span className="brand-wordmark">
        <strong>Clout Chaser</strong>
        <small>Attention intelligence</small>
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
          <Link href="/docs">Docs</Link>
          <Link href="/showcase">Showcase</Link>
          <Link href="/prime88-surfaces">Prime 88 surfaces</Link>
          <a href="https://crm.prime88.studio/creator-trial">Creator CRM</a>
        </nav>
        <Link className="button button-small button-primary" href="/sample">
          Get my free opportunity sample
        </Link>
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
          <p>Engineered by Prime 88. Enterprise attention intelligence for creators, studios, and businesses.</p>
        </div>
        <div className="footer-proof">
          <span>Operated by Mediator Solutions LLC.</span>
          <span>Source-backed receipts with BBS cryptographic proof.</span>
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
          <Link href="/security">Security</Link>
          <Link href="/capacity">Capacity</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/legal/terms">Terms of service</Link>
          <Link href="/legal/privacy">Privacy policy</Link>
          <Link href="/prime88-surfaces">Prime 88 surfaces</Link>
          <a href="https://crm.prime88.studio/creator-trial">Creator CRM trial</a>
        </nav>
      </div>
    </footer>
  );
}

