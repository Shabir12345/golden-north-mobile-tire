# Gold & Navy Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the Golden North site from white + trust-blue to a logo-derived gold & navy system, add the extracted logo, and give sections alternating navy / warm-white / warm-grey backgrounds.

**Architecture:** The site is a Next.js App Router app styled with Tailwind v4 CSS-variable tokens defined in `src/app/globals.css` `@theme`. Most components reference `var(--color-*)` tokens, so the rebrand is (1) new token values, (2) targeted component surface changes (navy hero, navy HowItWorks, navy header, navy page headers), (3) logo asset extraction + placement, (4) brand images (favicon/OG/manifest), (5) docs.

**Tech Stack:** Next.js (App Router, Tailwind v4, next/og), Vitest + Testing Library, Node script with `pdfjs-dist` + `@napi-rs/canvas` + `sharp` for logo extraction.

## Global Constraints

- Gold `#F0A500` is the only saturated accent; navy `#151D2E` / `#0E1524` are the dark surfaces.
- Gold fills always carry **navy text** (`#151D2E`), never white (AA).
- Gold *text/links on light backgrounds* must use the darker `--color-accent-deep: #8C6200` (AA ≥ 4.5:1 on `#FBF9F4`); raw gold text is only allowed on navy.
- No content, copy, or route changes. No new motion. Existing 26 tests must pass.
- All temporary script files go in the session scratchpad, not the repo.

---

### Task 1: Extract logo assets from the PDF

**Files:**
- Create: `public/logo.png` (full logo, transparent, trimmed, ~1200px wide)
- Create: `public/logo-mark.png` (square tire-compass mark only, transparent, 512×512)
- Modify: `public/README-assets.md` (note provenance)

**Interfaces:**
- Produces: `/logo.png` and `/logo-mark.png` URLs used by Header (Task 4), Footer (Task 7), and referenced in README.

- [ ] **Step 1: Install extraction deps in the scratchpad (NOT the repo)**

```bash
cd <scratchpad> && npm init -y && npm i pdfjs-dist @napi-rs/canvas sharp
```

- [ ] **Step 2: Write and run the extraction script** (`<scratchpad>/extract-logo.mjs`)

```js
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas } from "@napi-rs/canvas";
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

const PDF = "C:/Users/khati/Documents/Clients/Riaz Roadside/Golden Northhh (1).pdf";
const OUT = "C:/Users/khati/Documents/Clients/Riaz Roadside/public";

const doc = await getDocument({ data: new Uint8Array(readFileSync(PDF)) }).promise;
const page = await doc.getPage(1);
const scale = 4;
const vp = page.getViewport({ scale });
const canvas = createCanvas(vp.width, vp.height);
const ctx = canvas.getContext("2d");
// transparent background — pdf.js only paints page content
await page.render({ canvasContext: ctx, viewport: vp, background: "rgba(0,0,0,0)" }).promise;
const png = canvas.toBuffer("image/png");

// trim transparent margins, resize to sane web size
const full = await sharp(png).trim().png().toBuffer();
await sharp(full).resize({ width: 1200, withoutEnlargement: true }).png().toFile(`${OUT}/logo.png`);
console.log("logo.png", await sharp(`${OUT}/logo.png`).metadata());
```

Expected: `public/logo.png` exists with alpha channel. **Verify transparency**: `sharp(...).stats()` → `isOpaque: false`. If the PDF paints a white background rect (image comes out opaque), add a white→alpha pass before trim:

```js
const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  if (data[i] > 246 && data[i + 1] > 246 && data[i + 2] > 246) data[i + 3] = 0;
}
const unwhited = await sharp(data, { raw: info }).png().toBuffer();
```

- [ ] **Step 3: Produce the square mark crop**

The tire-compass mark is the top portion of the trimmed logo (roughly the top 72% of height, horizontally centered, square). Crop with sharp using the trimmed buffer's metadata, then re-trim and resize to 512:

```js
const meta = await sharp(full).metadata();
const side = Math.round(meta.height * 0.72);
const mark = await sharp(full)
  .extract({ left: Math.round((meta.width - side) / 2), top: 0, width: side, height: side })
  .trim().resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png().toFile(`${OUT}/logo-mark.png`);
```

Visually verify both PNGs with the Read tool (open the files) — the mark must contain the whole tire, no text.

- [ ] **Step 4: Note assets in `public/README-assets.md`, commit**

```bash
git add public/logo.png public/logo-mark.png public/README-assets.md
git commit -m "feat: extract brand logo assets from source PDF"
```

---

### Task 2: Retoken `globals.css` to gold & navy

**Files:**
- Modify: `src/app/globals.css:9-32` (the `@theme` block) and `::selection`

