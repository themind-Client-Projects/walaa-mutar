"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { REDUCED_MOTION_QUERY } from "@/lib/motion";

/**
 * Re-measure the document once it has stopped changing shape.
 *
 * ScrollTrigger records where every trigger sits at the moment it is created.
 * Anything that changes the page's height afterwards — a webfont swapping in
 * under a 13vw headline, an image arriving — leaves each trigger below it
 * measuring against a layout that no longer exists. A reveal whose start point
 * moved out from under it never fires, and its content stays at `opacity: 0`
 * for good.
 *
 * That is the "load it twice and everything appears" bug: on the second load
 * the fonts and images come from cache, the page is its final height before the
 * triggers are built, and the measurement happens to be right.
 *
 * Refreshing after both signals is cheap — ScrollTrigger recalculates and fires
 * anything whose start has since passed — and it removes the guesswork.
 */
function useScrollTriggerRefresh() {
  useEffect(() => {
    let cancelled = false;

    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    // On mobile, showing and hiding the browser chrome resizes the viewport
    // mid-scroll. Left alone it triggers a refresh storm that can strand a
    // reveal part-way through.
    ScrollTrigger.config({ ignoreMobileResize: true });

    // `load` may already have fired by the time React mounts this.
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh);

    document.fonts?.ready.then(refresh).catch(() => {
      // A browser without the Font Loading API still gets the `load` refresh.
    });

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
    };
  }, []);
}

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
  useScrollTriggerRefresh();

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

    // Lenis re-measures the scrollable area on its own, but ScrollTrigger has
    // just gained a new scroll source and needs to agree with it.
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", syncScrollTrigger);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
