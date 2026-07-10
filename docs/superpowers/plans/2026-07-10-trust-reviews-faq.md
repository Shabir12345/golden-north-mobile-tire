# Trust Signals, Live Reviews, FAQ Expansion & Locations Trim — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen conversion/SEO for Google-Ads-driven traffic by removing two service-area cities, adding site-wide professional trust signals, extending the auto-updating Google reviews widget to service pages, and adding FAQ sections (with schema) to the home, services, and contact pages.

**Architecture:** Data-driven, reusable presentational components. Trust claims live in `src/lib/trust.ts` and render through a single `TrustBadges` component. FAQ content lives in `src/lib/faqs.ts` and renders through a single `FaqSection` component (which also emits `FaqJsonLd`); the existing service-detail accordion is refactored to use it. The existing `ReviewsWidget` is reused as-is on more pages.

**Tech Stack:** Next.js (App Router, see `AGENTS.md` — read `node_modules/next/dist/docs/` before Next-specific work), TypeScript, Tailwind CSS v4 (CSS variables theme), Vitest + Testing Library (`jsdom`, `globals: true`, jest-dom matchers via `vitest.setup.ts`).

## Global Constraints

- Brand name is one word: **GoldenNorth** (full name "GoldenNorth Mobile Tire Services").
- Only these trust claims are confirmed true and may be displayed: **Licensed & insured**, **Upfront pricing — no membership**, **Warranty-backed parts** (general — no durations/terms), **24/7 · GTA-wide**. Do NOT display a satisfaction guarantee or any star-rating number.
- No hardcoded rating and no `aggregateRating` JSON-LD. The Featurable widget is the only reviews source.
- No content may name **Mississauga** or **Brampton**.
- FAQ content per page must be **distinct** (no duplicate FAQ sets across URLs).
- Follow existing theme tokens (`var(--color-*)`) and section rhythm. Match surrounding code style.
- Phone is `(416) 558-5915` / `tel:+14165585915` — always via `BUSINESS`/`CallButton`, never hardcode new copies.

---

### Task 1: Remove Mississauga & Brampton

**Files:**
- Modify: `src/lib/services.ts` (summary line ~27; keyword lines ~44–45, ~101–102, ~155–156, ~208–209; FAQ answers ~72 and ~215)
- Modify: `src/components/sections/CoverageMap.tsx:10-12` (AREAS) and `:25-26` (prose)
- Modify: `src/components/sections/HowItWorks.tsx:12` (step 02 prose)
- Test: `src/lib/__tests__/services.test.ts` (add guard test)

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing new (content-only edits).

- [ ] **Step 1: Write the failing guard test**

Add to `src/lib/__tests__/services.test.ts` inside the `describe("services", …)` block:

```ts
  it("names no removed service-area cities", () => {
    const blob = JSON.stringify(SERVICES);
    expect(blob).not.toMatch(/Mississauga|Brampton/);
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/services.test.ts`
Expected: FAIL — the new test matches "Mississauga"/"Brampton" still present in `SERVICES`.

- [ ] **Step 3: Edit `src/lib/services.ts` — remove both cities**

- In the `tire-change` `summary`, replace `before the first Brampton snowfall or doing a spring changeover in Scarborough` with `before the first GTA snowfall or doing a spring changeover in Scarborough`.
- Remove these keyword array entries (delete the whole line for each):
  - `"flat tire change Mississauga",`
  - `"mobile tire swap Brampton",`
  - `"mobile tire installation Mississauga",`
  - `"affordable winter tires Brampton",`
  - `"dead battery help Mississauga",`
  - `"on-site car battery change Brampton",`
  - `"jump start service Mississauga",`
  - `"emergency roadside Brampton",`

  After removal each service must still have ≥5 keywords. `tire-change` drops from 7→5 (OK). For the other three services, verify count ≥5 after removing their one/two entries; if any falls below 5, add a replacement keyword using a remaining city, e.g. for `tires` add `"mobile tire installation Vaughan",`; for `battery` add `"dead battery help Scarborough",`; for `roadside` add `"emergency roadside Etobicoke",`. (Only add if needed to stay ≥5.)
