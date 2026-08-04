import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk, Syne } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/brand";
import { PostHogProvider } from "@/components/posthog-provider";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clout.prime88.studio"),
  title: {
    default: "Clout Chaser — Enterprise Attention Intelligence by Prime 88",
    template: "%s | Clout Chaser",
  },
  description:
    "Enterprise attention intelligence. Clout Chaser scores fast-moving public signals before saturation and delivers creator-ready opportunity packages backed by source-safe receipts.",
  applicationName: "Clout Chaser",
  keywords: [
    "attention intelligence",
    "content opportunity",
    "creator tools",
    "trend scoring",
    "viral content",
    "Prime 88",
    "Clout Chaser",
    "content packages",
    "source receipts",
  ],
  authors: [{ name: "Prime 88 — MSI Group", url: "https://prime88.studio" }],
  creator: "MSI Group HQ",
  publisher: "Mediator Solutions LLC",
  icons: {
    icon: [{ url: "/clout-mark.svg", type: "image/svg+xml" }],
    shortcut: "/clout-mark.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Clout Chaser by Prime 88",
    title: "Enterprise Attention Intelligence — Clout Chaser",
    description:
      "Score the opportunity before saturation. Source-backed content packages with cryptographic proof receipts.",
    url: "https://clout.prime88.studio",
    images: [
      {
        url: "/clout-chaser-mascot.png",
        width: 2172,
        height: 724,
        alt: "Clout Chaser rabbit mascot under blue and pink neon lights — enterprise attention intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Attention Intelligence — Clout Chaser",
    description:
      "Score the opportunity before saturation. Source-backed content packages with cryptographic proof receipts.",
    images: ["/clout-chaser-mascot.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${space.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <PostHogProvider />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
