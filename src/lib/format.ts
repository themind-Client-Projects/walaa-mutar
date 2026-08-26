/**
 * One formatter instance, created once: `Intl.DateTimeFormat` is expensive to
 * construct and this one never varies. UTC is pinned so a date renders the same
 * on the build machine as it does in any reader's timezone.
 */
const RELEASE_DATE = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** `2024-02-07` → `Feb 7, 2024`. */
export function formatReleaseDate(iso: string): string {
  return RELEASE_DATE.format(new Date(`${iso}T00:00:00Z`));
}
