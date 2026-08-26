import type { Course, SectionIntro } from "@/types/content";

export const coursesIntro: SectionIntro = {
  id: "courses",
  title: "Our Courses",
  action: { label: "View All", href: "#courses" },
};

export const courses: readonly Course[] = [
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    image: {
      src: "/images/course-digital-marketing.jpg",
      alt: "Title card for the Digital Marketing course",
      width: 800,
      height: 500,
    },
    format: "Course",
    owner: "Walaa Mutar",
    summary:
      "Learn how to build a professional marketing plan from scratch, design a strategy that suits any project, and create content that draws an audience and produces real results. If you want the skills every marketer and business owner needs to run marketing properly, this is the place to start.",
    highlights: [
      "The channels of digital marketing",
      "Researching and analysing your market",
      "Defining your target audience and segmenting it",
      "The building blocks of a brand",
      "Setting marketing objectives the right way",
      "Choosing the marketing and pricing strategies that fit",
      "The types of content, and when each one works",
      "Organising ad campaigns and measuring results for the best return",
    ],
    previewLink: {
      label: "Book Now",
      href: "https://www.themind-platform.com/courses/kwrs-altswyq-alrqmy",
      external: true,
    },
  },
  {
    slug: "personal-branding",
    title: "Personal Branding",
    image: {
      src: "/images/course-personal-branding.jpg",
      alt: "Walaa Mutar in an office beside a whiteboard mapping a branding strategy",
      width: 1600,
      height: 893,
    },
    format: "Course",
    owner: "Walaa Mutar",
    summary:
      "Build a strong, professional personal brand and turn your presence on social media into real earning opportunities — clients, a job, or strategic partnerships. Eight clear steps give you a method you can apply, plus a ready-made content plan for a full month. This course is not theory: it is practical, step by step, and it leaves you with clarity, confidence, and a strategy you can put to work immediately.",
    highlights: [
      "How to understand the image people hold of you today, and reshape it deliberately",
      "How to introduce yourself professionally, in a way that reflects your real value",
      "How to set your direction and position yourself clearly within your field",
      "How to build a simple offer that turns your speciality into a service people understand",
      "How to arrange your profile properly and write a bio that serves your goal",
      "How to build a smart content plan for a full month, whatever your speciality",
    ],
    previewLink: {
      label: "Book Now",
      href: "https://www.themind-platform.com/courses/personal-branding-bnaa-albrand-alshkhsy",
      external: true,
    },
  },
  {
    slug: "paid-ads",
    title: "Paid Ads",
    image: {
      src: "/images/course-paid-ads.jpg",
      alt: "Title card for the Meta Ads course",
      width: 800,
      height: 500,
    },
    format: "Course",
    owner: "Walaa Mutar",
    summary:
      "Run paid advertising the way it is actually done — from inside Ads Manager, end to end. No previous experience is needed to start.",
    highlights: [
      "Launching paid ads from inside Ads Manager, professionally",
      "Setting up automatic replies to everyone who comments on your posts",
      "Retargeting your audience with custom and lookalike audiences",
      "Creating dark ads",
      "Running a paid Instagram ad from inside Ads Manager",
    ],
    previewLink: {
      label: "Book Now",
      href: "https://www.themind-platform.com/courses/ads-course-kwrs-alaalanat-almmwlh",
      external: true,
    },
  },
];

/** Looks up a course by its URL segment. */
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}
