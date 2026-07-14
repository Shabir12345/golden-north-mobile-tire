# Emergency Roadside Repositioning — Design

**Date:** 2026-07-14
**Status:** Approved pending user review

## Goal

Reposition the site from "mobile tire company that also does roadside" to
"24/7 emergency roadside assistance company — tires are one category."
Traffic is high-intent (Google Ads, Google Business Profile, local search):
people stranded right now. Every element serves one conversion — the phone
call — through a problem→solution copy spine, an attention-directing
animation system, and a wider service catalog with dedicated landing pages.

The brand name stays **GoldenNorth Mobile Tire Services** (matches Google
Business Profile and the domain); the positioning, hierarchy, and copy lead
with emergency roadside assistance.

## Locked decisions

| Decision | Value |
|---|---|
| Service structure | 5 mains, 12 subs (below) |
| ETA promise | "in as little as 20–30 minutes" — used site-wide |
| Reviews in hero | Live Google rating + count via Featurable JSON API |
| Areas | "Toronto & the GTA" prominent; specific cities live in the coverage section and page copy, not the hero |
| Pricing language | "Fair, upfront price quoted on the call — no membership, no hidden fees." No dollar figures, no "cheap/affordable" |
| Fonts | Barlow Condensed Bold (headlines) + Barlow (body/UI), replacing Inter |
| Palette | Existing navy + gold stays. No emergency-red rebrand |

## Service catalog

```
/services                                     overview page
/services/roadside-assistance                 main
  /fuel-delivery
  /tow-coordination
/services/mobile-tire-service                 main
  /flat-tire
  /spare-tire-install
  /new-used-tires
  /seasonal-tire-change
/services/battery-jump-start                  main
  /battery-replacement
  /battery-testing
/services/car-lockout                         main (no subs)
/services/mobile-mechanic                     main
  /diagnostics
  /brakes
  /oil-change
  /general-repairs
```

**Redirects (301, in `next.config.ts`):**

- `/services/tire-change` → `/services/mobile-tire-service/seasonal-tire-change`
- `/services/tires` → `/services/mobile-tire-service/new-used-tires`
- `/services/battery` → `/services/battery-jump-start`
- `/services/roadside` → `/services/roadside-assistance`

## Hero

Navy stage and van/technician photo retained. Content rebuilt:

1. **Live-dispatch line** (top): `● LIVE — 24/7 Emergency Dispatch, answering now` with a gently breathing green dot.
2. **H1** (Barlow Condensed Bold, ~4.5–5rem desktop, two lines):
   *"Stranded in the GTA? We're on our way — in as little as 20–30 minutes."*
   The ETA phrase is gold.
3. **Subtitle**: problem list + services + area: flat tire, dead battery,
   locked out, out of gas, or a breakdown — one call sends a roadside
   technician anywhere in Toronto & the GTA; fair price quoted before we roll.
4. **Call button** (dominant, gold, phone number visible) with a soft pulse
   ring every ~3s. Secondary ghost button: "See services".
5. **Review badge**: live stars + `4.x · N Google reviews` from Featurable;
   one-time count-up + fade-in. Renders nothing if the API fails — never a
   stale or fabricated number.

Three animated attention anchors only (dispatch dot → call button → review
stars); nothing else in the hero moves. Mobile: call button above the fold;
existing sticky bottom call bar unchanged.

## Homepage flow

Hero → trust strip (24/7 · GTA-wide · 20–30 min · no membership) →
**service grid** → How it works (3 steps: call → quote & dispatch → back on
the road) → live review carousel (existing Featurable embed) → coverage map →
FAQs → final CTA band. Gallery teaser is removed from the home page (gallery
page keeps it) to keep the emergency path short.

## Service grid

Replaces the tall editorial `ServiceRow` layout. 2-column desktop grid
(5th card spans/centers), 1-column mobile stack. Each card:

