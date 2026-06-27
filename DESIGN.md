---
name: Golden North Mobile Tire Services
description: High-Vis Rescue — a night canvas, one high-vis amber, black-on-amber hazard livery.
colors:
  ink: "#05080E"
  midnight: "#0B1220"
  steel: "#131C2B"
  gold: "#F5A81C"
  gold-deep: "#C2820F"
  signal: "#FF8A1E"
  frost: "#EEF2F8"
  frost-dim: "#C3CDDB"
  slate-muted: "#93A1B4"
typography:
  display:
    fontFamily: "Saira Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 5.75rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Saira Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Saira Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Saira Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.16em"
rounded:
  sm: "3px"
  md: "4px"
  lg: "6px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "36px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#FFB733"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.frost}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-solid-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.gold}"
    rounded: "{rounded.sm}"
    padding: "16px 32px"
  card-steel:
    backgroundColor: "{colors.steel}"
    textColor: "{colors.frost-dim}"
    rounded: "{rounded.md}"
    padding: "20px"
  input:
    backgroundColor: "{colors.steel}"
    textColor: "{colors.frost}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: Golden North Mobile Tire Services

## 1. Overview

**Creative North Star: "The Night Dispatch"**

Golden North is a 24/7 mobile tire and roadside rescue running out of a bright-yellow
van with black tread graphics, a hi-vis-vested tech, working driveways and highway
shoulders across the GTA at every hour. The site is that van rendered as an interface:
a near-black night canvas cut by a single high-vis amber, the same amber as the real
truck, used for every action and every emphasis. A black-on-amber hazard stripe —
lifted straight from the van's livery — edges the heroes and the call bar like
reflective safety tape. The feeling to leave is **relief**: someone is already on the
way.

This is **urgent, rescue, bold** (per PRODUCT.md) without being cheap. Boldness comes
from contrast and commitment — a full-amber CTA band, display-scale condensed
headlines, real night photography — not from the red/yellow promo clutter of a
discount tire shop. The palette stays disciplined: one amber carries the brand;
everything else is night and frost. Imagery is real (the actual van, the actual jobs),
never stock or placeholder.

**Key Characteristics:**
- Night canvas in three tones (ink → midnight → steel) for sectional rhythm without ever going light.
- One high-vis amber (`#F5A81C`) as the single voice — CTAs, accents, the drenched band.
- Black-on-amber hazard stripe as the signature motif.
- Condensed industrial display type (Saira Condensed) at confident scale.
- Real, cohesively-treated photography; the call action is the loudest object on every surface.

## 2. Colors

A near-black palette lit by one high-vis amber. Amber is the only saturated color in
the system; its rarity outside of actions and emphasis is what makes it read as a
signal.

### Primary
- **High-Vis Amber** (`#F5A81C`): The brand's one voice — every primary CTA, link
  emphasis, numerals, hazard stripe, and the fully-drenched CTA band. Matches the real
  van's yellow. Black text sits on it (≈10.7:1).
- **Amber Deep** (`#C2820F`): The pressed/bevel shade under primary buttons and hover
  states. Never used for text.

### Secondary
- **Signal Orange** (`#FF8A1E`): Reserved strictly for the LIVE cue — the pulsing
  "Open now / dispatching" status dot and label, and urgency. Hotter than amber so it
  always reads as "on air". Never decorative.

### Neutral
- **Ink** (`#05080E`): Deepest night — footer, the "How it works" and FAQ bands, photo mattes.
- **Midnight** (`#0B1220`): The base page background and most section backgrounds.
- **Steel** (`#131C2B`): The one raised surface — stat blocks, cards, inputs, the map panel.
- **Frost** (`#EEF2F8`): Primary text and headlines on night.
- **Frost Dim** (`#C3CDDB`): Secondary body copy. Meets AA on midnight; this is the
  default for paragraphs, not the muted gray.
- **Slate Muted** (`#93A1B4`): Tertiary only — labels, captions, metadata.

### Named Rules
**The One Amber Rule.** There is exactly one saturated color in the system. If a second
hue ever appears, it's a bug. "Warmth" and energy come from the amber, the photography,
and the type — never from a second accent.

**The Frost-Dim Floor.** Body copy is `frost-dim` (`#C3CDDB`), never `slate-muted`.
Muted gray is for labels and captions only; using it for paragraphs is the single
biggest readability failure and is prohibited.

## 3. Typography

**Display Font:** Saira Condensed (fallback Arial Narrow, system-ui)
**Body Font:** Inter (fallback system-ui)
**Label Font:** Saira Condensed, uppercase, tracked