**Interfaces:**
- Produces tokens all later tasks use: `--color-page #FBF9F4`, `--color-surface #F3F1EA`, `--color-card #FFFFFF`, `--color-border #E7E1D3`, `--color-heading #1B2334`, `--color-body #4A5162`, `--color-muted #6E7383`, `--color-accent #F0A500`, `--color-accent-deep #8C6200`, `--color-accent-soft #FBF1DC`, `--color-navy #151D2E`, `--color-footer #0E1524`, `--color-footer-fg #C7CEDC`, `--color-on-navy #E8EBF2`.

- [ ] **Step 1: Replace the `@theme` block**

```css
@theme {
  /* ── Light surfaces (warm) ── */
  --color-page: #FBF9F4;
  --color-surface: #F3F1EA;
  --color-card: #FFFFFF;
  --color-border: #E7E1D3;

  /* ── Text on light ── */
  --color-heading: #1B2334;
  --color-body: #4A5162;
  --color-muted: #6E7383;

  /* ── The brand voice: compass gold ── */
  --color-accent: #F0A500;      /* fills, CTAs (always with navy text) */
  --color-accent-deep: #8C6200; /* gold-as-text on light surfaces (AA) */
  --color-accent-soft: #FBF1DC; /* gold-tinted bands/chips             */

  /* ── Dark surfaces: logo navy ── */
  --color-navy: #151D2E;        /* hero, process band, header          */
  --color-footer: #0E1524;      /* footer / deepest anchor             */
  --color-footer-fg: #C7CEDC;   /* body text on navy                   */
  --color-on-navy: #E8EBF2;     /* brighter text on navy               */

  --font-sans: var(--font-inter), system-ui, sans-serif;
}
```

Also: `::selection { background: #F0A500; color: #151D2E; }` and update the header comment to the new system name "Golden North Premium".

- [ ] **Step 2: Verify AA contrast of the token pairs** (scratchpad node one-liner computing WCAG ratios): accent-deep on page ≥ 4.5, body on page/surface ≥ 4.5, footer-fg on navy & footer ≥ 4.5, navy on accent ≥ 4.5, accent on navy ≥ 3 (large text/UI).

- [ ] **Step 3: Run tests** — `npx vitest run` → all pass. Commit `feat: gold & navy design tokens`.

---

### Task 3: Buttons — gold primary with navy text

**Files:**
- Modify: `src/components/ui/Button.tsx:42-53`

**Interfaces:**
- Consumes tokens from Task 2. `ButtonProps` API unchanged (variant `primary | ghost`).

- [ ] **Step 1: Update variant styles**

```tsx
// Primary: navy-on-gold. AA: #151D2E on #F0A500 ≈ 8:1.
const primaryStyles = [
  "bg-[var(--color-accent)] text-[var(--color-navy)] shadow-sm",
  "hover:bg-[#D99500] hover:-translate-y-0.5 hover:shadow-md",
  "active:translate-y-0",
].join(" ");

// Ghost: bordered card; reads as secondary on light AND navy surfaces.
const ghostStyles = [
  "bg-white/95 text-[var(--color-heading)] border border-[var(--color-border)]",
  "hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]",
].join(" ");
```

- [ ] **Step 2: `npx vitest run` → pass. Commit `feat: gold call-to-action buttons`.**

---

### Task 4: Header — navy bar with the real logo

**Files:**
- Modify: `src/components/layout/Header.tsx`

Changes (keep structure/behavior/ARIA identical):
- [ ] Header shell → `bg-[#151D2Ee6] border-white/10` (navy at ~90% + blur), remove `NorthStar` and text wordmark; replace with `next/image` logo:

```tsx
import Image from "next/image";
<Image src="/logo.png" alt={`${BUSINESS.name} logo`} width={150} height={84} priority
       className="h-11 w-auto" />
```

- [ ] Desktop nav links: `text-white/80 hover:text-[var(--color-accent)]`, active `text-[var(--color-accent)] font-semibold`; focus ring offsets → `ring-offset-[var(--color-navy)]`.
- [ ] Hamburger: `text-white/90`; mobile menu panel: `bg-[var(--color-navy)] border-white/10`, links `text-white/85`, active gold.
- [ ] AvailabilityBadge in header gets `onDark` (Task 7 extends the component).
- [ ] `npx vitest run` (Header tests) → pass. Commit `feat: navy header with brand logo`.

---

### Task 5: Hero — navy stage with gold voice

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Create: `src/components/ui/CompassRose.tsx` (decorative watermark SVG)

- [ ] **Step 1: `CompassRose.tsx`** — aria-hidden 8-point compass star SVG, `fill="currentColor"`, used at low opacity:

```tsx
export function CompassRose({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M50 0 L56 44 L100 50 L56 56 L50 100 L44 56 L0 50 L44 44 Z" />
      <path d="M50 20 L54 46 L80 50 L54 54 L50 80 L46 54 L20 50 L46 46 Z" opacity="0.55" transform="rotate(45 50 50)" />
    </svg>
  );
}
```

