/**
 * Domain types for every piece of content on the site.
 *
 * Content lives in `src/content` as plain data that satisfies these types, so
 * copy changes never require touching a component, and a typo in a content file
 * is a compile error rather than a broken render.
 */

/** A static asset in `/public`, with intrinsic dimensions for layout stability. */
export type ImageAsset = {
  readonly src: `/${string}`;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

/** A short label rendered as a pill under a card. */
export type Tag = string;

/** Anchor or external destination used by navigation and calls to action. */
export type Link = {
  readonly label: string;
  readonly href: string;
  /** External links open in a new tab and get `rel="noreferrer"`. */
  readonly external?: boolean;
};

export type Service = {
  readonly id: string;
  readonly image: ImageAsset;
  /**
   * When set, the home grid shows a black statement card in place of the photo.
   * The services page always shows the photo, which is why the image is required
   * either way.
   */
  readonly statement?: string;
  /** The short description on the home grid. */
  readonly summary: string;
  /** The longer description on the services page. */
  readonly detail: string;
  readonly tags: readonly Tag[];
};

export type Course = {
  /** Doubles as the URL segment: `/courses/<slug>`. */
  readonly slug: string;
  readonly title: string;
  readonly image: ImageAsset;
  /** Distinguishes a paid course from a free channel, shown as the card's pill. */
  readonly format: "Course" | "Channel";
  readonly owner: string;
  /** The opening description on the course's own page. */
  readonly summary: string;
  /** What the course covers, listed under the summary. */
  readonly highlights?: readonly string[];
  /**
   * ISO `YYYY-MM-DD`, formatted for display at render time. Optional: a course
   * with no known release date shows no date rather than an invented one.
   */
  readonly releaseDate?: string;
  /** Where "Book Now" goes, when there is somewhere to send people. */
  readonly previewLink?: Link;
};

export type Review = {
  readonly id: string;
  readonly image: ImageAsset;
  readonly platform: "Telegram" | "WhatsApp";
  /** Optional deep link behind the card's "view more" button. */
  readonly href?: string;
};

/** Top-of-page identity and the hero block. */
export type SiteProfile = {
  readonly wordmark: string;
  /**
   * The mark that sits beside the wordmark. It is drawn in white on
   * transparency, so the header renders it through a filter to darken it — see
   * `SiteHeader`.
   */
  readonly logo: ImageAsset;
  /** The line under the wordmark in the footer. */
  readonly tagline: string;
  readonly displayName: readonly [first: string, last: string];
  readonly intro: string;
  readonly portrait: ImageAsset;
  readonly contact: Link;
  readonly nav: readonly Link[];
  readonly social: readonly Link[];
  readonly email: string;
};

/** One figure in the about page's record: a number and what it counts. */
export type Stat = {
  readonly label: string;
  /** Kept as a string so "400+" and "7" are equally at home. */
  readonly value: string;
};

/** Everything the about page renders. */
export type About = {
  readonly title: string;
  readonly intro: string;
  readonly banner: ImageAsset;
  readonly portrait: ImageAsset;
  /** The biography, one entry per paragraph. */
  readonly biography: readonly string[];
  readonly stats: readonly Stat[];
  readonly why: {
    readonly title: string;
    readonly body: string;
    readonly image: ImageAsset;
  };
};

/** A section heading plus its optional lede and "view all" action. */
export type SectionIntro = {
  readonly id: string;
  readonly title: string;
  readonly lede?: string;
  readonly action?: Link;
};
