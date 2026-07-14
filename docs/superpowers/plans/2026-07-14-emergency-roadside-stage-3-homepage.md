# Emergency Roadside Repositioning — Stage 3: Homepage Rebuild

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage as the emergency conversion path: new problem→solution hero with live-dispatch line, pulsing call CTA, and a live Google review badge (Featurable API); the 5-card service grid with sub-service pills; the three-tier animation system; reordered page flow.

**Architecture:** New `src/lib/reviews.ts` (server fetch, 1h revalidation, null on any failure) feeds a `ReviewBadge` server component. `ServiceGrid` + `ServiceIcon` replace `ServiceRow` on home and the services overview; `ServiceRow` is then deleted. Attention animations are new CSS keyframes in `globals.css`, all inside the existing reduced-motion guard's reach.

**Tech Stack:** Next.js 16 App Router (READ `node_modules/next/dist/docs/` re: server components, `fetch` caching/revalidate semantics — they differ from training data), Tailwind v4, Vitest.

**Prerequisite:** Stages 1–2 merged. Verify: `npm run build` shows 17 service routes.

**Spec:** `docs/superpowers/specs/2026-07-14-emergency-roadside-redesign-design.md`

## Global Constraints

- Same copy rules as Stages 1–2 (ETA phrase "in as little as 20–30 minutes"; pricing "fair, upfront price quoted on the call — no membership, no hidden fees"; banned: cheap/affordable/best/premier/#1; no dollar figures).
- **Animation rationing:** attention tier (call button pulse, live dot, review badge) repeats; everything else plays once. Max 3 attention anchors per screen. Everything must be inert under `prefers-reduced-motion` (the existing global override in `globals.css` already kills `animation`/`transition` — do not weaken it, and don't rely on JS-driven motion that bypasses it without a `matchMedia` check).
- **Review badge honesty:** render nothing unless the API returns a finite rating and a positive count. Never hardcode a rating or count anywhere.
- Contrast ≥ WCAG 2.2 AA on every new element (gold `--color-accent` text is only AA on navy; on light surfaces use `--color-accent-deep`).
- `npm run test` green before each commit; `npm run build` at the end.
- Commits end with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: Attention-tier animation CSS

**Files:**
- Modify: `src/app/globals.css` (add after the `.card-lift` block, BEFORE the `prefers-reduced-motion` block so the override still wins)

**Interfaces:**
- Produces: classes `.btn-pulse`, `.live-dot`, `.sweep-once` consumed by Tasks 2–5.

- [ ] **Step 1: Add the keyframes/classes**

```css
/* ── Attention tier (repeating — reserved for the 3 conversion anchors) ─────
   1. .btn-pulse  — soft gold pulse ring on primary call buttons (~3s loop)
   2. .live-dot   — breathing green dot for the 24/7 live-dispatch line
   Reassure tier (plays once):
   3. .sweep-once — single gold highlight sweep, triggered by adding .is-in
   All are killed by the prefers-reduced-motion override below. */

@keyframes pulseRing {
  0%   { box-shadow: 0 0 0 0 rgba(240, 165, 0, 0.45); }
  60%  { box-shadow: 0 0 0 14px rgba(240, 165, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(240, 165, 0, 0); }
}
.btn-pulse { animation: pulseRing 3s var(--ease-out-quart) 1.6s infinite; }

@keyframes dotBreathe {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.45; transform: scale(0.8); }
}
.live-dot {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background: #35C46F; /* green reads "live"; decorative — text carries meaning */
  animation: dotBreathe 2.4s ease-in-out infinite;
}

@keyframes sweepOnce {
  from { background-position: -120% 0; }
  to   { background-position: 220% 0; }
}
.sweep-once.is-in {
  background-image: linear-gradient(
    100deg,
    transparent 40%,
    color-mix(in srgb, var(--color-accent) 22%, transparent) 50%,
    transparent 60%
  );
  background-size: 220% 100%;
  background-repeat: no-repeat;
  animation: sweepOnce 1.2s var(--ease-out-quart) 1 both;
}
```

- [ ] **Step 2: Verify + commit**

Run: `npm run test` — Expected: PASS (CSS only).

```bash
git add src/app/globals.css
git commit -m "feat: attention-tier animation primitives (pulse, live dot, sweep)"
```

---

### Task 2: Live review stats (`src/lib/reviews.ts` + `ReviewBadge`)

**Files:**
- Create: `src/lib/reviews.ts`
- Create: `src/lib/__tests__/reviews.test.ts`
- Create: `src/components/ui/ReviewBadge.tsx`

**Interfaces:**
- Produces: `getReviewStats(): Promise<{ rating: number; count: number } | null>` and `<ReviewBadge onDark />` (async server component rendering `null` when stats are null). Consumed by the Hero (Task 3).

- [ ] **Step 0: Verify the live API shape (one-off, before coding)**

Run: `curl -s https://featurable.com/api/v1/widgets/98741542-19aa-4991-9281-32fab2ebcb3f | head -c 600`
Expected: JSON containing an average rating and a total review count. **Note the exact field names** (expected: `averageRating` and `totalReviewCount`; if they differ, use the real names below and in the tests).

- [ ] **Step 1: Failing tests** — `src/lib/__tests__/reviews.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from "vitest";
import { getReviewStats } from "@/lib/reviews";

afterEach(() => vi.unstubAllGlobals());

const ok = (body: unknown) =>
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => body }));

describe("getReviewStats", () => {
  it("returns rounded rating and count from the widget API", async () => {
    ok({ averageRating: 4.867, totalReviewCount: 87 });
    expect(await getReviewStats()).toEqual({ rating: 4.9, count: 87 });
  });
  it("returns null on HTTP failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    expect(await getReviewStats()).toBeNull();
  });
  it("returns null on malformed payloads and zero counts", async () => {
    ok({ something: "else" });
    expect(await getReviewStats()).toBeNull();
    ok({ averageRating: "n/a", totalReviewCount: 0 });
    expect(await getReviewStats()).toBeNull();
  });
  it("returns null when fetch throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    expect(await getReviewStats()).toBeNull();
  });
});
```

Run: `npm run test -- reviews` — Expected: FAIL (module missing).

- [ ] **Step 2: Implement `src/lib/reviews.ts`**

```ts
// ─── Live Google review stats ─────────────────────────────────────────────────
// Server-side fetch of the Featurable widget API (same widget that renders the
// homepage carousel). Revalidates hourly so the hero badge tracks the real
// Google rating/count. ANY failure returns null — the badge renders nothing
// rather than a wrong or stale-looking number.

const WIDGET_ID = "98741542-19aa-4991-9281-32fab2ebcb3f";
const API_URL = `https://featurable.com/api/v1/widgets/${WIDGET_ID}`;

export interface ReviewStats {
  rating: number; // e.g. 4.9 (one decimal)
  count: number;  // total Google reviews
}

export async function getReviewStats(): Promise<ReviewStats | null> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    const d = data as { averageRating?: unknown; totalReviewCount?: unknown };
    const rating = Number(d.averageRating);
    const count = Number(d.totalReviewCount);
    if (!Number.isFinite(rating) || rating <= 0 || rating > 5) return null;
    if (!Number.isFinite(count) || count <= 0) return null;
    return { rating: Math.round(rating * 10) / 10, count: Math.round(count) };
  } catch {
    return null;
  }
}
```

(If Step 0 revealed different field names, adjust `d.averageRating`/`d.totalReviewCount` and the test payloads to match reality.)

- [ ] **Step 3: Run tests**

Run: `npm run test -- reviews` — Expected: PASS.

- [ ] **Step 4: Implement `src/components/ui/ReviewBadge.tsx`** (server component — no `"use client"`):

```tsx
// ─── ReviewBadge ─────────────────────────────────────────────────────────────
// Live Google rating + count for the hero trust anchor. Data comes from
// getReviewStats(); when that's null this renders nothing — never a made-up
// number. Gentle one-time fade-in via the existing .reveal CSS is skipped:
// the badge is server-rendered and static; motion here is a single sweep.

