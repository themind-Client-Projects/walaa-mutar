import { AnimatedHeading } from "@/components/motion/animated-heading";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { Reveal } from "@/components/motion/reveal";
import { CardMedia } from "@/components/ui/card-media";
import { Container } from "@/components/ui/container";
import type { About } from "@/types/content";

/** Name, opening paragraph, and the drifting banner. */
export function AboutIntro({ content }: { readonly content: About }) {
  return (
    <section>
      <Container>
        <AnimatedHeading
          as="h1"
          playOnMount
          delay={0.15}
          text={content.title}
          className="pt-14 text-center text-[12vw] leading-[0.9] font-bold tracking-[-0.045em] text-ink lg:pt-28"
        />

        <Reveal delay={0.5} className="mt-14 flex justify-center lg:mt-24">
          <p className="max-w-[36rem] text-center text-[0.9375rem] leading-[1.8] text-muted lg:max-w-3xl lg:text-[1.0625rem]">
            {content.intro}
          </p>
        </Reveal>

        <Reveal delay={0.15} distance={48} className="mt-14 lg:mt-28">
          <ParallaxMedia
            image={content.banner}
            priority
            strength={10}
            sizes="(min-width: 1024px) 80vw, 92vw"
            className="aspect-[4/3] w-full rounded-3xl sm:aspect-[16/9]"
          />
        </Reveal>
      </Container>
    </section>
  );
}

/** Portrait beside the biography, with the record underneath it. */
export function AboutBiography({ content }: { readonly content: About }) {
  return (
    <section className="py-28 lg:py-40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-[4.4%]">
          <Reveal className="lg:self-start">
            <CardMedia
              image={content.portrait}
              className="aspect-[4/5] w-full"
              sizes="(min-width: 1024px) 40vw, 88vw"
            />
          </Reveal>

          <div className="flex flex-col">
            <Reveal delay={0.1} stagger className="space-y-6">
              {content.biography.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-[0.9375rem] leading-[1.8] text-ink lg:text-[1.0625rem]"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            {/* Pushed to the foot of the column so the figures line up with the
                bottom of the portrait on a wide screen. */}
            <Reveal
              delay={0.15}
              stagger
              className="mt-14 grid grid-cols-2 gap-y-10 lg:mt-auto lg:pt-20"
            >
              {content.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl leading-none font-bold tracking-tight lg:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The closing pitch. */
export function AboutWhy({ content }: { readonly content: About }) {
  return (
    <section className="pb-28 lg:pb-40">
      <Container>
        <AnimatedHeading
          text={content.why.title}
          className="text-4xl font-bold tracking-tight text-ink/25 sm:text-5xl lg:text-6xl"
        />

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-4xl text-[0.9375rem] leading-[1.8] text-ink lg:text-[1.0625rem]">
            {content.why.body}
          </p>
        </Reveal>

        <Reveal delay={0.15} distance={48} className="mt-14 lg:mt-20">
          <CardMedia
            image={content.why.image}
            className="aspect-[16/9] w-full rounded-3xl"
            sizes="(min-width: 1024px) 80vw, 92vw"
          />
        </Reveal>
      </Container>
    </section>
  );
}
