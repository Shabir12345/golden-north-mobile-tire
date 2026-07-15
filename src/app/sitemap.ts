import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";
import { SERVICE_SLUGS, SERVICES } from "@/lib/services";
import { POSTS } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${BUSINESS.url}${path}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/gallery"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: url("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: url(`/services/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const subServiceRoutes: MetadataRoute.Sitemap = SERVICES.flatMap((s) =>
    s.subServices.map((x) => ({
      url: url(`/services/${s.slug}/${x.slug}`),
      lastModified: now,
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
