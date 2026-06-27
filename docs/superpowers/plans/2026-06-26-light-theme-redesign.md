# Light Theme Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Golden North site from its dark "emergency rescue" theme to a bright, friendly, easy-to-navigate light theme (white + trust-blue, Inter font), keeping all content and the call-first conversion goal.

**Architecture:** A token-first restyle. `globals.css` `@theme` defines a new light palette and removes the old dark tokens + emergency keyframes; `layout.tsx` drops the Saira Condensed font so Inter carries everything. Every component is then recolored via a single deterministic **Global Recolor Map** (below), with structural rewrites where the "emergency" motif (`HazardStripe`, `Glow`, pulsing `LiveStatus`) is removed and copy is calmed.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19.2.4, Tailwind CSS v4 (`@import "tailwindcss"` + `@theme`), TypeScript, Vitest + Testing Library.

## Global Constraints

- **Next.js 16 is not the Next.js you know.** Per `AGENTS.md`, before writing code that touches any Next API (`next/font`, `next/image`, `next/link`, route handlers, `metadata`), read the relevant guide in `node_modules/next/dist/docs/`. This redesign changes styling/copy only — do **not** introduce new Next API patterns.
- **One accent rule.** Trust-blue `#1D6FE0` is the only saturated color. No second accent hue, no gradient text.
- **Body-text floor.** Paragraph copy uses `var(--color-body)` (`#475467`); `var(--color-muted)` is for labels/captions only.
- **Call-first stays the law.** The blue `CallButton` remains the dominant CTA on every surface; the contact form stays secondary.
- **Accessibility is load-bearing.** Keep the `prefers-reduced-motion` block in `globals.css`, keep visible focus rings on every interactive element (`ring-[var(--color-accent)]` + `ring-offset-[var(--color-page)]`), keep all `aria-*`, `role`, alt text, and semantic landmarks. Target WCAG 2.2 AA.
- **Tests must stay green.** `npm test` (26 tests) passes after every task. Tests assert phone links, nav hrefs, the "24/7" string, the tagline ("living room"), and service headings — all preserved.
- **The font utility `font-display` no longer exists** after Task 1 (its token is removed). Every `font-display` class must be deleted as files are touched. Inter is the default; use `font-semibold`/`font-bold` for weight.

### Global Recolor Map

Apply these exact literal replacements in every file as it is touched. This is the single source of truth for recoloring; tasks below only call out *structural* and *copy* changes on top of it.

| Old literal (class or value) | New literal |
|---|---|
| `bg-midnight` / `bg-[var(--color-midnight)]` | `bg-[var(--color-page)]` |
| `bg-ink` / `bg-[var(--color-ink)]` (section background) | `bg-[var(--color-surface)]` |
| `bg-steel` / `bg-[var(--color-steel)]` | `bg-[var(--color-card)]` |
| `text-[var(--color-frost)]` | `text-[var(--color-heading)]` |
| `text-[var(--color-frost-dim)]` | `text-[var(--color-body)]` |
| `text-[var(--color-slate-muted)]` | `text-[var(--color-muted)]` |
| `text-[var(--color-gold)]` | `text-[var(--color-accent)]` |
| `bg-[var(--color-gold)]` / `bg-gold` | `bg-[var(--color-accent)]` |
| `#FFB733` (amber hover) | `var(--color-accent-deep)` |
| `rgba(245,168,28,<a>)` used as **border/ring/divider** | `var(--color-border)` |
| `rgba(245,168,28,<a>)` used as **accent fill/emphasis** | `var(--color-accent)` |
| `rgba(5,8,14,<a>)` used as **overlay/scrim** | `rgba(16,32,63,<a>)` |
| `var(--color-signal)` | error red `#D92D20` (form errors only) |
| `font-display` (class) | *(delete the class)* |
| `rounded-sm` / `rounded-[3px]` | `rounded-md` |
| `rounded-[4px]` | `rounded-lg` |
| `rounded-[6px]` | `rounded-xl` |
| `ring-offset-[var(--color-midnight)]` / `-ink` / `-steel` | `ring-offset-[var(--color-page)]` |

Removed components (delete file + all imports/usages): `HazardStripe`, `Glow`, `TreadDivider`. Renamed component: `LiveStatus` → `AvailabilityBadge` (calm, non-pulsing).

---

## Task 1: Foundation — tokens, keyframes, font

**Files:**
- Modify: `src/app/globals.css` (full replace)
- Modify: `src/app/layout.tsx:2`, `:9-10`, `:19`

**Interfaces:**
- Produces: CSS custom properties `--color-page`, `--color-surface`, `--color-border`, `--color-heading`, `--color-body`, `--color-muted`, `--color-accent`, `--color-accent-deep`, `--color-accent-soft`, `--color-footer`, `--color-footer-fg`, `--font-sans`; Tailwind utilities generated from them (`bg-page`, `text-heading`, `bg-accent`, etc.). Keyframe `fadeUp` and the `.reveal` classes survive; `goldPulse`/`livePulse`/`beamSweep` are gone.

- [ ] **Step 1: Replace `globals.css` entirely**

```css
@import "tailwindcss";

/* ════════════════════════════════════════════════════════════════════════════
   GOLDEN NORTH — "Clean & Trustworthy" light design system
   A white canvas, one trust-blue accent, Inter throughout. Friendly and easy
   to read; the phone call is still the loudest action on every surface.
   ════════════════════════════════════════════════════════════════════════════ */

@theme {
  /* ── Surfaces ── */
  --color-page: #FFFFFF;        /* base page background                       */
  --color-surface: #F4F6F9;     /* alternating bands, quiet panels            */
  --color-card: #FFFFFF;        /* raised cards (with border + soft shadow)   */
  --color-border: #E2E8F0;      /* hairlines, card edges, dividers            */

  /* ── Text ── */
  --color-heading: #16202E;     /* headings + primary text                    */
  --color-body: #475467;        /* body copy (AA on white & surface)          */
  --color-muted: #697586;       /* labels, captions, metadata                 */

  /* ── The one voice: trust blue ── */
  --color-accent: #1D6FE0;      /* CTAs, links, emphasis                      */
  --color-accent-deep: #1657B0; /* hover / pressed                            */
  --color-accent-soft: #EAF2FD; /* tinted backgrounds, the calm CTA band      */

  /* ── Footer anchor (one grounded dark block) ── */
  --color-footer: #10243F;
  --color-footer-fg: #D6E2F0;

  /* ── Type: Inter carries everything ── */
  --font-sans: var(--font-inter), system-ui, sans-serif;
}

/* ── Semantic, non-color tokens ── */
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

  --z-base: 0;
  --z-sticky: 50;
  --z-mobilebar: 40;
  --z-overlay: 60;
  --z-modal: 70;
  --z-toast: 80;
}

/* ── Base ── */
body {
  background-color: var(--color-page);
  color: var(--color-body);
}

h1, h2, h3 {
  color: var(--color-heading);
  letter-spacing: -0.01em;
  text-wrap: balance;
}

p { text-wrap: pretty; }

::selection {
  background: var(--color-accent);
  color: #FFFFFF;
}

/* ── Motion ──────────────────────────────────────────────────────────────────
   Only one gentle reveal remains. The element is fully visible by default; the
   Reveal client component adds is-armed/is-in to play a soft fade-up once in
   view. If JS never runs, content stays visible. Suppressed under
   prefers-reduced-motion below. */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal { opacity: 1; }
.reveal.is-armed { opacity: 0; }
.reveal.is-armed.is-in {
  animation: fadeUp 0.7s var(--ease-out-expo) both;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .reveal, .reveal.is-armed { opacity: 1 !important; transform: none !important; }
}
```

