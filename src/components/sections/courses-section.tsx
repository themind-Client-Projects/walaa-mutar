import { Reveal } from "@/components/motion/reveal";
import { AppLink } from "@/components/ui/app-link";
import { CardMedia } from "@/components/ui/card-media";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { courses, coursesIntro } from "@/content/courses";
import type { Course } from "@/types/content";

function CourseCard({ course }: { readonly course: Course }) {
  return (
    <article className="flex flex-col">
      <AppLink
        href={`/courses/${course.slug}`}
        aria-label={course.title}
        className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <CardMedia
          image={course.image}
          className="aspect-[16/10] w-full"
          sizes="(min-width: 1024px) 44vw, 88vw"
        />
      </AppLink>

      <h3 className="mt-5 text-lg font-semibold tracking-tight">
        {course.title}
      </h3>

      <span className="mt-3 inline-flex w-fit rounded-full border border-line px-3 py-1 text-xs leading-5 text-ink/70">
        {course.format}
      </span>
    </article>
  );
}

export function CoursesSection() {
  return (
    <section id={coursesIntro.id} className="scroll-mt-24 pb-28 lg:pb-40">
      <Container>
        <SectionHeader intro={coursesIntro} />

        <Reveal
          stagger
          className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-20"
        >
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
