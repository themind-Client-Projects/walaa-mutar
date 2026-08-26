/**
 * The site's canonical origin, used for canonical links, Open Graph URLs and
 * the sitemap — everywhere search engines and social platforms need an absolute
 * address rather than a path.
 *
 * The live domain is the built-in default, so a fresh clone or a new deployment
 * emits correct canonical URLs with no environment configured at all. Set
 * `NEXT_PUBLIC_SITE_URL` to override it — for a staging domain, or if the site
 * ever moves.
 *
 * Deliberately not derived from Vercel's `VERCEL_*` variables: those can resolve
 * to a `.vercel.app` address, and a canonical pointing there tells search
 * engines the deployment URL is the real site.
 */
const PRODUCTION_URL = "https://www.walaamutar.com";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  return PRODUCTION_URL;
}

export const SITE_URL = resolveSiteUrl();

/** Absolute URL for a path, for the places a relative one will not do. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
