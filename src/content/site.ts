import type { SiteProfile } from "@/types/content";

export const profile: SiteProfile = {
  wordmark: "Walaa",
  logo: {
    src: "/images/logo.png",
    // Decorative: the wordmark beside it already says the name.
    alt: "",
    width: 64,
    height: 28,
  },
  tagline: "We create content that is impossible to ignore",
  displayName: ["Walaa", "Mutar"],
  intro:
    "I'm a marketing consultant and digital marketing trainer with 7 years of experience across sales and marketing, the last 5 focused on digital marketing and paid advertising.I deliver training courses for people who want to build practical skills in digital marketing and paid ads — not theory, but the work itself. And I partner with small and medium businesses to build marketing strategies that fit their scale and budget, then help them put those strategies into practice.I hold an MBA certificate from European International University and a Diploma in Integrated Marketing.",
  portrait: {
    src: "/images/hero.jpg",
    alt: "Walaa Mutar seated in a lobby, wearing a white blazer",
    width: 1920,
    height: 1080,
  },
  contact: { label: "Contact", href: "/#contact" },
  nav: [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
  ],
  social: [
    // Canonical profile URLs: the share links these came from carried `utm_*`
    // and `igsi` tracking parameters that belong to the app that generated
    // them, not to the profile.
    {
      label: "Instagram",
      href: "https://www.instagram.com/walaamutar",
      external: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/walaa-mutar-211947176",
      external: true,
    },
  ],
  email: "Walaaajrash@gmail.com",
};
