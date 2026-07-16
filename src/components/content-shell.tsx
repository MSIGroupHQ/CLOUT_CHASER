import Link from "next/link";
import type { ReactNode } from "react";

export type ContentCard = {
  eyebrow?: string;
  title: string;
  body: string;
  items?: readonly string[];
  href?: string;
  linkLabel?: string;
};

export function PublicPageHero({
  eyebrow,
  title,
  lead,
  aside,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  aside?: string;
  children?: ReactNode;
}) {
  return (
    <section className="subpage-hero section-shell content-hero">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="hero-lead">{lead}</p>
        {children ? <div className="hero-actions">{children}</div> : null}
      </div>
      {aside ? (
        <aside className="subpage-aside content-hero-aside">
          <span className="panel-index">PUBLIC-SAFE SCOPE</span>
          <p>{aside}</p>
        </aside>
      ) : null}
    </section>
  );
}

export function ContentGrid({
  cards,
  className = "",
}: {
  cards: readonly ContentCard[];
  className?: string;
}) {
  return (
    <div className={`content-card-grid ${className}`.trim()}>
      {cards.map((card) => (
        <article className="content-card" key={card.title}>
          {card.eyebrow ? <span className="panel-index">{card.eyebrow}</span> : null}
          <h2>{card.title}</h2>
          <p>{card.body}</p>
          {card.items?.length ? (
            <ul className="content-list">
              {card.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ) : null}
          {card.href && card.linkLabel ? (
            <Link className="text-link" href={card.href}>{card.linkLabel} →</Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function EditorialSections({
  sections,
}: {
  sections: readonly {
    title: string;
    body?: string;
    paragraphs?: readonly string[];
    items?: readonly string[];
  }[];
}) {
  return (
    <div className="editorial-sections">
      {sections.map((section, index) => (
        <section className="editorial-section" key={section.title}>
          <span className="panel-index">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h2>{section.title}</h2>
            {section.body ? <p>{section.body}</p> : null}
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.items?.length ? (
              <ul className="content-list">
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
          </div>
        </section>
      ))}
    </div>
  );
}

export function ProductNotice({ children }: { children: ReactNode }) {
  return (
    <aside className="product-notice" role="note">
      <span className="panel-index">PRODUCT LIMIT</span>
      <div>{children}</div>
    </aside>
  );
}
