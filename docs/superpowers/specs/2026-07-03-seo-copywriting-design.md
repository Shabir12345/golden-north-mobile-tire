# SEO + AI-Search Copywriting Rewrite — Design

**Date:** 2026-07-03
**Scope:** Existing pages only (no new routes). Approach A: full keyword-mapped rewrite, no published prices or ETA promises.
**Tone:** Balanced — keep the Golden North editorial voice; keywords placed surgically in metadata, headings, answer-first openers, FAQs, and alt text.

## Goal

Make goldennorthmobiletires.com competitive for GTA mobile tire / battery / roadside search queries in both classic Google rankings and AI search surfaces (Google AI Overviews, ChatGPT, Perplexity), using only copy changes to the existing seven pages.

## Research findings (2026-07-03)

- **Competitors ranking today:** Tire Butler, Wheels on Wheels, mobile-tire.ca, tirechange.ca, GoWrench, MSM Mobile Tire, GTA Tire Mobile Service, On Call Mobile Tire, Green Mobile Tire. They win on "mobile tire change Toronto" + city variants. Several publish prices ($49–60 sedan swap) and ETAs (25 min) — we deliberately do NOT (business decision; pricing stays "call for a quote").
- **Question queries AI engines answer:** "how much does a mobile tire change cost in Toronto" ($50–150 range dominates), "when should I put on winter tires in Ontario" (7°C rule; late Oct–mid Nov; keep on until ~Apr 15), "how fast can roadside assistance reach me", "are used tires safe".
- **Existing strengths:** per-page metadata builder (`src/lib/seo.ts`), LocalBusiness/Service/FAQ/Breadcrumb JSON-LD (`src/lib/jsonld.tsx`), per-service keyword arrays and FAQs (`src/lib/services.ts`).
- **Gaps:** metadata titles not keyword-led; H1/H2s are brand-poetry with no keywords; service summaries don't open with a liftable answer sentence; FAQs thin (2–3 per service); city names sparse; alt text not reviewed for search.

## Keyword map

| Page | Primary | Secondary / related | Question keywords |
|---|---|---|---|
| `/` | mobile tire service Toronto | 24/7 mobile tire change GTA, roadside assistance GTA, we come to you | what is a mobile tire service; what areas do you cover |
| `/services` | mobile tire services GTA | tire change, used tires, battery replacement, roadside assistance | which service do I need |
| `/services/tire-change` | mobile tire change Toronto | seasonal tire swap at home, winter tire changeover GTA, flat tire change | how much does a mobile tire change cost; when to put on winter tires in Ontario (7°C rule); how long does it take; condo underground garages |
| `/services/tires` | new & used tires installed at home Toronto | used tires GTA, tires delivered and installed, same-day tire replacement | are used tires safe; do you stock my size; can I buy just one tire |
| `/services/battery` | mobile battery replacement Toronto | car battery boost GTA, 24/7 battery service | boost or replace; how long do car batteries last in Canadian winters; will I lose radio settings |
| `/services/roadside` | 24/7 roadside assistance Toronto | roadside assistance without membership GTA, flat tire help, jump start service | how fast can you get to me; do you cover the 401/DVP/427; membership vs pay-per-call |
| `/contact` | NAP consistency + call CTA | call mobile tire service GTA | — |
| `/gallery` | supporting page | keyword-rich honest alt text (service + city where truthful) | — |

**City list** woven naturally (never stuffed) through body copy, FAQs, and alts: Toronto, North York, Scarborough, Etobicoke, Mississauga, Brampton, Vaughan, Markham, Richmond Hill.

## Changes by layer

1. **Metadata** — every page title rewritten keyword-first at ~55–60 chars (e.g. "Mobile Tire Change Toronto — Seasonal Swaps at Your Door"); meta descriptions rewritten as 150–160-char answer sentences ending in a call-to-action. The `title.template` behavior in `src/lib/seo.ts` is preserved.
2. **Headings** — H1s/H2s carry the page's primary keyword while keeping the voice (e.g. home services H2 → "Mobile tire change, batteries & roadside — four ways we get you rolling."). Hero headline/subhead gets "mobile tire service" + Toronto/GTA visibly.
3. **Answer-first openers** — each service `summary` rewritten so sentence one is a complete, liftable answer an AI engine can quote verbatim (who + what + where + differentiator).
4. **FAQs** — expand to 5–6 per service using the question keywords above. Cost questions answered honestly without numbers: explain the factors, invite a call for a straight quote. FAQs auto-feed `FaqJsonLd` — no schema work needed.
5. **Keyword arrays** in `services.ts` refreshed to match the map (they feed metadata keywords).
6. **Alt text** in `src/lib/photos.ts` reviewed and rewritten — descriptive, honest, service + location terms where the photo supports it.

## Explicitly out of scope / unchanged

- No new routes or city landing pages.
- No published prices, no response-time promises.
- No changes to JSON-LD structure, layout, design, or components' markup beyond copy strings.
- Tagline "The best waiting room is the living room." stays.

## Files touched

- `src/lib/services.ts` (summaries, taglines, included/whenYouNeed polish, keywords, FAQs)
- `src/lib/photos.ts` (alt text)
- `src/app/page.tsx`, `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/app/contact/page.tsx`, `src/app/gallery/page.tsx` (metadata + section copy)
- `src/components/sections/Hero.tsx`, `HowItWorks.tsx`, `CoverageMap.tsx`, `CTABand.tsx` (copy strings)
- `src/app/__tests__/*` and other test files that assert on copy strings — updated to match new copy

## Verification

- Full test suite passes (26 tests currently; count may grow with FAQ assertions).
- `next build` green.
- Manual check: every page title unique, ≤60 chars, primary keyword present; every description 150–160 chars; each service page opens with an answer-first sentence; FAQ JSON-LD renders the expanded set.
