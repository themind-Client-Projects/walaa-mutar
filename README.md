# Walaa Mutar — portfolio

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP ScrollTrigger · Lenis.

```bash
pnpm dev     # http://localhost:3000
pnpm build   # production build
pnpm lint
```

## Structure

```
src/
  types/content.ts       every content shape, in one place
  content/               the actual copy and image references
  lib/                   design + motion tokens, gsap registration, cn()
  components/
    motion/              scroll behaviour: smooth scroll, reveal, parallax, headings
    ui/                  presentational primitives: pills, tags, media frames
    layout/              header and footer
    sections/            hero, services, courses, reviews
  app/                   layout, page, global stylesheet
```

Components never hold copy. Anything a client would want changed lives in
`src/content`, typed against `src/types/content.ts`, so a wrong field or a
missing image is a compile error rather than a broken page.

## Routes

| Route | Source |
| --- | --- |
| `/` | `components/sections/*` composed in `app/page.tsx` |
| `/about` | `app/about/page.tsx`, from `src/content/about.ts` |
| `/services` | `app/services/page.tsx` — the same `src/content/services.ts` list the home grid uses, at greater length |
| `/courses/<slug>` | `app/courses/[slug]/page.tsx` — one prerendered page per entry in `src/content/courses.ts` |

Header and footer live in the root layout, so every route carries them. Section
links are written root-relative (`/#services`): on the home page `AppLink`
renders them as bare hash anchors so the smooth-scroll layer handles them, and
from a course page it routes home first.

## Changing the content

- **Copy, tags, years, links** — edit the matching file in `src/content/`.
- **Courses** — each entry in `src/content/courses.ts` is both a card on the home
  page and its own page at `/courses/<slug>`. `slug` is the URL, so changing it
  changes the address.
- **Images** — drop the file in `public/images/` and point the content entry at
  it, updating `width`/`height` to the real pixel size (they prevent layout
  shift; `sips -g pixelWidth -g pixelHeight file.jpg` will tell you).

The `.jpg` files are real. The generated placeholders left are the four
`service-*.png` files (`src/content/services.ts`), plus `about-portrait.png`
and `about-why.png` (`src/content/about.ts`).

`logo.png` is the brand mark, drawn white on transparency and trimmed to its
own bounds (64×28). The footer uses it as-is; the header darkens it with
`brightness-0`, so one asset serves both surfaces. Replacing it with a coloured
mark means dropping that filter and shipping a second file.

A service carries two descriptions: `summary` for the home grid and `detail`
for the services page. It always carries an image; `statement` is what makes the
home grid draw a black panel in its place.

Review cards are finished graphics of differing shapes (square and portrait),
so the grid uses `items-start` and the images keep their natural aspect — a
fixed frame would crop the messages inside them.

Replacing an image **under the same filename** will keep serving the old one in
`next dev` — the optimizer caches by URL. Give the new file a different name (or
delete `.next/cache/images` and restart) so the URL changes with the content.

Course thumbnails are shown in a 16:10 frame, which is what the platform's own
title cards use — a squarer frame would crop their captions off.

## Motion

`src/lib/motion.ts` holds every duration, ease, stagger and distance — change a
value there and the whole page keeps its rhythm.

- **Smooth scrolling** — Lenis, with its own RAF loop disabled so GSAP's ticker
  is the only clock on the page (`components/motion/smooth-scroll-provider.tsx`).
- **Reveals** — blocks fade up once as they enter the viewport. They start
  hidden in CSS so the first painted frame already matches the animation's start
  state, with a `<noscript>` override so nothing stays hidden without JS.
- **Parallax** — the hero photo drifts against the scroll inside a still frame.
  The travel is derived from the overhang, so an empty edge can never appear.
- **Headings** — words rise on a CSS animation; JavaScript only decides when it
  starts. Nothing starts while the tab is off screen: browsers suspend
  animations there, and a heading that begins unwatched is found frozen part-way
  up, clipped by its own mask (`hooks/use-has-been-visible.ts`).
- **Reduced motion** — every animation is wrapped in `gsap.matchMedia()`. With
  `prefers-reduced-motion: reduce`, Lenis never starts, and content is simply
  placed in its final state.