- [ ] **Step 2: Drop Saira Condensed from `layout.tsx`**

Replace lines 2 and 9–10:

```tsx
import { Inter } from "next/font/google";
```

```tsx
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
```

Replace the `<html>` tag (line 19):

```tsx
    <html lang="en" className={inter.variable}>
```

- [ ] **Step 3: Run the test suite**

Run: `npm test`
Expected: PASS (26 tests). Components still reference removed tokens at this point but tests assert content/links, not computed color, so they pass.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: light-theme tokens + Inter-only font foundation"
```

---

## Task 2: Button + CallButton

**Files:**
- Modify: `src/components/ui/Button.tsx` (full replace)
- Test: `src/components/ui/__tests__/Button.test.tsx` (unchanged — must still pass)

**Interfaces:**
- Produces: `Button` with `variant?: "primary" | "ghost"` (the old `onLight`/`solidInk` variants are removed), `size?: "md" | "lg"`. `CallButton` with `{ className?, size?, compact? }` — the `tone` prop is removed. Consumers must not pass `tone`.

- [ ] **Step 1: Replace `Button.tsx` entirely**

```tsx
"use client";

import Link from "next/link";
import { BUSINESS, telHref } from "@/lib/business";

export type ButtonVariant = "primary" | "ghost";
export type ButtonSize = "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} style={{ flexShrink: 0 }}>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

// Friendly rounded button. Primary = solid blue; ghost = bordered, clearly secondary.
const base = [
  "group/btn inline-flex items-center justify-center gap-2.5",
  "font-semibold leading-none rounded-lg select-none cursor-pointer",
  "transition-[transform,box-shadow,background-color,color,border-color] duration-200",
  "[transition-timing-function:var(--ease-out-quart)]",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]",
].join(" ");

const sizeMap: Record<ButtonSize, string> = {
  md: "text-sm px-5 py-3",
  lg: "text-base px-7 py-4",
};

// Primary: white-on-blue. AA: white on #1D6FE0 ≈ 4.7:1.
const primaryStyles = [
  "bg-[var(--color-accent)] text-white shadow-sm",
  "hover:bg-[var(--color-accent-deep)] hover:-translate-y-0.5 hover:shadow-md",
  "active:translate-y-0",
].join(" ");

// Ghost: bordered white card; never competes with primary.
const ghostStyles = [
  "bg-white text-[var(--color-accent)] border border-[var(--color-border)]",
  "hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]",
].join(" ");

