import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { profile } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";

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
const role = "Marketing Consultant & Digital Marketing Trainer";

/**
 * The share card. Every page inherits it unless it names its own, so a link to
 * any corner of the site still previews as something rather than as a bare URL.
 * `hero.jpg` is 1920x1080 — comfortably over the 600px minimum the platforms
 * want, and close enough to their 1.91:1 preference to avoid an awkward crop.
 */
const socialImage = {
  url: profile.portrait.src,
  width: profile.portrait.width,
  height: profile.portrait.height,
  alt: `${name} — ${role}`,
};

export const metadata: Metadata = {
  // Absolute URLs are built from here, so relative paths below are enough.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${name} — ${role}`,
    // Pages give a short title; the name is appended for them.
    template: `%s — ${name}`,
  },
  description: profile.intro,
  applicationName: name,
  authors: [{ name }],
  creator: name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: name,
    locale: "en_US",
    url: "/",
    title: `${name} — ${role}`,
    description: profile.intro,
    images: [socialImage],
  },
  twitter: {
    // Card type only. X falls back to the `og:` tags for title, description
    // and image, so declaring them here as well would pin every page to the
    // home page's copy — a course link would preview as the home page.
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
