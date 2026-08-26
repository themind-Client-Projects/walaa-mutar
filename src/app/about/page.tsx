import type { Metadata } from "next";

import {
  AboutBiography,
  AboutIntro,
  AboutWhy,
} from "@/components/sections/about-sections";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: `${about.title} — Walaa Mutar`,
  description: about.intro,
  openGraph: {
    title: about.title,
    description: about.intro,
    images: [about.banner.src],
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