const variantMap: Record<ButtonVariant, string> = {
  primary: primaryStyles,
  ghost: ghostStyles,
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className = "",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${sizeMap[size]} ${variantMap[variant]} ${className}`.trim();

  if (href) {
    if (/^(tel:|mailto:|https?:)/.test(href)) {
      return (
        <a href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

// CallButton — call-first law: always the primary (blue) button on its surface.
export function CallButton({
  className,
  size = "md",
  compact = false,
}: {
  className?: string;
  size?: ButtonSize;
  compact?: boolean;
}) {
  return (
    <Button
      variant="primary"
      size={size}
      href={telHref}
      aria-label={`Call Golden North at ${BUSINESS.phoneDisplay}`}
      className={className}
    >
      <PhoneIcon className="transition-transform duration-200 group-hover/btn:-rotate-12" />
      {compact ? (
        <>
          <span className="sm:hidden">Call</span>
          <span className="hidden sm:inline">Call {BUSINESS.phoneDisplay}</span>
        </>
      ) : (
        <>Call {BUSINESS.phoneDisplay}</>
      )}
    </Button>
  );
}
```

- [ ] **Step 2: Run the button tests**

Run: `npm test -- Button`
Expected: PASS (tel link + phone text + ghost link).

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "feat: blue light-theme Button + CallButton (drop tone variants)"
```

---

## Task 3: Replace LiveStatus with AvailabilityBadge; delete emergency primitives

**Files:**
- Create: `src/components/ui/AvailabilityBadge.tsx`
- Delete: `src/components/ui/LiveStatus.tsx`, `src/components/ui/HazardStripe.tsx`, `src/components/ui/Glow.tsx`, `src/components/ui/TreadDivider.tsx`

**Interfaces:**
- Produces: `AvailabilityBadge` with `{ className?, variant?: "badge" | "line", label? }`. `badge` renders `BUSINESS.hours` ("Open 24/7"); `line` renders "Available 24/7 · We come to you". Keeps `role="status"` and a static (non-pulsing) accent dot.
- Consumes: nothing. Replaces all `LiveStatus` imports in Tasks 5, 6, 9, 11.

- [ ] **Step 1: Create `AvailabilityBadge.tsx`**

```tsx
// ─── AvailabilityBadge ────────────────────────────────────────────────────────
// A calm "we're open" cue: a small solid accent dot + label. No pulse, no alarm.
// role="status" exposes it to assistive tech; the dot is decorative.

import { BUSINESS } from "@/lib/business";

interface AvailabilityBadgeProps {
  className?: string;
  /** "badge" = compact (header). "line" = larger, with the friendly sub-label. */
  variant?: "badge" | "line";
  label?: string;
}

export function AvailabilityBadge({ className = "", variant = "badge", label }: AvailabilityBadgeProps) {
  const text = label ?? (variant === "line" ? "Available 24/7 · We come to you" : BUSINESS.hours);

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      role="status"
      aria-label={`Service status: ${text}`}
    >
      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
      <span
        className={
          variant === "line"
            ? "font-semibold text-[var(--color-accent)] text-sm"
            : "font-medium text-[var(--color-muted)] text-xs"
        }
      >
        {text}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Delete the emergency primitives**

```bash
git rm src/components/ui/LiveStatus.tsx src/components/ui/HazardStripe.tsx src/components/ui/Glow.tsx src/components/ui/TreadDivider.tsx
```

- [ ] **Step 3: Verify nothing else imports the deleted files yet**

Run: `npx grep -rn "LiveStatus\|HazardStripe\|Glow\|TreadDivider" src` (or use ripgrep/editor search)
Expected: matches only in files handled by later tasks (Header, Footer, MobileCallBar, Hero, CTABand, PageHeader, services/[slug]/page, contact/page). These are fixed in Tasks 5–11. Do **not** run the build yet (it would fail on those stale imports until Tasks 5–11 land).

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/AvailabilityBadge.tsx
git commit -m "feat: calm AvailabilityBadge; remove hazard/glow/tread primitives"
```

---

## Task 4: Photo + StatStrip

**Files:**
- Modify: `src/components/ui/Photo.tsx` (full replace)
- Modify: `src/components/ui/StatStrip.tsx` (full replace)

**Interfaces:**
- Produces: `Photo` (same props: `src, alt, ratio?, className?, sizes?, priority?, overlay?, static?`) — light ring, full-color image, navy overlay gradient. `StatStrip` (same props: `items, className?`) — white stat cells on a hairline grid.

- [ ] **Step 1: Replace `Photo.tsx`**

```tsx
import Image from "next/image";

// ─── Photo ────────────────────────────────────────────────────────────────────
// One cohesive treatment for the real brand photo set: object-cover into a fixed
// aspect box, a thin neutral ring, an optional navy gradient at the base for
// overlaid text, and a gentle zoom on hover. Full color (light theme).

interface PhotoProps {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  overlay?: boolean;
  static?: boolean;
}

export function Photo({
  src,
  alt,
  ratio = "4 / 3",
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  overlay = false,
  static: isStatic = false,
}: PhotoProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-[var(--color-surface)] ring-1 ring-[var(--color-border)] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={
          "object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] " +
          (isStatic ? "" : "group-hover:scale-[1.04]")
        }
      />
      {overlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[rgba(16,32,63,0.75)] via-[rgba(16,32,63,0.1)] to-transparent"
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Replace `StatStrip.tsx`**

```tsx
// ─── StatStrip ────────────────────────────────────────────────────────────────
// A row of headline facts. Each stat is a white cell topped by a short accent
// tick, big value, quiet label. dt-before-dd keeps valid <dl> semantics;
// order is handled by the markup order.

export interface StatItem {
  label: string;
  value: string;
}

interface StatStripProps {
  items: StatItem[];
  className?: string;
}

export function StatStrip({ items, className = "" }: StatStripProps) {
  return (
    <dl className={`grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[var(--color-border)] md:grid-cols-4 ${className}`}>
      {items.map((item, i) => (
        <div key={i} className="bg-[var(--color-card)] px-5 py-6 sm:px-7 sm:py-8">
          <span aria-hidden="true" className="mb-3 block h-1 w-8 rounded-full bg-[var(--color-accent)]" />
          <dd className="text-3xl font-bold leading-none text-[var(--color-heading)] tabular-nums sm:text-4xl">
            {item.value}
          </dd>
          <dt className="mt-2 text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/Photo.tsx src/components/ui/StatStrip.tsx
git commit -m "feat: light-theme Photo + StatStrip"
```

---

## Task 5: Shared chrome — Header, Footer, MobileCallBar

**Files:**
- Modify: `src/components/layout/Header.tsx` (full replace)
- Modify: `src/components/layout/Footer.tsx` (full replace)
- Modify: `src/components/layout/MobileCallBar.tsx` (full replace)
- Test: `src/components/layout/__tests__/Header.test.tsx` (unchanged — must still pass)

**Interfaces:**
- Consumes: `CallButton` (Task 2), `AvailabilityBadge` (Task 3).
- The Header test requires: a `link` named `/call/i` with `href="tel:+14165585915"`, the text `/24\/7/i` present, and nav links to `/services`, `/gallery`, `/contact`. All preserved below.

- [ ] **Step 1: Replace `Header.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { CallButton } from "@/components/ui/Button";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { BUSINESS } from "@/lib/business";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

// North-star mark — a simple nod to "Golden North". No animation.
function NorthStar() {
  return (
    <span aria-hidden="true" className="text-[var(--color-accent)] text-xl leading-none select-none">
      ✦
    </span>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" focusable="false" width="22" height="22" viewBox="0 0 20 20" fill="currentColor">
      {open ? (
        <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
      ) : (
        <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
      )}
    </svg>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
// Clean white sticky bar with a hairline border and a soft shadow. Call-first:
// the blue CallButton shows at every breakpoint (compact on mobile).
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="sticky top-0 border-b border-[var(--color-border)] bg-white/90 shadow-sm backdrop-blur-md"
      style={{ zIndex: "var(--z-sticky)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center gap-3 sm:gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
          aria-label="Golden North — home"
        >
          <NorthStar />
          <span className="font-bold tracking-tight text-[var(--color-heading)] text-base leading-none">
            {BUSINESS.shortName}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 ml-6" aria-label="Primary navigation">
          {NAV.filter((n) => n.href !== "/").map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-[var(--color-body)] hover:text-[var(--color-accent)] rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-page)]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <div className="hidden lg:block">
            <AvailabilityBadge />
          </div>
          <CallButton compact />
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-[var(--color-heading)] hover:text-[var(--color-accent)] rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-5"
      >
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="text-base font-medium text-[var(--color-body)] hover:text-[var(--color-accent)] px-2 py-3 border-b border-[var(--color-border)] last:border-0 rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-surface)]"
            >
              {label}
            </Link>
          ))}
        </nav>
        {menuOpen && (
          <div className="mt-4">
            <AvailabilityBadge variant="line" />
          </div>
        )}
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Replace `Footer.tsx`**

```tsx
// Footer — the one grounded dark anchor at the bottom of a light page. The phone
// number is the loudest element here too; the footer is a last-chance CTA.

import Link from "next/link";
import { BUSINESS, telHref, mailHref } from "@/lib/business";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

function TikTokIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.62a8.26 8.26 0 0 0 4.83 1.55V6.72a4.85 4.85 0 0 1-1.06-.03z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-footer)] text-[var(--color-footer-fg)]" aria-label="Site footer">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between pb-10 border-b border-white/15">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="text-[var(--color-accent)] text-lg">✦</span>
              <p className="font-bold tracking-tight text-white text-base">{BUSINESS.name}</p>
            </div>
            <div className="space-y-2 text-sm text-[var(--color-footer-fg)]">
              <p>
                <a
                  href={mailHref}
                  className="hover:text-white rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-footer)]"
                >
                  {BUSINESS.email}
                </a>
              </p>
              <p className="text-white/60">{BUSINESS.areaServed}</p>
              <AvailabilityBadge />
            </div>
            <blockquote className="max-w-xs pt-1">
              <p className="text-white/60 text-sm italic leading-relaxed">&ldquo;{BUSINESS.tagline}&rdquo;</p>
            </blockquote>
          </div>

          <div className="lg:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55 mb-2">
              One call. We come to you.
            </p>
            <a
              href={telHref}
              className="inline-block font-bold tracking-tight text-white leading-none rounded-md transition-colors duration-150 hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-footer)]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
              aria-label={`Call Golden North at ${BUSINESS.phoneDisplay}`}
            >
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-white/70 hover:text-white rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-footer)]"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a href={BUSINESS.socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Golden North on TikTok (opens in new tab)" className="text-white/60 hover:text-white rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-footer)]">
              <TikTokIcon />
            </a>
            <a href={BUSINESS.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Golden North on Instagram (opens in new tab)" className="text-white/60 hover:text-white rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-footer)]">
              <InstagramIcon />
            </a>
          </div>

          <p className="text-white/55 text-xs">&copy; {year} {BUSINESS.name}</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Replace `MobileCallBar.tsx`**

