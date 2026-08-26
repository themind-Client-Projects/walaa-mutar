"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single place where GSAP plugins are registered.
 *
 * Every animated component imports `gsap` from here rather than from the
 * package, which guarantees the plugins are registered before first use and
 * keeps registration from being duplicated across the tree.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };
