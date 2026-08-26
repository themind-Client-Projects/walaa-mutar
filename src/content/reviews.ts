import type { Review, SectionIntro } from "@/types/content";

export const reviewsIntro: SectionIntro = {
  id: "reviews",
  title: "Reviews",
};

/**
 * Each card is a finished graphic carrying several messages, so the reviewers'
 * names live in the alt text — it is the only route to that content for anyone
 * who can't see the image.
 */
export const reviews: readonly Review[] = [
  {
    id: "telegram-1",
    image: {
      src: "/images/review-telegram-1.jpg",
      alt: "Telegram messages from Ibrahim, Nour Laith and Fatima, each rating the course five stars",
      width: 600,
      height: 600,
    },
    platform: "Telegram",
  },
  {
    id: "telegram-2",
    image: {
      src: "/images/review-telegram-2.jpg",
      alt: "Telegram messages from Zainab Jasim and Buthaina Khafaji, each rating the course five stars",
      width: 600,
      height: 600,
    },
    platform: "Telegram",
  },
  {
    id: "telegram-3",
    image: {
      src: "/images/review-telegram-3.jpg",
      alt: "Telegram messages from Murtada, Zahraa and Laith about the marketing course",
      width: 450,
      height: 600,
    },
    platform: "Telegram",
  },
  {
    id: "telegram-4",
    image: {
      src: "/images/review-telegram-4.jpg",
      alt: "Telegram messages from Doaa, Saif and MashMash about the marketing course",
      width: 450,
      height: 600,
    },
    platform: "Telegram",
  },
];