```tsx
// MobileCallBar — fixed bottom strip, mobile only (<md). The call-first law made
// physical. White with a hairline top border + soft shadow; safe-area padding
// clears notched iPhones.

import { CallButton } from "@/components/ui/Button";

export function MobileCallBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 border-t border-[var(--color-border)] bg-white"
      style={{
        zIndex: "var(--z-mobilebar)",
        paddingBottom: "env(safe-area-inset-bottom)",
        boxShadow: "0 -8px 24px -12px rgba(16,32,63,0.25)",
      }}
    >
      <div className="px-4 py-3">
        <CallButton className="w-full" />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run the header tests**

Run: `npm test -- Header`
Expected: PASS (call link, "24/7" text via AvailabilityBadge, nav links).

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/Footer.tsx src/components/layout/MobileCallBar.tsx
git commit -m "feat: light-theme Header, Footer, MobileCallBar"
```

---

## Task 6: Hero

**Files:**
- Modify: `src/components/sections/Hero.tsx` (full replace)
- Test: `src/components/sections/__tests__/Hero.test.tsx` (unchanged — must still pass)

**Interfaces:**
- Consumes: `Photo`, `AvailabilityBadge`, `CallButton`, `Button`, `BUSINESS`.
- Hero test requires: a `link` named `/call/i` with the tel href, and the tagline text `/living room/i` present. Both preserved.

- [ ] **Step 1: Replace `Hero.tsx`**

```tsx
// ─── Hero ─────────────────────────────────────────────────────────────────────
// Clean, friendly hero on white. One clear promise — "We come to you." — a calm
// availability badge, simple at-a-glance chips, the call-first CTA, and the real
// photo of the van and tech. No glow, no hazard stripes, no alarm.

import { Photo } from "@/components/ui/Photo";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { CallButton, Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/business";

const CHIPS = ["24/7", "GTA-wide", "No tow needed"] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-page)]" aria-label="Hero — Golden North Mobile Tire Services">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
          {/* Text column */}
          <div>
            <AvailabilityBadge variant="line" className="mb-7" />

            <h1
              className="font-bold leading-[1.04] text-[var(--color-heading)]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}
            >
              We come <span className="text-[var(--color-accent)]">to you.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-body)]">
              Mobile tire change, new &amp; used tires, battery and roadside help — at your
              driveway, lot, or roadside, anywhere in the GTA. {BUSINESS.tagline}
            </p>

            {/* At-a-glance chips */}
            <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="At a glance">
              {CHIPS.map((chip, i) => (
                <li
                  key={chip}
                  className={
                    "text-xs font-semibold px-3 py-1.5 rounded-full " +
                    (i === 0
                      ? "bg-[var(--color-accent)] text-white"
                      : "text-[var(--color-body)] bg-[var(--color-accent-soft)]")
                  }
                >
                  {chip}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <CallButton size="lg" />
              <Button variant="ghost" size="lg" href="/services" aria-label="See all services">
                See services
              </Button>
            </div>

            <p className="mt-7 text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">
              {BUSINESS.areaServed}
            </p>
          </div>

          {/* Image column */}
          <div className="relative">
            <Photo
              src="/photos/hero-night-tech.webp"
              alt="A Golden North technician in a hi-vis vest balancing a wheel beside the yellow service van"
              ratio="3 / 4"
              priority
              overlay
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="shadow-[0_20px_50px_-20px_rgba(16,32,63,0.35)]"
            />
            <div className="absolute left-4 bottom-4 right-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 backdrop-blur-sm shadow-sm">
                <AvailabilityBadge label="Serving the GTA" />
              </span>
              <span className="hidden rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-[var(--color-body)] backdrop-blur-sm shadow-sm sm:inline">
                The real Golden North van
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run the hero tests**

Run: `npm test -- Hero`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: light, calm Hero (no glow/hazard)"
```

---

## Task 7: Home sections — page.tsx, ServiceRow, HowItWorks, CoverageMap

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/sections/ServiceRow.tsx` (full replace)
- Modify: `src/components/sections/HowItWorks.tsx` (full replace)
- Modify: `src/components/sections/CoverageMap.tsx` (full replace)
- Test: `src/app/__tests__/home.test.tsx` (unchanged — must still pass: four service headings)

**Interfaces:**
- Consumes: `StatStrip`, `Photo`, `Reveal`, `Button`, `CallButton`, `Hero`, `ServiceRow`, `HowItWorks`, `CoverageMap`, `CTABand` (Task 8).

- [ ] **Step 1: Recolor `page.tsx`**

Apply the Global Recolor Map. Specifically: the trust bar section `bg-midnight` → `bg-[var(--color-surface)]`; the services section `bg-midnight` → `bg-[var(--color-page)]`; the gallery-teaser section `bg-[var(--color-ink)]` → `bg-[var(--color-surface)]`. In headings, `text-[var(--color-frost)]` → `text-[var(--color-heading)]`, `text-[var(--color-gold)]` → `text-[var(--color-accent)]`, body `text-[var(--color-frost-dim)]` → `text-[var(--color-body)]`, and delete `font-display`. In the gallery teaser `Link`, change `rounded-[4px]` → `rounded-lg` and the focus offset `ring-offset-[var(--color-ink)]` → `ring-offset-[var(--color-page)]`. Resulting headings read e.g.:

```tsx
            <h2 id="services-heading" className="font-bold text-4xl leading-[1.05] text-[var(--color-heading)] lg:text-5xl">
              Four ways we get you <span className="text-[var(--color-accent)]">rolling.</span>
            </h2>