- In the tire-change coverage FAQ answer (`"We cover Toronto, Mississauga, Brampton, Vaughan, Markham, Scarborough, Etobicoke, and surrounding areas…"`) replace with:
  `"We cover Toronto, Vaughan, Markham, Scarborough, Etobicoke, North York, Oakville, Richmond Hill, and surrounding areas across the GTA. Call us to confirm availability at your address."`
- In the roadside response-time FAQ answer (`"…we aim to reach most Toronto, Mississauga, and Brampton addresses within 45–90 minutes…"`) replace the city list with `"…we aim to reach most Toronto and GTA addresses within 45–90 minutes…"` (keep the rest of the sentence, including the phone number, intact).

- [ ] **Step 4: Edit `src/components/sections/CoverageMap.tsx`**

Replace the `AREAS` array (lines 9–12) with:

```tsx
const AREAS = [
  "Toronto", "Vaughan", "Markham", "Scarborough",
  "Etobicoke", "North York", "Oakville", "Richmond Hill",
] as const;
```

Replace the prose sentence (lines 25–26, the part after `{BUSINESS.areaServed}. `) so it reads:

```tsx
              {BUSINESS.areaServed}. A Vaughan driveway, a Markham condo garage, the shoulder of
              the 401 through Etobicoke — one call reaches us.
```

- [ ] **Step 5: Edit `src/components/sections/HowItWorks.tsx:12`**

Change `a Mississauga office lot` to `a Markham office lot` in the step 02 `body` string.

- [ ] **Step 6: Run tests to verify they pass**

Run: `npx vitest run src/lib/__tests__/services.test.ts`
Expected: PASS (including the new guard test).

- [ ] **Step 7: Grep the whole content surface for stragglers**

Run: `grep -rin "mississauga\|brampton" src content`
Expected: no output.

- [ ] **Step 8: Commit**

```bash
git add src/lib/services.ts src/components/sections/CoverageMap.tsx src/components/sections/HowItWorks.tsx src/lib/__tests__/services.test.ts
git commit -m "feat: remove Mississauga & Brampton from coverage and SEO copy"
```

---

### Task 2: Trust signals data + `TrustBadges` component

**Files:**
- Create: `src/lib/trust.ts`
- Create: `src/components/ui/TrustBadges.tsx`
- Test: `src/components/ui/__tests__/TrustBadges.test.tsx`

**Interfaces:**
- Produces:
  - `src/lib/trust.ts`: `interface TrustSignal { label: string; sub: string; icon: "shield" | "tag" | "check" | "clock" }` and `export const TRUST_SIGNALS: TrustSignal[]`.
  - `src/components/ui/TrustBadges.tsx`: `export function TrustBadges(props: { variant?: "row" | "compact"; onDark?: boolean; className?: string }): JSX.Element`.

- [ ] **Step 1: Write the failing test**

Create `src/components/ui/__tests__/TrustBadges.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrustBadges } from "@/components/ui/TrustBadges";

describe("TrustBadges", () => {
  it("renders every confirmed trust claim", () => {
    render(<TrustBadges />);
    expect(screen.getByText("Licensed & insured")).toBeInTheDocument();
    expect(screen.getByText("Upfront pricing")).toBeInTheDocument();
    expect(screen.getByText("Warranty-backed parts")).toBeInTheDocument();
    expect(screen.getByText(/24\/7/)).toBeInTheDocument();
  });

  it("does not render unconfirmed claims", () => {
    render(<TrustBadges />);
    expect(screen.queryByText(/satisfaction guarantee/i)).toBeNull();
    expect(screen.queryByText(/[0-9]\.[0-9]\s*stars?/i)).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ui/__tests__/TrustBadges.test.tsx`
Expected: FAIL — cannot resolve `@/components/ui/TrustBadges`.

- [ ] **Step 3: Create `src/lib/trust.ts`**

