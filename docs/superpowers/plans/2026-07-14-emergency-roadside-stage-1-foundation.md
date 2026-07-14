# Emergency Roadside Repositioning — Stage 1: Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Swap the site to Barlow typography, replace the 4-service data model with the 5-main-service emergency-roadside catalog (full new copy), serve the 5 main service pages at their new URLs, 301-redirect the old URLs, and give the header a Services dropdown.

**Architecture:** `src/lib/services.ts` is rewritten as the single source of truth (`Service` type gains `problem`/`solution`/`blurb`/`icon`/`subServices`; `tagline` is removed). The existing `/services/[slug]` template is updated to the problem→solution hero. Sub-service pages are Stage 2; `subServices` ships empty here and every consumer must render correctly with an empty array.

**Tech Stack:** Next.js 16 App Router (READ `node_modules/next/dist/docs/` before writing route/font code — this Next version has breaking changes vs. training data), Tailwind v4 (`@theme` tokens in `globals.css`), Vitest + Testing Library, `next/font/google`.

**Spec:** `docs/superpowers/specs/2026-07-14-emergency-roadside-redesign-design.md`

## Global Constraints

- ETA phrase, verbatim everywhere: **"in as little as 20–30 minutes"**. Never a bare "20–30 minutes" promise without "in as little as".
- Pricing language, verbatim theme: **"fair, upfront price quoted on the call — no membership, no hidden fees."** No dollar figures. Banned words: "cheap", "affordable", "best", "premier", "#1".
- Brand name stays **GoldenNorth Mobile Tire Services**; positioning leads with 24/7 emergency roadside assistance.
- Areas: "Toronto & the GTA" in prominent copy; specific city names only inside body copy/FAQs/keywords.
- Voice: second person, present tense, short sentences, numbers over adjectives.
- Trust claims limited to what `src/lib/trust.ts` confirms (licensed & insured, upfront pricing, warranty-backed parts, 24/7 GTA-wide). No satisfaction guarantees, no invented star ratings.
- Accessibility: WCAG 2.2 AA; keep the `prefers-reduced-motion` block in `globals.css` intact; visible focus states on all new interactive elements (copy the `focus-visible:ring-*` pattern used throughout).
- After every task: `npm run test` green before commit. `npm run build` must pass at Task 6.
- Commits end with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

## New URL map (this stage)

| Old | New (Stage 1) | Stage 2 refines to |
|---|---|---|
| `/services/tire-change` | `/services/mobile-tire-service` | `/services/mobile-tire-service/seasonal-tire-change` |
| `/services/tires` | `/services/mobile-tire-service` | `/services/mobile-tire-service/new-used-tires` |
| `/services/battery` | `/services/battery-jump-start` | — |
| `/services/roadside` | `/services/roadside-assistance` | — |

---

### Task 1: Barlow typography

**Files:**
- Modify: `src/app/layout.tsx:1-10, 38`
- Modify: `src/app/globals.css:33-35` (@theme font token) and `:53-66` (@layer base)

**Interfaces:**
- Produces: CSS vars `--font-barlow`, `--font-barlow-condensed`; theme tokens `--font-sans` (Barlow) and `--font-display` (Barlow Condensed). Headings h1–h3 use `--font-display` globally. Later stages use `font-[family-name:var(--font-display)]` only when opting non-heading elements into display type.

- [ ] **Step 1: Swap the font imports in `src/app/layout.tsx`**

Replace lines 1–10's font setup:

```tsx
import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/lib/business";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { LocalBusinessJsonLd } from "@/lib/jsonld";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});
```

And change the `<html>` line (currently `className={inter.variable}`):

```tsx
<html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
```

- [ ] **Step 2: Update tokens + base styles in `src/app/globals.css`**

In the `@theme` block replace the type token (line 33–34):

```css
  /* ── Type: Barlow (body) + Barlow Condensed (display) ── */
  --font-sans: var(--font-barlow), system-ui, sans-serif;
  --font-display: var(--font-barlow-condensed), var(--font-barlow), system-ui, sans-serif;
```

In `@layer base`, make headings use the display face (replace the existing `h1, h2, h3` rule):

```css
  h1, h2, h3 {
    font-family: var(--font-display);
    color: var(--color-heading);
    letter-spacing: 0;      /* condensed faces need no negative tracking */
    text-wrap: balance;
  }
```

Note: several components set inline `letterSpacing: "-0.02em"` on h1s — remove those inline styles when you touch those files in later tasks (Hero is Stage 3; service detail h1 is Task 4 below).

- [ ] **Step 3: Verify**

