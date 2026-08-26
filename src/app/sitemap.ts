import type { MetadataRoute } from "next";

import { courses } from "@/content/courses";
import { absoluteUrl } from "@/lib/site-url";

/**
 * Generated from the content rather than hand-listed, so a course added to
 * `src/content/courses.ts` is in the sitemap the moment it exists.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.8 },
  ];

  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: absoluteUrl(`/courses/${course.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...coursePages];
}