```ts
// ─── Trust signals ────────────────────────────────────────────────────────────
// The single source of truth for the professional trust claims shown across the
// site. Every claim here has been confirmed true by the business. Do NOT add a
// satisfaction guarantee or any star-rating number.

export interface TrustSignal {
  /** Short badge label. */
  label: string;
  /** One-line supporting phrase (shown in the "row" variant). */
  sub: string;
  /** Which inline icon to render. */
  icon: "shield" | "tag" | "check" | "clock";
}

export const TRUST_SIGNALS: TrustSignal[] = [
  { label: "Licensed & insured", sub: "Professional, fully covered service", icon: "shield" },
  { label: "Upfront pricing", sub: "No membership, no hidden fees", icon: "tag" },
  { label: "Warranty-backed parts", sub: "Quality parts we stand behind", icon: "check" },
  { label: "24/7 · GTA-wide", sub: "We come to you, day or night", icon: "clock" },
];
```

- [ ] **Step 4: Create `src/components/ui/TrustBadges.tsx`**

```tsx
// ─── TrustBadges ──────────────────────────────────────────────────────────────
// Data-driven row of professional trust signals. "row" (default) shows an icon,
// label, and supporting line; "compact" shows a tight icon + label line for the
// footer. Icons are decorative (aria-hidden); labels carry the meaning.

import { TRUST_SIGNALS, type TrustSignal } from "@/lib/trust";

const ICON_PATHS: Record<TrustSignal["icon"], string> = {
  shield: "M12 2 4 5v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V5l-8-3Zm-1 13-3-3 1.4-1.4L11 12.2l4.6-4.6L17 9l-6 6Z",
  tag: "M2 12 12 2h8v8L10 20 2 12Zm14-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
  check: "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 11h5v-2h-3V6h-2v7Z",
};

function Icon({ name, className }: { name: TrustSignal["icon"]; className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

interface TrustBadgesProps {
  variant?: "row" | "compact";
  onDark?: boolean;
  className?: string;
}

export function TrustBadges({ variant = "row", onDark = false, className = "" }: TrustBadgesProps) {
  const iconColor = onDark ? "text-[var(--color-accent)]" : "text-[var(--color-accent-deep)]";
  const labelColor = onDark ? "text-[var(--color-on-navy)]" : "text-[var(--color-heading)]";
  const subColor = onDark ? "text-[var(--color-footer-fg)]" : "text-[var(--color-body)]";

  if (variant === "compact") {
    return (
      <ul
        className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}
        aria-label="Why drivers trust GoldenNorth"
      >
        {TRUST_SIGNALS.map((s) => (
          <li key={s.label} className="inline-flex items-center gap-2">
            <Icon name={s.icon} className={`h-4 w-4 shrink-0 ${iconColor}`} />
            <span className={`text-sm font-medium ${labelColor}`}>{s.label}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
      aria-label="Why drivers trust GoldenNorth"
    >
      {TRUST_SIGNALS.map((s) => (
        <li key={s.label} className="flex items-start gap-3">
          <Icon name={s.icon} className={`mt-0.5 h-6 w-6 shrink-0 ${iconColor}`} />
          <div>
            <p className={`font-bold ${labelColor}`}>{s.label}</p>
            <p className={`mt-0.5 text-sm leading-snug ${subColor}`}>{s.sub}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/ui/__tests__/TrustBadges.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/trust.ts src/components/ui/TrustBadges.tsx src/components/ui/__tests__/TrustBadges.test.tsx
git commit -m "feat: add data-driven TrustBadges component"
```

---

### Task 3: `FaqSection` component + FAQ content data

**Files:**
- Create: `src/lib/faqs.ts`
- Create: `src/components/sections/FaqSection.tsx`
- Test: `src/components/sections/__tests__/FaqSection.test.tsx`

