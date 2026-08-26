"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { REVEAL_START, STAGGER } from "@/lib/motion";

type AnimatedHeadingProps = {
  readonly text: string;
  readonly className?: string;
  readonly as?: "h1" | "h2";
  /** Play from the first painted frame rather than on scroll. */
  readonly playOnMount?: boolean;
  /** Seconds before the first word moves. */
  readonly delay?: number;
};

/**
 * `pending` — waiting to be scrolled to, held hidden.
 * `playing` — the rise is running.
 * `settled` — done, or given up on: the words simply sit where they belong.
 */
type Phase = "pending" | "playing" | "settled";

/** Length of `--animate-word-rise`, in seconds. */
const RISE_DURATION = 1.1;
/** Grace on top of the expected finish before the words are placed by force. */
const BACKSTOP_GRACE = 0.9;

/**
 * A heading whose words rise out of their own baseline.
 *
 * The rise is a CSS animation (`--animate-word-rise`); React only decides when
 * it starts, and for `playOnMount` headings not even that — the markup ships
 * already playing, so the title animates before hydration and arrives even if
 * hydration never happens.
 *
 * Whatever else goes wrong, the words arrive. Any environment that suspends
 * animations — a background tab, an embedded preview, a screenshot renderer —
 * would otherwise strand a heading at the start of its rise, hidden behind its
 * own mask, with no way out. So the phase machine ends at `settled` on a timer
 * whether or not the animation ever ran: an entrance is a flourish, and a
 * flourish is never allowed to withhold the content.
 *
 * The split happens during render, so server and client agree on the markup and
 * there is no hydration mismatch. The split words are hidden from assistive tech
 * and the real sentence is exposed once through `aria-label`.
 */
export function AnimatedHeading({
  text,
  className,
  as: Tag = "h2",
  playOnMount = false,
  delay = 0,
}: AnimatedHeadingProps) {
  const root = useRef<HTMLHeadingElement>(null);
  const [phase, setPhase] = useState<Phase>(playOnMount ? "playing" : "pending");
  const words = text.split(" ");

  useGSAP(
    () => {
      if (playOnMount) return;

      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: REVEAL_START,
        once: true,
        onEnter: () => setPhase("playing"),
      });

      return () => trigger.kill();
    },
    { scope: root, dependencies: [playOnMount] },
  );

  const lastWordDelay = delay + (words.length - 1) * STAGGER.tight;

  useEffect(() => {
    if (phase !== "playing") return;

    const timer = window.setTimeout(
      () => setPhase("settled"),
      (lastWordDelay + RISE_DURATION + BACKSTOP_GRACE) * 1000,
    );

    return () => window.clearTimeout(timer);
  }, [phase, lastWordDelay]);

  return (
    <Tag ref={root} aria-label={text} className={cn(className)}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {/* The mask is padded so descenders aren't sliced off, then pulled
              back by the same amount to keep the visual baseline intact. */}
          <span
            aria-hidden
            className="inline-block -mb-[0.16em] overflow-hidden pb-[0.16em] align-bottom"
          >
            <span
              data-word
              data-phase={phase}
              className={cn(
                "inline-block",
                phase === "playing" && "animate-word-rise",
              )}
              style={
                phase === "playing"
                  ? { animationDelay: `${delay + index * STAGGER.tight}s` }
                  : undefined
              }
              // The animation may finish before the backstop; take the shorter.
              onAnimationEnd={
                index === words.length - 1
                  ? () => setPhase("settled")
                  : undefined
              }
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
