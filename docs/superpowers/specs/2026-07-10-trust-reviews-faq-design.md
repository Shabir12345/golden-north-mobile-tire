# Design: Trust signals, live reviews, FAQ expansion & locations trim

**Date:** 2026-07-10
**Status:** Approved (pending spec review)

## Context

Traffic to the GoldenNorth site comes primarily from Google organic and Google
Ads. Paid clicks in particular need strong, immediate trust and professional
signals to convert. This work strengthens conversion and SEO by:

1. Removing two service-area cities the business no longer wants listed.
2. Adding reusable professional trust signals across the whole site.
3. Extending the existing auto-updating Google reviews widget to more pages.
4. Adding FAQ sections (with FAQ schema) to pages that lack them.

### Current state (verified in code)

- **Reviews:** `src/components/sections/ReviewsWidget.tsx` embeds Featurable's
  `bundle.js`, which auto-renders the business's Google reviews with no API key.
  It gracefully collapses if the embed fails or renders empty. Currently used on
  **home** and **contact** only.
- **Trust signals:** `StatStrip` (24/7, GTA-wide, 1 call, no tow) on the home
  page and `AvailabilityBadge` ("Available 24/7"). No professional-credential
  signals; no `aggregateRating` in JSON-LD.
- **FAQ:** Only the four **service detail** pages (`/services/[slug]`) have FAQ
  sections; they render an inline `<details>` accordion and emit `FaqJsonLd`
  (`src/lib/jsonld.tsx`). Home, `/services`, `/contact`, `/gallery`, `/blog`
  have no FAQ section.
- **Locations:** "Mississauga" and "Brampton" appear in
  `src/components/sections/CoverageMap.tsx` (chip list + prose),
  `src/components/sections/HowItWorks.tsx` (step 02 prose), and
  `src/lib/services.ts` (SEO keywords, two FAQ answers, one service summary).
  The JSON-LD `areaServed` is a generic 60km GeoCircle labelled "Greater Toronto
  Area" — no city names — so it needs no change.

### Decisions locked in via brainstorming

- Locations: **remove only** (no replacement cities).
- Reviews: **live widget only**, no hardcoded rating number, **no**
  `aggregateRating` schema (avoids Google policy risk and maintenance).
- Trust claims confirmed true: **Licensed & insured**, **Upfront / no-membership
  pricing**, **Warranty-backed parts** (kept general — no durations/terms).
  Satisfaction guarantee was **not** confirmed and is excluded.
- FAQ locations: **home, services listing, contact** (no standalone `/faq` page).
- Reviews reach: put the live widget on **service detail pages** too.

## A. Remove Mississauga & Brampton

**Goal:** No visible or keyword reference to these two cities anywhere in the
site content. Coverage still reads as full-GTA.

