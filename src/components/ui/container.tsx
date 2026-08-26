import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerProps = {
  readonly children: ReactNode;
  readonly className?: string;
  /**
   * `content` is the column everything on the page is measured against.
   * `wide` is the header's slightly broader gutter, `narrow` the services
   * page's tighter one.
   */
  readonly width?: "content" | "wide" | "narrow";
};

/**
 * The page's horizontal rhythm, in one place.
 *
 * Padding is proportional rather than a fixed max-width: the design keeps the
 * content at roughly four-fifths of the viewport at every size, so on a large
 * display it grows with the screen instead of stranding the layout in a 1280px
 * column with empty margins either side.
 */
const WIDTHS = {
  content: "px-6 sm:px-10 lg:px-[10vw]",
  wide: "px-6 sm:px-10 lg:px-[3.5vw]",
  narrow: "px-6 sm:px-10 lg:px-[15.5vw]",
} as const;

export function Container({
  children,
  className,
  width = "content",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full", WIDTHS[width], className)}>
      {children}
    </div>
  );
}
