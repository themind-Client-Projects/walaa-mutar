"use client";

import Image from "next/image";
import { useRef } from "react";

import { AppLink } from "@/components/ui/app-link";
import { Container } from "@/components/ui/container";
import { PillButton } from "@/components/ui/pill-button";
import { profile } from "@/content/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * The sticky top bar.
 *
 * The frosted backdrop is a sibling layer whose opacity is tweened directly by
 * GSAP rather than driven by React state, so scrolling never re-renders the
 * header or anything below it.
 */
export function SiteHeader() {
  const root = useRef<HTMLElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const fade = gsap.to(backdrop.current, {
        autoAlpha: 1,
        duration: 0.3,
        ease: "none",
        paused: true,
      });

      const trigger = ScrollTrigger.create({
        start: "top -32",
        end: 99999,
        onToggle: (self) => (self.isActive ? fade.play() : fade.reverse()),
      });

      return () => {
        trigger.kill();
        fade.kill();
      };
    },
    { scope: root },
  );

  return (
    <header
      ref={root}
      className="sticky top-0 z-50 w-full"
      aria-label="Site header"
    >
      <div
        ref={backdrop}
        aria-hidden
        className="pointer-events-none absolute inset-0 border-b border-line/70 bg-paper/80 opacity-0 backdrop-blur-md"
      />

      <Container width="wide" className="relative flex h-20 items-center justify-between lg:h-[5.5rem]">
        <AppLink
          href="/#home"
          className="flex items-center gap-3 text-xl font-bold tracking-tight text-ink lg:text-2xl"
        >
          {/* The mark ships white for the dark footer; `brightness-0` flattens
              it to black for the light header, so one asset serves both. */}
          <Image
            src={profile.logo.src}
            alt={profile.logo.alt}
            width={profile.logo.width}
            height={profile.logo.height}
            priority
            className="h-[0.85em] w-auto brightness-0"
          />
          {profile.wordmark}
        </AppLink>

        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex items-center gap-8 lg:gap-10">
            {profile.nav.map((item) => (
              <li key={item.href}>
                <AppLink
                  href={item.href}
                  external={item.external}
                  className="text-sm text-ink/70 transition-colors duration-300 hover:text-ink lg:text-base"
                >
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </nav>

        <PillButton link={profile.contact} />
      </Container>
    </header>
  );
}
