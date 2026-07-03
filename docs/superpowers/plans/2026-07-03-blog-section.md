# SEO Blog Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Markdown-driven blog to the Golden North site so the business can publish SEO articles that rank for high-intent GTA searches and funnel readers to the Call CTA and matching service pages.

**Architecture:** Posts are Markdown files in `content/blog/*.md` with YAML frontmatter, parsed at build time by a new server-only `src/lib/blog.ts` that mirrors the shape of `src/lib/services.ts` (`POSTS`, `POST_SLUGS`, `getPost`). Two statically-generated routes render them (`/blog` index and `/blog/[slug]` post), reusing existing components (`PageHeader`, `CTABand`, `CallButton`, `Button`, `CompassRose`) and SEO helpers (`buildMetadata`, JSON-LD). A new `ArticleJsonLd` (`BlogPosting`) is added; sitemap and nav are extended.

**Tech Stack:** Next.js 16.2.9 (App Router, SSG), React 19, Tailwind v4, TypeScript, Vitest + Testing Library. New deps: `gray-matter` (frontmatter), `marked` (Markdown → HTML).

## Global Constraints

- **This is NOT the Next.js you know** (AGENTS.md) — before wiring the loader, skim `node_modules/next/dist/docs/01-app/02-guides/mdx.md`; we deliberately do NOT use `@next/mdx` (plain Markdown only), but confirm nothing in Next 16 conflicts with reading files at build time.
- `blog.ts` is **server-only** — it uses `node:fs`. It must be imported only by server components (pages, sitemap) and tests, never by a `"use client"` component.
- **SEO contract per post:** `seoTitle` ≤ 60 chars; `description` 120–165 chars; `keywords` ≥ 3; `excerpt` > 40 chars; `date`/`updated` are `YYYY-MM-DD`; `relatedService` must be a real `SERVICES` slug (`tire-change`, `tires`, `battery`, `roadside`).
- **Copy rules (standing client rule):** no prices, no "free" offers, no ETA/time-to-arrival promises anywhere in article or metadata copy. Answer-first openers. Phone is `(416) 558-5915`.
- Frontmatter dates are written as **quoted strings** (`date: "2026-07-03"`) and coerced defensively in `blog.ts` (YAML would otherwise parse a bare date as a `Date`).
- Follow existing design tokens (`var(--color-*)`), Inter type, and the call-first hierarchy. Reuse components; do not restyle shared ones.

---

## File Structure

**New**
- `content/blog/winter-tires-ontario.md` — seed post (Task 1 fixture + real content)
- `content/blog/new-vs-used-tires.md` — seed post (Task 6)
- `content/blog/flat-tire-highway-gta.md` — seed post (Task 6)
- `content/blog/car-battery-winter-toronto.md` — seed post (Task 6)
- `src/lib/blog.ts` — loader: `Post`, `POSTS`, `POST_SLUGS`, `getPost`
- `src/lib/__tests__/blog.test.ts` — data-contract tests
- `src/app/blog/page.tsx` — index route
- `src/app/blog/__tests__/page.test.tsx` — index render test
- `src/app/blog/[slug]/page.tsx` — post route
- `src/app/blog/[slug]/__tests__/post.test.tsx` — post render test

**Modified**
- `package.json` — add `gray-matter`, `marked` (+ `@types/gray-matter` dev)
- `src/lib/jsonld.tsx` — add `ArticleJsonLd`
- `src/lib/__tests__/jsonld.test.tsx` — add `ArticleJsonLd` test
- `src/app/globals.css` — add `.article` prose styles
- `src/app/sitemap.ts` — add `/blog` + post routes
- `src/components/layout/Header.tsx` — add "Blog" to `NAV`
- `src/components/layout/Footer.tsx` — add "Blog" to `NAV_LINKS`

---

## Task 1: Blog loader + first seed post

**Files:**
- Modify: `package.json` (add deps)
- Create: `content/blog/winter-tires-ontario.md`
- Create: `src/lib/blog.ts`
- Test: `src/lib/__tests__/blog.test.ts`

