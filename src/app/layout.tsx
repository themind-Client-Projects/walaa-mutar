import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { profile } from "@/content/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-arabic",
  display: "swap",
});

const name = profile.displayName.join(" ");

export const metadata: Metadata = {
  title: `${name} — Marketing Consultant & Digital Marketing Trainer`,
  description: profile.intro,
  openGraph: {
    title: name,
    description: profile.intro,
    type: "profile",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${arabic.variable}`}>
      <head>
        {/* Without JavaScript nothing animates, so nothing may stay hidden. */}
        <noscript>
          <style>{`[data-reveal],[data-word]{opacity:1 !important;}`}</style>
        </noscript>
      </head>
      <body>
        <SmoothScrollProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
