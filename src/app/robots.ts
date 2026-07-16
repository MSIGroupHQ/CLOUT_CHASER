import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/internal/", "/p/", "/api/"],
    },
    sitemap: "https://clout.prime88.studio/sitemap.xml",
  };
}