```

- [ ] **Step 2: Replace `ServiceRow.tsx`**

```tsx
// ─── ServiceRow ───────────────────────────────────────────────────────────────
// Each service is a full editorial row: a sequence numeral (01–04), a real photo,
// the name, what it is, a few inclusions, and the call-first CTA. Rows alternate
// the photo side so the page reads as a varied list, not a repeating template.

import { CallButton, Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICE_PHOTO } from "@/lib/photos";
import type { Service } from "@/lib/services";

interface ServiceRowProps {
  service: Service;
  index: number;
}

export function ServiceRow({ service, index }: ServiceRowProps) {
  const photo = SERVICE_PHOTO[service.slug];
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  return (
    <Reveal as="article" className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14" aria-label={service.name}>
      <div className={flip ? "lg:order-1" : "lg:order-2"}>
        <Photo src={photo.src} alt={photo.alt} ratio="4 / 3" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>

      <div className={flip ? "lg:order-2" : "lg:order-1"}>
        <div className="flex items-baseline gap-4">
          <span
            aria-hidden="true"
            className="font-bold leading-none text-[var(--color-accent)]/30 tabular-nums"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
          >
            {num}
          </span>
          <h3 className="font-bold leading-tight text-[var(--color-heading)] text-3xl lg:text-4xl">
            {service.name}
          </h3>
        </div>

        <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--color-body)]">
          {service.tagline}
        </p>

        <ul className="mt-5 space-y-2" aria-label={`What's included in ${service.name}`}>
          {service.included.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--color-muted)]">
              <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <CallButton />
          <Button variant="ghost" href={`/services/${service.slug}`} aria-label={`Learn more about ${service.name}`}>
            Learn more
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
```

- [ ] **Step 3: Replace `HowItWorks.tsx`**

```tsx
// ─── HowItWorks ───────────────────────────────────────────────────────────────
// Three steps that ARE a real sequence (call → we head out → done). Big accent
// numerals on white cards over a quiet surface band. Copy is plain and friendly.

import { Reveal } from "@/components/ui/Reveal";
import { BUSINESS } from "@/lib/business";

export function HowItWorks() {
  const steps = [
    { n: "01", heading: "Call.", body: `One number — ${BUSINESS.phoneDisplay} — connects you straight to us. No app, no queue, no chatbot. We answer.` },
    { n: "02", heading: "We head out.", body: "Tell us where you are. We come to your driveway, lot, or roadside — anywhere in the GTA, day or night." },
    { n: "03", heading: "Back on the road.", body: "We handle it on the spot — tire changed, battery swapped, car assessed — and you carry on with your day." },
  ] as const;

  return (
    <section className="bg-[var(--color-surface)] py-24 lg:py-32" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 max-w-xl">
          <h2 id="how-it-works-heading" className="font-bold text-4xl leading-[1.05] text-[var(--color-heading)] lg:text-5xl">
            Three steps to <span className="text-[var(--color-accent)]">moving again.</span>
          </h2>
        </div>

        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 90} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-7 shadow-sm lg:p-9">
              <span
                aria-hidden="true"
                className="block font-bold leading-none text-[var(--color-accent)] tabular-nums"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
              >
                {step.n}
              </span>
              <h3 className="mt-4 font-bold text-2xl text-[var(--color-heading)]">{step.heading}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-body)]">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Replace `CoverageMap.tsx`**

```tsx
// ─── CoverageMap ──────────────────────────────────────────────────────────────
// A friendly schematic GTA service-area diagram on a white card — not a real map.
// The SVG is decorative (aria-hidden); the text list of areas is the accessible
// equivalent.

import { BUSINESS } from "@/lib/business";

const AREAS = [
  "Toronto", "Mississauga", "Brampton", "Vaughan", "Markham",
  "Scarborough", "Etobicoke", "North York", "Oakville", "Richmond Hill",
] as const;

export function CoverageMap() {
  return (
    <section className="bg-[var(--color-page)] py-24 lg:py-32" aria-labelledby="coverage-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <h2 id="coverage-heading" className="font-bold text-4xl leading-[1.05] text-[var(--color-heading)] lg:text-5xl">
              The whole GTA, <span className="text-[var(--color-accent)]">not just downtown.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-body)]">
              {BUSINESS.shortName} covers the full {BUSINESS.areaServed}. A Brampton driveway,
              a Markham condo garage, the shoulder of the 401 through Mississauga — one call
              reaches us.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5" aria-label="Areas served">
              {AREAS.map((area) => (
                <li key={area} className="flex items-center gap-2.5 text-sm text-[var(--color-body)]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm sm:p-6" aria-hidden="true">
            <svg viewBox="0 0 540 360" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <defs>
                <radialGradient id="cov-glow" cx="50%" cy="55%" r="60%">
                  <stop offset="0%" stopColor="rgba(29,111,224,0.12)" />
                  <stop offset="100%" stopColor="rgba(29,111,224,0)" />
                </radialGradient>
              </defs>

              <rect x="0" y="0" width="540" height="360" fill="url(#cov-glow)" />

              <polygon
                points="40,270 70,120 140,60 280,40 400,55 490,110 510,230 480,300 40,305"
                stroke="rgba(29,111,224,0.55)"
                strokeWidth="2"
                fill="rgba(29,111,224,0.08)"
                strokeLinejoin="round"
              />

              <path d="M 20 330 Q 270 322 520 330" stroke="rgba(105,117,134,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="3 7" />
              <text x="40" y="346" fontSize="10" fill="rgba(105,117,134,0.7)" fontFamily="system-ui" letterSpacing="1">Lake Ontario</text>

              {[
                { d: "M50,220 L490,212", label: "401", lx: 486, ly: 207, anchor: "end" as const },
                { d: "M150,95 L150,305", label: "427", lx: 154, ly: 108, anchor: "start" as const },
                { d: "M330,85 L342,305", label: "DVP", lx: 346, ly: 98, anchor: "start" as const },
                { d: "M220,45 L214,210", label: "400", lx: 224, ly: 56, anchor: "start" as const },
              ].map((h) => (
                <g key={h.label}>
                  <path d={h.d} stroke="rgba(29,111,224,0.3)" strokeWidth="1.5" strokeDasharray="9 5" fill="none" />
                  <text x={h.lx} y={h.ly} fontSize="11" fontWeight="bold" fill="rgba(29,111,224,0.8)" fontFamily="system-ui" textAnchor={h.anchor}>
                    {h.label}
                  </text>
                </g>
              ))}

              {[
                { x: 118, y: 175, r: 4, name: "Brampton", strong: false },
                { x: 158, y: 248, r: 4, name: "Mississauga", strong: false },
                { x: 270, y: 250, r: 6, name: "Toronto", strong: true },
                { x: 392, y: 230, r: 4, name: "Scarborough", strong: false },
                { x: 277, y: 158, r: 4, name: "North York", strong: false },
                { x: 412, y: 138, r: 4, name: "Markham", strong: false },
                { x: 196, y: 103, r: 4, name: "Vaughan", strong: false },
              ].map((z) => (
                <g key={z.name}>
                  <circle cx={z.x} cy={z.y} r={z.r} fill="#1D6FE0" opacity={z.strong ? 1 : 0.7} />
                  {z.strong && <circle cx={z.x} cy={z.y} r={z.r + 5} fill="none" stroke="#1D6FE0" strokeWidth="1.5" opacity="0.5" />}
                  <text x={z.x + z.r + 5} y={z.y + 4} fontSize={z.strong ? 13 : 11} fontWeight={z.strong ? "bold" : "normal"} fill={z.strong ? "#16202E" : "rgba(22,32,46,0.75)"} fontFamily="system-ui">
                    {z.name}
                  </text>
                </g>
              ))}

              <text x="270" y="295" fontSize="11" fill="rgba(29,111,224,0.8)" fontFamily="system-ui" textAnchor="middle" letterSpacing="4" fontWeight="bold">FULL COVERAGE</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run tests**

Run: `npm test -- home`
Expected: PASS (four service headings).

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/components/sections/ServiceRow.tsx src/components/sections/HowItWorks.tsx src/components/sections/CoverageMap.tsx
git commit -m "feat: light-theme home sections (services, how-it-works, coverage)"
```

