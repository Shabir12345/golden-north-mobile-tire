---
name: Golden North Mobile Tire Services
description: Clean & Trustworthy — a white canvas, one trust-blue accent, Inter throughout.
colors:
  page: "#FFFFFF"
  surface: "#F4F6F9"
  card: "#FFFFFF"
  border: "#E2E8F0"
  heading: "#16202E"
  body: "#475467"
  muted: "#697586"
  accent: "#1D6FE0"
  accent-deep: "#1657B0"
  accent-soft: "#EAF2FD"
  footer: "#10243F"
  footer-fg: "#D6E2F0"
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

## Overview — "Clean & Trustworthy"

A bright, friendly, easy-to-navigate local-service site. White canvas, one
trust-blue accent (#1D6FE0) carrying every action and emphasis, Inter
throughout, and soft cards with gentle shadows. Calm and approachable — the
phone call is still the loudest action on every surface, but the feeling is
"a dependable local service," not an emergency.

## Colors
One blue accent is the only saturated color. White/`surface` bands carry the
sectional rhythm; the footer is the single grounded dark-navy anchor. Body copy
is `#475467` (`--color-body`); `--color-muted` is for labels/captions only.

## Typography
Inter for headings and body — normal width, bold weights for hierarchy,
comfortable tracking. Big and highly legible.

## Components
- Buttons: primary = solid blue, white text, `rounded-lg`, soft hover lift;
  ghost = bordered white, blue text. CallButton is always primary.
- Cards: white, 1px `--color-border`, soft `shadow-sm`, 12px radius.
- AvailabilityBadge: a calm static blue dot + "Open 24/7" / "Available 24/7 ·
  We come to you". No pulse.
- Inputs: white, hairline border, blue focus ring.

## Do / Don't
- **Do** keep the blue CallButton the loudest object on every surface.
- **Do** use white/surface bands and soft shadows for rhythm.
- **Do** use `--color-body` for paragraphs, `--color-muted` for labels.
- **Don't** add a second accent hue, gradient text, or any hazard/glow/emergency
  motif.
- **Don't** make it loud — calm, clean, and clear over bold-and-urgent.
