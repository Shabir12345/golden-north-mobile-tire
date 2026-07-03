---
name: Golden North Mobile Tire Services
description: Golden North Premium — compass gold on deep navy over a warm off-white canvas, Inter throughout.
colors:
  page: "#FBF9F4"
  surface: "#F3F1EA"
  card: "#FFFFFF"
  border: "#E7E1D3"
  heading: "#1B2334"
  body: "#4A5162"
  muted: "#686D7D"
  accent: "#F0A500"
  accent-deep: "#8C6200"
  accent-soft: "#FBF1DC"
  accent-hover: "#D99500"
  navy: "#151D2E"
  footer: "#0E1524"
  footer-fg: "#C7CEDC"
  on-navy: "#E8EBF2"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.05
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  md: "8px"
  lg: "12px"
  full: "9999px"
---

# Design System: Golden North Mobile Tire Services

## Overview — "Golden North Premium"

A gold & navy brand system derived from the real logo (gold compass rose inside
a tire, deep navy outlines). Navy bands — header, hero, "How it works", page
headers, footer — give every page its rhythm; the light bands between them sit
on a warm off-white canvas, not stark white. Compass gold is the only saturated
color and carries every action. The phone call is the loudest object on every
surface. Premium and dependable, not loud or "emergency".

## Colors

- **Gold (`--color-accent`, #F0A500)** is the single accent: CTAs, links,
  icon chips, step numbers, focus rings, the availability dot. Gold **fills
  always carry navy text** (≈8:1) — never white.
- **Raw gold text is only allowed on navy** surfaces. On light surfaces,
  gold-as-text uses `--color-accent-deep` (#8C6200, AA on page/surface/card).
  Gold button hover is #D99500 (`accent-hover`).
- **Navy** (#151D2E) is the brand dark for bands and the header;
  `--color-footer` (#0E1524) is the deepest anchor. On navy: white headings,
  `--color-footer-fg` body, `--color-on-navy` for brighter labels, gold links.
- Light bands alternate `page` (warm off-white) and `surface` (warm grey);
  cards stay white with warm `border` hairlines.

## Logo

`public/logo.png` (full lockup, transparent) in Header and Footer;
`public/logo-mark.png` is the square compass disc. The favicon/apple-icon/OG
mark is a drawn gold compass star on navy that echoes it. A faint
`CompassRose` watermark (gold at 5–6% opacity) may sit in one corner of navy
bands — never on light bands, never above 8% opacity.

## Typography

Inter for headings and body — normal width, bold weights for hierarchy,
comfortable tracking. Big and highly legible. White headings on navy, `heading`
on light.

## Components

- Buttons: primary = solid gold, **navy text**, `rounded-lg`, soft hover lift
  to #D99500; ghost = bordered white card, heading text. CallButton is always
  primary.
- Cards on light: white, 1px `--color-border`, soft `shadow-sm`, 12px radius.
  Cards on navy: `border-white/10` + `bg-white/[0.04]`, no shadow.
- AvailabilityBadge: gold dot + label; `onDark` renders `on-navy` text.
- Inputs: white, warm hairline border, gold focus ring.
- MobileCallBar: navy strip, gold call button.

## Do / Don't

- **Do** keep the gold CallButton the loudest object on every surface.
- **Do** alternate navy / page / surface bands for sectional rhythm.
- **Do** pair gold fills with navy text, and use `accent-deep` for gold-toned
  text on light surfaces.
- **Don't** put raw gold text on light backgrounds, or white text on gold.
- **Don't** add a second accent hue, gradient text, or hazard/glow/emergency
  motifs — premium and calm, not alarm.
