import { AnimatedHeading } from "@/components/motion/animated-heading";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { profile } from "@/content/site";

const [firstName, lastName] = profile.displayName;

/** The opening screen: name, positioning statement, and the drifting portrait. */
export function HeroSection() {
  return (
    <section id="home">
      <Container>
        {/*
          Sized in viewport units with no upper bound: the name is meant to span
          the content column at every screen size, not stop growing.

          13vw, not 14: the column's padding is `10vw`, and `vw` counts the
          scrollbar while the content box does not — so the real column is some
          15px narrower than the arithmetic suggests. At 14vw the name needed
          809px of an 804px column on an iPad and broke onto a second line.
          `whitespace-nowrap` then guarantees the single line rather than
          leaving it to the last pixel.
        */}
        <AnimatedHeading
          as="h1"
          playOnMount
          delay={0.15}
          text={`${firstName} ${lastName}`}
          className="pt-14 text-center text-[13vw] leading-[0.85] font-bold tracking-[-0.045em] whitespace-nowrap text-ink lg:pt-28"
        />

        <Reveal delay={0.5} className="mt-14 flex justify-center lg:mt-24">
          <p className="max-w-[36rem] text-center text-[0.9375rem] leading-[1.8] text-muted lg:max-w-3xl lg:text-[1.0625rem]">
            {profile.intro}
          </p>
        </Reveal>

        <Reveal delay={0.15} distance={48} className="mt-14 lg:mt-28">
          <ParallaxMedia
            image={profile.portrait}
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