- Line-style icon in brand gold (no clip-art)
- Service name + 1–2 line problem→solution blurb
- Sub-service pill buttons deep-linking to sub-pages
- Whole card links to the main service page; card hover lift per the
  existing ambient tier

## Page templates

**Main service page (5):** problem→solution hero (H1 targets the primary
keyword), ETA + pricing promise, what's included, sub-service links,
when-you-need-it scenarios, FAQs (with FAQ schema), call CTA.

**Sub-service page (12):** same spine, narrower: exact-match problem headline
("Keys locked in your car?"), solution + ETA, what we do, 3–5 FAQs, call CTA,
link back to parent service. Each is a self-sufficient landing page for a
Google Ads ad group.

All 17 pages render from data in `src/lib/services.ts` through two shared
templates — copy updates are data edits, not component edits.

## Copy system

Problem→solution spine on every page:

1. Name their problem in the first words.
2. Answer with speed ("in as little as 20–30 minutes").
3. Remove the risk (fair upfront quote, no membership, no hidden fees).
4. Tell them what happens next (call → quote & dispatch → back on the road).

Voice rules: second person, present tense, short sentences, numbers over
adjectives, no superlatives ("best", "premier", "#1" banned). Each page
targets its exact search phrase in `<title>`, H1, and first paragraph. Final
copy pass runs through the SEO skill to verify titles (≤60 chars), metas
(120–165 chars), heading hierarchy, and schema.

## Animation system

Three tiers, strictly rationed. Attention animations repeat; everything else
plays once. All motion sits behind the existing `prefers-reduced-motion`
block in `globals.css` (load-bearing — keep).

| Tier | Elements | Motion |
|---|---|---|
| Attention (max 3/screen) | Call buttons, live-dispatch dot, hero review stars | Pulse ring ~3s loop; breathing dot; one-time count-up |
| Reassure | ETA figures, trust badges | Single highlight sweep on scroll-into-view |
| Ambient | Cards, sections | Existing reveal-on-scroll + hover lift |

## Typography

- **Headlines:** Barlow Condensed Bold — freeway-signage DNA, fits long
  problem→solution titles at large sizes.
- **Body/UI:** Barlow — same family, one coherent voice.
- Loaded via `next/font` (self-hosted, swap). Headline scale increases
  site-wide; hero ~4.5–5rem desktop with tight line-height.

## Technical

- **Data model:** `Service` gains `subServices: SubService[]`; both carry
  slug, name, problem/solution copy, included list, FAQs, keywords, SEO
  title/description. Routes: `/services/[slug]` and `/services/[slug]/[sub]`
  via `generateStaticParams`.
- **Live reviews:** server-side fetch of Featurable JSON API (existing widget
  ID `98741542-19aa-4991-9281-32fab2ebcb3f`) with ~1h revalidation feeding a
  `ReviewBadge` component. Failure path: render nothing.
- **SEO plumbing:** sitemap auto-includes new routes; JSON-LD upgraded to
  `EmergencyService` with per-service `Service` schema and FAQ schema
  everywhere; nav "Services" becomes a tap-friendly dropdown of the 5 mains.
- **Docs:** PRODUCT.md updated to reflect the emergency-roadside positioning,
  the 20–30 min promise, and the widened catalog.

## Error handling

- Featurable API down/malformed → hero badge renders nothing; carousel embed
  already collapses on failure (existing behavior).
- Unknown service/sub slug → 404 via `notFound()` (existing pattern).
- Old URLs → 301 redirects (above), so Ads destination URLs never 404.

## Testing

Vitest (existing setup): grid renders 5 cards with correct sub-links;
main/sub pages render from data (spot-check all slugs build); redirect config
covers all four legacy URLs; ReviewBadge renders rating from mocked API and
nothing on failure; metadata/schema helpers for new pages; existing suites
updated for renamed routes and hero copy.

## Out of scope

- No dollar-figure pricing anywhere.
- No rebrand of name, logo, palette.
- No new photography (reuse existing gallery/hero shots).
- Blog content unchanged (internal links updated only if they point at
  redirected URLs).
