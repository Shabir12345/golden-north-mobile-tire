import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";
import { CATALOG_UPDATED, SERVICES } from "@/lib/services";
import { POSTS } from "@/lib/blog";

// lastMod must reflect a real content change, not the build clock. Stamping
// build time on every route trains Google to ignore the signal, which matters
// most when one page genuinely has changed and needs a recrawl.
const day = (iso: string) => new Date(`${iso}T00:00:00`);

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${BUSINESS.url}${path}`;
  const catalogDate = day(CATALOG_UPDATED);
  // The blog index changes when its newest post does.
  const newestPost = POSTS.reduce((a, p) => (p.updated > a ? p.updated : a), POSTS[0].updated);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: catalogDate, changeFrequency: "weekly", priority: 1 },
    { url: url("/services"), lastModified: catalogDate, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/gallery"), lastModified: catalogDate, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/blog"), lastModified: day(newestPost), changeFrequency: "weekly", priority: 0.7 },
    { url: url("/contact"), lastModified: catalogDate, changeFrequency: "yearly", priority: 0.7 },
    { url: url("/privacy"), lastModified: catalogDate, changeFrequency: "yearly", priority: 0.3 },
  ];

  // A parent service page renders its sub-service pills, so it is as fresh as
  // its most recently revised child.
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => {
    const dates = [s.updated ?? CATALOG_UPDATED, ...s.subServices.map((x) => x.updated ?? CATALOG_UPDATED)];
    return {
      url: url(`/services/${s.slug}`),
      lastModified: day(dates.reduce((a, d) => (d > a ? d : a))),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  const subServiceRoutes: MetadataRoute.Sitemap = SERVICES.flatMap((s) =>
    s.subServices.map((x) => ({
      url: url(`/services/${s.slug}/${x.slug}`),
      lastModified: day(x.updated ?? CATALOG_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const blogRoutes: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: new Date(`${post.updated}T00:00:00`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...subServiceRoutes, ...blogRoutes];
}