import { getReviewStats } from "@/lib/reviews";

function Star({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}

export async function ReviewBadge({ onDark = false }: { onDark?: boolean }) {
  const stats = await getReviewStats();
  if (!stats) return null;

  const full = Math.round(stats.rating);
  return (
    <p
      className={`inline-flex items-center gap-2.5 text-sm font-semibold ${
        onDark ? "text-[var(--color-on-navy)]" : "text-[var(--color-body)]"
      }`}
      aria-label={`Rated ${stats.rating} out of 5 from ${stats.count} Google reviews`}
    >
      <span aria-hidden="true" className="flex items-center gap-0.5 text-[var(--color-accent)]">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={i < full ? "" : "opacity-30"} />
        ))}
      </span>
      <span aria-hidden="true">
        {stats.rating.toFixed(1)} · {stats.count} Google reviews
      </span>
    </p>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/reviews.ts src/lib/__tests__/reviews.test.ts src/components/ui/ReviewBadge.tsx
git commit -m "feat: live Google review stats via Featurable API + ReviewBadge"
```

---

### Task 3: Hero rebuild

**Files:**
- Rewrite: `src/components/sections/Hero.tsx`
- Modify: `src/components/sections/__tests__/Hero.test.tsx`

**Interfaces:**
- Consumes: `ReviewBadge` (Task 2), `.btn-pulse`/`.live-dot` (Task 1), `CallButton`, `Button`, `Photo`, `CompassRose`, `BUSINESS`.
- Produces: async server component `<Hero />` (page must `await`-render it naturally — it's a server component in a server page, no change needed to how it's imported).

- [ ] **Step 1: Failing tests** — update `Hero.test.tsx` (mock `getReviewStats` so the badge renders deterministically):

```tsx
vi.mock("@/lib/reviews", () => ({
  getReviewStats: vi.fn().mockResolvedValue({ rating: 4.9, count: 87 }),
}));