- [ ] **Step 2: Hero surface** — section → `bg-[var(--color-navy)]`; add `<CompassRose className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 text-[var(--color-accent)] opacity-[0.06]" />` inside the section.
- [ ] **Step 3: Text colors** — h1 → `text-white`, accent span → `text-[var(--color-accent)]` with a gold underline bar under the h1 (`<span class="mt-5 block h-1 w-20 rounded-full bg-[var(--color-accent)]">`); paragraph + area-served line → `text-[var(--color-footer-fg)]`; chips: first `bg-[var(--color-accent)] text-[var(--color-navy)]`, rest `bg-white/10 text-[var(--color-on-navy)]`.
- [ ] **Step 4: AvailabilityBadge → `onDark`; keep photo overlay + white glass chips as-is.**
- [ ] **Step 5: `npx vitest run` → pass. Commit `feat: navy hero with gold accents`.**

---

### Task 6: HowItWorks — navy band with gold numerals

**Files:**
- Modify: `src/components/sections/HowItWorks.tsx`

- [ ] Section → `bg-[var(--color-navy)]`; h2 → `text-white`, span stays gold (raw `--color-accent` is AA-large on navy).
- [ ] Step cards → `border-white/10 bg-white/[0.04]`; numerals stay `text-[var(--color-accent)]`; h3 → `text-white`; body → `text-[var(--color-footer-fg)]`.
- [ ] `npx vitest run` → pass. Commit `feat: navy process band`.

---

### Task 7: Supporting surfaces — badge, page headers, CTA band, footer, mobile bar

**Files:**
- Modify: `src/components/ui/AvailabilityBadge.tsx`, `src/components/sections/PageHeader.tsx`, `src/components/sections/CTABand.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/MobileCallBar.tsx`

- [ ] **AvailabilityBadge**: `onDark` text → `text-[var(--color-on-navy)]`; light-surface "line" variant → `text-[var(--color-accent-deep)]` (already token-driven — verify only).
- [ ] **PageHeader** (used by services/gallery/contact): section → `bg-[var(--color-navy)]` (drop border-b), h1 → `text-white`, intro → `text-[var(--color-footer-fg)]`, badge `onDark`; add small `CompassRose` watermark right side.
- [ ] **CTABand**: stays `bg-[var(--color-accent-soft)]` (now gold-tinted by tokens); eyebrow → `text-[var(--color-accent-deep)]` (already token-driven — verify only).
- [ ] **Footer**: replace ✦ + name with `<Image src="/logo.png" … className="h-14 w-auto" />`; link hovers `hover:text-[var(--color-accent)]`; phone hover already accent; add `CompassRose` watermark bottom-left at `opacity-[0.05]`.
- [ ] **MobileCallBar**: `bg-[var(--color-navy)] border-white/10` so the gold call button pops.
- [ ] `npx vitest run` → all pass. Commit `feat: gold & navy supporting surfaces`.

---

### Task 8: Brand images — favicon, apple icon, OG card, manifest

**Files:**
- Modify: `src/app/icon.svg`, `src/app/apple-icon.tsx`, `src/app/opengraph-image.tsx`, `src/app/manifest.ts`

- [ ] **icon.svg** — navy tile, gold compass star:

```svg
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="14" fill="#151D2E"/>
  <path d="M32 8 L36 28 L56 32 L36 36 L32 56 L28 36 L8 32 L28 28 Z" fill="#F0A500"/>
  <path d="M32 18 L34.5 29.5 L46 32 L34.5 34.5 L32 46 L29.5 34.5 L18 32 L29.5 29.5 Z" fill="#FFFFFF" opacity="0.85" transform="rotate(45 32 32)"/>
</svg>
```

- [ ] **apple-icon.tsx** — `backgroundColor: "#151D2E"`, star path `fill="#F0A500"`.
- [ ] **opengraph-image.tsx** — navy background `#151D2E`, gold top edge `#F0A500`, headline white, eyebrow gold, phone gold, secondary text `#C7CEDC`; swap the inline star SVG fills (navy tile → gold star).
- [ ] **manifest.ts** — `background_color: "#151D2E"`, `theme_color: "#F0A500"`.
- [ ] `npx vitest run && npx next build` → pass. Commit `feat: gold & navy brand images and manifest`.

---

### Task 9: DESIGN.md rewrite + spec cross-check

**Files:**
- Modify: `DESIGN.md` (frontmatter tokens + prose: "Golden North Premium — gold & navy", updated Do/Don't: gold fills carry navy text; raw gold text only on navy; navy bands give rhythm)

- [ ] Rewrite, commit `docs: DESIGN.md for gold & navy premium theme`.

---

### Task 10: Full verification

- [ ] `npx vitest run` → 26/26 pass; `npx next build` → green.
- [ ] Start dev server, screenshot home, services, gallery, contact at desktop + mobile widths (browser tools); check: no white-on-gold text, logo crisp on navy, bands alternate, mobile call bar navy, favicon updated.
- [ ] Fix anything visually broken; final commit.
