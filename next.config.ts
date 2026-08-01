import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: "/mix",
        destination: "/mix.html",
      },
      {
        source: "/bunny-mix",
        destination: "/mix.html",
      },
      {
        source: "/Klout-Chasers-Bunny-Mix.html",
        destination: "/mix.html",
      },
    ];
  },
};

export default nextConfig;
