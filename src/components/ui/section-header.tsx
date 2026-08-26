import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import type { SectionIntro } from "@/types/content";

import { PillButton } from "./pill-button";

type SectionHeaderProps = {
  readonly intro: SectionIntro;
  readonly tone?: "light" | "dark";
  readonly className?: string;
};

const TONES = {
  light: { title: "text-ink/25", lede: "text-muted" },
  dark: { title: "text-paper", lede: "text-white/60" },
} as const;

/** Title, optional lede, and optional "View All" — the top of every section. */
export function SectionHeader({
  intro,
  tone = "light",
  className,
}: SectionHeaderProps) {
  const { title, lede } = TONES[tone];

  return (
    <header
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="max-w-md">
        <AnimatedHeading
          text={intro.title}
          className={cn(
            "text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl",
            title,
          )}
        />
        {intro.lede ? (
          <Reveal delay={0.1}>
            <p className={cn("mt-6 max-w-sm text-sm leading-7", lede)}>
              {intro.lede}
            </p>
          </Reveal>
        ) : null}
      </div>

      {intro.action ? (
        <Reveal delay={0.15} className="shrink-0">
          <PillButton link={intro.action} />
        </Reveal>
      ) : null}
    </header>
  );
}
