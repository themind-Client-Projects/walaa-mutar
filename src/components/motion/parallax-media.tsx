"use client";

import Image from "next/image";
import { useRef } from "react";

import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { PARALLAX_STRENGTH } from "@/lib/motion";
import type { ImageAsset } from "@/types/content";

type ParallaxMediaProps = {
  readonly image: ImageAsset;
  /** Frame classes: aspect ratio, rounding, width. */
  readonly className?: string;
  /** Drift, as a percentage of the frame's height, in each direction. */
  readonly strength?: number;
  /** Where the subject sits once cropped — e.g. "center 35%". */
  readonly objectPosition?: string;
  readonly priority?: boolean;
  readonly sizes?: string;
};

/**
 * An image that drifts against the scroll inside a still frame.
 *
 * The photo moves, the frame does not: the inner layer is grown by `strength`%
 * top and bottom so there is always something held in reserve, then moved by
 * exactly that overhang as the frame crosses the viewport — never more, so an
 * empty edge can never slide into view at any viewport size.
 *
 * Deliberately not `background-attachment: fixed`: pinning the photo to the
 * viewport re-crops it at every scroll position, and the subject drifts out of
 * the frame. Here the composition holds and only the depth changes.
 */
export function ParallaxMedia({
  image,
  className,
  strength = PARALLAX_STRENGTH,
  objectPosition = "center",
  priority = false,
  sizes = "100vw",
}: ParallaxMediaProps) {
  const frame = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  /** The inner layer is this many times the frame's height. */
  const scale = 1 + (2 * strength) / 100;
  /** Travel expressed in the layer's own height, which is what yPercent uses. */
  const travel = strength / scale;

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          layer.current,
          { yPercent: -travel },
          {
            yPercent: travel,
            ease: "none",
            scrollTrigger: {
              trigger: frame.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      return () => media.revert();
    },
    { scope: frame, dependencies: [travel] },
  );

  return (
    <div
      ref={frame}
      className={cn("relative overflow-hidden bg-surface", className)}
    >
      <div
        ref={layer}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${strength}%`, height: `${scale * 100}%` }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={priority}
          sizes={sizes}
          style={{ objectPosition }}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