- `CoverageMap.tsx`
  - Remove `"Mississauga"` and `"Brampton"` from the `AREAS` array. Remaining
    eight: Toronto, Vaughan, Markham, Scarborough, Etobicoke, North York,
    Oakville, Richmond Hill (still a clean 2-column grid).
  - Rewrite the paragraph (currently "A Brampton driveway, a Markham condo
    garage, the shoulder of the 401 through Mississauga — one call reaches us.")
    to use only remaining cities, e.g. a Vaughan driveway, a Markham condo
    garage, the shoulder of the 401 through Etobicoke.
- `HowItWorks.tsx`
  - Step 02 prose "a Mississauga office lot" → a remaining city (e.g. Markham).
- `services.ts`
  - Remove these keywords: `flat tire change Mississauga`,
    `mobile tire swap Brampton`, `mobile tire installation Mississauga`,
    `affordable winter tires Brampton`, `dead battery help Mississauga`,
    `on-site car battery change Brampton`, `jump start service Mississauga`,
    `emergency roadside Brampton`.
  - Edit the tire-change **summary** ("first Brampton snowfall") to a remaining
    city or a generic GTA phrasing.
  - Edit the two **FAQ answers** that list Mississauga/Brampton (the coverage
    answer and the response-time answer) to drop both cities.
- **No schema change** — `areaServed` has no city names.

**Acceptance:** `grep -ri "mississauga\|brampton" src content` returns nothing.

## B. Trust / professional signals

**New data:** `src/lib/trust.ts` exports a typed `TRUST_SIGNALS` array. Each
item: `{ label, sub? }` (short label + optional one-line support). Confirmed set:

- Licensed & insured
- Upfront pricing — no membership
- Warranty-backed parts (general; no durations)
- 24/7 · GTA-wide

**New component:** `src/components/ui/TrustBadges.tsx`
- Renders `TRUST_SIGNALS` as an inline-flex/grid row of icon + label items.
- Small inline SVG marks (shield / check) consistent with the gold-on-navy
  system; icons are `aria-hidden`, labels are the accessible text.
- Props: `variant?: "row" | "compact"`, `onDark?: boolean`, `className?`.
  `compact` (footer) shows labels only, tighter spacing; `row` shows icon+label.
- Pure presentational, driven entirely by the data module — one source of truth.

**Placement:**
- **Home** — a `TrustBadges` row below the hero (near the existing trust bar).
- **Service detail pages** — a `TrustBadges` row near the summary/CTA.
- **Contact** — a `TrustBadges` row.
- **Footer** — a `compact` one-line variant so signals appear site-wide.

## C. Reviews everywhere

- Reuse the existing `ReviewsWidget` (no changes to its logic) on the four
  **service detail** pages, in addition to home + contact.
- Keep the graceful-collapse behavior. Because the widget reloads `bundle.js`
  per mount (documented in the component), no shared-state work is needed.
- **No** hardcoded rating and **no** `aggregateRating` JSON-LD — the widget is
  the single, always-accurate source.

## D. FAQ sections

**Refactor:** Extract the service-detail accordion into a reusable
`src/components/sections/FaqSection.tsx`:
- Props: `{ heading: string; faqs: { q: string; a: string }[]; emitJsonLd?: boolean; className?; id? }`.
- Renders the `<details>`/`<summary>` accordion (same markup/classes as the
  current service page) and, when `emitJsonLd` is true, renders `<FaqJsonLd>`.
- Refactor `src/app/services/[slug]/page.tsx` to use `FaqSection` (it currently
  inlines both the accordion and `<FaqJsonLd>`), keeping behavior identical.

**New data:** `src/lib/faqs.ts` with three **distinct** FAQ arrays (distinct
content avoids duplicate FAQ-schema across URLs):
- `HOME_FAQS` — coverage area, no-membership/upfront pricing, typical timing,
  payment methods, licensed & insured.
- `SERVICES_FAQS` — cross-service questions (which service do I need, mobile vs
  shop, do you carry my tire size, etc.).
- `CONTACT_FAQS` — pre-call friction (what info to have ready, hours, response
  expectations).

FAQ answers must reflect only confirmed-true claims and must not name the
removed cities.

**Placement:** add `FaqSection` with `emitJsonLd` on `/`, `/services`, and
`/contact`, each using its own array.

## Testing

- Update `src/lib/__tests__/jsonld.test.tsx` and `src/lib/__tests__/services.test.ts`
  only if the location edits or refactor change asserted strings (city names are
  not currently asserted).
- Add a test that `TrustBadges` renders the confirmed labels and does **not**
  render an unconfirmed claim (e.g. "satisfaction guarantee").
- Add a test that `FaqSection` renders its questions and emits FAQ JSON-LD when
  `emitJsonLd` is set.
- Guard test: assert `services.ts` keywords/summary/FAQ answers contain no
  "Mississauga"/"Brampton".
- Run full `npm test` and `npm run build`.

## Out of scope (per decisions)

- Hardcoded star ratings / `aggregateRating` schema.
- Satisfaction guarantee claim.
- Standalone `/faq` page and nav/sitemap entry.
- Replacement cities for the removed two.
- Changes to the historical `docs/superpowers/` plan/spec files.