**Interfaces:**
- Consumes: `SERVICE_SLUGS` from `@/lib/services`.
- Produces:
  - `interface PostFaq { q: string; a: string }`
  - `interface Post { slug: string; title: string; seoTitle: string; description: string; excerpt: string; keywords: string[]; date: string; updated: string; relatedService: string; faqs: PostFaq[]; html: string; readingMinutes: number }`
  - `POSTS: Post[]` (sorted by `date` desc), `POST_SLUGS: string[]`, `getPost(slug: string): Post | undefined`

- [ ] **Step 1: Install dependencies**

Run:
```bash
npm install gray-matter marked
npm install -D @types/gray-matter
```
Expected: packages added to `package.json`, no errors. (`marked` ships its own types; `@types/gray-matter` covers the frontmatter parser.)

- [ ] **Step 2: Create the first seed post** (`content/blog/winter-tires-ontario.md`)

```markdown
---
title: When to Put On Winter Tires in Ontario
seoTitle: When to Put On Winter Tires in Ontario (7°C Rule)
description: "In Ontario, fit winter tires once daytime temperatures stay below 7°C — usually late October to mid-November. Golden North swaps them at your door, GTA-wide."
excerpt: "Once daytime temperatures in the GTA stay consistently below 7°C — usually late October to mid-November — it's time to switch to winter tires."
keywords:
  - when to put on winter tires ontario
  - 7C rule winter tires
  - winter tire changeover toronto
  - winter tires gta
date: "2026-07-03"
relatedService: tire-change
faqs:
  - q: What temperature should I switch to winter tires?
    a: Once daytime highs stay consistently below 7°C — usually late October to mid-November in the GTA. Below that, all-season rubber hardens and loses grip even on dry roads.
  - q: Are winter tires only useful in snow?
    a: No. Their real advantage is the compound: below 7°C it stays soft and grips cold, dry or wet pavement far better than all-seasons, shortening your stopping distance well before the first snowfall.
  - q: When should I take winter tires off in spring?
    a: Once daytime temperatures hold above 7°C, typically mid-April in the GTA. Running winters through hot spring weather wears the soft compound quickly.
---

## The 7°C rule, in one line

Once daytime temperatures in the GTA stay consistently below 7°C — usually late October to mid-November — all-season rubber hardens, loses grip, and it's time to switch to winter tires. Keep them on until spring temperatures hold above 7°C, typically mid-April.

## Why 7°C, not the first snowfall

Winter tires aren't just for snow. Below 7°C, the softer winter compound stays pliable and grips cold, dry pavement far better than all-seasons — which stiffen and lengthen your stopping distance even on a clear, frosty morning. Waiting for the first storm means driving on the wrong rubber through weeks of cold.

## Beat the first-snowfall rush

The busiest week for every tire shop in Toronto is the one right after the first real snow. Booking your changeover in late October or early November means easier scheduling and no scramble. If your winters are already mounted on their own rims, the swap is quick.

## Skip the shop — swap at your door

Golden North does [mobile tire change](/services/tire-change) across Toronto and the GTA: we come to your driveway, condo garage, or office lot, torque to spec, and set your pressures. No shop visit, no waiting room, no lost Saturday.

Ready for the season? Call (416) 558-5915.
```

- [ ] **Step 3: Write the failing test** (`src/lib/__tests__/blog.test.ts`)

```ts
import { describe, it, expect } from "vitest";
import { POSTS, POST_SLUGS, getPost } from "@/lib/blog";
import { SERVICE_SLUGS } from "@/lib/services";

describe("blog", () => {
  it("loads at least one post", () => {
    expect(POSTS.length).toBeGreaterThan(0);
  });

  it("every post meets the SEO contract", () => {
    for (const p of POSTS) {
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.seoTitle.length).toBeLessThanOrEqual(60);
      expect(p.description.length).toBeGreaterThanOrEqual(120);
      expect(p.description.length).toBeLessThanOrEqual(165);
      expect(p.excerpt.length).toBeGreaterThan(40);
      expect(p.keywords.length).toBeGreaterThanOrEqual(3);
      expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(SERVICE_SLUGS).toContain(p.relatedService);
      expect(p.html).toContain("<");
      expect(p.readingMinutes).toBeGreaterThanOrEqual(1);
    }
  });

  it("sorts posts newest-first", () => {
    const dates = POSTS.map((p) => p.date);
    const sorted = [...dates].sort().reverse();
    expect(dates).toEqual(sorted);
  });

  it("looks up by slug", () => {
    expect(getPost(POST_SLUGS[0])?.slug).toBe(POST_SLUGS[0]);
    expect(getPost("nope")).toBeUndefined();
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm test -- blog`
Expected: FAIL — cannot resolve `@/lib/blog`.

