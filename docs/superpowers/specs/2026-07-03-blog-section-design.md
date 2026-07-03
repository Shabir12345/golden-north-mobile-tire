# SEO Blog Section — Design

**Date:** 2026-07-03
**Project:** Golden North Mobile Tire Services marketing site
**Status:** Approved, ready for implementation planning

## Goal

Add a blog section so Golden North can publish articles targeting high-intent GTA
search queries, rank for informational searches that feed the service pages, and
convert readers into phone calls. Each article funnels to a matching service page
and ends in the call-first CTA.

## Success criteria

- A visitor can browse `/blog`, open an article, read it comfortably on a phone,
  and reach the Call CTA and the related service page.
- Each article is statically generated with keyword-first metadata, valid
  `BlogPosting` JSON-LD, and appears in the sitemap.
- Publishing a new post is: drop a Markdown file in `content/blog/`, done — the
  index, routes, and sitemap pick it up automatically.
- The SEO contract is enforced by tests, mirroring the existing service tests.

## Architecture

The blog mirrors the existing services pattern so the rest of the codebase treats
posts exactly like services.

### Storage — Markdown files

Posts live in `content/blog/<slug>.md`. The filename (minus `.md`) is the slug.
Each file has a YAML frontmatter block followed by a plain-Markdown body:

```yaml
---
title: When to Put On Winter Tires in Ontario
seoTitle: When to Put On Winter Tires Ontario — The 7°C Rule
description: Ontario's 7°C rule for winter tires, explained — when to swap, why grip drops, and how a mobile swap saves the shop trip. Call (416) 558-5915.
excerpt: Once daytime temperatures in the GTA stay consistently below 7°C — usually late October to mid-November — it's time for winter tires.
keywords:
  - when to put on winter tires ontario
  - 7C rule winter tires
  - winter tire changeover toronto
date: 2026-07-03
updated: 2026-07-03        # optional; falls back to date
relatedService: tire-change  # MUST match a slug in SERVICES
faqs:                        # optional; feeds FAQ JSON-LD + a <details> block
  - q: What temperature should I put winter tires on?
    a: The 7°C rule ...
---

## Body in plain Markdown

Prose, headings, lists, links.
```

**Frontmatter fields**

| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Human title; rendered as the article `<h1>`. |
| `seoTitle` | yes | Keyword-first, ≤60 chars. Used for `<title>`. |
| `description` | yes | Meta description, 120–165 chars, answer-first. |
| `excerpt` | yes | Answer-first opener shown on the index card. |
| `keywords` | yes | Non-empty array of target search phrases. |
| `date` | yes | ISO date (`YYYY-MM-DD`), published date. |
| `updated` | no | ISO date; falls back to `date`. |
| `relatedService` | yes | Must resolve to a `SERVICES` slug → funnel CTA + cross-link. |
| `faqs` | no | Array of `{ q, a }`; feeds `FaqJsonLd` + a `<details>` section. |

### Parsing — `src/lib/blog.ts`

A new module that reads and parses the Markdown files at build time and exports the
same shape as `services.ts`:

- `interface Post` — the typed frontmatter plus `slug` and rendered `html` (body
  Markdown → HTML) and `readingMinutes` (computed from body word count).
- `POSTS: Post[]` — all posts, sorted by `date` descending (newest first).
- `POST_SLUGS: string[]`
- `getPost(slug): Post | undefined`

Dependencies: `gray-matter` (frontmatter) + `marked` (Markdown → HTML). Content is
100% first-party — we author every post, there is no untrusted input — so the
rendered HTML has no XSS surface and is injected with `dangerouslySetInnerHTML`.

Per `AGENTS.md`, before wiring this up, check `node_modules/next/dist/docs/` for the
Next 16 Markdown/MDX guidance and prefer any clean built-in path if one exists;
otherwise use the `gray-matter` + `marked` approach above. Filesystem reads happen
in a server module at build time (all pages are statically generated).

### Article styling — hand-written `.article` styles