**Interfaces:**
- Consumes: `FaqJsonLd` from `@/lib/jsonld` (existing: `FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] })`).
- Produces:
  - `src/lib/faqs.ts`: `type Faq = { q: string; a: string }` and `export const HOME_FAQS: Faq[]`, `export const SERVICES_FAQS: Faq[]`, `export const CONTACT_FAQS: Faq[]`.
  - `src/components/sections/FaqSection.tsx`: `export function FaqSection(props: { heading: string; faqs: { q: string; a: string }[]; id?: string; emitJsonLd?: boolean; className?: string }): JSX.Element`.

- [ ] **Step 1: Write the failing test**

Create `src/components/sections/__tests__/FaqSection.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FaqSection } from "@/components/sections/FaqSection";

const FAQS = [
  { q: "Do you come to me?", a: "Yes, anywhere in the GTA." },
  { q: "Is there a membership?", a: "No membership, ever." },
];

describe("FaqSection", () => {
  it("renders the heading and every question", () => {
    render(<FaqSection heading="Common questions" faqs={FAQS} />);
    expect(screen.getByRole("heading", { name: /common questions/i })).toBeInTheDocument();
    expect(screen.getByText("Do you come to me?")).toBeInTheDocument();
    expect(screen.getByText("Is there a membership?")).toBeInTheDocument();
  });

  it("emits FAQPage JSON-LD when emitJsonLd is set", () => {
    const { container } = render(<FaqSection heading="Q" faqs={FAQS} emitJsonLd />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.innerHTML);
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity).toHaveLength(2);
  });

  it("omits JSON-LD by default", () => {
    const { container } = render(<FaqSection heading="Q" faqs={FAQS} />);
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/__tests__/FaqSection.test.tsx`
Expected: FAIL — cannot resolve `@/components/sections/FaqSection`.

- [ ] **Step 3: Create `src/components/sections/FaqSection.tsx`**

Markup mirrors the current service-detail accordion (same classes/behavior) so the refactor in Task 4 is a true no-op visually.

```tsx
// ─── FaqSection ───────────────────────────────────────────────────────────────
// Reusable accessible FAQ accordion. Renders a <details>/<summary> list and,
// when emitJsonLd is set, a matching FAQPage JSON-LD block. Keep each page's
// FAQ set distinct so Google doesn't see duplicate FAQ schema across URLs.

import { FaqJsonLd } from "@/lib/jsonld";

interface FaqSectionProps {
  heading: string;
  faqs: { q: string; a: string }[];
  id?: string;
  emitJsonLd?: boolean;
  className?: string;
}

export function FaqSection({
  heading,
  faqs,
  id = "faq-heading",
  emitJsonLd = false,
  className = "bg-[var(--color-surface)] py-20 lg:py-28",
}: FaqSectionProps) {
  return (
    <section className={className} aria-labelledby={id}>
      {emitJsonLd && <FaqJsonLd faqs={faqs} />}
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <h2 id={id} className="font-bold text-3xl text-[var(--color-heading)] lg:text-4xl">
          {heading}
        </h2>
        <div className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-lg text-[var(--color-heading)] marker:content-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span aria-hidden="true" className="shrink-0 text-[var(--color-accent-deep)] text-xl transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-body)]">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `src/lib/faqs.ts`**

All answers use only confirmed claims and name no removed cities.

```ts
// ─── FAQ content ──────────────────────────────────────────────────────────────
// Page-level FAQ sets. Each set is DISTINCT so FAQ schema is not duplicated
// across URLs. Answers reflect only confirmed-true claims (licensed & insured,
// upfront/no-membership pricing, warranty-backed parts) and name no removed
// service-area cities.

export interface Faq {
  q: string;
  a: string;
}

export const HOME_FAQS: Faq[] = [
  {
    q: "Do you really come to me, or do I bring the car to a shop?",
    a: "We're fully mobile — we come to your driveway, condo garage, office lot, or the roadside anywhere in the GTA. There's no shop to visit and no tow required; we do the work on the spot.",
  },
  {
    q: "How much does it cost, and is there a membership?",
    a: "No membership and no annual fee — you pay per call for the help you actually use. Pricing is upfront: tell us your vehicle, location, and what's wrong at (416) 558-5915 and we'll give you a straight quote before we head out, with no hidden fees.",
  },
  {
    q: "How fast can you get to me?",
    a: "It depends on your location and current demand, but we'll always give you an honest ETA when you call. We run 24/7 — days, nights, weekends, and holidays.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. GoldenNorth is a licensed and insured mobile service, and every job is handled by a professional technician.",
  },
  {
    q: "What areas do you cover?",
    a: "We serve Toronto and across the Greater Toronto Area — Vaughan, Markham, Scarborough, Etobicoke, North York, Oakville, Richmond Hill, and surrounding areas. Call to confirm your address.",
  },
];

