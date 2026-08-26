import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseDetail } from "@/components/sections/course-detail";
import { courses, getCourseBySlug } from "@/content/courses";

/** Every course is known at build time, so every page is prerendered. */
export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) return {};

  return {
    title: `${course.title} — Walaa Mutar`,
    description: course.summary,
    openGraph: {
      title: course.title,
      description: course.summary,
      images: [course.image.src],
    },
  };
}

export default async function CoursePage({
  params,
}: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  return <CourseDetail course={course} />;
}