it("leads with the problem→solution headline and ETA", async () => {
  render(await Hero());
  const h1 = screen.getByRole("heading", { level: 1 });
  expect(h1).toHaveTextContent("Stranded in the GTA?");
  expect(h1).toHaveTextContent("in as little as 20–30 minutes");
});

it("shows the live-dispatch line and review badge", async () => {
  render(await Hero());
  expect(screen.getByText(/24\/7 emergency dispatch/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/4\.9 out of 5 from 87 google reviews/i)).toBeInTheDocument();
});
```

Run: `npm run test -- Hero` — Expected: FAIL.

- [ ] **Step 2: Rewrite `src/components/sections/Hero.tsx`**

```tsx
// ─── Hero ─────────────────────────────────────────────────────────────────────
// The emergency conversion stage. Problem→solution H1 with the ETA promise,
// a live-dispatch line (breathing dot), the pulsing gold call CTA, and the
// live Google review badge. Exactly three attention anchors move; nothing
// else in the hero animates. Navy stage + real van photo retained.

import { Photo } from "@/components/ui/Photo";
import { CallButton, Button } from "@/components/ui/Button";
import { CompassRose } from "@/components/ui/CompassRose";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { BUSINESS } from "@/lib/business";

export async function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)]" aria-label="Hero — 24/7 emergency roadside assistance">
      <CompassRose className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 text-[var(--color-accent)] opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14 lg:py-20">
          {/* Text column */}
          <div>
            {/* Attention anchor 1 — live dispatch */}
            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[var(--color-on-navy)]">
              <span className="live-dot" aria-hidden="true" />
              24/7 Emergency Dispatch — answering now
            </p>

            <h1 className="font-bold leading-[1.02] text-white" style={{ fontSize: "clamp(2.75rem, 6.5vw, 5rem)" }}>
              Stranded in the GTA?
              <span className="mt-3 block text-[var(--color-accent)]">
                We&rsquo;re on our way — in as little as 20–30 minutes.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-footer-fg)]">
              Flat tire, dead battery, locked out, out of gas, or a breakdown — one call sends a
              roadside technician to you, anywhere in Toronto &amp; the GTA. Fair price quoted
              before we roll — no membership, no hidden fees.
            </p>

            {/* Attention anchor 2 — the call */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <CallButton size="lg" className="btn-pulse" />
              <Button variant="ghost" size="lg" href="/services" aria-label="See all services">
                See services
              </Button>
            </div>

            {/* Attention anchor 3 — live reviews */}
            <div className="mt-6">
              <ReviewBadge onDark />
            </div>

            <p className="mt-7 text-xs uppercase tracking-[0.08em] text-[var(--color-footer-fg)]">
              {BUSINESS.areaServed}
            </p>
          </div>

          {/* Image column */}
          <div className="relative">
            <Photo
              src="/photos/hero-night-tech.webp"
              alt="A GoldenNorth technician in a hi-vis vest balancing a wheel beside the yellow service van"
              ratio="3 / 4"
              priority
              overlay
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="shadow-[0_20px_50px_-20px_rgba(16,32,63,0.35)]"
            />
            <span className="absolute left-4 bottom-4 inline-flex rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-[var(--color-body)] backdrop-blur-sm shadow-sm">
              The real GoldenNorth van — on a real GTA call
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run tests, fix fallout**

Run: `npm run test` — Expected: Hero tests PASS. `home.test.tsx` may fail if it asserted the old headline — update those assertions to the new copy.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx src/components/sections/__tests__ src/app/__tests__
git commit -m "feat: emergency problem→solution hero with live dispatch + review badge"
```

---

### Task 4: ServiceIcon + ServiceGrid

**Files:**
- Create: `src/components/ui/ServiceIcon.tsx`
- Create: `src/components/sections/ServiceGrid.tsx`
- Create: `src/components/sections/__tests__/ServiceGrid.test.tsx`

**Interfaces:**
- Consumes: `SERVICES`, `Service["icon"]` union from Stage 1.
- Produces: `<ServiceGrid />` (no props — renders all of `SERVICES`); `<ServiceIcon name={Service["icon"]} className? />`.

- [ ] **Step 1: Failing tests** — `ServiceGrid.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceGrid } from "../ServiceGrid";

