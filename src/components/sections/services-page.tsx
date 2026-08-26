import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { CardMedia } from "@/components/ui/card-media";
import { Container } from "@/components/ui/container";
import { TagList } from "@/components/ui/tag-list";
import { services, servicesPageIntro } from "@/content/services";
import type { Service } from "@/types/content";

/**
 * One service, at length: the photograph first, then what it is, then what it
 * covers. The order is deliberate — the image is what carries the page, and
 * the words explain what you have just looked at.
 */
function ServiceBlock({ service }: { readonly service: Service }) {
  return (
    <article>
      <Reveal distance={48}>
        <CardMedia
          image={service.image}
          className="aspect-[16/9] w-full rounded-3xl"
          sizes="(min-width: 1024px) 69vw, 88vw"
        />
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-12 text-[0.9375rem] leading-[1.8] text-ink lg:mt-16 lg:text-[1.0625rem]">
          {service.detail}
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <TagList tags={service.tags} tone="filled" className="mt-8 lg:mt-10" />
      </Reveal>
    </article>
  );
}

export function ServicesPage() {
  return (
    <>
      <section>
        <Container width="narrow">
          <AnimatedHeading
            as="h1"
            playOnMount
            delay={0.15}
            text={servicesPageIntro.title}
            className="pt-14 text-center text-[9vw] leading-[0.9] font-bold tracking-[-0.045em] text-ink lg:pt-28"
          />

          {servicesPageIntro.lede ? (
            <Reveal delay={0.5} className="mt-10 flex justify-center lg:mt-16">
              <p className="max-w-[36rem] text-center text-[0.9375rem] leading-[1.8] text-muted lg:max-w-3xl lg:text-[1.0625rem]">
                {servicesPageIntro.lede}
              </p>
            </Reveal>
          ) : null}
        </Container>
      </section>

      <section className="pt-16 pb-28 lg:pt-24 lg:pb-40">
        <Container width="narrow">
          <div className="flex flex-col gap-28 lg:gap-40">
            {services.map((service) => (
              <ServiceBlock key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
