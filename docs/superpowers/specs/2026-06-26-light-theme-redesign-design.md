# Light Theme Redesign — "Clean & Trustworthy"

**Date:** 2026-06-26
**Status:** Approved (design), pending implementation plan
**Project:** Golden North Mobile Tire Services marketing site

## 1. Goal

Pivot the site away from its current dark, urgent "emergency-rescue" identity
(near-black canvas, condensed industrial font, amber hazard livery, pulsing
dispatch status, headlight glows) to a **bright, friendly, easy-to-navigate
local-service site**.

Same business, same content, same conversion goal — turn a visitor into a phone
call — but expressed calmly and approachably instead of with alarm-bell urgency.

User-stated intent, verbatim drivers:
- Dislikes the current font (Saira Condensed).
- Dislikes the dark colors — wants a **light theme**.
- Dislikes the **emergency theme** — wants "just a regular website, easy to
  understand and easy to navigate."

## 2. Decisions (from brainstorming)

| Decision | Choice |
|---|---|
| Overall look | **Clean & trustworthy** — white background, blue accent |
| Font | **Inter** for everything (headings + body); drop Saira Condensed |
| Emergency feel | **Mostly remove, keep a little** — drop heavy effects; keep calm "we come to you / available 24/7" as plain selling points |
| Scope | **Whole site** — all pages + shared chrome, consistent |

## 3. New design system

### 3.1 Colors

Replace the near-black + amber palette with a white-based, blue-accent palette.
All combinations target WCAG 2.2 AA (body ≥ 4.5:1, large text ≥ 3:1).

| Role | Token (new) | Value | Notes |
|---|---|---|---|
| Page background | `--color-page` | `#FFFFFF` | base surface |
| Alt section bg | `--color-surface` | `#F4F6F9` | alternating bands, cards-on-white |
| Raised card bg | `--color-card` | `#FFFFFF` | with soft shadow + hairline border |
| Border / hairline | `--color-border` | `#E2E8F0` | light neutral dividers, card edges |
| Primary text | `--color-ink` | `#16202E` | headings, primary text |
| Body text | `--color-body` | `#475467` | paragraphs (AA on white & surface) |
| Muted text | `--color-muted` | `#697586` | labels, captions, metadata |
| **Accent** | `--color-accent` | `#1D6FE0` | buttons, links, emphasis |
| Accent hover/pressed | `--color-accent-deep` | `#1657B0` | hover/active states |
| Accent tint | `--color-accent-soft` | `#EAF2FD` | subtle accent backgrounds, chips |
| Footer bg | `--color-footer` | `#10243F` | one grounded dark anchor at page bottom |
| Footer text | `--color-footer-fg` | `#D6E2F0` | text on footer |

**Named rules carried forward (adapted):**
- **One accent rule.** Blue is the single saturated voice. No second accent hue.
- **Body floor.** Body copy uses `--color-body`, never the muted gray; muted is
  for labels/captions only.

### 3.2 Typography

- **Family:** Inter for headings and body (single family, weight/size for
  hierarchy). Saira Condensed removed from the layout font imports.
- **Headings:** bold (600–700), normal width, comfortable tracking
  (`-0.01em` to `0`), `text-wrap: balance`. No condensed faces, no display
  ceiling gymnastics.
- **Hierarchy (approx.):**
  - H1 / hero: `clamp(2.25rem, 5vw, 3.5rem)`, weight 700, line-height ~1.05
  - H2 / section: `clamp(1.75rem, 3vw, 2.5rem)`, weight 700
  - H3 / card/service title: `1.25–1.5rem`, weight 600
  - Body: `1.0625–1.125rem`, weight 400, line-height 1.6, measure ~65–75ch
  - Label/eyebrow: `0.8125rem`, weight 600, optional light tracking — NOT the
    old aggressive uppercase-tracked stamp.

### 3.3 Elevation

Light theme uses real (soft) shadows for depth, unlike the old tonal-only dark
system.
- **Card:** `0 1px 3px rgba(16,32,63,0.06), 0 1px 2px rgba(16,32,63,0.04)` +
  1px `--color-border`.
- **Card hover (interactive):** slightly deeper lift.
- **Header (on scroll) / mobile bar:** subtle shadow to separate from content.
- Rounded corners become friendlier: `8px–12px` (was sharp `3–4px`).

## 4. What gets removed / changed (the "emergency" theme)

| Element | Action |
|---|---|
| `HazardStripe` (yellow/black caution band) | **Remove** from all usages; replace with whitespace or a thin `--color-border` divider. Retire the component (or keep as no-op if imported widely — prefer removing imports). |
| `Glow` (headlight gradient) | **Remove** from all usages. Clean whitespace instead. Retire component. |
| `LiveStatus` (pulsing "dispatching" dot) | **Soften** to a calm static badge: e.g. "Available 24/7 · We come to you" with a small solid (non-pulsing) dot. Remove `livePulse`/`goldPulse`/`beamSweep` keyframes. |
| `TreadDivider` | Remove if it reads as industrial/emergency; otherwise simplify to a plain hairline. |
| Dispatch/rescue copy ("dispatching the GTA", "On a job · tonight", "rescue") | **Calm down** to friendly service language. Keep "We come to you" and 24/7 availability as plain benefits. |
| `Reveal` fadeUp on scroll | Keep (gentle, accessible); retains `prefers-reduced-motion` guard. |

The `prefers-reduced-motion` block in `globals.css` is load-bearing and stays.

## 5. Components restyled

All move to the light palette + Inter + friendlier radii:
- `Button` (primary = blue fill/white text, rounded ~8px; ghost/secondary =
  bordered or soft-tinted; keep `CallButton` as the dominant CTA).
- `StatStrip`, `ServiceRow`, `HowItWorks`, `CoverageMap`, `CTABand`
  (becomes a calm accent-tinted or soft band, not a drenched amber slab),
  `GalleryGrid`, `Photo` (lighter ring/treatment), `PageHeader`,
  `ContactForm` (light inputs, blue focus ring).
- Shared chrome: `Header` (white, subtle shadow on scroll), `Footer`
  (dark-navy anchor), `MobileCallBar` (white/blue, soft top shadow).

## 6. Pages (whole site, consistent)

- Home (`/`)
- Services list (`/services`) + detail (`/services/[slug]`)
- Gallery (`/gallery`)
- Contact (`/contact`)
- Shared: Header, Footer, MobileCallBar

## 7. Conversion priority (unchanged)

Call-first remains the law: the blue `CallButton` is the dominant CTA on every
surface; the contact form stays a secondary fallback. Large tap targets and the
always-reachable mobile call bar are preserved for the stranded-on-mobile case.

## 8. Testing & docs

- Existing suite (26 tests) must stay green. Most assert content/structure, not
  color; update any test that asserts old theme classes/strings (e.g. hazard,
  glow, "dispatching", old token classes).
- Rewrite `DESIGN.md` to document the new light/blue/Inter system (replace the
  "High-Vis Rescue" content). Update `PRODUCT.md` brand-personality section only
  as needed to reflect the calmer identity (keep product facts).
- Update `globals.css` `@theme` tokens, base styles, and remove dead keyframes.

## 9. Out of scope

- No new pages or features; no copywriting overhaul beyond calming the
  emergency/dispatch phrasing.
- No changes to business data, services list, photos, SEO/JSON-LD logic, or the
  contact API beyond restyling their presentation.