describe("ServiceGrid", () => {
  it("renders five service cards linking to their pages", () => {
    render(<ServiceGrid />);
    expect(screen.getByRole("link", { name: /24\/7 roadside assistance/i })).toHaveAttribute(
      "href", "/services/roadside-assistance");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(5);
  });

  it("renders sub-service pill links", () => {
    render(<ServiceGrid />);
    expect(screen.getByRole("link", { name: /seasonal tire change/i })).toHaveAttribute(
      "href", "/services/mobile-tire-service/seasonal-tire-change");
    expect(screen.getByRole("link", { name: /oil change/i })).toHaveAttribute(
      "href", "/services/mobile-mechanic/oil-change");
  });
});
```

Run: `npm run test -- ServiceGrid` — Expected: FAIL.

- [ ] **Step 2: Create `src/components/ui/ServiceIcon.tsx`** — five simple line icons, `stroke="currentColor"`, no fills, 24×24 viewBox, `strokeWidth={1.8}`, `strokeLinecap="round" strokeLinejoin="round"`, `aria-hidden`:

```tsx
// ─── ServiceIcon ─────────────────────────────────────────────────────────────
// Line-style icons for the five main services. Decorative (aria-hidden);
// color comes from currentColor so cards can tint them accent-gold.

import type { Service } from "@/lib/services";

const PATHS: Record<Service["icon"], React.ReactNode> = {
  roadside: (
    // warning triangle over a road
    <>
      <path d="M12 3.5 21 19H3L12 3.5z" />
      <path d="M12 9.5v4" />
      <path d="M12 16.4v.2" />
    </>
  ),
  tire: (
    // tire: two circles + lug hints
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3.5v2.5M12 18v2.5M3.5 12H6M18 12h2.5M6 6l1.8 1.8M18 18l-1.8-1.8M18 6l-1.8 1.8M6 18l1.8-1.8" />
    </>
  ),
  battery: (
    // battery with bolt
    <>
      <rect x="3" y="8" width="16" height="10" rx="2" />
      <path d="M21 11.5v3" />
      <path d="M11.5 10 9 13.2h3L10 16" />
    </>
  ),
  lockout: (
    // padlock
    <>
      <rect x="5.5" y="10.5" width="13" height="9" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
      <path d="M12 14v2.5" />
    </>
  ),
  mechanic: (
    // wrench
    <>
      <path d="M14.5 6.5a4 4 0 0 0-5.6 4.9L4 16.3a2 2 0 1 0 2.8 2.8l4.9-4.9a4 4 0 0 0 4.9-5.6L13.9 11l-1.8-1.8 2.4-2.7z" />
    </>
  ),
};