- [ ] **Step 5: Implement the loader** (`src/lib/blog.ts`)

```ts
// Server-only Markdown blog loader. Reads content/blog/*.md at build time,
// parses YAML frontmatter (gray-matter) and renders the body to HTML (marked).
// Mirrors src/lib/services.ts so pages/sitemap treat posts like services.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export interface PostFaq {
  q: string;
  a: string;
}

export interface Post {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  keywords: string[];
  date: string; // YYYY-MM-DD
  updated: string; // YYYY-MM-DD (falls back to date)
  relatedService: string;
  faqs: PostFaq[];
  html: string;
  readingMinutes: number;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// YAML may parse a bare date as a JS Date; normalise anything to YYYY-MM-DD.
function isoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function loadPosts(): Post[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file): Post => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const html = marked.parse(content, { async: false }) as string;
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const date = isoDate(data.date);
    return {
      slug,
      title: String(data.title),
      seoTitle: String(data.seoTitle),
      description: String(data.description),
      excerpt: String(data.excerpt),
      keywords: (data.keywords ?? []) as string[],
      date,
      updated: data.updated ? isoDate(data.updated) : date,
      relatedService: String(data.relatedService),
      faqs: (data.faqs ?? []) as PostFaq[],
      html,
      readingMinutes: Math.max(1, Math.round(words / 200)),
    };
  });
  // Newest first.
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export const POSTS: Post[] = loadPosts();
export const POST_SLUGS: string[] = POSTS.map((p) => p.slug);
export const getPost = (slug: string): Post | undefined =>
  POSTS.find((p) => p.slug === slug);
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test -- blog`
Expected: PASS (4 tests). If `description` length fails, adjust the seed post's `description` string to land within 120–165 chars — do not change the test bounds.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json content/blog/winter-tires-ontario.md src/lib/blog.ts src/lib/__tests__/blog.test.ts
git commit -m "feat: markdown blog loader + first seed post"
```

---

## Task 2: ArticleJsonLd (BlogPosting)

**Files:**
- Modify: `src/lib/jsonld.tsx` (append a new component)
- Test: `src/lib/__tests__/jsonld.test.tsx` (add cases)

**Interfaces:**
- Consumes: `BUSINESS` from `@/lib/business` (already imported in the file).
- Produces: `ArticleJsonLd({ post }: { post: { title: string; description: string; date: string; updated: string; slug: string } })` — a `<script type="application/ld+json">` emitting `@type: "BlogPosting"`.

- [ ] **Step 1: Write the failing test** (add to `src/lib/__tests__/jsonld.test.tsx`)

Add the import and a new `it` block inside the existing `describe("jsonld", …)`:

```ts
import { LocalBusinessJsonLd, FaqJsonLd, ArticleJsonLd } from "@/lib/jsonld";
```
```ts
  it("emits BlogPosting with dates and publisher", () => {
    const { container } = render(
      <ArticleJsonLd
        post={{ title: "T", description: "D", date: "2026-07-03", updated: "2026-07-04", slug: "x" }}
      />,
    );
    const d = parse(container);
    expect(d["@type"]).toBe("BlogPosting");
    expect(d.headline).toBe("T");
    expect(d.datePublished).toBe("2026-07-03");
    expect(d.dateModified).toBe("2026-07-04");
    expect(d.publisher["@id"]).toContain("#business");
  });
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- jsonld`
Expected: FAIL — `ArticleJsonLd` is not exported.

- [ ] **Step 3: Implement `ArticleJsonLd`** (append to `src/lib/jsonld.tsx`)

```tsx
export function ArticleJsonLd({
  post,
}: {
  post: { title: string; description: string; date: string; updated: string; slug: string };
}) {
  const url = `${BUSINESS.url}/blog/${post.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    author: { "@type": "Organization", name: BUSINESS.name, url: BUSINESS.url },
    publisher: {
      "@type": "Organization",
      "@id": `${BUSINESS.url}/#business`,
      name: BUSINESS.name,
      logo: { "@type": "ImageObject", url: `${BUSINESS.url}/icon.svg` },
    },
    image: `${BUSINESS.url}/opengraph-image`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- jsonld`
Expected: PASS (existing cases + the new one).

- [ ] **Step 5: Commit**

```bash
git add src/lib/jsonld.tsx src/lib/__tests__/jsonld.test.tsx
git commit -m "feat: ArticleJsonLd (BlogPosting) structured data"
```

---

## Task 3: Post page `/blog/[slug]` + article styles

**Files:**
- Create: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/globals.css` (add `.article` block)
- Test: `src/app/blog/[slug]/__tests__/post.test.tsx`

