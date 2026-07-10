// ─── Blog post (/blog/[slug]) ─────────────────────────────────────────────────
// Statically generated per Markdown post: navy header, rendered article body,
// a related-service funnel card, optional FAQ (with FAQPage JSON-LD), cross-links,
// and the CTA band. BlogPosting + Breadcrumb JSON-LD.
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { POSTS, POST_SLUGS, getPost } from "@/lib/blog";
import { getService } from "@/lib/services";
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/lib/jsonld";
import { CallButton, Button } from "@/components/ui/Button";
import { CompassRose } from "@/components/ui/CompassRose";
import { CTABand } from "@/components/sections/CTABand";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return POST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    ogType: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
  });
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const service = getService(post.relatedService);
  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <ArticleJsonLd post={post} />
      {post.faqs.length > 0 && <FaqJsonLd faqs={post.faqs} />}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      {/* Header */}
      <section className="relative overflow-hidden bg-[var(--color-navy)]" aria-labelledby="post-heading">
        <CompassRose className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 text-[var(--color-accent)] opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-accent)]">
            GoldenNorth Blog
          </p>
          <h1
            id="post-heading"
            className="font-bold leading-[1.08] text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "-0.02em" }}
          >
            {post.title}
          </h1>
          <p className="mt-5 text-sm text-[var(--color-footer-fg)]">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
          </p>
        </div>
      </section>

      {/* Body + funnel */}
      <section className="bg-[var(--color-page)] py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <article className="article" dangerouslySetInnerHTML={{ __html: post.html }} />

          {service && (
            <div className="mt-14 rounded-xl border border-[var(--color-border)] bg-[var(--color-accent-soft)] p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-deep)]">
                Related service
              </p>
              <h2 className="mt-2 font-bold text-2xl text-[var(--color-heading)]">{service.name}</h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-body)]">{service.tagline}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <CallButton />
                <Button variant="ghost" href={`/services/${service.slug}`} aria-label={`${service.name} — view service`}>
                  View {service.shortName}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      {post.faqs.length > 0 && (
        <section className="bg-[var(--color-surface)] py-16 lg:py-24" aria-labelledby="post-faq-heading">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 id="post-faq-heading" className="font-bold text-3xl text-[var(--color-heading)]">
              Questions, answered.
            </h2>
            <div className="mt-8 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {post.faqs.map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-lg text-[var(--color-heading)] marker:content-none [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span aria-hidden="true" className="shrink-0 text-[var(--color-accent-deep)] text-xl transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-[var(--color-body)]">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Keep reading */}
      {others.length > 0 && (
        <section className="bg-[var(--color-page)] py-16 lg:py-20" aria-labelledby="keep-reading-heading">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 id="keep-reading-heading" className="mb-8 font-bold text-2xl text-[var(--color-heading)]">
              Keep reading
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-5 shadow-sm transition-colors duration-200 hover:border-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
                >
                  <span className="font-bold text-lg text-[var(--color-heading)] group-hover:text-[var(--color-accent-deep)]">
                    {p.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
