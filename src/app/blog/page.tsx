// ─── Blog index (/blog) ───────────────────────────────────────────────────────
// PageHeader + a card grid of posts (newest first), each tagged with its related
// service and linking to the post. Breadcrumb JSON-LD + CTA band.
import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { POSTS } from "@/lib/blog";
import { getService } from "@/lib/services";
import { PageHeader } from "@/components/sections/PageHeader";
import { CTABand } from "@/components/sections/CTABand";
import { BreadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Mobile Tire & Roadside Tips — GoldenNorth Blog",
  description: `Practical winter-tire, roadside, and car-battery advice for Toronto & GTA drivers from ${BUSINESS.shortName} — when to swap, what to do, and how mobile service saves the shop trip.`,
  path: "/blog",
});

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <PageHeader
        title={
          <>
            Tips from the <span className="text-[var(--color-accent)]">roadside.</span>
          </>
        }
        intro="Straight answers on winter tires, flats, and dead batteries for GTA drivers — from the crew that comes to you."
      />

      <section className="bg-[var(--color-page)] py-16 lg:py-24" aria-label="Blog posts">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {POSTS.map((post) => {
              const service = getService(post.relatedService);
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm transition-colors duration-200 hover:border-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
                >
                  {service && (
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-deep)]">
                      {service.shortName}
                    </span>
                  )}
                  <h2 className="mt-2 font-bold text-xl leading-snug text-[var(--color-heading)] group-hover:text-[var(--color-accent-deep)]">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-[var(--color-body)]">{post.excerpt}</p>
                  <p className="mt-4 text-sm text-[var(--color-muted)]">
                    <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
