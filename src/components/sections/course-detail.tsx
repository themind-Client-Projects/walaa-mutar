import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { AppLink } from "@/components/ui/app-link";
import { CardMedia } from "@/components/ui/card-media";
import { Container } from "@/components/ui/container";
import { formatReleaseDate } from "@/lib/format";
import type { Course, Link } from "@/types/content";

/**
 * One row of the details card. The value is either plain text or something to
 * click, and the union keeps the renderer honest about which it has.
 */
type Spec = {
  readonly label: string;
  readonly value:
    | { readonly kind: "text"; readonly text: string }
    // The whole Link is carried, not just its label and href: dropping
    // `external` here would quietly cost the anchor its target and rel.
    | { readonly kind: "link"; readonly link: Link };
};

function toSpecs(course: Course): readonly Spec[] {
  const specs: Spec[] = [
    { label: "Owner", value: { kind: "text", text: course.owner } },
  ];

  if (course.releaseDate) {
    specs.push({
      label: "Release Date",
      value: { kind: "text", text: formatReleaseDate(course.releaseDate) },
    });
  }

  specs.push({
    label: "Services",
    value: { kind: "text", text: course.format },
  });

  if (course.previewLink) {
    specs.push({
      label: "Preview Link",
      value: { kind: "link", link: course.previewLink },
    });
  }

  return specs;
}

function SpecCard({ course }: { readonly course: Course }) {
  return (
    <div className="rounded-3xl bg-accent p-8 text-paper sm:p-10 lg:p-12">
      <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
        Course Details
      </h2>

      <dl className="mt-8 border-t border-white/30 pt-2 lg:mt-10">
        {toSpecs(course).map((spec) => (
          <div
            key={spec.label}
            className="flex items-baseline justify-between gap-6 py-4 lg:py-5"
          >
            <dt className="text-sm text-white/85 lg:text-base">{spec.label}</dt>
            <dd className="text-right text-sm font-medium lg:text-base">
              {spec.value.kind === "link" ? (
                <AppLink
                  href={spec.value.link.href}
                  external={spec.value.link.external}
                  className="underline decoration-white/40 underline-offset-4 transition-colors duration-300 hover:decoration-white"
                >
                  {spec.value.link.label}
                </AppLink>
              ) : (
                spec.value.text
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** A single course, given a page of its own. */
export function CourseDetail({ course }: { readonly course: Course }) {
  return (
    <section className="pb-28 lg:pb-40">
      <Container>
        <AnimatedHeading
          as="h1"
          playOnMount
          delay={0.15}
          text={course.title}
          className="pt-14 text-center text-[9vw] leading-[0.9] font-bold tracking-[-0.045em] text-ink lg:pt-28"
        />

        {/* Roughly 7:10 — the card is a sidebar, the media carries the page. */}
        <div className="mt-14 grid gap-10 lg:mt-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,10fr)] lg:gap-x-[4.4%]">
          <Reveal className="lg:self-start">
            <SpecCard course={course} />
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <CardMedia
                image={course.image}
                className="aspect-[4/3] w-full"
                sizes="(min-width: 1024px) 47vw, 88vw"
              />
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-16 text-[0.9375rem] leading-[1.8] text-ink lg:mt-24 lg:text-[1.0625rem]">
                {course.summary}
              </p>
            </Reveal>

            {course.highlights ? (
              <Reveal delay={0.2}>
                <h2 className="mt-12 text-lg font-semibold tracking-tight lg:text-xl">
                  What you will learn
                </h2>

                <ul className="mt-6 space-y-4">
                  {course.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-4 text-[0.9375rem] leading-[1.7] text-muted lg:text-[1.0625rem]"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
