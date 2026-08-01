import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/brand";
import { PostHogProvider } from "@/components/posthog-provider";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clout.prime88.studio"),
  title: {
    default: "Clout Chaser — Find tomorrow's viral content today",
    template: "%s — Clout Chaser",
  },
  description:
    "Clout Chaser turns fast-moving public signals into source-backed, creator-ready opportunity packages.",
  applicationName: "Clout Chaser",
  icons: {
    icon: [{ url: "/clout-mark.svg", type: "image/svg+xml" }],
    shortcut: "/clout-mark.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Clout Chaser",
    title: "Find tomorrow's viral content today.",
    description:
      "Send one source. Get one free, source-backed opportunity sample.",
    url: "https://clout.prime88.studio",
    images: [
      {
        url: "/clout-chaser-mascot.png",
        width: 2172,
        height: 724,
        alt: "Clout Chaser rabbit mascot under blue and pink neon lights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find tomorrow's viral content today.",
    description:
      "Send one source. Get one free, source-backed opportunity sample.",
    images: ["/clout-chaser-mascot.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
