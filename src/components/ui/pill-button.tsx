import { cn } from "@/lib/cn";
import type { Link } from "@/types/content";

import { AppLink } from "./app-link";

type PillButtonProps = {
  readonly link: Link;
  readonly variant?: "solid" | "outline";
  readonly className?: string;
};

const VARIANTS = {
  solid: "bg-ink text-paper hover:bg-ink/85",
  outline: "border border-line text-ink hover:border-ink",
} as const;

/** The black lozenge used for "Contact" and every "View All". */
export function PillButton({
  link,
  variant = "solid",
  className,
}: PillButtonProps) {
  return (
    <AppLink
      href={link.href}
      external={link.external}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium lg:px-14 lg:py-3.5 lg:text-base",
        "transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        VARIANTS[variant],
        className,
      )}
    >
      {link.label}
    </AppLink>
  );
}