Run: `npm run test`
Expected: PASS (fonts don't affect assertions).
Run: `npm run dev` briefly and confirm at http://localhost:3000 that headings render condensed and body text is Barlow (spot-check, then stop the server).

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: swap Inter for Barlow + Barlow Condensed type system"
```

---

### Task 2: New service data model + 5 main services

**Files:**
- Rewrite: `src/lib/services.ts`
- Rewrite: `src/lib/__tests__/services.test.ts`

**Interfaces:**
- Produces (consumed by every later task/stage — exact shapes):

```ts
export interface Faq { q: string; a: string }

export interface SubService {
  slug: string;          // URL segment under the parent, e.g. "flat-tire"
  name: string;
  problem: string;       // H1 line 1 — names the visitor's problem
  solution: string;      // H1 line 2 — the promise; carries the ETA phrase
  seoTitle: string;      // ≤60 chars
  seoDescription: string;// 120–165 chars
  summary: string;
  included: string[];
  keywords: string[];
  faqs: Faq[];
}

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  icon: "roadside" | "tire" | "battery" | "lockout" | "mechanic";
  problem: string;
  solution: string;
  blurb: string;         // 1–2 line card blurb (grid cards, ServiceRow)
  seoTitle: string;
  seoDescription: string;
  summary: string;
  included: string[];
  whenYouNeed: string[];
  keywords: string[];
  faqs: Faq[];
  subServices: SubService[];   // [] in Stage 1; filled in Stage 2
}

export const SERVICES: Service[];
export const SERVICE_SLUGS: string[];
export const getService: (slug: string) => Service | undefined;
export const getSubService: (slug: string, sub: string) => SubService | undefined;
```

- [ ] **Step 1: Write the failing tests** — replace `src/lib/__tests__/services.test.ts` with:

```ts
import { describe, expect, it } from "vitest";
import { SERVICES, SERVICE_SLUGS, getService, getSubService } from "@/lib/services";