export function ServiceIcon({ name, className = "" }: { name: Service["icon"]; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
```

- [ ] **Step 3: Create `src/components/sections/ServiceGrid.tsx`**

```tsx
// ─── ServiceGrid ─────────────────────────────────────────────────────────────
// The 5 main services as compact problem→solution cards with sub-service pill
// links. Replaces the tall editorial ServiceRow layout — a stranded visitor
// sees the full catalog in one screen. Card hover uses the ambient card-lift;
// pills are real links so ad/search visitors can deep-dive in one tap.

import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {SERVICES.map((service, i) => (
        <Reveal
          key={service.slug}
          delay={i * 60}
          className={i === SERVICES.length - 1 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.625rem)]" : ""}
        >
          <article className="card-lift flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="rounded-lg bg-[var(--color-accent-soft)] p-2.5 text-[var(--color-accent-deep)]">
                <ServiceIcon name={service.icon} />
              </span>
              <div>
                <h3 className="font-bold text-2xl leading-tight text-[var(--color-heading)]">
                  <Link
                    href={`/services/${service.slug}`}
                    className="rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-card)] hover:text-[var(--color-accent-deep)] transition-colors duration-150"
                  >
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">{service.blurb}</p>
              </div>
            </div>

            {service.subServices.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-4" aria-label={`${service.name} services`}>
                {service.subServices.map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={`/services/${service.slug}/${x.slug}`}
                      className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-page)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-heading)] transition-colors duration-150 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1"
                    >
                      {x.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
```

Check `Reveal`'s props in `src/components/ui/Reveal.tsx` before using — if it doesn't accept `className`/`delay` this way, wrap accordingly.

- [ ] **Step 4: Run tests + commit**

Run: `npm run test -- ServiceGrid` — Expected: PASS.

```bash
git add src/components/ui/ServiceIcon.tsx src/components/sections/ServiceGrid.tsx src/components/sections/__tests__/ServiceGrid.test.tsx
git commit -m "feat: 5-card service grid with sub-service pills"
```

---

### Task 5: Homepage assembly + services overview switch + delete ServiceRow

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/services/page.tsx`
- Delete: `src/components/sections/ServiceRow.tsx`
- Modify: `src/app/__tests__/home.test.tsx`, `src/app/services/__tests__/services.test.tsx`
- Modify: `src/components/layout/Header.tsx` (descriptor line)

- [ ] **Step 1: Failing tests.** In `home.test.tsx`, assert the new flow:

```tsx
it("renders the emergency flow: hero → trust strip → service grid", async () => {
  render(await Home());
  // getAllByText: the hero's "in as little as 20–30 minutes" also matches.
  expect(screen.getAllByText(/20–30 min/).length).toBeGreaterThanOrEqual(2); // hero + trust strip
  expect(screen.getAllByRole("heading", { level: 3 }).length).toBeGreaterThanOrEqual(5); // grid
  expect(screen.queryByRole("link", { name: /view the full photo gallery/i })).toBeNull(); // teaser gone
});
```

Run: `npm run test -- home` — Expected: FAIL.

- [ ] **Step 2: Rebuild `src/app/page.tsx`** — flow per spec: Hero → trust strip → ServiceGrid → HowItWorks → ReviewsWidget → CoverageMap → FAQs → CTABand. Gallery teaser removed. Metadata + StatStrip updated:

```tsx
export const metadata = buildMetadata({
  title: "24/7 Roadside Assistance Toronto & GTA — 20–30 Min Arrival",
  description: `Stranded? 24/7 roadside assistance, mobile tire service, jump starts, lockouts & mobile mechanics across Toronto & the GTA — in as little as 20–30 minutes. Call ${BUSINESS.phoneDisplay}.`,
  path: "/",
});
```

Replace the trust-strip StatStrip items with:

```tsx
<StatStrip
  items={[
    { value: "24/7", label: "Live dispatch" },
    { value: "20–30 min", label: "We can be on our way" },
    { value: "GTA-wide", label: "We come to you" },
    { value: "No membership", label: "Fair upfront pricing" },
  ]}
/>
```

Replace the services section body (`SERVICES.map(... ServiceRow ...)`) with `<ServiceGrid />` (keep the Task-3/Stage-1 heading "Whatever stopped you, we fix it where you stand."). Delete the entire gallery-teaser section and its now-unused imports (`GALLERY`, `Photo`, `Link`, `TEASER`, `Reveal` if unused). Remove the `ServiceRow` import.

- [ ] **Step 3: Services overview page** — in `src/app/services/page.tsx`, replace the ServiceRow loop with `<ServiceGrid />` inside the same section wrapper; drop the `ServiceRow` import.

- [ ] **Step 4: Delete `src/components/sections/ServiceRow.tsx`.** Verify nothing references it: `grep -rn "ServiceRow" src/` returns nothing.

- [ ] **Step 5: Header descriptor** — in `Header.tsx`, change the logo descriptor line text from `Mobile Tire Services` to `24/7 Roadside Assistance` (same span, same classes; update any Header test asserting the old text).

- [ ] **Step 6: Full verification**

Run: `npm run test` — Expected: PASS.
Run: `npm run build` — Expected: clean.
Manual (`npm run dev`): home shows the new hero (dot breathing, call button pulsing, review badge with live numbers — or absent if API down, which is correct); grid cards + pills navigate; reduced motion (DevTools → Rendering → prefers-reduced-motion) kills pulse/dot/sweep; mobile 390px width: call button above the fold, sticky call bar intact, no horizontal scroll. Stop the server.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: emergency homepage — hero, trust strip, service grid, tightened flow"
```

---

## Stage 3 exit criteria

- Homepage: 3 repeating attention anchors only (dot, call pulse, badge); everything else plays once or on hover.
- Review badge shows the live Featurable rating/count and vanishes cleanly on API failure.
- ServiceRow deleted; grid serves home + overview; all tests + build green.
