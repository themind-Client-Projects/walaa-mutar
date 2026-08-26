import type { Metadata } from "next";

import {
  AboutBiography,
  AboutIntro,
  AboutWhy,
} from "@/components/sections/about-sections";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: about.title,
  description: about.intro,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    title: about.title,
    description: about.intro,
    images: [
      {
        url: about.banner.src,
        width: about.banner.width,
        height: about.banner.height,
        alt: about.banner.alt,
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro content={about} />
      <AboutBiography content={about} />
      <AboutWhy content={about} />
    </>
  );
}
