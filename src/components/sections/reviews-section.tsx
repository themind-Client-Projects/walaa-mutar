import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { AppLink } from "@/components/ui/app-link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { reviews, reviewsIntro } from "@/content/reviews";
import type { Review } from "@/types/content";

function ReviewCard({ review }: { readonly review: Review }) {
  return (
    <figure className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
      <div className="overflow-hidden rounded-2xl bg-black/40">
        <Image
          src={review.image.src}
          alt={review.image.alt}
          width={review.image.width}
          height={review.image.height}
          sizes="(min-width: 1024px) 44vw, 88vw"
          className="h-auto w-full"
        />
      </div>

      <figcaption className="mt-4 flex items-center justify-between gap-4">
        <span className="text-xs text-white/50">{review.platform}</span>
        {review.href ? (
          <AppLink
            href={review.href}
            external
            className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-white/70 transition-colors duration-300 hover:border-white/50 hover:text-white"
          >
            Read more
          </AppLink>
        ) : null}
      </figcaption>
    </figure>
  );
}

/** The dark band of client testimonials that closes out the work. */
export function ReviewsSection() {
  return (
    <section
      id={reviewsIntro.id}
      className="bg-ink scroll-mt-24 py-24 text-paper lg:py-32"
    >
      <Container>
        <SectionHeader intro={reviewsIntro} tone="dark" />

        {/* `items-start` keeps each card at its own height: the cards are
            finished graphics of differing shapes, and stretching one to match
            its neighbour would crop the messages inside it. */}
        <Reveal
          stagger
          className="mt-14 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:mt-20 lg:gap-8"
        >
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