export const SERVICES_FAQS: Faq[] = [
  {
    q: "I'm not sure which service I need — can you help?",
    a: "Yes. Call (416) 558-5915 and describe what happened; we'll tell you whether it's a tire change, a new or used tire, a battery, or general roadside help, and give you an upfront quote.",
  },
  {
    q: "Do I have to bring my car to a shop for any of these?",
    a: "No. Every service we offer is mobile — tire changes, new and used tires, battery replacement, and roadside assistance all happen at your location across the GTA.",
  },
  {
    q: "Do you carry my tire size?",
    a: "We stock the sizes most common on GTA roads, from compact sedans to full-size pickups, in touring, all-season, winter, and all-terrain options. Tell us your vehicle and we'll confirm before we come out.",
  },
  {
    q: "Do the parts you install come with a warranty?",
    a: "Yes — the tires and batteries we install are warranty-backed, and we'll go over the details with you at the time of service.",
  },
  {
    q: "Is there a membership or annual fee for any service?",
    a: "Never. Everything we do is pay-per-call with upfront pricing — no membership card, no annual fee, and no coverage limits.",
  },
];

export const CONTACT_FAQS: Faq[] = [
  {
    q: "What information should I have ready when I call?",
    a: "Your location, your vehicle's year, make, and model, and a quick description of the problem. That's enough for us to give you an accurate quote and head your way.",
  },
  {
    q: "What are your hours?",
    a: "We're open 24/7 — day, night, weekends, and holidays. If you need help now, calling is always the fastest way to reach us.",
  },
  {
    q: "Do you charge just to come out?",
    a: "Pricing is upfront and per-call, with no membership or hidden fees. We'll confirm the full cost with you before any work begins.",
  },
  {
    q: "Can I book ahead for a seasonal tire swap?",
    a: "Absolutely. Call or send a message with your preferred timing and location, and we'll get you scheduled.",
  },
];
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/sections/__tests__/FaqSection.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/faqs.ts src/components/sections/FaqSection.tsx src/components/sections/__tests__/FaqSection.test.tsx
git commit -m "feat: add reusable FaqSection component and page FAQ content"
```

---

### Task 4: Refactor service detail page (FaqSection + TrustBadges + reviews)

**Files:**
- Modify: `src/app/services/[slug]/page.tsx`
- Test: `src/app/services/[slug]/__tests__/detail.test.tsx` (existing tests must stay green; add a trust assertion)

**Interfaces:**
- Consumes: `FaqSection` (Task 3), `TrustBadges` (Task 2), `ReviewsWidget` (existing), `FaqJsonLd` (still imported for nothing else — remove if now unused).

- [ ] **Step 1: Update imports in `src/app/services/[slug]/page.tsx`**

- Remove `FaqJsonLd` from the `@/lib/jsonld` import (keep `ServiceJsonLd`, `BreadcrumbJsonLd`); `FaqSection` now emits the FAQ schema.
- Add:

```tsx
import { FaqSection } from "@/components/sections/FaqSection";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { ReviewsWidget } from "@/components/sections/ReviewsWidget";
```

- Remove the `<FaqJsonLd faqs={service.faqs} />` line near the top of the returned JSX (schema moves into `FaqSection`).

- [ ] **Step 2: Add a TrustBadges row in the summary section**

In the "Summary + lists" section, immediately after the closing `</p>` of `{service.summary}` (before the `<div className="mt-14 grid …">`), insert:

```tsx
          <TrustBadges className="mt-10 border-t border-[var(--color-border)] pt-8" />
