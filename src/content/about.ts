import type { About } from "@/types/content";

export const about: About = {
  title: "About Me",
  intro:
    "I am Walaa Mutar, a marketing consultant and digital marketing trainer with extensive experience in sales and marketing. My academic journey began with a degree in Science from the University of Baghdad in 2016. Later, I pursued a Diploma in Integrated Marketing from Master Academy in Malaysia, which deepened my understanding of modern marketing strategies.",
  banner: {
    src: "/images/about-banner.jpg",
    alt: "Walaa Mutar working at a laptop in front of a wall reading Here we can achieve, lead, achieve",
    width: 2000,
    height: 1100,
  },
  portrait: {
    src: "/images/about-portrait.jpg",
    alt: "Walaa Mutar in a cream blazer, arms folded, against a blue backdrop",
    width: 1080,
    height: 1080,
  },
  biography: [
    "To enhance my expertise, I obtained a Certified Trainer (TOT) certificate from the Iraqi Trainers Syndicate, enabling me to share my knowledge with aspiring marketers. I am currently pursuing an MBA at the European International University in France and have also earned a Marketing and Communication certificate from the Business Institute in Germany.",
    "Throughout my career, I have trained more than 2,500 students, equipping them with the essential marketing skills needed to succeed in the industry. Additionally, I have helped over 600 businesses effectively market their products and grow their brands.",
  ],
  // Every figure here is one the biography above already states, or that the
  // home page already claims. A stat with no source is left out rather than
  // guessed at.
  stats: [
    { label: "Students", value: "2,500+" },
    { label: "Clients", value: "600+" },
    { label: "Years of Experience", value: "7" },
  ],
  why: {
    title: "Why Choose ME",
    body: "I specialize in developing strategic marketing plans, launching successful advertising campaigns, and providing tailored consultancy to startups and business owners. My vision is to empower entrepreneurs with innovative and proven marketing strategies to help them achieve sustainable success.",
    image: {
      src: "/images/about-why.jpg",
      alt: "A sleek modern office desk with a tablet displaying upward growth charts and strategic plans",
      width: 1376,
      height: 768,
    },
  },
};
