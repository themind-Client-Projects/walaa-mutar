"use client";

import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  DURATION,
  EASE,
  REVEAL_DISTANCE,
  REVEAL_START,
  STAGGER,
} from "@/lib/motion";

type RevealProps = {
  readonly children: ReactNode;
  readonly className?: string;
  /** Seconds to wait once the trigger fires. */
  readonly delay?: number;
  /**
   * Vertical travel in pixels. Pass `0` to fade only — GSAP then never writes a
   * `transform`, which matters for subtrees containing `position: fixed`
   * children, since a transformed ancestor re-anchors them.
   */
  readonly distance?: number;
  /** Animate the direct children one after another instead of the wrapper. */
  readonly stagger?: boolean;
};

/**
 * Fades a block up as it enters the viewport, once.
 *
 * The wrapper starts hidden in CSS (`[data-reveal]`) rather than in JavaScript,
 * so the first painted frame already matches the animation's start state and
 * nothing flashes before hydration.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = REVEAL_DISTANCE,
  stagger = false,
}: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;

      const targets: readonly Element[] = stagger
        ? Array.from(element.children)
        : [element];
      if (targets.length === 0) return;

      // When children carry the animation, the wrapper itself must become
      // visible or it would hide them for good.
      if (stagger) gsap.set(element, { autoAlpha: 1 });

      const media = gsap.matchMedia();

      media.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };

          if (reduced) {
            gsap.set(targets, { autoAlpha: 1, y: 0 });
            return;
          }

          const travel = distance === 0 ? {} : { y: distance };
          const settled = distance === 0 ? {} : { y: 0 };

          // `fromTo`, not `from`: the CSS start state means GSAP would otherwise
          // read "invisible" as the value to animate back to.
          gsap.fromTo(
            targets,
            { autoAlpha: 0, ...travel },
            {
              autoAlpha: 1,
              ...settled,
              duration: DURATION.base,
              ease: EASE.out,
              delay,
              stagger: stagger ? STAGGER.base : 0,
              scrollTrigger: {
                trigger: element,
                start: REVEAL_START,
                once: true,
              },
            },
          );
        },
      );

      return () => media.revert();
    },
    { scope: root, dependencies: [delay, distance, stagger] },
  );

  return (
    <div ref={root} data-reveal className={cn(className)}>
      {children}
    </div>
  );
}