```

- [ ] **Step 3: Replace the inline FAQ `<section>` with `FaqSection`**

Delete the entire `{/* FAQ */}` `<section>…</section>` block (the one with `id="faq-heading"` and the inline `<details>` map) and replace it with:

```tsx
      {/* FAQ */}
      <FaqSection heading={`${service.shortName} questions, answered.`} faqs={service.faqs} emitJsonLd />
```

- [ ] **Step 4: Add the reviews widget before the CTA band**

Immediately before the final `<CTABand />`, insert:

```tsx
      <ReviewsWidget />
```

- [ ] **Step 5: Add a trust assertion to the detail test**

In `src/app/services/[slug]/__tests__/detail.test.tsx`, add inside the `describe`:

```tsx
  it("shows professional trust signals", async () => {
    render(await Page({ params: Promise.resolve({ slug: "battery" }) }));
    expect(screen.getByText("Licensed & insured")).toBeInTheDocument();
    expect(screen.getByText("Warranty-backed parts")).toBeInTheDocument();
  });
```

- [ ] **Step 6: Run the detail tests**

Run: `npx vitest run "src/app/services/[slug]/__tests__/detail.test.tsx"`
Expected: PASS — existing FAQ-question and call-CTA assertions still pass (FaqSection renders the same questions), plus the new trust assertion.

- [ ] **Step 7: Commit**

```bash
git add "src/app/services/[slug]/page.tsx" "src/app/services/[slug]/__tests__/detail.test.tsx"
git commit -m "refactor: service pages use FaqSection + add trust signals and reviews"
```

---

### Task 5: Home page — TrustBadges + FAQ

**Files:**
- Modify: `src/app/page.tsx`
- Test: `src/app/__tests__/home.test.tsx` (add assertions)

**Interfaces:**
- Consumes: `TrustBadges` (Task 2), `FaqSection` (Task 3), `HOME_FAQS` (Task 3).

- [ ] **Step 1: Add imports to `src/app/page.tsx`**

```tsx
import { TrustBadges } from "@/components/ui/TrustBadges";
import { FaqSection } from "@/components/sections/FaqSection";
import { HOME_FAQS } from "@/lib/faqs";
```

- [ ] **Step 2: Add TrustBadges into the existing trust bar**

Inside the `{/* Trust bar */}` `<section>`, immediately after the closing `</StatStrip … />` component's wrapping (after the `StatStrip` block, still inside `<div className="mx-auto max-w-7xl …">`), add:

```tsx
          <TrustBadges className="mt-10" />
```

(Result: the StatStrip row, then the trust badges row, in the same section.)

- [ ] **Step 3: Add the FAQ section before the CTA band**

Immediately before the final `<CTABand />`, insert:

```tsx
      <FaqSection heading="Questions drivers ask us" faqs={HOME_FAQS} emitJsonLd />
```

- [ ] **Step 4: Extend the home test**

Add to `src/app/__tests__/home.test.tsx` inside the `describe`:

```tsx
  it("shows trust signals and a FAQ section", () => {
    render(<Home />);
    expect(screen.getByText("Licensed & insured")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /questions drivers ask us/i })).toBeInTheDocument();
  });
```

- [ ] **Step 5: Run the home test**

Run: `npx vitest run src/app/__tests__/home.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/app/__tests__/home.test.tsx
git commit -m "feat: home page trust signals and FAQ section"
```

---

### Task 6: Services listing (FAQ) + Contact (TrustBadges + FAQ)

**Files:**
- Modify: `src/app/services/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Test: `src/app/contact/__tests__/contact.test.tsx` (add assertions)

**Interfaces:**
- Consumes: `TrustBadges` (Task 2), `FaqSection` + `SERVICES_FAQS` + `CONTACT_FAQS` (Task 3).

- [ ] **Step 1: Services listing — add FAQ before the CTA band**

In `src/app/services/page.tsx` add imports:

```tsx
import { FaqSection } from "@/components/sections/FaqSection";
import { SERVICES_FAQS } from "@/lib/faqs";
```

