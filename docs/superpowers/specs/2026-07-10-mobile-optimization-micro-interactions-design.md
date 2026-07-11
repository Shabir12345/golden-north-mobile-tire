# Design: Mobile Optimization + Micro-Interaction Polish

**Date:** 2026-07-10
**Status:** Approved by user
**Approach:** CSS-only motion, no new dependencies

## Goal

Two deliverables for the GoldenNorth site:

1. A general mobile audit of every page at phone widths, fixing all layout,
   spacing, tap-target, and usability issues found.
2. A set of polished, design-system-compliant micro-interactions that add
   craft and uniqueness while staying "premium and calm, not loud."

## Constraints

- **No new dependencies.** All motion via CSS transitions/keyframes plus the
  existing `Reveal` client-component pattern. The site ships almost no client
  JS and stays that way.
- **Design-system rules hold** (DESIGN.md): gold is the only accent, gold
  fills carry navy text, no second hue, no glow/hazard/emergency motifs.
- **`prefers-reduced-motion` suppresses everything** — the existing global
  rule in `globals.css` covers animations/transitions; new motion must not
  bypass it.
- If JS never runs, content must remain fully visible (existing `Reveal`
  contract).

## Part 1 — Mobile audit & fixes

Audit every page — home, /services, /services/[slug], /gallery, /blog,
/blog/[slug], /contact — in a real browser at ~375px and ~430px widths.
Fix everything found. Known likely targets from code review:

- **Tap targets:** nav links, footer links, FAQ toggles ≥ 44px effective
  height.
- **MobileCallBar overlap:** the fixed bottom bar can cover page-bottom
  content; add bottom padding (bar height + safe-area) to the layout so the
  footer's last content is never hidden behind it.
- **Form inputs:** font-size ≥ 16px so iOS Safari doesn't zoom on focus.
- **Hero/display type scaling** and horizontal-overflow checks on all pages.
- **Image `sizes` attributes** appropriate for phone viewports.

Anything else found during the browser audit is in scope if it is a mobile
usability fix; unrelated refactors are not.

## Part 2 — Micro-interactions (CSS-only)

1. **Button press feel:** `active:scale-[0.98]` with a fast duration on both
   variants; keep the existing hover lift. Phone icon in `CallButton` gets a
   gentle ring-wiggle keyframe on hover (replaces the static -12° rotate).
2. **Call-button shine:** a one-time subtle gold sheen sweep across primary
   call buttons when they enter view (hero + MobileCallBar). Implemented as a
   lighter-gold gradient overlay animated once via CSS; not a glow, no new
   hue.
3. **Mobile menu open/close:** replace the `hidden` snap with fade +
   slide-down of the panel and a small stagger (~40ms steps) on nav items.
   Must remain accessible (aria-expanded, focus behavior unchanged).
4. **Staggered reveals:** extend `Reveal` with an optional `delay` prop so
   card grids cascade in at 60–80ms steps.
5. **Compass rose rotation:** the decorative `CompassRose` watermark on navy
   bands rotates extremely slowly (~120s per turn). Barely perceptible.
6. **Links & cards:** underline-grow on text links; consistent card hover
   (lift + border-to-gold transition) across card grids.

## Testing & verification

- Existing vitest suite passes; component tests updated where markup changes
  (Header mobile menu, Button).
- `npm run lint` and `npm run build` clean.
- Browser pass of every page at phone widths before and after changes.