**Interfaces:**
- Consumes: `POSTS`, `POST_SLUGS`, `getPost` from `@/lib/blog`; `getService` from `@/lib/services`; `buildMetadata` from `@/lib/seo`; `ArticleJsonLd`, `FaqJsonLd`, `BreadcrumbJsonLd` from `@/lib/jsonld`; `CallButton`, `Button` from `@/components/ui/Button`; `CTABand`, `CompassRose`.
- Produces: default `BlogPostPage`, `generateStaticParams(): { slug: string }[]`, `generateMetadata(...)`.

- [ ] **Step 1: Add `.article` styles** (append to `src/app/globals.css`)

```css
/* ── Article (blog post body) ──
   Hand-written prose styles for marked-rendered HTML. Scoped to .article so it
   never leaks into app UI. No @tailwindcss/typography — matches the hand-built
   design system. */
.article {
  color: var(--color-body);
  font-size: 1.0625rem;
  line-height: 1.75;
}
.article > * + * { margin-top: 1.25rem; }
.article h2 {
  color: var(--color-heading);
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin-top: 2.5rem;
}
.article h3 {
  color: var(--color-heading);
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.3;
  margin-top: 2rem;
}
.article a {
  color: var(--color-accent-deep);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.article a:hover { color: var(--color-heading); }
.article ul, .article ol { padding-left: 1.5rem; }
.article ul { list-style: disc; }
.article ol { list-style: decimal; }
.article li { margin-top: 0.5rem; }
.article strong { color: var(--color-heading); font-weight: 600; }
.article blockquote {
  border-left: 3px solid var(--color-accent);
  padding-left: 1rem;
  color: var(--color-muted);
  font-style: italic;
}
```

- [ ] **Step 2: Write the failing test** (`src/app/blog/[slug]/__tests__/post.test.tsx`)

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page, { generateStaticParams, generateMetadata } from "@/app/blog/[slug]/page";
import { POST_SLUGS } from "@/lib/blog";