Immediately before the final `<CTABand />`, insert:

```tsx
      <FaqSection heading="Service questions, answered" faqs={SERVICES_FAQS} emitJsonLd />
```

- [ ] **Step 2: Contact — add imports**

In `src/app/contact/page.tsx` add:

```tsx
import { TrustBadges } from "@/components/ui/TrustBadges";
import { FaqSection } from "@/components/sections/FaqSection";
import { CONTACT_FAQS } from "@/lib/faqs";
```

- [ ] **Step 3: Contact — add a TrustBadges row under the header stats**

Inside the header `<section>`, immediately after the closing `</dl>` (the Hours/Email/Service-area grid), insert:

```tsx
          <TrustBadges onDark className="mt-10" />
```

(`onDark` because the header is navy.)

- [ ] **Step 4: Contact — add the FAQ section before `<CoverageMap />`**

Immediately before the final `<CoverageMap />`, insert:

```tsx
      <FaqSection heading="Before you call" faqs={CONTACT_FAQS} emitJsonLd />
```

- [ ] **Step 5: Extend the contact test**

Add to `src/app/contact/__tests__/contact.test.tsx` inside the `describe`:

```tsx
  it("shows trust signals and a FAQ section", () => {
    render(<ContactPage />);
    expect(screen.getByText("Licensed & insured")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /before you call/i })).toBeInTheDocument();
  });
```

- [ ] **Step 6: Run the contact test**

Run: `npx vitest run src/app/contact/__tests__/contact.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/app/services/page.tsx src/app/contact/page.tsx src/app/contact/__tests__/contact.test.tsx
git commit -m "feat: FAQ on services page, trust signals + FAQ on contact page"
```

---

### Task 7: Footer site-wide compact trust line

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Test: `src/components/layout/__tests__/` (add a small Footer test if one does not exist; otherwise extend)

**Interfaces:**
- Consumes: `TrustBadges` compact variant (Task 2).

- [ ] **Step 1: Read the footer to find the right insertion point**

Run: `sed -n '1,140p' src/components/layout/Footer.tsx`
Identify the main content container (the footer is dark navy — `--color-footer`). Pick a spot near the top of the footer body, above or below the primary link/columns block, inside the max-width container.

- [ ] **Step 2: Add the compact trust line**

Add the import at the top:

```tsx
import { TrustBadges } from "@/components/ui/TrustBadges";
```

Insert, inside the footer's max-width container at the chosen spot:

```tsx
        <TrustBadges variant="compact" onDark className="border-b border-white/10 pb-6 mb-8" />
```

(Adjust the border/margin classes to match the surrounding spacing; `onDark` for legibility on navy.)

- [ ] **Step 3: Write/extend the Footer test**

Create `src/components/layout/__tests__/Footer.test.tsx` if absent (otherwise add the `it` to the existing file):

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("shows the site-wide trust line", () => {
    render(<Footer />);
    expect(screen.getByText("Licensed & insured")).toBeInTheDocument();
    expect(screen.getByText("Upfront pricing")).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run the footer test**

Run: `npx vitest run src/components/layout/__tests__/Footer.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Footer.tsx src/components/layout/__tests__/Footer.test.tsx
git commit -m "feat: site-wide compact trust line in footer"
```

---

### Task 8: Full verification

**Files:** none (verification only).

- [ ] **Step 1: Run the entire test suite**

Run: `npm test`
Expected: all tests pass (previous count 41 + the new tests).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: build succeeds with no type errors and all routes generated.

- [ ] **Step 3: Final content guard**

Run: `grep -rin "mississauga\|brampton" src content`
Expected: no output.

- [ ] **Step 4: Manual smoke (optional but recommended)**

Run: `npm run dev`, then load `/`, `/services`, `/services/battery`, and `/contact`. Confirm: trust badges render, the FAQ accordions open/close, the reviews band appears (or cleanly collapses if the widget is empty), and no city names for the removed areas appear. Use the `verify` skill if available.
