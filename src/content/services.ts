import type { SectionIntro, Service } from "@/types/content";

/** The section on the home page. */
export const servicesIntro: SectionIntro = {
  id: "services",
  title: "Services",
  lede: "Providing marketing consultancy, digital marketing training, and strategic plans to drive business growth.",
  action: { label: "View All", href: "/services" },
};

/** The page at `/services`, which carries the same list at greater length. */
export const servicesPageIntro: SectionIntro = {
  id: "services",
  title: "Our Services",
  lede: "Providing marketing consultancy, digital marketing training, and strategic plans to drive business growth.",
};

export const services: readonly Service[] = [
  {
    id: "campaigns",
    image: {
      src: "/images/service-campaigns.png",
      alt: "Studio lighting set up around a paper backdrop for a content shoot",
      width: 1200,
      height: 900,
    },
    summary:
      "I design and manage advertising campaigns that run over months, ensuring businesses achieve their marketing objectives and effectively reach their target audience.",
    detail:
      "The core of a brand is reflected in the feelings stirred through interactions with its products. Our mission is to assist both established and new brands in crafting identities that authentically represent their real nature.",
    tags: ["Content", "Social Media", "Video Editing"],
  },
  {
    id: "strategy",
    statement: "Let's bring your vision to life",
    image: {
      src: "/images/service-strategy.png",
      alt: "Glass towers seen from below, captioned Let's bring your vision to life",
      width: 1200,
      height: 900,
    },
    summary:
      "Every successful brand or sales growth plan starts with a well-structured strategy. I create tailored marketing plans that guide businesses toward achieving their goals efficiently.",
    detail:
      "Our approach focuses on user-oriented development to elevate website functionality and income, avoiding one-size-fits-all approaches. We create bespoke, adaptive websites that improve user interaction and stimulate expansion, showcasing our dedication to customized, user-priority web solutions.",
    tags: ["content strategy", "Company Goals", "Branding"],
  },
  {
    id: "training",
    image: {
      src: "/images/service-training.png",
      alt: "Graphic reading Let's do something amazing together",
      width: 1200,
      height: 900,
    },
    summary:
      "I offer online marketing courses, including a recorded channel with multiple in-depth lessons on marketing strategies. Additionally, I provide personalised one-on-one training for individuals looking to enhance their marketing skills.",
    detail:
      "Our strategy focuses on user-centric design to boost productivity and revenue, avoiding generic solutions. We create custom, engaging designs that improve user interaction and foster growth, reflecting our dedication to personalized, user-first approaches.",
    tags: ["Courses", "Personal Trainings", "employee company"],
  },
  {
    id: "consulting",
    image: {
      src: "/images/service-consulting.png",
      alt: "A screen of performance charts during a meeting",
      width: 1200,
      height: 900,
    },
    summary:
      "I provide expert marketing consultations for businesses and entrepreneurs, helping them identify solutions to overcome challenges, increase sales, and build a strong brand presence.",
    detail:
      "I provide expert marketing consultations for businesses and entrepreneurs, helping them identify solutions to overcome challenges, increase sales, and build a strong brand presence.",
    tags: ["Company", "Projects", "Startup"],
  },
];
