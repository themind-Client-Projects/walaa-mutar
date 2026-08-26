"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { REDUCED_MOTION_QUERY } from "@/lib/motion";

/**
 * Drives the page with Lenis and hands GSAP the wheel.
 *
 * Lenis' own RAF loop is disabled so that GSAP's ticker is the single clock on
 * the page: one loop, one frame, no drift between the smooth scroll position
 * and the ScrollTriggers reading it.
 *
 * Visitors who ask for reduced motion get native scrolling instead — nothing is
 * intercepted, and no ticker is started.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      wheelMultiplier: 1,
      anchors: true,
      allowNestedScroll: true,
    });

    const syncScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", syncScrollTrigger);

    /** GSAP reports seconds; Lenis expects milliseconds. */
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", syncScrollTrigger);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
