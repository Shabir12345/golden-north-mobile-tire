import type { Metadata } from "next";
import { BUSINESS } from "./business";

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  // Blog posts pass "article" (with published/modified times) so they emit
  // og:type=article; everything else defaults to the site's "website" card.
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const url = `${BUSINESS.url}${opts.path}`;
  const branded = `${opts.title} | ${BUSINESS.shortName}`;
  // The root layout's title.template adds the " | Golden North" suffix to child
  // segments, so their document title stays bare here to avoid doubling. The
  // template does NOT apply to the root page (same segment as the layout) — so
  // home gets the brand spelled out. OG/Twitter titles are never touched by the
  // template, so they're branded explicitly on every page.
  const documentTitle = opts.path === "/" ? branded : opts.title;
  // Default every page to the site's shared OG card (app/opengraph-image.tsx,
  // served at /opengraph-image). Setting it explicitly here guarantees og:image
  // on deeply-nested routes where the file convention doesn't cascade once the
  // route defines its own openGraph object.
  const ogImage = opts.image ?? `${BUSINESS.url}/opengraph-image`;
  const images = [{ url: ogImage, width: 1200, height: 630, alt: BUSINESS.name }];
  const ogShared = { title: branded, description: opts.description, url, siteName: BUSINESS.name, images };
  // Next's OpenGraph type is a discriminated union on `type`, so build the
  // article and website variants as distinct literals rather than one object.
  const openGraph =
    opts.ogType === "article"
      ? { ...ogShared, type: "article" as const, publishedTime: opts.publishedTime, modifiedTime: opts.modifiedTime }
      : { ...ogShared, type: "website" as const };
  return {
    title: documentTitle,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph,
    twitter: {
      card: "summary_large_image", title: branded, description: opts.description,
      images: [ogImage],
    },
  };
}
