# Design: "Golden North Premium" — gold & navy rebrand

**Date:** 2026-07-03
**Status:** Approved by Shabir (chat, 2026-07-03)

## Goal

The current "Clean & Trustworthy" theme (white + trust-blue) reads flat — every
section is white and the site has no brand identity. The business's logo and
truck are golden-yellow. Rebrand the theme to a **gold & navy** system derived
from the logo, add the logo itself to the site, and give sections distinct
alternating backgrounds. No structural, content, or route changes.

## 1. Palette (tokens in `src/app/globals.css` `@theme`)

Replace the trust-blue family with logo-derived tokens:

| Token | Value | Use |
|---|---|---|
| `--color-navy` | `#151D2E` | hero, "How it works" band, header, page headers |
| `--color-navy-deep` | `#0E1524` | footer, pressed states on navy |
| `--color-accent` (gold) | `#F0A500` | CTAs, links, icon chips, step numbers, focus rings |
| `--color-page` | `#FBF9F4` | warm off-white base (was `#FFFFFF`) |
| `--color-surface` | `#F3F1EA` | warm-grey alternating band (was cool `#F4F6F9`) |

- Gold buttons use **navy text** (gold + white fails AA; gold + navy ≈ 10:1).
- Body/heading greys warm slightly to match the canvas.
- On navy surfaces: white/near-white headings, warm light-grey body, gold links.

## 2. Logo

- Extract the logo from `Golden Northhh (1).pdf` into a transparent web asset
  (`public/logo…` — SVG if the PDF is vector, else high-res PNG).
- Use it in the Header (replacing the text wordmark) and the navy footer.
- Crop the tire-compass mark alone for favicon / app icon / OG image.

## 3. Section rhythm (homepage)

Alternating bands, top to bottom:

1. **Navy hero** — photo with navy overlay, gold CTA, gold headline underline.
2. **Warm-white services** — cards with gold icon chips.
3. **Navy "How it works"** — large gold step numbers, light text.
4. **Warm-grey reviews** band.
5. **Gold-tinted CTA band.**
6. **Navy footer** — logo, gold links.

Subpages (services, gallery, contact) get navy page headers.

## 4. Detail / "soul"

- Subtle compass-rose watermark (from the logo) in hero/footer corners.
- Gold hairline accents on cards; warmer shadows.
- No new motion; keep the single fade-up reveal. Keep WCAG AA everywhere.

## 5. Non-goals

- No content, copy, route, or component-structure changes.
- No second accent hue beyond gold; no gradient-heavy or "emergency" styling.

## 6. Testing & docs

- Existing 26 tests keep passing; update any color/text assertions the rebrand
  invalidates.
- OG image, `icon.svg`, `apple-icon.tsx`, and `manifest.ts` theme color updated
  to the new brand.
- Rewrite `DESIGN.md` to describe the new system.