---

## Task 8: CTABand

**Files:**
- Modify: `src/components/sections/CTABand.tsx` (full replace)

**Interfaces:**
- Consumes: `CallButton` (primary, no `tone` prop), `BUSINESS`. Removes the `HazardStripe` import.

- [ ] **Step 1: Replace `CTABand.tsx`**

```tsx
// ─── CTABand ──────────────────────────────────────────────────────────────────
// A calm, accent-tinted band (not a loud full-blue slab). Friendly closing
// nudge to call; the blue CallButton stays the loudest object. Prop-light so any
// page can drop it in.

import { CallButton } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/business";

export function CTABand() {
  return (
    <section className="bg-[var(--color-accent-soft)]" aria-labelledby="cta-band-heading">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
          24/7 · GTA-wide · we come to you
        </p>

        <h2
          id="cta-band-heading"
          className="font-bold leading-[1.05] text-[var(--color-heading)]"
          style={{ fontSize: "clamp(2.25rem, 6vw, 3.5rem)", letterSpacing: "-0.02em" }}
        >
          Ready when you are.
        </h2>

        <p className="mx-auto mt-5 mb-9 max-w-md text-lg leading-relaxed text-[var(--color-body)]">
          One call to {BUSINESS.shortName} gets a technician moving to your location — no app,
          no queue, no tow. Day, night, weekends, holidays.
        </p>

        <div className="flex justify-center">
          <CallButton size="lg" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/CTABand.tsx
git commit -m "feat: calm accent-tinted CTABand"
```

---

## Task 9: PageHeader + Services pages

**Files:**
- Modify: `src/components/sections/PageHeader.tsx` (full replace)
- Modify: `src/app/services/page.tsx`
- Modify: `src/app/services/[slug]/page.tsx` (full replace)
- Test: `src/app/services/__tests__/services.test.tsx`, `src/app/services/[slug]/__tests__/detail.test.tsx` (unchanged — must still pass)

**Interfaces:**
- Consumes: `AvailabilityBadge`, `CallButton`, `Button`, `Photo`, `CTABand`. Removes `Glow`/`HazardStripe`/`LiveStatus` imports from `PageHeader` and the service detail page.

- [ ] **Step 1: Replace `PageHeader.tsx`**

