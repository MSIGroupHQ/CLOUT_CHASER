import type { MetadataRoute } from "next";
import { docsPages, legalPages } from "@/lib/clout/public-content";
import { seedOpportunities } from "@/lib/clout/seed";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const root = "https://clout.prime88.studio";
  const routes = [
    { url: root, changeFrequency: "weekly", priority: 1 },
    { url: `${root}/sample`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${root}/opportunities`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${root}/early-access`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${root}/prime88-surfaces`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${root}/pricing`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${root}/security`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${root}/capacity`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${root}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${root}/docs`, changeFrequency: "monthly", priority: 0.7 },
  ] satisfies MetadataRoute.Sitemap;

  const receipts = seedOpportunities.map((opportunity) => ({
    url: `${root}/r/${opportunity.oppHash}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const docs = Object.keys(docsPages).map((slug) => ({
    url: `${root}/docs/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  const legal = Object.keys(legalPages).map((slug) => ({
    url: `${root}/legal/${slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));
  return [...routes, ...receipts, ...docs, ...legal];
}
