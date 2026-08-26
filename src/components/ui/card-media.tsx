import Image from "next/image";

import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

type CardMediaProps = {
  readonly image: ImageAsset;
  /** Frame classes: aspect ratio and rounding. */
  readonly className?: string;
  readonly sizes?: string;
  /**
   * Set on the one image a page paints above the fold, and nowhere else: it
   * preloads eagerly, so spending it on an image further down the page delays
   * the one the visitor is actually waiting for.
   */
  readonly priority?: boolean;
};

/**
 * A rounded image frame that eases in slightly on hover.
 *
 * Card images stay still while the page scrolls — only the hero drifts — so a
 * grid of them doesn't turn into a wall of competing movement.
 */
export function CardMedia({
  image,
  className,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  priority = false,
}: CardMediaProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-surface",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}