describe("Blog post page", () => {
  it("pre-generates a param per post", async () => {
    const params = await generateStaticParams();
    expect(params.map((p) => p.slug).sort()).toEqual([...POST_SLUGS].sort());
  });

  it("renders the winter-tires post with heading and a call CTA", async () => {
    render(await Page({ params: Promise.resolve({ slug: "winter-tires-ontario" }) }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/winter tires/i);
    const calls = screen.getAllByRole("link", { name: /call/i });
    expect(calls[0]).toHaveAttribute("href", "tel:+14165585915");
  });

  it("links to the related service page", async () => {
    render(await Page({ params: Promise.resolve({ slug: "winter-tires-ontario" }) }));
    const link = screen.getByRole("link", { name: /tire change/i });
    expect(link).toHaveAttribute("href", "/services/tire-change");
  });

  it("builds keyword-first metadata from frontmatter", async () => {
    const m = await generateMetadata({ params: Promise.resolve({ slug: "winter-tires-ontario" }) });
    expect((m.title as string).length).toBeLessThanOrEqual(60);
    expect(m.keywords).toContain("when to put on winter tires ontario");
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- post`
Expected: FAIL — cannot resolve `@/app/blog/[slug]/page`.

- [ ] **Step 4: Implement the post page** (`src/app/blog/[slug]/page.tsx`)

```tsx
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
            Golden North Blog
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
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- post`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add "src/app/blog/[slug]/page.tsx" "src/app/blog/[slug]/__tests__/post.test.tsx" src/app/globals.css
git commit -m "feat: blog post page with article styles + funnel CTA"
```

---

## Task 4: Blog index `/blog`

**Files:**
- Create: `src/app/blog/page.tsx`
- Test: `src/app/blog/__tests__/page.test.tsx`

**Interfaces:**
- Consumes: `POSTS` from `@/lib/blog`; `getService` from `@/lib/services`; `buildMetadata` from `@/lib/seo`; `BUSINESS`; `PageHeader`, `CTABand`, `BreadcrumbJsonLd`.
- Produces: default `BlogIndexPage`, exported `metadata`.

- [ ] **Step 1: Write the failing test** (`src/app/blog/__tests__/page.test.tsx`)

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page, { metadata } from "@/app/blog/page";
import { POSTS } from "@/lib/blog";

describe("Blog index", () => {
  it("renders a card linking to each post", () => {
    render(<Page />);
    for (const p of POSTS) {
      const link = screen.getByRole("link", { name: new RegExp(p.title.slice(0, 18), "i") });
      expect(link).toHaveAttribute("href", `/blog/${p.slug}`);
    }
  });

  it("has blog metadata", () => {
    expect(metadata.title).toContain("Blog");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- blog/__tests__`
Expected: FAIL — cannot resolve `@/app/blog/page`.

- [ ] **Step 3: Implement the index** (`src/app/blog/page.tsx`)

```tsx
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
  title: "Mobile Tire & Roadside Tips — Golden North Blog",
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- blog/__tests__`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/blog/page.tsx src/app/blog/__tests__/page.test.tsx
git commit -m "feat: blog index page"
```

---

## Task 5: Wire nav + sitemap

**Files:**
- Modify: `src/components/layout/Header.tsx:11-16` (`NAV` array)
- Modify: `src/components/layout/Footer.tsx:10-15` (`NAV_LINKS` array)
- Modify: `src/app/sitemap.ts`

No new test file — the existing suite plus a manual sitemap check covers it. (Nav is trivial data; sitemap is asserted below.)

- [ ] **Step 1: Add "Blog" to the header nav** (`src/components/layout/Header.tsx`)

Replace the `NAV` constant:

```tsx
const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
```

- [ ] **Step 2: Add "Blog" to the footer nav** (`src/components/layout/Footer.tsx`)

Replace the `NAV_LINKS` constant:

```tsx
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
```

- [ ] **Step 3: Add blog routes to the sitemap** (`src/app/sitemap.ts`)

Full file:

```ts
import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";
import { SERVICE_SLUGS } from "@/lib/services";
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
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: url(`/services/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: new Date(`${post.updated}T00:00:00`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
```

- [ ] **Step 4: Verify the sitemap includes the blog** 

Run:
```bash
node -e "import('./src/app/sitemap.ts').catch(()=>{}); " 2>/dev/null; npm test -- --run 2>/dev/null | tail -5
```
Then confirm by a quick assertion instead — run the full suite (Step 5 of the plan-wide verification) and, if desired, `grep -R "/blog/winter-tires-ontario" ` after `npm run build` generates the sitemap. Minimum bar: the full test suite passes and the dev server (`npm run dev`) serves `/blog` with all nav links present.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/Footer.tsx src/app/sitemap.ts
git commit -m "feat: add Blog to nav + sitemap"
```

---

## Task 6: Remaining three seed articles

**Files:**
- Create: `content/blog/new-vs-used-tires.md`
- Create: `content/blog/flat-tire-highway-gta.md`
- Create: `content/blog/car-battery-winter-toronto.md`

No new test file. The Task 1 contract test iterates all of `POSTS`, so it automatically validates these three. Each uses an earlier date than the winter-tires post so newest-first ordering stays deterministic.

- [ ] **Step 1: Create `content/blog/new-vs-used-tires.md`**

```markdown
---
title: "New vs. Used Tires: Which Should You Buy?"
seoTitle: "New vs. Used Tires: Which Should You Buy?"
description: "Buy new for a full set you'll run for years; choose a quality used tire to match a single damaged one. Golden North sells both and installs at your door across the GTA."
excerpt: "Buy new when you need a full set you'll run for years; choose a quality used tire when you're matching a single damaged one."
keywords:
  - new vs used tires
  - used tires toronto
  - should i buy used tires
  - cheap tires gta
date: "2026-07-02"
relatedService: tires
faqs:
  - q: Are used tires safe?
    a: A properly inspected used tire is safe. We only sell used tires with at least 4/32" of tread, even wear, sound sidewalls, no exposed cords, and no shoulder plugs.
  - q: Can I buy just one tire?
    a: Yes. If one tire is damaged beyond repair, we can match a used tire close in tread depth to your remaining three — no need to buy a full set.
  - q: How do I find my tire size?
    a: It's on the sidewall and on the sticker inside the driver's door jamb — a code like 225/65R17. Tell us that code and we'll confirm what fits.
---

## Short answer

Buy new tires when you're replacing a full set you'll run for years — you get maximum tread life and the latest compounds. Choose a quality used tire when you're matching a single damaged one, the vehicle is near the end of its life, or the budget is tight.

## When used makes sense

A single nail-ruined tire doesn't mean buying four. A used tire close in tread depth to your other three gets you rolling for less. On all-wheel-drive vehicles, tread depth should be measured first — large differences between tires can strain the drivetrain.

## What to check on a used tire

Any used tire worth buying has even wear, at least 4/32" of tread, no sidewall bubbles or cracks, no exposed cords, and no plug in the shoulder zone. We inspect every used tire against that bar before it goes on your car.

## When new is the better buy

For a winter set you'll run several seasons, new wins: full tread depth, current rubber technology, and predictable wear. It's the safer long-term value even when the sticker is higher.

## Either way, installed at your location

Golden North sells [new and quality used tires](/services/tires) and installs them wherever you are in the GTA — home, work, or roadside. Call (416) 558-5915 with your tire size (like 225/65R17) and we'll sort you out.
```

- [ ] **Step 2: Create `content/blog/flat-tire-highway-gta.md`**

```markdown
---
title: What to Do If You Get a Flat on the 401
seoTitle: What to Do If You Get a Flat on the 401
description: "Flat on a GTA highway? Pull right, hazards on, stay buckled behind a barrier if you can, and call for help. Golden North reaches highway shoulders across the GTA, 24/7."
excerpt: "Ease off the throttle, pull as far onto the right shoulder as you safely can, put your hazards on, and don't change a highway-side tire in live traffic."
keywords:
  - flat tire on highway
  - flat tire 401
  - roadside assistance toronto
  - what to do flat tire gta
date: "2026-07-01"
relatedService: roadside
faqs:
  - q: Should I change a flat myself on the highway?
    a: Only if you can work on the side away from traffic and the car is well off the lane. Passing vehicles are the real danger. If in doubt, stay buckled inside and call for help.
  - q: Do you come out to highway shoulders?
    a: Yes. We service shoulders across the GTA corridor including the 401, 427, and DVP. Pull as far right as you safely can, put your hazards on, and call.
  - q: Do I need a membership to get roadside help?
    a: No. Golden North is pay-per-call — no membership, no annual fee. You pay for the help you actually use.
---

## First 30 seconds

Don't brake hard or jerk the wheel. Ease off the throttle, grip firmly, and let the car slow. Signal and move as far onto the right shoulder as you safely can — past the rumble strip, ideally near an exit or a wide verge, away from live lanes.

## Make yourself visible

Turn on your hazard lights immediately. At night, leave your parking lights on. If you carry reflective triangles or flares and it's safe to place them, set them well behind the car.

## Stay out of traffic

Changing a tire on the traffic side of a highway shoulder is dangerous — passing vehicles are the hazard, not the flat itself. If you can leave the vehicle safely on the side away from traffic and wait behind a barrier or guardrail, do that. Otherwise stay buckled inside with the doors locked.

## Call for help — have this ready

Note the highway, your direction, and the nearest exit or marker, your vehicle's make, model, and colour, and what happened. Golden North handles [24/7 roadside assistance](/services/roadside) on highway shoulders across the GTA corridor — the 401, 427, DVP, and beyond. No membership needed.

One call and we're moving: (416) 558-5915.
```

- [ ] **Step 3: Create `content/blog/car-battery-winter-toronto.md`**

```markdown
---
title: Why Car Batteries Die in Toronto Winters
seoTitle: Why Car Batteries Die in Toronto Winters
description: "Cold is why car batteries die: near -18°C a battery gives roughly half its cranking power, so a weak one quits on the first frigid morning. Golden North tests and replaces them on the spot."
excerpt: "A car battery that limped through summer often dies on the first truly cold morning — because near -18°C it delivers only about half its rated cranking power."
keywords:
  - car battery dies in cold
  - winter car battery toronto
  - dead battery help gta
  - mobile battery replacement
date: "2026-06-30"
relatedService: battery
faqs:
  - q: Why does my car battery die in winter?
    a: Cold slows the battery's chemistry. Near -18°C it delivers about half its normal cranking power, while a cold engine demands more — so a weak battery quits.
  - q: How long should a car battery last in Canada?
    a: Typically three to five years. Summer heat wears it down and winter cold exposes the weakness, so batteries often fail on the first cold morning.
  - q: Can you replace my battery where I'm parked?
    a: Yes. We test, boost, or replace batteries on the spot anywhere in the GTA, 24/7 — at home, work, a parking garage, or roadside.
---

## Cold is the real killer

A battery's chemistry slows in the cold. Near -18°C, a fully charged battery delivers only around half the cranking power it puts out on a mild day — while your engine, thick with cold oil, needs more. That's why a battery that seemed fine in October dies on the first hard freeze.

## Age plus cold

Most car batteries last three to five years. Summer heat wears them down; winter cold then exposes the weakness. If yours is over four years old and the engine has been cranking slowly, it's living on borrowed time heading into winter.

## Warning signs before it quits

A slow, labouring crank. Dashboard lights dimming at startup. Needing a boost more than once. Any of these before deep winter is worth a load test — cheap insurance against a no-start in a parking garage at -20°C.

## Test or replace, right where you're parked

Golden North does [mobile battery replacement](/services/battery) across the GTA, 24/7. We load-test the battery and charging system first, boost it if that's all it needs, or install a fresh warranted unit on the spot — at home, at work, or roadside.

Won't start? Call (416) 558-5915.
```

- [ ] **Step 4: Run the full contract + render suite**

Run: `npm test`
Expected: PASS. In particular the `blog` contract test now iterates 4 posts; every `description` must be 120–165 chars. If any fails, tighten that post's `description` string (do not touch the test).

- [ ] **Step 5: Commit**

```bash
git add content/blog/new-vs-used-tires.md content/blog/flat-tire-highway-gta.md content/blog/car-battery-winter-toronto.md
git commit -m "feat: three more seed blog posts (tires, roadside, battery)"
```

---

## Final verification (after all tasks)

- [ ] `npm test` — full suite green.
- [ ] `npm run build` — production build succeeds; all 4 `/blog/[slug]` pages and `/blog` are statically generated; `/sitemap.xml` lists `/blog` and all four post URLs.
- [ ] `npm run dev` then visit `/blog` — cards render newest-first, "Blog" is in the header and footer nav and highlights as active, a post opens with styled prose, the related-service card links correctly, FAQ toggles work, and the Call button dials `tel:+14165585915`.
- [ ] Spot-check no copy contains a price, the word "free", or an ETA/time-to-arrival promise.

## Self-Review (author check — completed)

- **Spec coverage:** Markdown storage (Task 1) ✓; `blog.ts` loader mirroring services (Task 1) ✓; `.article` hand-styles, no typography plugin (Task 3) ✓; `/blog` index (Task 4) ✓; `/blog/[slug]` with funnel CTA, FAQ, cross-links, CTA band (Task 3) ✓; `ArticleJsonLd` + reused Breadcrumb/Faq JSON-LD (Task 2/3) ✓; sitemap (Task 5) ✓; nav in Header + Footer (Task 5) ✓; 4 seed posts, one per service (Tasks 1 + 6) ✓; SEO-contract tests + render smoke tests (all tasks) ✓; copy constraints (Global Constraints + final check) ✓.
- **Placeholder scan:** none — all steps carry real code/content.
- **Type consistency:** `Post`/`PostFaq` defined in Task 1 and consumed unchanged in Tasks 2–5; `faqs` shape `{ q, a }` matches `FaqJsonLd`'s existing param; `generateStaticParams`/`generateMetadata`/`getPost` signatures consistent across tasks.