```tsx
// ─── PageHeader ───────────────────────────────────────────────────────────────
// Compact, consistent header for inner pages (services, gallery, contact). A
// quiet surface band with an optional availability line. No glow, no hazard.

import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";

interface PageHeaderProps {
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  showStatus?: boolean;
}

export function PageHeader({ title, intro, children, showStatus = true }: PageHeaderProps) {
  return (
    <section className="bg-[var(--color-surface)] border-b border-[var(--color-border)]" aria-labelledby="page-heading">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {showStatus && <AvailabilityBadge variant="line" className="mb-6" />}
        <h1
          id="page-heading"
          className="max-w-3xl font-bold leading-[1.05] text-[var(--color-heading)]"
          style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)", letterSpacing: "-0.02em" }}
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-body)]">{intro}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap items-center gap-4">{children}</div>}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Recolor `services/page.tsx`**

Apply the Global Recolor Map. The `PageHeader` `title` span `text-[var(--color-gold)]` → `text-[var(--color-accent)]`; the services section `bg-midnight` → `bg-[var(--color-page)]`. No other structural change.

- [ ] **Step 3: Replace `services/[slug]/page.tsx`**

```tsx
// ─── Service detail (/services/[slug]) ────────────────────────────────────────
// Statically generated SEO page per service: focused hero with the real photo,
// what's included, when you need it, an accessible <details> FAQ (with FAQPage
// JSON-LD), cross-links, and the CTA band. Light theme, no emergency motifs.

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { SERVICES, SERVICE_SLUGS, getService } from "@/lib/services";
import { SERVICE_PHOTO } from "@/lib/photos";
import { ServiceJsonLd, FaqJsonLd } from "@/lib/jsonld";
import { CallButton, Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { CTABand } from "@/components/sections/CTABand";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.name,
    description: service.summary.slice(0, 155),
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const photo = SERVICE_PHOTO[service.slug];
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <ServiceJsonLd service={service} />
      <FaqJsonLd faqs={service.faqs} />

      {/* Focused header */}
      <section className="bg-[var(--color-surface)] border-b border-[var(--color-border)]" aria-labelledby="service-heading">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-10 lg:py-24">
          <div>
            <AvailabilityBadge variant="line" className="mb-5" />
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-accent)]">
              Mobile service · GTA-wide
            </p>
            <h1
              id="service-heading"
              className="font-bold leading-[1.05] text-[var(--color-heading)]"
              style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
            >
              {service.name}
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--color-body)]">
              {service.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CallButton size="lg" />
              <Button variant="ghost" size="lg" href="/contact" aria-label="Contact Golden North">
                Contact us
              </Button>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <Photo src={photo.src} alt={photo.alt} ratio="4 / 3" priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* Summary + lists */}
      <section className="bg-[var(--color-page)] py-20 lg:py-28" aria-label={`About ${service.name}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="max-w-3xl text-xl leading-relaxed text-[var(--color-body)]">
            {service.summary}
          </p>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-bold text-2xl text-[var(--color-heading)]">What&rsquo;s included</h2>
              <ul className="mt-6 space-y-3" aria-label={`What's included in ${service.name}`}>
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-[var(--color-body)]">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-2xl text-[var(--color-heading)]">When you need it</h2>
              <ul className="mt-6 space-y-4" aria-label={`When you need ${service.name}`}>
                {service.whenYouNeed.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-4 text-base leading-relaxed text-[var(--color-body)] shadow-sm"
                  >
                    <span aria-hidden="true" className="mt-1 shrink-0 font-bold text-[var(--color-accent)]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--color-surface)] py-20 lg:py-28" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 id="faq-heading" className="font-bold text-3xl text-[var(--color-heading)] lg:text-4xl">
            {service.shortName} questions, answered.
          </h2>
          <div className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {service.faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-lg text-[var(--color-heading)] marker:content-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span aria-hidden="true" className="shrink-0 text-[var(--color-accent)] text-xl transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-body)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="bg-[var(--color-page)] py-20 lg:py-24" aria-labelledby="other-services-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 id="other-services-heading" className="mb-8 font-bold text-2xl text-[var(--color-heading)]">
            We also handle
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-5 shadow-sm transition-colors duration-200 hover:border-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
                aria-label={`${s.name} — view service`}
              >
                <span className="font-bold text-lg text-[var(--color-heading)]">{s.shortName}</span>
                <span aria-hidden="true" className="text-[var(--color-accent)] transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
```

- [ ] **Step 4: Run the services tests**

Run: `npm test -- services detail`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/PageHeader.tsx src/app/services/page.tsx "src/app/services/[slug]/page.tsx"
git commit -m "feat: light-theme PageHeader + services pages"
```

---

## Task 10: Gallery page + GalleryGrid

**Files:**
- Modify: `src/app/gallery/page.tsx`
- Modify: `src/components/sections/GalleryGrid.tsx`
- Test: `src/app/gallery/__tests__/gallery.test.tsx` (unchanged — must still pass)

**Interfaces:**
- Consumes: `PageHeader`, `GalleryGrid`, `CTABand`, `Photo`.

- [ ] **Step 1: Recolor `gallery/page.tsx`**

Apply the Global Recolor Map: the `PageHeader` title span `text-[var(--color-gold)]` → `text-[var(--color-accent)]`; the gallery section `bg-midnight` → `bg-[var(--color-page)]`.

- [ ] **Step 2: Recolor `GalleryGrid.tsx`**

Apply the Global Recolor Map to the tile button (`rounded-[4px]` → `rounded-lg`, focus offset → `ring-offset-[var(--color-page)]`, ring → `ring-[var(--color-accent)]`) and the lightbox. For the lightbox specifically:
- Backdrop `backgroundColor: "rgba(5,8,14,0.95)"` → `rgba(16,32,63,0.92)`.
- Close/prev/next controls: `text-[var(--color-frost)]` → `text-white`, hover `text-[var(--color-gold)]` → `text-[var(--color-accent)]`, border `border-[rgba(245,168,28,0.3)]` → `border-white/30`, focus ring → `ring-[var(--color-accent)]`, `rounded-[4px]` → `rounded-lg`.
- Image `rounded-[4px]` → `rounded-lg`.
- `figcaption` `text-[var(--color-frost-dim)]` → `text-white/80`.

The lightbox stays dark on purpose (photos read best on a dark scrim); only the brand color shifts amber→blue.

- [ ] **Step 3: Run the gallery test**

Run: `npm test -- gallery`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/gallery/page.tsx src/components/sections/GalleryGrid.tsx
git commit -m "feat: light-theme gallery page + grid"
```

---

## Task 11: Contact page + ContactForm

**Files:**
- Modify: `src/app/contact/page.tsx` (full replace)
- Modify: `src/components/contact/ContactForm.tsx` (full replace)
- Test: `src/app/contact/__tests__/contact.test.tsx`, `src/components/contact/__tests__/ContactForm.test.tsx` (unchanged — must still pass)

**Interfaces:**
- Consumes: `CallButton`, `AvailabilityBadge`, `ContactForm`, `CoverageMap`, `BUSINESS`, `mailHref`. Removes `Glow`/`HazardStripe`/`LiveStatus` imports.

- [ ] **Step 1: Replace `contact/page.tsx`**

```tsx
// ─── Contact (/contact) ───────────────────────────────────────────────────────
// Call-first: the headline action is the phone call. The message form is the
// secondary option. Service-area map at the bottom. No CTA band — the page IS
// the CTA. Light theme, no emergency motifs.

import { buildMetadata } from "@/lib/seo";
import { BUSINESS, mailHref } from "@/lib/business";
import { CallButton } from "@/components/ui/Button";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { ContactForm } from "@/components/contact/ContactForm";
import { CoverageMap } from "@/components/sections/CoverageMap";

export const metadata = buildMetadata({
  title: "Contact — Call 24/7",
  description: `Reach ${BUSINESS.name} 24/7 for mobile tire and roadside help across the ${BUSINESS.areaServed}. Call ${BUSINESS.phoneDisplay} — or send a message.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* Call-first header */}
      <section className="bg-[var(--color-surface)] border-b border-[var(--color-border)]" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <AvailabilityBadge variant="line" className="mb-6" />
          <h1
            id="contact-heading"
            className="max-w-3xl font-bold leading-[1.05] text-[var(--color-heading)]"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)", letterSpacing: "-0.02em" }}
          >
            We pick up. <span className="text-[var(--color-accent)]">Day or night.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-body)]">
            The fastest way to get help moving is to call. One number, a real person, no queue —
            then we&rsquo;re on our way to you.
          </p>

          <div className="mt-9">
            <CallButton size="lg" />
          </div>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-xl bg-[var(--color-border)] sm:grid-cols-3">
            <div className="bg-[var(--color-card)] px-6 py-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">Hours</dt>
              <dd className="mt-2 text-xl font-bold text-[var(--color-heading)]">{BUSINESS.hours}</dd>
              <p className="mt-1 text-sm text-[var(--color-body)]">Day, night, weekends, holidays.</p>
            </div>
            <div className="bg-[var(--color-card)] px-6 py-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">Email</dt>
              <dd className="mt-2">
                <a
                  href={mailHref}
                  className="text-lg font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-deep)] rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-card)]"
                  aria-label={`Email Golden North at ${BUSINESS.email}`}
                >
                  {BUSINESS.email}
                </a>
              </dd>
            </div>
            <div className="bg-[var(--color-card)] px-6 py-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">Service area</dt>
              <dd className="mt-2 text-lg font-bold text-[var(--color-heading)]">{BUSINESS.areaServed}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Secondary: message form */}
      <section className="bg-[var(--color-page)] py-20 lg:py-28" aria-labelledby="message-heading">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 id="message-heading" className="font-bold text-3xl text-[var(--color-heading)] lg:text-4xl">
            Prefer to message us?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-body)]">
            Not urgent? Send the details and we&rsquo;ll get back to you. For anything time-sensitive,
            calling is always faster.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>

      <CoverageMap />
    </>
  );
}
```

- [ ] **Step 2: Replace `ContactForm.tsx`**

```tsx
"use client";

// ─── ContactForm ──────────────────────────────────────────────────────────────
// The secondary contact path (the phone call is primary). Labeled fields, POST
// to /api/contact, and loading / success / error states announced via aria-live.

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-base text-[var(--color-heading)] placeholder:text-[var(--color-muted)] focus:outline-none focus-visible:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]";
const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-body)]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-accent-soft)] p-6 text-center">
        <p className="text-xl font-bold text-[var(--color-accent)]">Thanks — message received.</p>
        <p className="mt-2 text-sm text-[var(--color-body)]">
          We&rsquo;ll reply shortly. Need help right now? Calling is always fastest.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>Name</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelCls}>Phone</label>
          <input id="cf-phone" name="phone" type="tel" required autoComplete="tel" className={field} placeholder="(416) 000-0000" />
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className={labelCls}>Email <span className="text-[var(--color-muted)] normal-case tracking-normal">(optional)</span></label>
        <input id="cf-email" name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" />
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>Message</label>
        <textarea id="cf-message" name="message" required rows={4} className={field} placeholder="What do you need, and where are you?" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-[#D92D20]">
          Something went wrong. Please try again — or just call us at (416) 558-5915.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group/btn inline-flex items-center justify-center gap-2.5 rounded-lg bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-[transform,box-shadow,background-color] duration-200 [transition-timing-function:var(--ease-out-quart)] hover:-translate-y-0.5 hover:bg-[var(--color-accent-deep)] hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p aria-live="polite" className="sr-only">
        {status === "sending" ? "Sending your message" : ""}
      </p>
    </form>
  );
}
```

- [ ] **Step 3: Run the contact tests**

Run: `npm test -- contact ContactForm`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/contact/page.tsx src/components/contact/ContactForm.tsx
git commit -m "feat: light-theme contact page + form"
```

---

## Task 12: Docs + full verification

**Files:**
- Modify: `DESIGN.md` (full replace)
- Modify: `PRODUCT.md` (Brand Personality section)

**Interfaces:**
- Consumes: nothing. Final gate for the whole redesign.

- [ ] **Step 1: Replace `DESIGN.md`**

Replace the entire file with the new system. Frontmatter and body must document: colors (`page #FFFFFF`, `surface #F4F6F9`, `border #E2E8F0`, `heading #16202E`, `body #475467`, `muted #697586`, `accent #1D6FE0`, `accent-deep #1657B0`, `accent-soft #EAF2FD`, `footer #10243F`); typography (Inter for headings + body, normal width, weights for hierarchy); components (blue rounded buttons, white cards with soft shadow + hairline border, `AvailabilityBadge`, light inputs with blue focus); elevation (soft real shadows, friendly radii 8–12px); and Do/Don't (one blue accent; calm not loud; body uses `--color-body`; no hazard/glow/emergency motifs). Use:

```markdown
---
name: Golden North Mobile Tire Services
description: Clean & Trustworthy — a white canvas, one trust-blue accent, Inter throughout.
colors:
  page: "#FFFFFF"
  surface: "#F4F6F9"
  border: "#E2E8F0"
  heading: "#16202E"
  body: "#475467"
  muted: "#697586"
  accent: "#1D6FE0"
  accent-deep: "#1657B0"
  accent-soft: "#EAF2FD"
  footer: "#10243F"
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
```

- [ ] **Step 2: Calm the `PRODUCT.md` Brand Personality**

In `PRODUCT.md`, replace the "Brand Personality" section's identity line and emotional goal so it no longer mandates the dark "Midnight & Gold / urgent rescue" system. Change the personality to: "**Friendly · dependable · clear.** A helpful local service brand. Direct, plain language ('We come to you'), calm and reassuring. The identity is the **Clean & Trustworthy** system (white canvas, one trust-blue accent, Inter type): approachable and easy to navigate." Keep the product facts (services, GTA, call-first goal) unchanged. Leave the rest of the file intact.

- [ ] **Step 3: Verify no stale tokens or removed components remain**

Run (ripgrep or editor search across `src`):
`--color-gold`, `--color-midnight`, `--color-steel`, `--color-frost`, `--color-ink`, `--color-signal`, `font-display`, `bg-midnight`, `bg-ink`, `bg-steel`, `HazardStripe`, `Glow`, `LiveStatus`, `TreadDivider`, `245,168,28`, `#FFB733`
Expected: **zero matches** in `src/`. Fix any that remain (apply the Global Recolor Map).

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: PASS — all 26 tests.

- [ ] **Step 5: Production build**

Run: `npm run build`
Expected: build succeeds with no errors (no unknown-utility or missing-token failures).

- [ ] **Step 6: Visual check**

Run: `npm run dev`, open `http://localhost:3000`, and spot-check home, `/services`, a service detail, `/gallery` (open the lightbox), and `/contact` (submit the form). Confirm: white background, blue accents, Inter type, no hazard stripes / glow / pulsing, readable contrast, visible focus rings on tab.

- [ ] **Step 7: Commit**

```bash
git add DESIGN.md PRODUCT.md
git commit -m "docs: rewrite DESIGN.md + calm PRODUCT.md brand for light theme"
```

---

## Self-Review (completed by plan author)

- **Spec coverage:** colors §3.1 → Task 1; typography §3.2 → Tasks 1, all components; elevation §3.3 → Tasks 2/4 + cards throughout; removals §4 (HazardStripe/Glow/LiveStatus/TreadDivider, calmed copy) → Tasks 3, 6, 7, 8, 9, 11; components §5 → Tasks 2,4,5,7,8,9,10,11; pages §6 (whole site) → Tasks 5–11; conversion priority §7 → CallButton primary everywhere; testing & docs §8 → every task runs tests, Task 12 rewrites DESIGN.md/PRODUCT.md + build; out-of-scope §9 → no Next API, data, SEO, or API logic changes. All covered.
- **Placeholder scan:** no TBD/TODO; the only non-full-code steps (page.tsx recolors, services/gallery recolors, GalleryGrid) reference the deterministic Global Recolor Map with exact literal→literal mappings, not vague guidance.
- **Type consistency:** `Button` variants reduced to `"primary" | "ghost"` (Task 2) and every consumer uses only those; `CallButton` `tone` prop removed in Task 2 and its only caller (CTABand) updated in Task 8; `LiveStatus` → `AvailabilityBadge` with matching `{ variant, label, className }` signature used consistently in Tasks 5,6,9,11.
