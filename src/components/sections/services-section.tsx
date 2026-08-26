import { Reveal } from "@/components/motion/reveal";
import { CardMedia } from "@/components/ui/card-media";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { TagList } from "@/components/ui/tag-list";
import { services, servicesIntro } from "@/content/services";
import { cn } from "@/lib/cn";
import type { Service } from "@/types/content";

/**
 * The two columns are interleaved rather than wrapped, which is what gives the
 * grid its staggered rhythm: odd cards fall left, even cards fall right and sit
 * lower down the page.
 */
const leftColumn = services.filter((_, index) => index % 2 === 0);
const rightColumn = services.filter((_, index) => index % 2 === 1);

function ServiceCard({ service }: { readonly service: Service }) {
  return (
    <article className="flex flex-col">
      {service.statement ? (
        <div className="flex aspect-square w-full items-end rounded-2xl bg-ink p-8">
          <h3 className="max-w-[14ch] text-2xl leading-tight font-semibold tracking-tight text-paper uppercase sm:text-3xl">
            {service.statement}
          </h3>
        </div>
      ) : (
        <CardMedia
          image={service.image}
          className="aspect-[4/3] w-full"
          sizes="(min-width: 1024px) 34vw, 88vw"
        />
      )}

      <p className="mt-6 max-w-sm text-[0.8125rem] leading-7 text-muted">
        {service.summary}
      </p>

      <TagList tags={service.tags} className="mt-5 max-w-sm" />
    </article>
  );
}

function ServiceColumn({
  items,
  className,
}: {
  readonly items: readonly Service[];
  readonly className?: string;
}) {
  return (
    <Reveal stagger className={cn("flex flex-col gap-20", className)}>
      {items.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </Reveal>
  );
}

export function ServicesSection() {
  return (
    <section id={servicesIntro.id} className="scroll-mt-24 py-28 lg:py-40">
      <Container>
        <SectionHeader intro={servicesIntro} />

        <div className="mt-16 grid grid-cols-1 gap-20 lg:mt-24 lg:grid-cols-2 lg:gap-x-16">
          <ServiceColumn items={leftColumn} />
          <ServiceColumn items={rightColumn} className="lg:mt-32" />
        </div>
      </Container>
    </section>
  );
}
