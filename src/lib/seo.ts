import type { Metadata } from "next";
import { BUSINESS } from "./business";

export function buildMetadata(opts: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = `${BUSINESS.url}${opts.path}`;
  const title = opts.path === "/" ? opts.title : `${opts.title} | ${BUSINESS.shortName}`;
  return {
    title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title, description: opts.description, url, siteName: BUSINESS.name, type: "website",
      images: opts.image ? [{ url: opts.image }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description: opts.description },
  };
}
