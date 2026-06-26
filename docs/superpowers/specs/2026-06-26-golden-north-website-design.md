# Golden North Mobile Tires — Website Design Spec

**Date:** 2026-06-26
**Status:** Approved (design), pending implementation plan
**Replaces:** https://www.goldennorthmobiletires.com/ (rebuild)

## Goal

Rebuild the Golden North Mobile Tires marketing site as a modern, SEO-optimized,
visually distinctive website. Match the scope of the current site (Home, Services,
Gallery, Contact) but with stronger design, stronger local SEO, and a clean technical
foundation we can keep extending (blog, booking, CMS, more service-area pages) in the
future.

## Business Context

- **Business:** Golden North Mobile Tire Services — mobile tire service that comes to
  the customer.
- **Service area:** Greater Toronto Area (GTA), Ontario, Canada.
- **Services:** Seasonal/spare mobile tire changes (on/off rim), new & used tire sales,
  battery replacement, roadside assistance.
- **Hours:** Open 24/7.
- **Phone:** (416) 558-5915
- **Email:** info.goldennorth@gmail.com
- **Tagline:** "The best waiting room is the living room."
- **Socials:** TikTok, Instagram.

## Decisions (from brainstorming)

1. **Tech stack:** Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel.
2. **Brand assets:** Client has a logo file and real photos (to be dropped in;
   placeholders flagged until provided). No fixed brand colors — palette designed here.
3. **Services structure:** 4 separate, individually SEO-optimized service pages plus a
   Services overview page (chosen over a single sectioned page for stronger local
   ranking).
4. **Visual direction:** "Midnight & Gold" — deep navy-black canvas, warm gold accents,
   headlight-glow gradients, condensed industrial headlines. Premium, distinctive, fits a
   24/7 mobile service and the brand name.

## 1. Brand & Visual System

### Palette (Tailwind theme tokens)
- `midnight` `#0B1220` — primary background
- `ink` `#070B12` — deeper sections
- `gold` `#E8B04B` → `gold-deep` `#C9912E` — primary accent / CTAs (used sparingly)
- `frost` `#E9EEF5` — primary text on dark
- `slate-muted` `#8A97A8` — muted/secondary text
- `signal` `#F5A623` — reserved ONLY for urgency cues ("Open 24/7", "Call Now")
- Headlight-glow radial gradients: warm gold, low opacity, behind hero + section anchors.

### Typography
- **Headlines:** Saira Condensed (fallback Archivo Narrow) — tight, industrial, confident.
- **Body / UI:** Inter — clean, legible, neutral.
- **Numbers / labels** (phone, stats): tabular figures, tracked-out caps.
- Loaded via `next/font` for performance.

### Signature motifs (intentional, non-templated details)
- North-star / compass mark integrated near the logo wordmark.
- Tire-tread texture as thin section dividers and as masked pattern behind stat blocks.
- Headlight-glow gradient cones (directional), not generic blurry blobs.
- Subtle GTA coverage-map visual on Home + Contact.
- Real photos rendered with a duotone-on-hover treatment so a mixed-quality photo set
  still reads as one cohesive brand.

### Accessibility
- Semantic landmarks, alt text on all images, WCAG-AA contrast (gold-on-dark verified),
  visible focus states, reduced-motion support for glow/animation.

## 2. Site Architecture

```
/                         Home
/services                 Services overview
/services/tire-change     Mobile tire change & swap   (SEO page)
/services/tires           New & used tires            (SEO page)
/services/battery         Battery replacement         (SEO page)
/services/roadside        Roadside assistance         (SEO page)
/gallery                  Gallery
/contact                  Contact
```

- Persistent sticky header: logo, nav, "Open 24/7" badge, primary **Call (416) 558-5915**
  button.
- Persistent mobile sticky bottom bar with a "Call Now" action (primary mobile conversion
  path).
- Footer: contact info, hours, service area, nav, social links, copyright.

## 3. Page-by-Page

### Home
1. Hero — slogan "The best waiting room is the living room," headlight glow + real photo,
   dual CTA (Call / See Services).
2. Trust strip — 24/7 · We come to you · GTA-wide · response time.
3. Four service cards (link to service pages).
4. "How it works" — 3 steps (Call → We come to you → Back on the road).
5. Coverage map / service-area section.
6. Gallery teaser.
7. Reviews / social-proof section (placeholder until real reviews provided).
8. Final CTA band.
9. Footer.

### Services overview (`/services`)
- Intro + 4 rich linked cards routing to each service page.

### Each service page (`/services/*`)
- Focused hero, "what's included," "when you need it," pricing-cue + CTA, FAQ section
  (with FAQ JSON-LD), cross-links to the other services.
- Unique copy per page targeting real local search terms (e.g. "mobile tire change
  Toronto," "24/7 roadside tire Scarborough").

### Gallery (`/gallery`)
- Responsive masonry of real photos with cohesive duotone treatment + lightbox.

### Contact (`/contact`)
- Contact form, click-to-call, email, hours (24/7), service-area map, social links.
- Form posts to a Next.js API route. Email delivery via a provider (Resend recommended)
  with the integration isolated so the provider is swappable; until configured, the route
  degrades gracefully (logs / mailto fallback).

## 4. SEO Foundation
- Per-page `<title>` / meta description / OpenGraph via the Next.js Metadata API.
- Structured data (JSON-LD): LocalBusiness, Service (per service page), FAQPage.
- Auto-generated `sitemap.xml` and `robots.txt`; canonical URLs.
- Semantic heading hierarchy; descriptive alt text.
- Local keyword targeting (GTA + suburb terms) baked into service-page copy.
- Core Web Vitals: `next/image`, optimized fonts, static generation where possible.

## 5. Technical Setup
- Next.js (App Router) + TypeScript + Tailwind CSS; deploy on Vercel.
- Tailwind theme tokens for palette/type so the site is themeable from one place.
- Service/copy content stored in typed data files (easy edits now; clean path to a future
  CMS).
- Reusable component library: Header, Footer, Hero, ServiceCard, StatStrip, HowItWorks,
  CoverageMap, CTABand, GalleryGrid, ContactForm, etc.
- Real photos and logo placed in `/public`; clearly flagged placeholders until client
  provides assets.
- Git repository initialized for the project.

## Out of Scope (future foundations, not this build)
- Blog / content marketing system.
- Online booking / scheduling.
- CMS integration.
- Per-suburb landing pages beyond the core service pages.
- Live reviews integration (Google reviews API, etc.).

These are intentionally deferred but the architecture (typed content, component library,
metadata helpers) is set up so they can be added without rework.
