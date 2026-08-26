import Image from "next/image";

import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

type CardMediaProps = {
  readonly image: ImageAsset;
  /** Frame classes: aspect ratio and rounding. */
  readonly className?: string;
  readonly sizes?: string;
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
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}
