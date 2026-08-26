/**
 * Motion tokens.
 *
 * Every animation on the site pulls its timing from here so the whole page
 * shares one rhythm — change a value once and the site stays coherent.
 */
export const EASE = {
  /** Default entrance: fast out of the gate, long settle. */
  out: "power3.out",
  /** Headline reveals — slightly more dramatic. */
  display: "expo.out",
} as const;

export const DURATION = {
  fast: 0.5,
  base: 0.9,
  slow: 1.2,
} as const;

export const STAGGER = {
  tight: 0.06,
  base: 0.1,
  loose: 0.16,
} as const;

/** Vertical travel, in pixels, for a standard reveal. */
export const REVEAL_DISTANCE = 32;

/**
 * When an element should start animating: "top of the element has reached 85%
 * down the viewport". Shared so sections trigger in a consistent place.
 */
export const REVEAL_START = "top 85%";

/** How far the hero image drifts against the scroll, as a % of its own height. */
export const PARALLAX_STRENGTH = 10;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
