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

  // A missing course renders `notFound()`, so its metadata is never used —
  // but a title beats Next's untitled fallback if one ever slips through.
  if (!course) return { title: "Course not found" };

  return {
    title: course.title,
    description: course.summary,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: {
      type: "article",
      url: `/courses/${course.slug}`,
      title: course.title,
      description: course.summary,
      images: [
        {
          url: course.image.src,
          width: course.image.width,
          height: course.image.height,
          alt: course.image.alt,
        },
      ],
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