A scoped style block (in `globals.css` or a co-located module) for the rendered
article body: headings, paragraphs, lists, links, blockquotes — matching the
existing design system (Inter, trust-blue accent, generous spacing, mobile-first).
**No** `@tailwindcss/typography` plugin — consistent with the site's hand-crafted
approach and avoids adding a build-time plugin under Tailwind v4.

## Routes

### `/blog` — `src/app/blog/page.tsx`

- `PageHeader` (existing component) with a keyword-aware heading + intro.
- A responsive grid of post cards: title, answer-first `excerpt`, `date`, reading
  time, and a related-service tag. Newest first.
- `buildMetadata` for the index; `BreadcrumbJsonLd` (Home → Blog).
- Statically generated.

### `/blog/[slug]` — `src/app/blog/[slug]/page.tsx`

- `generateStaticParams` from `POST_SLUGS`.
- `generateMetadata` from the post's `seoTitle` / `description` / `keywords`.
- Article header: `title` (`<h1>`), `date` (with `updated` if newer), reading time.
- Rendered Markdown body in the `.article` container.
- Optional FAQ `<details>` section when `faqs` present (same UX as service pages).
- **Funnel CTA** to the `relatedService` page + the shared `CTABand` (Call-first).
- Cross-links to other posts ("Keep reading").
- JSON-LD: `ArticleJsonLd` + `BreadcrumbJsonLd` + `FaqJsonLd` (when faqs present).

## SEO surface

- **`ArticleJsonLd`** — new component in `src/lib/jsonld.tsx`. `@type: BlogPosting`
  with `headline`, `description`, `datePublished`, `dateModified`, `author` and
  `publisher` pointing at the business (`@id: {url}/#business`), `image` (post OG or
  the shared card), and `mainEntityOfPage`.
- Reuse existing `BreadcrumbJsonLd` and `FaqJsonLd`.
- **Sitemap** (`src/app/sitemap.ts`) — add `/blog` and every `/blog/<slug>`, with
  `lastModified` from each post's `updated`/`date`.
- **Nav** — add "Blog" to `Header` (desktop + mobile `NAV`) and `Footer`.

## Seed content — 4 articles

One article per service, answer-first openers (the quotable kind AI engines surface),
honest operational voice. **Content constraints (standing rule): no prices, no
"free" offers, no ETA/time promises** unless already established elsewhere on the
site. Each ends in a call-first CTA to its service page.

1. **When to put on winter tires in Ontario (the 7°C rule)** → `tire-change`
2. **New vs. used tires: which should you buy?** → `tires`
3. **What to do if you get a flat on a GTA highway** → `roadside`
4. **Why car batteries die in Toronto winters** → `battery`

## Testing — Vitest, mirroring the existing suite

Encode the SEO contract as tests (per project convention):

- **`blog.ts` data contract:** every post has all required frontmatter; `seoTitle`
  ≤60 chars; `description` 120–165 chars; `keywords` non-empty; `relatedService`
  resolves to a real `SERVICES` slug; `date`/`updated` are valid ISO dates; `POSTS`
  is sorted newest-first; `getPost` returns the right post and `undefined` for
  unknown slugs.
- **Render smoke tests:** `/blog` index renders a card per post; `/blog/[slug]`
  renders the title, body, related-service CTA, and (when present) the FAQ section.

## Out of scope (YAGNI)

- No CMS, no database, no authentication.
- No tags/categories, pagination, search, comments, or RSS feed for this first
  build — add later only if the post count warrants it.
- No MDX/React components inside posts — plain Markdown only.

## Files touched

**New**
- `content/blog/*.md` (4 seed posts)
- `src/lib/blog.ts`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- Tests under `src/**/__tests__/` (blog data + render)

**Modified**
- `src/lib/jsonld.tsx` (add `ArticleJsonLd`)
- `src/app/sitemap.ts` (blog routes)
- `src/components/layout/Header.tsx` (nav)
- `src/components/layout/Footer.tsx` (nav)
- `src/app/globals.css` (`.article` styles)
- `package.json` (`gray-matter`, `marked`)
