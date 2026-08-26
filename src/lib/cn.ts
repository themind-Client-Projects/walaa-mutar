export type ClassValue = string | false | null | undefined;

/** Joins conditional class names, dropping anything falsy. */
export function cn(...values: readonly ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
