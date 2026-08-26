"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";

import type { Link } from "@/types/content";

type AppLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> &
  Pick<Link, "href" | "external">;

/** `mailto:`, `tel:`, `https:` — anything the router has no business handling. */
const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;

/**
 * Chooses between the router and a plain anchor.
 *
 * Section links are written root-relative (`/#services`) so they work from a
 * course page as well as the home page. On the home page itself they are
 * rendered as bare hash anchors, which hands them to the smooth-scroll layer;
 * from anywhere else they go through the router, which navigates home and then
 * jumps to the section.
 */
export function AppLink({ href, external, children, ...rest }: AppLinkProps) {
  const pathname = usePathname();

  const sameDocumentHash = href.startsWith("#")
    ? href
    : href.startsWith("/#") && pathname === "/"
      ? href.slice(1)
      : null;

  if (sameDocumentHash !== null || external || HAS_SCHEME.test(href)) {
    return (
      <a
        href={sameDocumentHash ?? href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} {...rest}>
      {children}
    </NextLink>
  );
}