const BANNED = [/\bcheap\b/i, /\baffordable\b/i, /\bbest\b/i, /\bpremier\b/i, /#1/];
const ETA = "in as little as 20–30 minutes";

describe("service catalog", () => {
  it("has the five main services in display order", () => {
    expect(SERVICE_SLUGS).toEqual([
      "roadside-assistance",
      "mobile-tire-service",
      "battery-jump-start",
      "car-lockout",
      "mobile-mechanic",
    ]);
  });

  it("every service has complete problem→solution content", () => {
    for (const s of SERVICES) {
      expect(s.problem.length).toBeGreaterThan(8);
      expect(s.problem.endsWith("?")).toBe(true);
      expect(s.solution.length).toBeGreaterThan(10);
      expect(s.blurb.length).toBeGreaterThan(20);
      expect(s.summary.length).toBeGreaterThan(100);
      expect(s.included.length).toBeGreaterThanOrEqual(4);
      expect(s.whenYouNeed.length).toBeGreaterThanOrEqual(3);
      expect(s.keywords.length).toBeGreaterThanOrEqual(4);
      expect(s.faqs.length).toBeGreaterThanOrEqual(4);
      expect(Array.isArray(s.subServices)).toBe(true);
    }
  });

  it("SEO fields respect length budgets", () => {
    for (const s of SERVICES) {
      expect(s.seoTitle.length).toBeLessThanOrEqual(60);
      expect(s.seoDescription.length).toBeGreaterThanOrEqual(120);
      expect(s.seoDescription.length).toBeLessThanOrEqual(165);
    }
  });

  it("uses the exact ETA phrase wherever an arrival time is promised", () => {
    for (const s of SERVICES) {
      const text = [s.solution, s.summary, ...s.faqs.map((f) => f.a)].join(" ");
      if (/20–30/.test(text)) expect(text).toContain(ETA);
      expect(text).not.toMatch(/45–90/);
    }
  });

  it("never uses banned marketing words", () => {
    for (const s of SERVICES) {
      const text = JSON.stringify(s);
      for (const rx of BANNED) expect(text).not.toMatch(rx);
    }
  });

  it("getService / getSubService look up by slug", () => {
    expect(getService("car-lockout")?.name).toBe("Car Lockout");
    expect(getService("nope")).toBeUndefined();
    expect(getSubService("roadside-assistance", "nope")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test -- src/lib/__tests__/services.test.ts`
Expected: FAIL (old catalog has 4 services, no `problem`, no `getSubService`).

- [ ] **Step 3: Rewrite `src/lib/services.ts`** with the interfaces from the block above plus this complete catalog (copy verbatim — this IS the approved site copy):

```ts
export const SERVICES: Service[] = [
  {
    slug: "roadside-assistance",
    name: "24/7 Roadside Assistance",
    shortName: "Roadside",
    icon: "roadside",
    problem: "Stranded at the roadside?",
    solution: "Help is on the way — in as little as 20–30 minutes.",
    blurb:
      "Stuck on the 401 or a side street? One call and a technician is on the way to you, 24/7.",
    seoTitle: "24/7 Roadside Assistance Toronto & GTA — No Membership",
    seoDescription:
      "Stranded? 24/7 roadside assistance across Toronto & the GTA — help in as little as 20–30 minutes, no membership. Fair quote on the call. (416) 558-5915.",
    summary:
      "You're stranded and need help now. GoldenNorth answers 24/7 and sends a roadside technician to you anywhere in Toronto and the GTA — in as little as 20–30 minutes. Flat tire, dead battery, empty tank, keys locked inside: we fix it at the roadside so you skip the tow truck and the shop. No membership, and you get a fair, upfront price on the call before we roll.",
    included: [
      "Flat tire change with your spare or a replacement tire",
      "Battery boost, jump start, or on-site replacement",
      "Emergency fuel delivery — enough to reach a station",
      "Roadside triage — we assess and fix what we can on the spot",
      "Tow coordination and honest advice when a roadside fix isn't possible",
    ],
    whenYouNeed: [
      "You're stranded with a flat and no roadside plan — or your plan's ETA is two hours",
      "Your car won't start in a parking garage or on a highway shoulder",
      "It's 2 a.m. in January and you need someone who actually picks up",
    ],
    keywords: [
      "roadside assistance Toronto",
      "24/7 roadside assistance GTA no membership",
      "emergency roadside assistance Toronto",
      "highway 401 roadside assistance",
      "emergency roadside Etobicoke",
    ],
    faqs: [
      {
        q: "How fast can you reach me in the GTA?",
        a: "We aim to reach most Toronto and GTA locations in as little as 20–30 minutes, depending on where you are and traffic. You get an honest ETA the moment you call — (416) 558-5915 — and we call again when we're close.",
      },
      {
        q: "Do you cover highways like the 401, 427, or the DVP?",
        a: "Yes. We service highway shoulders across the GTA corridor. Pull as far onto the shoulder as safely possible, turn on your hazards, and call us. We'll coordinate a safe approach.",
      },
      {
        q: "What if my car needs a repair you can't do roadside?",
        a: "We'll tell you straight. If the problem is beyond a roadside fix — a broken axle, seized brakes, engine failure — we help you arrange a tow and point you toward a trustworthy shop rather than charge you for a call we can't resolve.",
      },
      {
        q: "Do I need a membership or subscription?",
        a: "No. GoldenNorth is pay-per-call — you pay for the help you actually use, with no annual fee and no coverage limits. You get a fair, upfront price quoted on the call — no membership, no hidden fees.",
      },
      {
        q: "What information should I have ready when I call?",
        a: "Your location (a highway marker, exit, intersection, or nearest address), your vehicle's make, model, and colour, and what happened. Not sure what's wrong? Describe what you see and hear and we'll triage on arrival.",
      },
    ],
    subServices: [], // Stage 2: fuel-delivery, tow-coordination
  },
  {
    slug: "mobile-tire-service",
    name: "Mobile Tire Service",
    shortName: "Tires",
    icon: "tire",
    problem: "Flat tire or worn rubber?",
    solution: "The tire shop drives to you — fixed where you're parked.",
    blurb:
      "Flat, worn, or wrong season — flats fixed, spares installed, new and used tires mounted at your door.",
    seoTitle: "Mobile Tire Service Toronto — Flats, Swaps, New & Used",
    seoDescription:
      "24/7 mobile tire service in Toronto & the GTA: flat tire repair, spare installs, seasonal swaps, new & used tires installed where you're parked. (416) 558-5915.",
    summary:
      "A flat on the way to work, a worn tire that won't pass another winter, seasonals still stacked in the garage — GoldenNorth brings the tire shop to your driveway, office lot, or roadside anywhere in Toronto and the GTA, 24/7. We repair flats, install spares, mount new and used tires, and handle seasonal changeovers on the spot, with a fair, upfront price quoted on the call.",
    included: [
      "Flat tire repair or replacement at your location",
      "Spare tire installation with torque to OEM spec",
      "New & used tires sourced in your size — most within 24 hours",
      "On-rim seasonal changeover (winter ↔ summer / all-season)",
      "Pressures set to door-jamb spec before we leave",
    ],
    whenYouNeed: [
      "You pick up a nail and your spare is buried under the trunk floor",
      "One tire is beyond repair and you need a match today, not next week",
      "The first frost advisory hits and your winters are still in the garage",
    ],
    keywords: [
      "mobile tire service Toronto",
      "mobile tire change GTA",
      "flat tire help Toronto",
      "used tires Toronto",
      "seasonal tire swap at home GTA",
    ],
    faqs: [
      {
        q: "How much does mobile tire service cost in Toronto?",
        a: "It depends on the job — a spare install, a flat repair, a seasonal swap, or new rubber — plus your vehicle type and location. Call (416) 558-5915 with your vehicle and location and you'll have a fair, upfront quote in under a minute — no membership, no hidden fees.",
      },
      {
        q: "How long does the work take once you arrive?",
        a: "A spare install or on-rim seasonal swap typically takes 30–45 minutes for a passenger car, SUV, or light truck — including torque to spec and setting pressures. Tires that need mounting and balancing take longer; we quote a realistic time when you book.",
      },
      {
        q: "Can you work in a condo underground parking garage?",
        a: "Yes. As long as ceiling clearance is sufficient (most underground garages are fine) and you have a spot for the duration, we can work there. We use a portable compressor and cordless tools — no shore power needed.",
      },
      {
        q: "Can I buy just one used tire instead of a full set?",
        a: "Yes. If one tire is damaged beyond repair, we source a matching used tire close in tread depth to your remaining three. For all-wheel-drive vehicles we measure your existing tread first, since large differences can strain the drivetrain.",
      },
      {
        q: "What areas do you serve for tire work?",
        a: "Toronto and across the GTA — Scarborough, North York, Etobicoke, Vaughan, Markham, Richmond Hill, Oakville, and surrounding areas. Call to confirm availability at your address.",
      },
    ],
    subServices: [], // Stage 2: flat-tire, spare-tire-install, new-used-tires, seasonal-tire-change
  },
  {
    slug: "battery-jump-start",
    name: "Battery Jump Start",
    shortName: "Battery",
    icon: "battery",
    problem: "Car won't start?",
    solution: "Boosted, tested, or replaced on the spot — in as little as 20–30 minutes.",
    blurb:
      "Dead battery? We boost it, test it, and if it's done, install a fresh one right where you're parked.",
    seoTitle: "Battery Jump Start Toronto — 24/7 Boost & Replacement",
    seoDescription:
      "Car won't start? 24/7 battery jump start across Toronto & the GTA — boost, test, or on-the-spot replacement in as little as 20–30 minutes. (416) 558-5915.",
    summary:
      "Your car won't start and you're going nowhere. GoldenNorth comes to you 24/7, anywhere in Toronto and the GTA — in as little as 20–30 minutes. We jump start the car, load-test the battery and charging system so you know why it died, and if the battery is finished we install a fresh warranted unit from the van. No tow, no waiting room, and a fair, upfront price quoted on the call.",
    included: [
      "Jump start / boost for dead or discharged batteries",
      "Battery load test and charging system check",
      "On-site battery replacement with a fresh, warranted unit",
      "Terminal cleaning and corrosion treatment",
      "Alternator output check so the new battery stays charged",
    ],
    whenYouNeed: [
      "The car won't start on a cold morning and there's no neighbour to boost you",
      "The battery keeps dying and you suspect the charging system",
      "You want the battery replaced without waiting hours for a tow to a shop",
    ],
    keywords: [
      "battery jump start Toronto",
      "car battery boost GTA",
      "mobile battery replacement Toronto",
      "24/7 battery service Toronto",
      "dead battery help Scarborough",
    ],
    faqs: [
      {
        q: "How do you know if I need a new battery or just a boost?",
        a: "We run a load test on arrival. If the battery holds charge and was simply drained — lights left on, a long stretch parked — a boost and a short drive is enough. If it fails the load test (common past 4 years old in our winters), we show you the result and can replace it on the spot.",
      },
      {
        q: "How fast can you get to me?",
        a: "We reach most Toronto and GTA locations in as little as 20–30 minutes, and you get an honest ETA when you call. We run 24/7 — days, nights, weekends, holidays.",
      },
      {
        q: "What battery brands and sizes do you carry?",
        a: "Trusted replacement brands in the most common group sizes (35, 47, 48, 65, 94R), covering most Honda, Toyota, Ford, GM, and Nissan vehicles on Toronto roads. Unusual size? Call ahead and we'll source it.",
      },
      {
        q: "Will replacing the battery reset my car's computer or radio?",
        a: "Modern vehicles can lose some memory settings when the battery is swapped. We use a memory saver during replacement to minimise this, and we'll flag beforehand if your vehicle has known sensitivities.",
      },
      {
        q: "How much does it cost?",
        a: "A boost costs less than a replacement; replacement price depends on your battery's group size and type (AGM units cost more than standard flooded). Either way you get a fair, upfront price quoted on the call — no membership, no hidden fees, no shop markup.",
      },
    ],
    subServices: [], // Stage 2: battery-replacement, battery-testing
  },
  {
    slug: "car-lockout",
    name: "Car Lockout",
    shortName: "Lockout",
    icon: "lockout",
    problem: "Locked out of your car?",
    solution: "Back inside without a scratch — in as little as 20–30 minutes.",
    blurb: "Keys locked inside? We open your car damage-free, day or night.",
    seoTitle: "Car Lockout Service Toronto — 24/7 Damage-Free Entry",
    seoDescription:
      "Locked out of your car in Toronto or the GTA? 24/7 lockout service — damage-free entry in as little as 20–30 minutes. Fair quote on the call. (416) 558-5915.",
    summary:
      "Keys dangling in the ignition, shut in the trunk, or sitting on the seat — GoldenNorth opens your car without damage, 24/7, anywhere in Toronto and the GTA, in as little as 20–30 minutes. We use professional non-destructive entry tools, work on most makes and models, and quote you a fair, upfront price on the call before we head out.",
    included: [
      "Non-destructive entry — no broken windows, no pried doors",
      "Door unlocks on most makes and models",
      "Trunk unlocks, including keys shut in the trunk",
      "Keys-in-ignition and keys-in-cabin retrieval",
      "Ownership verification on arrival, for your protection",
    ],
    whenYouNeed: [
      "The doors auto-locked with the engine running and the keys inside",
      "You're at a gas station and the keys are sitting on the seat",
      "The trunk closed on your keys with the doors already locked",
    ],
    keywords: [
      "car lockout service Toronto",
      "locked keys in car GTA",
      "24/7 car unlock Toronto",
      "keys locked in trunk Toronto",
      "car lockout North York",
    ],
    faqs: [
      {
        q: "How fast can you get me back into my car?",
        a: "We reach most Toronto and GTA locations in as little as 20–30 minutes, and the unlock itself usually takes only a few minutes once we arrive. You get an honest ETA on the call.",
      },
      {
        q: "Will unlocking damage my door or window?",
        a: "No. We use the same non-destructive entry tools professional locksmiths use — inflatable wedges and reach tools that work the lock without bending the frame or touching the glass.",
      },
      {
        q: "What do you need from me before you open the car?",
        a: "Proof it's your vehicle — a driver's licence plus registration or insurance showing your name, or another reasonable proof of ownership. It protects you: we don't open cars for people who can't show they belong in them.",
      },
      {
        q: "Can you open any make and model?",
        a: "Most passenger cars, SUVs, and light trucks, yes. A few exotic and armoured vehicles are outside scope — tell us the make and model when you call and we'll confirm on the spot.",
      },
      {
        q: "What does a lockout cost?",
        a: "You get a fair, upfront price quoted on the call — no membership, no hidden fees — based on your location and time of day. No surprises when the door opens.",
      },
    ],
    subServices: [], // no sub-services
  },
  {
    slug: "mobile-mechanic",
    name: "Mobile Mechanic",
    shortName: "Mechanic",
    icon: "mechanic",
    problem: "Breakdown or warning light?",
    solution: "A mechanic comes to you — diagnosed and fixed in your driveway.",
    blurb: "Diagnostics, brakes, oil changes, and small repairs — done where the car sits.",
    seoTitle: "Mobile Mechanic Toronto — Repairs at Home or Work",
    seoDescription:
      "Mobile mechanic for Toronto & the GTA: diagnostics, brakes, oil changes & small repairs at your home, office, or roadside. Fair upfront quote — (416) 558-5915.",
    summary:
      "The check-engine light is on, the brakes are grinding, or the car simply won't behave — and you don't want to risk the drive to a shop. GoldenNorth sends a mobile mechanic to your home, office, or roadside anywhere in Toronto and the GTA. We diagnose on-site, fix what can be fixed where the car sits, and give you a straight answer — with a fair, upfront price quoted on the call.",
    included: [
      "Computer diagnostics for check-engine and warning lights",
      "Brake pad and rotor replacement at your location",
      "Oil and filter changes at your home or workplace",
      "Batteries, alternators, starters, belts, and sensors",
      "A straight answer when a repair genuinely needs a shop",
    ],
    whenYouNeed: [
      "A warning light came on and you don't want to gamble on the drive",
      "The brakes grind and the nearest shop can't see you for a week",
      "The car needs maintenance and you can't spare time for a shop visit",
    ],
    keywords: [
      "mobile mechanic Toronto",
      "mobile mechanic GTA",
      "car repair at home Toronto",
      "mobile brake replacement Toronto",
      "mobile oil change GTA",
    ],
    faqs: [
      {
        q: "What repairs can you actually do in a driveway?",
        a: "Anything that doesn't need a hoist or specialty shop equipment: diagnostics, brake pads and rotors, oil and filter changes, batteries, alternators, starters, belts, hoses, and sensors. Describe the symptom when you call and we'll tell you straight whether it's driveway-fixable.",
      },
      {
        q: "How does mobile diagnostics work?",
        a: "We plug a professional scan tool into your car's OBD port, read the fault codes, and verify the actual cause — a code alone isn't a diagnosis. You get a plain-language explanation and a quote for the fix before any work starts.",
      },
      {
        q: "What if the repair turns out to need a shop?",
        a: "We tell you, and you only pay for the diagnosis — not a repair we can't do. We'll help arrange a tow and point you to a trustworthy shop rather than guess at your expense.",
      },
      {
        q: "Can you do an oil change at my office parking lot?",
        a: "Yes — home driveway, office lot, or condo garage with permission. We bring everything including disposal of the old oil, and the car is ready when you are.",
      },
      {
        q: "How is the price set?",
        a: "Parts plus a straightforward service call — no shop overhead, no upsell. You get a fair, upfront price quoted on the call — no membership, no hidden fees.",
      },
    ],
    subServices: [], // Stage 2: diagnostics, brakes, oil-change, general-repairs
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);

export const getSubService = (slug: string, sub: string): SubService | undefined =>
  getService(slug)?.subServices.find((x) => x.slug === sub);
```

Top of file keeps a header comment (copy rules + pointer to the spec) and the `Faq`, `SubService`, `Service` interfaces exactly as in the **Interfaces** block above.

- [ ] **Step 4: Run the catalog tests**

Run: `npm run test -- src/lib/__tests__/services.test.ts`
Expected: PASS.

Note: other suites now FAIL (they reference `tagline` and old slugs) — that's expected; Tasks 3–5 fix them. Do not commit broken tests: commit `services.ts` + its test together with the consumer fixes in Task 3 **only if** you cannot isolate. Preferred: proceed to Task 3 and commit at its end.

---

### Task 3: Re-key photos and update row/overview consumers

**Files:**
- Modify: `src/lib/photos.ts:14-31` (SERVICE_PHOTO keys)
- Modify: `src/components/sections/ServiceRow.tsx:42-44` (`tagline` → `blurb`)
- Modify: `src/app/page.tsx:59-67` (services heading copy — the old one says "four ways")
- Modify: `src/app/services/page.tsx:15-32` (metadata + header copy)
- Modify: `src/lib/faqs.ts:22-24` (HOME_FAQS ETA answer)

**Interfaces:**
- Consumes: `Service.blurb`, new slugs from Task 2.
- Produces: `SERVICE_PHOTO` keyed by the five new slugs (Stage 2's sub template reuses the parent's photo via these keys).

- [ ] **Step 1: Re-key `SERVICE_PHOTO` in `src/lib/photos.ts`**

```ts
export const SERVICE_PHOTO: Record<string, CatalogPhoto> = {
  "roadside-assistance": {
    src: "/photos/night-sedan-roadside.webp",
    alt: "Late-night GTA roadside assistance: a sedan up on the jack with the GoldenNorth van's headlights lighting the work",
  },
  "mobile-tire-service": {
    src: "/photos/action-mercedes-street.webp",
    alt: "GoldenNorth mobile tire change on a red Mercedes on a GTA residential street, yellow service van parked behind",
  },
  "battery-jump-start": {
    src: "/photos/night-mini-station.webp",
    alt: "Night mobile battery and jump start service for a MINI at a lit gas station, the open yellow van alongside",
  },
  "car-lockout": {
    src: "/photos/van-residential-driveway.webp",
    alt: "GoldenNorth van in a residential driveway with the side door open, technician helping at a black SUV",
  },
  "mobile-mechanic": {
    src: "/photos/van-loadingdock-bmw.webp",
    alt: "GoldenNorth technician servicing a gray BMW beside the yellow van at a loading dock",
  },
};
```

- [ ] **Step 2: `ServiceRow.tsx`** — change the paragraph at line 42–44 from `{service.tagline}` to `{service.blurb}`.

- [ ] **Step 3: Home services heading (`src/app/page.tsx`)** — replace the h2 + intro paragraph (lines 59–67) with:

```tsx
<h2 id="services-heading" className="font-bold text-4xl leading-[1.05] text-[var(--color-heading)] lg:text-5xl">
  Whatever stopped you, <span className="text-[var(--color-accent-deep)]">we fix it where you stand.</span>
</h2>
<p className="mt-5 text-lg leading-relaxed text-[var(--color-body)]">
  Roadside emergencies, tires, batteries, lockouts, and driveway repairs — one call sends
  help anywhere in Toronto &amp; the GTA, in as little as 20–30 minutes.
</p>
```

- [ ] **Step 4: Services overview page (`src/app/services/page.tsx`)** — replace metadata + PageHeader copy:

```tsx
export const metadata = buildMetadata({
  title: "24/7 Roadside & Mobile Services — Toronto & the GTA",
  description: `Roadside assistance, mobile tire service, battery jump starts, car lockouts & mobile mechanics across Toronto & the GTA. We come to you — call ${BUSINESS.phoneDisplay}.`,
  path: "/services",
});
```

PageHeader:

```tsx
<PageHeader
  title={
    <>
      Whatever stopped you,
      <br />
      <span className="text-[var(--color-accent)]">we come fix it.</span>
    </>
  }
  intro={`Roadside assistance, mobile tire service, battery jump starts, car lockouts, and mobile mechanic repairs — everywhere in Toronto & the GTA, 24/7, in as little as 20–30 minutes. Pick what stopped you, or just call and tell us.`}
>
```

- [ ] **Step 5: `src/lib/faqs.ts`** — replace the HOME_FAQS "How fast" answer (line 23) with:

```ts
a: "We aim to reach most Toronto and GTA addresses in as little as 20–30 minutes, depending on location and traffic — and we give you an honest ETA when you call. We run 24/7 — days, nights, weekends, and holidays.",
```

- [ ] **Step 6: Run the full suite and fix remaining old-slug references**

Run: `npm run test`
Remaining failures will be in `src/app/services/__tests__/`, `src/app/__tests__/home.test.tsx`, `src/app/services/[slug]/__tests__/detail.test.tsx`, `src/app/__tests__/sitemap.test.ts`. Update assertions mechanically with this mapping — old→new slug: `tire-change`→`mobile-tire-service`, `tires`→`mobile-tire-service` (merged), `battery`→`battery-jump-start`, `roadside`→`roadside-assistance`; new additions `car-lockout`, `mobile-mechanic`; name assertions per the Task 2 catalog; any `tagline` assertion → `blurb`. Where a test asserted 4 services, it's now 5.
Expected after fixes: PASS. (Task 4 also touches detail.test.tsx — if its failures are about hero markup, defer those to Task 4.)

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: 5-service emergency-roadside catalog with problem→solution copy"
```

---

### Task 4: Problem→solution hero on the service detail template

**Files:**
- Modify: `src/app/services/[slug]/page.tsx:60-91` (hero block)
- Modify: `src/app/services/[slug]/__tests__/detail.test.tsx`

**Interfaces:**
- Consumes: `service.problem`, `service.solution`, `service.name` from Task 2.
- Produces: hero markup pattern that Stage 2's sub-service template copies.

- [ ] **Step 1: Update detail tests** — in `detail.test.tsx`, assert the new hero for one service (adapt to the file's existing render helper):

```tsx
it("renders the problem→solution hero", async () => {
  render(await ServiceDetailPage({ params: Promise.resolve({ slug: "car-lockout" }) }));
  const h1 = screen.getByRole("heading", { level: 1 });
  expect(h1).toHaveTextContent("Locked out of your car?");
  expect(h1).toHaveTextContent("Back inside without a scratch — in as little as 20–30 minutes.");
});
```

Run: `npm run test -- src/app/services` — Expected: FAIL (h1 currently shows `service.name`).

- [ ] **Step 2: Replace the hero text block** in `src/app/services/[slug]/page.tsx` (keep the section/photo wrappers; replace eyebrow + h1 + tagline):

```tsx
<p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-accent)]">
  {service.name} · Toronto &amp; the GTA
</p>
<h1
  id="service-heading"
  className="font-bold leading-[1.04] text-white"
  style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
>
  {service.problem}
  <span className="mt-2 block text-[var(--color-accent)]">{service.solution}</span>
</h1>
<p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--color-footer-fg)]">
  Fair, upfront price quoted on the call — no membership, no hidden fees.
</p>
```

(The old inline `letterSpacing: "-0.02em"` is dropped — condensed display face, Task 1.)

- [ ] **Step 3: Run tests**

Run: `npm run test`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/services src/app/services/[slug]/__tests__
git commit -m "feat: problem→solution hero on service detail pages"
```

---

### Task 5: Header Services dropdown

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/__tests__/Header.test.tsx`

**Interfaces:**
- Consumes: `SERVICES` (slug, shortName) from `@/lib/services`.

- [ ] **Step 1: Write failing tests** (add to `Header.test.tsx`):

```tsx
it("desktop nav exposes a Services dropdown with the five services", async () => {
  render(<Header />);
  const trigger = screen.getByRole("button", { name: /services menu/i });
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  await userEvent.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("link", { name: /roadside assistance/i })).toHaveAttribute(
    "href",
    "/services/roadside-assistance"
  );
  expect(screen.getByRole("link", { name: /mobile mechanic/i })).toHaveAttribute(
    "href",
    "/services/mobile-mechanic"
  );
});
```

Run: `npm run test -- Header` — Expected: FAIL.

- [ ] **Step 2: Implement the dropdown.** In `Header.tsx`: import `SERVICES`; in the desktop nav replace the plain `/services` link with a dropdown group; in the mobile menu add indented sub-links under Services. Desktop dropdown:

```tsx
{/* Services dropdown — desktop */}
<div
  className="relative"
  onMouseEnter={() => setServicesOpen(true)}
  onMouseLeave={() => setServicesOpen(false)}
>
  <div className="flex items-center">
    <Link
      href="/services"
      aria-current={isActive("/services") ? "page" : undefined}
      className={/* same classes as sibling nav links */ servicesLinkClasses}
    >
      Services
    </Link>
    <button
      type="button"
      aria-label="Services menu"
      aria-expanded={servicesOpen}
      aria-controls="services-menu"
      onClick={() => setServicesOpen((v) => !v)}
      className="p-1.5 text-white/70 hover:text-[var(--color-accent)] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
    >
      <svg aria-hidden="true" width="12" height="12" viewBox="0 0 20 20" fill="currentColor"
        className={`transition-transform duration-150 ${servicesOpen ? "rotate-180" : ""}`}>
        <path fillRule="evenodd" clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
      </svg>
    </button>
  </div>
  {servicesOpen && (
    <ul
      id="services-menu"
      className="menu-panel absolute left-0 top-full mt-2 w-64 rounded-lg border border-white/10 bg-[var(--color-navy)] p-2 shadow-lg"
    >
      {SERVICES.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/services/${s.slug}`}
            onClick={() => setServicesOpen(false)}
            className="block rounded-md px-3 py-2.5 text-sm font-medium text-white/85 transition-colors duration-150 hover:bg-white/5 hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            {s.name}
          </Link>
        </li>
      ))}
    </ul>
  )}
</div>
```

Add `const [servicesOpen, setServicesOpen] = useState(false);` beside `menuOpen`. In the mobile panel, after the Services link render the five sub-links (same `menu-item` classes, `pl-6`, `text-sm`). Keep every existing focus-visible pattern.

- [ ] **Step 3: Run tests**

Run: `npm run test -- Header` — Expected: PASS. Then `npm run test` — Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout
git commit -m "feat: header services dropdown with five main services"
```

---

### Task 6: 301 redirects + build verification

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add redirects to `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Legacy service URLs — permanent so Ads/indexed links keep working.
    // Stage 2 retargets the two tire redirects to their sub-service pages.
    return [
      { source: "/services/tire-change", destination: "/services/mobile-tire-service", permanent: true },
      { source: "/services/tires", destination: "/services/mobile-tire-service", permanent: true },
      { source: "/services/battery", destination: "/services/battery-jump-start", permanent: true },
      { source: "/services/roadside", destination: "/services/roadside-assistance", permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 2: Full verification**

Run: `npm run test` — Expected: PASS (all suites).
Run: `npm run build` — Expected: builds clean; static params generate the five `/services/*` pages; no references to old slugs remain (`grep -rn "tire-change\|services/tires\|services/battery\|services/roadside" src/` returns only the redirect file comment, if anything).

- [ ] **Step 3: Manual smoke check**

Run `npm run dev`; verify: `/services/roadside-assistance` renders the problem→solution hero; `/services/tire-change` redirects; header dropdown works with keyboard (Tab to button, Enter opens, links reachable); mobile menu shows the five sub-links. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add next.config.ts
git commit -m "feat: 301 redirects from legacy service URLs"
```

---

## Stage 1 exit criteria

- Barlow/Barlow Condensed live site-wide; no `--font-inter` references remain.
- `SERVICES` exports 5 services with the exact copy above; all tests green; build clean.
- Old service URLs 301 to new ones; header dropdown lists all five.
- Home + overview pages render 5 rows without layout breakage (their full redesign is Stage 3).
