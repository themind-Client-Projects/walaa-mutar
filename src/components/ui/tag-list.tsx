import { cn } from "@/lib/cn";
import type { Tag } from "@/types/content";

type TagListProps = {
  readonly tags: readonly Tag[];
  readonly tone?: "light" | "dark" | "filled";
  readonly className?: string;
};

const TONES = {
  light: "border border-line px-3 py-1 text-xs leading-5 text-ink/70",
  dark: "border border-white/20 px-3 py-1 text-xs leading-5 text-white/70",
  /** The larger filled pill the services page uses under each block. */
  filled: "bg-surface px-5 py-2.5 text-sm text-ink",
} as const;

/** The row of pills under a service or a card. */
export function TagList({ tags, tone = "light", className }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {tags.map((tag) => (
        <li key={tag} className={cn("rounded-full", TONES[tone])}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