**Character:** Condensed industrial display against a clean neutral body — the contrast
axis is width and posture (condensed vs. normal), not two similar sans-serifs. The
display face reads like stamped equipment labelling; Inter keeps long copy legible.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 8vw, 5.75rem)`, line-height 0.9, `-0.03em`): Hero
  and page H1s only. Capped at ~5.75rem so it never shouts past the design.
- **Headline** (700, `clamp(1.75rem, 4vw, 3rem)`, 1.02): Section H2s.
- **Title** (700, 1.5rem, 1.15): Service names, card and FAQ headings (H3).
- **Body** (400, 1.0625–1.125rem, 1.6): Paragraphs in `frost-dim`. Cap measure at ~65–75ch.
- **Label** (600, 0.75rem, uppercase, tracking 0.16em): Eyebrow facts, stat labels,
  form labels, nav, button text.

### Named Rules
**The Contrast-Axis Rule.** Pair on width/posture (condensed display + normal body),
never two similar sans-serifs. Emphasis within body is weight or the amber, never a
third font.

**The Display Ceiling.** Display `clamp()` max stays ≤ 6rem and letter-spacing ≥ -0.03em.
Tighter or bigger reads as cramped shouting, not design.

## 4. Elevation

Flat by default. Depth is conveyed tonally — ink below midnight below steel — not with
ambient shadows. Shadows appear only in two deliberate places: under the hero photo
(a single long drop shadow to lift it off the canvas) and as a soft amber glow under
primary buttons on hover (a "headlight" cue, not a card lift). The headlight Glow
gradients and the hazard stripes do the atmospheric work that shadows would elsewhere.

### Shadow Vocabulary
- **Photo lift** (`box-shadow: 0 30px 80px -20px rgba(0,0,0,0.8)`): hero imagery only.
- **Button headlight** (`box-shadow: 0 10px 30px -6px rgba(245,168,28,0.5)`): primary
  button hover — an amber glow, never a neutral drop shadow.
- **Mobile bar lift** (`box-shadow: 0 -12px 30px -10px rgba(0,0,0,0.7)`): the fixed
  mobile call bar.

### Named Rules
**The Tonal-Depth Rule.** Layer surfaces by tone (ink / midnight / steel), not by
stacking neutral shadows. A gray drop shadow on a dark surface is forbidden; if a
surface needs to lift, change its tone or use the amber headlight glow.

## 5. Components

### Buttons
- **Shape:** Sharp engineered corner (`3px`), never pill/rounded-full. Saira Condensed, uppercase, tracked `0.12em`.
- **Primary:** `gold` background, `ink` text, inset bottom bevel in `gold-deep`. Hover lifts 2px, brightens to `#FFB733`, adds the amber headlight glow. The single loudest object on any surface — the call-first law.
- **Ghost:** transparent, `frost` text, amber-tinted hairline border; on hover the border and text go full amber. Clearly secondary; never outranks primary.
- **Solid Ink:** `ink` fill, `gold` text — used only ON the amber drenched band, where a dark button is the strongest contrast.

### Chips
- **Style:** Small uppercase Saira labels, `3px` corners. The lead chip is solid amber on ink; the rest are frost text inside an amber hairline border. Used for at-a-glance facts (24/7, GTA-wide, No tow needed).

### Cards / Containers
- **Corner:** `4px`. **Background:** `steel`. **Border:** 1px amber-tint hairline. **Shadow:** none (flat — see Elevation).
- Service offerings are NOT cards: they are full-width numbered editorial rows (big 01–04 numeral + real photo + copy + CTA), alternating photo side.

### Inputs / Fields
- **Style:** `steel` fill, `4px` corner, amber-tint hairline. **Focus:** border goes solid amber + 2px amber ring. Labels are uppercase Saira above each field.

### Photo
- One cohesive treatment for the mixed real photo set: object-cover into a fixed aspect
  box, a thin amber hairline ring, optional ink gradient at the base for overlaid text,
  and a subtle desaturate→full-color + zoom on hover.

### Signature components
- **HazardStripe:** diagonal amber/ink (or ink/amber) caution band; section dividers and the top edge of heroes and the mobile call bar.
- **LiveStatus:** pulsing `signal` dot + label ("Open now · dispatching the GTA") — the 24/7 promise made to feel active.
- **Glow:** elongated, directional amber ellipse = a headlight cone (optionally sweeping behind the hero), never a centered orb.
- **CTABand:** the one fully-amber-drenched surface; black text, ink call button.

## 6. Do's and Don'ts

### Do:
- **Do** keep the call action (amber primary button) the loudest object on every surface — call-first is the law.
- **Do** carry rhythm with the three night tones (ink/midnight/steel), real photography, and the one amber CTA band — not with light sections.
- **Do** use `frost-dim` for body copy and reserve `slate-muted` for labels/captions.
- **Do** use the hazard stripe and the headlight Glow as the brand's signature; pair display + body on the width/posture contrast axis.
- **Do** ship real Golden North photography with descriptive alt text; document swaps in `public/README-assets.md`.

### Don't:
- **Don't** look like a **generic auto-shop site** — no clip-art tires, stock-photo banners, or coupon spam.
- **Don't** look like a **cheap AI / SaaS template** — no centered hero with a tiny uppercase eyebrow above every section, no identical icon-card grids, no cream/sand background, no gradient text.
- **Don't** look like **corporate fleet / insurance** — no cold faceless blue.
- **Don't** look like a **loud discount-tire retailer** — no big-box promo energy, sale tags, or price-screaming. Bold ≠ loud-and-cheap.
- **Don't** use `border-left`/`border-right` > 1px as a colored side-stripe on cards, list items, or callouts.
- **Don't** introduce a second saturated color, gradient text, or decorative glassmorphism.
- **Don't** let headlines overflow — test display copy at every breakpoint; the viewport is part of the design.
