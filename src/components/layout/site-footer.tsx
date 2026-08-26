import Image from "next/image";

import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { AppLink } from "@/components/ui/app-link";
import { Container } from "@/components/ui/container";
import { profile } from "@/content/site";
import type { Link } from "@/types/content";

function LinkColumn({
  heading,
  links,
}: {
  readonly heading: string;
  readonly links: readonly Link[];
}) {
  return (
    <div>
      <h3 className="text-sm text-white/40">{heading}</h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <AppLink
              href={link.href}
              external={link.external}
              className="text-base transition-colors duration-300 hover:text-white/60"
            >
              {link.label}
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Contact and footer.
 *
 * It carries `#contact`, the destination of the header's call to action, and
 * continues the dark band the reviews start so the page closes on one surface.
 */
export function SiteFooter() {
  return (
    <footer id="contact" className="bg-ink scroll-mt-24 text-paper">
      <Container className="pt-8 pb-16 lg:pb-20">
        <AnimatedHeading
          text="Let's work together"
          className="max-w-[16ch] text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl"
        />

        <Reveal delay={0.1} className="mt-10">
          <AppLink
            href={`mailto:${profile.email}`}
            className="text-lg underline decoration-white/30 underline-offset-8 transition-colors duration-300 hover:decoration-white sm:text-xl"
          >
            {profile.email}
          </AppLink>
        </Reveal>

        <Reveal
          delay={0.15}
          className="mt-20 grid gap-12 border-t border-white/10 pt-14 lg:grid-cols-[1fr_auto] lg:gap-24 lg:pt-20"
        >
          <div>
            <div className="flex items-center gap-3">
              {/* Already white, so it needs no filter on this surface. */}
              <Image
                src={profile.logo.src}
                alt={profile.logo.alt}
                width={profile.logo.width}
                height={profile.logo.height}
                className="h-[0.8em] w-auto text-3xl"
              />
              <span className="text-3xl font-medium tracking-tight lg:text-4xl">
                {profile.wordmark}
              </span>
            </div>

            <p className="mt-6 max-w-[22ch] text-base leading-8 text-white/80 lg:text-lg">
              {profile.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <LinkColumn heading="Navigation" links={profile.nav} />
            <LinkColumn heading="Follow us" links={profile.social} />
          </div>
        </Reveal>

        <Reveal
          delay={0.2}
          className="mt-16 border-t border-white/10 pt-8 lg:mt-20"
        >
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {profile.displayName.join(" ")}. All
            rights reserved.
          </p>
        </Reveal>
      </Container>
    </footer>
  );
}
