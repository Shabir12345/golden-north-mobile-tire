# SEO + AI-Search Copywriting Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the copy layer of all seven existing pages so the site competes for GTA mobile tire / battery / roadside queries in Google and AI search, per `docs/superpowers/specs/2026-07-03-seo-copywriting-design.md`.

**Architecture:** All service copy lives in `src/lib/services.ts` (data) and flows into pages and JSON-LD automatically. We add `seoTitle`/`seoDescription` fields to the `Service` interface, rewrite the data, then touch page metadata and section copy strings. No layout, route, or schema changes.

**Tech Stack:** Next.js (App Router, read `node_modules/next/dist/docs/` before code changes per AGENTS.md), Vitest + Testing Library, TypeScript.

## Global Constraints

- Copy tone: keep the Golden North editorial voice; keywords go in metadata, headings, answer-first openers, FAQs, alts — never keyword-stuffed body copy.
- NO published prices, NO response-time promises beyond the existing "45–90 minutes" already in the roadside FAQ (keep it — a test asserts that FAQ exists).
- Tagline "The best waiting room is the living room." is unchanged.
- Cities allowed in copy: Toronto, North York, Scarborough, Etobicoke, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville.
- `seoTitle` ≤ 60 chars, primary keyword first. `seoDescription` 120–165 chars, ends with a call-to-action.
- The test `src/app/services/[slug]/__tests__/detail.test.tsx` asserts the roadside FAQ text `/how fast can you reach me/i` — that FAQ question wording must survive.
- Run tests with `npx vitest run`, build with `npx next build`.
- Commit after every task. Do not push.

---

### Task 1: Rewrite `services.ts` copy data (summaries, keywords, FAQs, new SEO fields)

**Files:**
- Modify: `src/lib/services.ts`
- Test: `src/lib/__tests__/services.test.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `Service` interface gains `seoTitle: string` and `seoDescription: string`. All four services have ≥5 FAQs. Task 2 relies on `service.seoTitle` / `service.seoDescription` existing on every service.

- [ ] **Step 1: Update the structural test to enforce the new copy contract**

Replace the `each service has SEO copy and at least 2 FAQs` test in `src/lib/__tests__/services.test.ts` with:

```ts
  it("each service has SEO copy, metadata fields, and at least 5 FAQs", () => {
    for (const s of SERVICES) {
      expect(s.summary.length).toBeGreaterThan(40);
      expect(s.included.length).toBeGreaterThanOrEqual(3);
      expect(s.keywords.length).toBeGreaterThanOrEqual(5);
      expect(s.faqs.length).toBeGreaterThanOrEqual(5);
      expect(s.seoTitle.length).toBeLessThanOrEqual(60);
      expect(s.seoDescription.length).toBeGreaterThanOrEqual(120);
      expect(s.seoDescription.length).toBeLessThanOrEqual(165);
      // Answer-first opener: sentence one must name the brand + a location term.
      expect(s.summary).toMatch(/^Golden North/);
      expect(s.summary.split(".")[0]).toMatch(/GTA|Toronto/);
    }
  });
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/lib/__tests__/services.test.ts`
Expected: FAIL — `seoTitle` undefined (and FAQ counts < 5 for tires/battery... tire-change has 3, tires 2, battery 3, roadside 3).

- [ ] **Step 3: Rewrite the services data**

In `src/lib/services.ts`, extend the interface:

```ts
export interface Service {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  /** <title> for the detail page — primary keyword first, ≤60 chars. */
  seoTitle: string;
  /** Meta description — 120–165 chars, answer + call-to-action. */
  seoDescription: string;
  summary: string;
  included: string[];
  whenYouNeed: string[];
  keywords: string[];
  faqs: { q: string; a: string }[];
}
```

Replace the four service entries with exactly this copy (`included` and `whenYouNeed` are unchanged from the current file — keep them verbatim; only fields shown as new/changed below):

**tire-change** — new fields + replacements:

```ts
    seoTitle: "Mobile Tire Change Toronto — Seasonal Swaps at Your Door",
    seoDescription:
      "24/7 mobile tire change across Toronto & the GTA. We come to your driveway, condo garage, or roadside for seasonal swaps and flats. Call (416) 558-5915.",
    summary:
      "Golden North provides 24/7 mobile tire change service across Toronto and the GTA — we come to your driveway, office parking lot, or condo garage to mount, balance, and swap your seasonal tires on-site. Whether you're switching to dedicated winters before the first Brampton snowfall or doing a spring changeover in Scarborough, the shop comes to you.",
    keywords: [
      "mobile tire change Toronto",
      "seasonal tire swap at home GTA",
      "winter tire changeover Toronto",
      "flat tire change Mississauga",
      "mobile tire swap Brampton",
      "on-rim tire change North York",
      "tire change at home Vaughan",
    ],
```

FAQs — keep the existing three verbatim, and add these three at the TOP of the array (order: cost, winter timing, duration, then the existing three):

```ts
      {
        q: "How much does a mobile tire change cost in Toronto?",
        a: "It depends on whether your tires are on rims (a straight swap) or need mounting and balancing, your vehicle type, and where you are in the GTA. On-rim seasonal swaps are the most affordable option. Call (416) 558-5915 with your vehicle and location and we'll give you a straight quote in under a minute — no hidden fees, no upsell.",
      },
      {
        q: "When should I put on winter tires in Ontario?",
        a: "The rule of thumb is the 7°C rule: once daytime temperatures stay consistently below 7°C — usually late October to mid-November in the GTA — all-season rubber hardens and loses grip, and it's time for winters. Keep them on until temperatures stay above 7°C in spring, typically mid-April. Booking your swap before the first snowfall rush means faster scheduling.",
      },
      {
        q: "How long does a mobile tire change take?",
        a: "A typical on-rim seasonal swap takes 30–45 minutes for a passenger car, SUV, or light truck — including torque to spec and setting pressures. Tires that need mounting and balancing on rims take longer; we'll give you a realistic time when you book.",
      },
```

**tires** — new fields + replacements:

```ts
    seoTitle: "New & Used Tires Delivered & Installed — Toronto & GTA",
    seoDescription:
      "New and quality used tires sourced in your size and installed at your home, office, or roadside anywhere in the GTA. Most sizes within 24 hours. Call 24/7.",
    summary:
      "Golden North sources new and quality used tires and installs them at your location anywhere in Toronto and the GTA — no hauling rims to a shop, no waiting room. We carry touring, all-season, winter, and all-terrain options in the sizes most common on GTA roads, from compact sedans to full-size pickups, at honest prices without chain-store upsell pressure.",
    keywords: [
      "used tires Toronto",
      "new tires installed at home GTA",
      "mobile tire installation Mississauga",
      "affordable winter tires Brampton",
      "same-day tire replacement Toronto",
      "buy one used tire GTA",
    ],
```

FAQs — keep the existing two verbatim (stock question first, used-tire safety second), then add these three:

```ts
      {
        q: "Can I buy just one tire instead of a full set?",
        a: "Yes. If one tire is damaged beyond repair, we can source a matching used tire close in tread depth to your remaining three — the safe way to replace a single tire without the expense of a full set. For all-wheel-drive vehicles we'll measure your existing tread first, since large differences can strain the drivetrain.",
      },
      {
        q: "How do I find my tire size?",
        a: "It's printed on the sidewall of your current tire and on the sticker inside the driver's door jamb — a code like 225/65R17. Text or tell us that code when you call and we'll confirm availability, usually within 24 hours for less common sizes.",
      },
      {
        q: "Should I buy new or used tires?",
        a: "Used makes sense when you're matching a single damaged tire, the vehicle is near the end of its life, or the budget is tight — every used tire we sell passes our tread and casing inspection. New is the better buy for a full winter set you'll run for years. We'll give you an honest recommendation either way; we sell both, so we have no reason to push one.",
      },
```

**battery** — new fields + replacements:

```ts
    seoTitle: "Mobile Car Battery Replacement Toronto — 24/7 Service",
    seoDescription:
      "Dead battery? Golden North tests, boosts, or replaces car batteries on the spot — home, work, or roadside across the GTA, 24/7. Call (416) 558-5915.",
    summary:
      "Golden North replaces car batteries on the spot anywhere in Toronto and the GTA, 24/7 — at your home, workplace, parking garage, or roadside. We test the battery and charging system first, boost it if that's all it needs, or install a fresh warranted unit from the van. A dead battery in a Toronto winter shouldn't mean waiting hours for a tow.",
    keywords: [
      "mobile battery replacement Toronto",
      "car battery boost GTA",
      "24/7 battery service Toronto",
      "dead battery help Mississauga",
      "on-site car battery change Brampton",
      "car battery installation at home GTA",
    ],
```

FAQs — keep the existing three verbatim, then add these two:

```ts
      {
        q: "How long does a car battery last in Canadian winters?",
        a: "Typically 3–5 years. Cold is the killer: at -18°C a battery delivers roughly half its rated cranking power, which is why batteries that limped through summer die on the first real cold morning. If yours is over 4 years old and the engine cranks slowly, have it load-tested before winter — we test free with any service call.",
      },
      {
        q: "How much does mobile battery replacement cost?",
        a: "The price depends on your battery's group size and type — standard flooded batteries cost less than the AGM units many newer vehicles require. You pay for the battery plus the service call; there's no tow bill and no shop labour markup. Call with your vehicle's year, make, and model for an exact quote before we roll.",
      },
```

**roadside** — new fields + replacements (existing three FAQs kept verbatim — the `How fast can you reach me in the GTA?` question is asserted by a test):

```ts
    seoTitle: "24/7 Roadside Assistance Toronto & GTA — No Membership",
    seoDescription:
      "Stranded? 24/7 roadside assistance across Toronto & the GTA — no membership needed. Flat tires, dead batteries, jump starts. One call: (416) 558-5915.",
    summary:
      "Golden North provides 24/7 roadside assistance across Toronto and the GTA with no membership required — flat tire changes, battery boosts, jump starts, and on-the-spot fixes that get you moving without the cost and delay of a tow. One call and we're en route: day, night, weekends, holidays.",
    keywords: [
      "roadside assistance Toronto",
      "24/7 roadside assistance GTA no membership",
      "flat tire help Toronto",
      "jump start service Mississauga",
      "emergency roadside Brampton",
      "highway 401 roadside assistance",
    ],
```

FAQs — keep the existing three verbatim, then add these three:

```ts
      {
        q: "Do I need a membership or subscription?",
        a: "No. Golden North is pay-per-call — you pay for the help you actually use, with no annual fee, no membership card, and no coverage limits per year. If you only need roadside help once every couple of winters, that usually costs far less than a club membership.",
      },
      {
        q: "What should I do while I wait on a highway shoulder?",
        a: "Pull as far right as you safely can, turn on your hazards, and stay in the vehicle with your seatbelt on unless you can exit away from traffic to a safe spot behind a barrier. At night, keep your parking lights on. We'll call when we're close so you know it's us pulling up behind you.",
      },
      {
        q: "What information should I have ready when I call?",
        a: "Your location (a highway marker, exit, intersection, or the nearest address), your vehicle's make, model, and colour, and what happened — flat, no-start, or something else. If you're not sure what's wrong, that's fine: describe what you see and hear and we'll triage on arrival.",
      },
```

- [ ] **Step 4: Run the lib tests to verify they pass**

Run: `npx vitest run src/lib/__tests__/services.test.ts`
Expected: PASS (all assertions).

- [ ] **Step 5: Run the whole suite to catch downstream copy assertions**

Run: `npx vitest run`
Expected: PASS — page tests use resilient regexes (`/tire change/i`, `/roadside/i`, `/how fast can you reach me/i` — all still present).

- [ ] **Step 6: Commit**

```bash
git add src/lib/services.ts src/lib/__tests__/services.test.ts
git commit -m "feat: answer-first SEO copy, expanded FAQs, per-service meta fields"
```

---

### Task 2: Service detail pages use the new SEO metadata fields

**Files:**
- Modify: `src/app/services/[slug]/page.tsx:29-33`
- Test: `src/app/services/[slug]/__tests__/detail.test.tsx`

**Interfaces:**
- Consumes: `service.seoTitle`, `service.seoDescription` from Task 1.
- Produces: detail page `<title>` = `"{seoTitle} | Golden North"` (via layout template), meta description = `seoDescription`.

- [ ] **Step 1: Add a failing metadata test**

Append to the `describe` block in `src/app/services/[slug]/__tests__/detail.test.tsx`:

```tsx
  it("builds keyword-first metadata from the service SEO fields", async () => {
    const { generateMetadata } = await import("@/app/services/[slug]/page");
    const m = await generateMetadata({ params: Promise.resolve({ slug: "tire-change" }) });
    expect(m.title).toBe("Mobile Tire Change Toronto — Seasonal Swaps at Your Door");
    expect(m.description).toContain("Call (416) 558-5915");
  });
```

(Also add `generateMetadata` to the existing import line if preferred over the dynamic import — either style is fine; match the file's existing import of `Page, { generateStaticParams }`.)

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run "src/app/services/[slug]/__tests__/detail.test.tsx"`
Expected: FAIL — title is currently `service.name` ("Mobile Tire Change") and description is `summary.slice(0,155)`.

- [ ] **Step 3: Point generateMetadata at the new fields**

In `src/app/services/[slug]/page.tsx` replace the `buildMetadata` call:

```ts
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
```

- [ ] **Step 4: Run the test file — expect PASS**

Run: `npx vitest run "src/app/services/[slug]/__tests__/detail.test.tsx"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add "src/app/services/[slug]/page.tsx" "src/app/services/[slug]/__tests__/detail.test.tsx"
git commit -m "feat: service detail metadata uses keyword-first seoTitle/seoDescription"
```

---

### Task 3: Home page — metadata, hero subhead, and section copy

**Files:**
- Modify: `src/app/page.tsx` (metadata + services H2/intro), `src/components/sections/Hero.tsx:33-36`, `src/components/sections/HowItWorks.tsx:12`, `src/components/sections/CoverageMap.tsx:23-27`, `src/components/sections/CTABand.tsx:25-28`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: no exported API changes — copy strings only.

- [ ] **Step 1: Rewrite home metadata**

In `src/app/page.tsx` replace the `metadata` export:

```ts
export const metadata = buildMetadata({
  title: "Mobile Tire Service Toronto & GTA — 24/7",
  description: `24/7 mobile tire change, new & used tires, battery replacement & roadside assistance across Toronto and the GTA. We come to you — call ${BUSINESS.phoneDisplay}.`,
  path: "/",
});
```

(Home renders as "Mobile Tire Service Toronto & GTA — 24/7 | Golden North" via `buildMetadata`'s root-page branding.)

- [ ] **Step 2: Keyword the home services heading**

In `src/app/page.tsx`, replace the services H2 and intro paragraph:

```tsx
            <h2 id="services-heading" className="font-bold text-4xl leading-[1.05] text-[var(--color-heading)] lg:text-5xl">
              Mobile tire change, batteries &amp; roadside —{" "}
              <span className="text-[var(--color-accent-deep)]">four ways we get you rolling.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-body)]">
              Whatever stopped you — a seasonal swap in Markham, a worn tire in Etobicoke, a dead
              battery downtown, a flat on the 401 — we bring the shop to your location and handle
              it on the spot.
            </p>
```

- [ ] **Step 3: Keyword the hero subhead**

In `src/components/sections/Hero.tsx` replace the subhead paragraph content:

```tsx
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-footer-fg)]">
              24/7 mobile tire service across Toronto &amp; the GTA — tire changes, new &amp; used
              tires, battery replacement and roadside help at your driveway, lot, or roadside.{" "}
              {BUSINESS.tagline}
            </p>
```

(H1 "We come to you." is untouched — brand voice; the keyword load sits in the adjacent paragraph.)

- [ ] **Step 4: City-flavour the HowItWorks step 02**

In `src/components/sections/HowItWorks.tsx` replace the step 02 body string:

```ts
    { n: "02", heading: "We head out.", body: "Tell us where you are — a Vaughan driveway, a Mississauga office lot, a shoulder on the 401. We come to you, anywhere in the GTA, day or night." },
```

- [ ] **Step 5: Keyword the CoverageMap paragraph**

In `src/components/sections/CoverageMap.tsx` replace the paragraph:

```tsx
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-body)]">
              {BUSINESS.shortName} runs mobile tire and roadside service across the full{" "}
              {BUSINESS.areaServed}. A Brampton driveway, a Markham condo garage, the shoulder of
              the 401 through Mississauga — one call reaches us.
            </p>
```

- [ ] **Step 6: Keyword the CTABand body**

In `src/components/sections/CTABand.tsx` replace the body paragraph:

```tsx
        <p className="mx-auto mt-5 mb-9 max-w-md text-lg leading-relaxed text-[var(--color-body)]">
          One call to {BUSINESS.shortName} gets a mobile tire and roadside technician moving to
          your location, anywhere in the GTA — no app, no queue, no tow. Day, night, weekends,
          holidays.
        </p>
```

- [ ] **Step 7: Run the suite**

Run: `npx vitest run`
Expected: PASS — home test asserts service card headings (unchanged) only.

- [ ] **Step 8: Commit**

```bash
git add src/app/page.tsx src/components/sections/Hero.tsx src/components/sections/HowItWorks.tsx src/components/sections/CoverageMap.tsx src/components/sections/CTABand.tsx
git commit -m "feat: keyword-first home metadata and section copy"
```

---

### Task 4: Services index, contact, gallery metadata + photo alt text

**Files:**
- Modify: `src/app/services/page.tsx:13-17,30`, `src/app/contact/page.tsx:15-19`, `src/app/gallery/page.tsx:12-16`, `src/lib/photos.ts`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: copy strings only.

- [ ] **Step 1: Services index metadata + intro**

In `src/app/services/page.tsx`:

```ts
export const metadata = buildMetadata({
  title: "Mobile Tire & Roadside Services — Toronto & the GTA",
  description: `Mobile tire change, new & used tires, battery replacement, and 24/7 roadside assistance across the GTA. ${BUSINESS.shortName} brings the shop to you — call ${BUSINESS.phoneDisplay}.`,
  path: "/services",
});
```

And the `PageHeader` intro prop:

```tsx
        intro={`Mobile tire change, new & used tires, battery replacement, and 24/7 roadside assistance — everywhere in the ${BUSINESS.areaServed}. No shop visit, no tow, no wasted Saturday. Pick what stopped you, or just call and tell us.`}
```

- [ ] **Step 2: Contact metadata**

In `src/app/contact/page.tsx`:

```ts
export const metadata = buildMetadata({
  title: "Contact — 24/7 Mobile Tire & Roadside Help in the GTA",
  description: `Reach ${BUSINESS.name} 24/7 for mobile tire change, battery, and roadside help anywhere in the GTA. Call ${BUSINESS.phoneDisplay} — or send a message.`,
  path: "/contact",
});
```

- [ ] **Step 3: Gallery metadata**

In `src/app/gallery/page.tsx`:

```ts
export const metadata = buildMetadata({
  title: "Mobile Tire Service Photos — On the Job Across the GTA",
  description: `Real ${BUSINESS.shortName} jobs across the GTA: driveway tire changes, night roadside rescues, battery swaps, and the fully-equipped mobile tire van.`,
  path: "/gallery",
});
```

- [ ] **Step 4: Sharpen photo alt text**

In `src/lib/photos.ts`, replace these `alt` values (all others stay — they're already descriptive and honest):

```ts
// SERVICE_PHOTO
  "tire-change": { ...,
    alt: "Golden North mobile tire change on a red Mercedes on a Toronto residential street, yellow service van parked behind",
  },
  tires: { ...,
    alt: "Racks of new and used tires in common GTA sizes, ready for on-site installation at your home or office",
  },
  battery: { ...,
    alt: "Night mobile battery and tire service for a MINI at a lit Toronto gas station, the open yellow van alongside",
  },
  roadside: { ...,
    alt: "Late-night GTA roadside assistance: a sedan up on the jack with the Golden North van's headlights lighting the work",
  },
```

And in `GALLERY`, replace only these entries' alts:

```ts
  { src: "/photos/action-mercedes-street.webp", alt: "Mobile tire change on a red Mercedes on a Toronto residential street", ... },
  { src: "/photos/action-porsche-winter.webp", alt: "Red Porsche Taycan getting a winter tire changeover in a GTA parking lot", ... },
  { src: "/photos/van-mansion-driveway.webp", alt: "Golden North mobile tire service van in a large GTA home driveway", ... },
  { src: "/photos/night-sedan-roadside.webp", alt: "Night roadside assistance tire change lit by the van's headlights", ... },
  { src: "/photos/tires-warehouse.webp", alt: "Warehouse racks of new and used tires for GTA mobile installation", ... },
  { src: "/photos/tire-puncture.webp", alt: "Punctured winter tire — the kind of flat tire Golden North replaces on the spot", ... },
  { src: "/photos/night-mini-station.webp", alt: "24/7 night mobile battery service for a MINI at a lit gas station", ... },
```

(`...` = keep that entry's existing `src` and `ratio` untouched; only the `alt` string changes.)

- [ ] **Step 5: Run the suite**

Run: `npx vitest run`
Expected: PASS (gallery test only requires alt length > 3).

- [ ] **Step 6: Commit**

```bash
git add src/app/services/page.tsx src/app/contact/page.tsx src/app/gallery/page.tsx src/lib/photos.ts
git commit -m "feat: keyword-first metadata for services/contact/gallery, sharpened alt text"
```

---

### Task 5: Full verification + metadata audit

**Files:**
- No new files. Read-only audit + build.

**Interfaces:**
- Consumes: everything above.
- Produces: green build, verified metadata.

- [ ] **Step 1: Full test suite**

Run: `npx vitest run`
Expected: all tests pass (26+ tests).

- [ ] **Step 2: Production build**

Run: `npx next build`
Expected: build succeeds; all 4 `/services/[slug]` routes statically generated.

- [ ] **Step 3: Metadata audit against the spec checklist**

Verify by inspection (grep the built output or the source):
- Every page title unique, primary keyword present, ≤60 chars before the " | Golden North" suffix.
- Every meta description 120–165 chars and contains a call-to-action ("call", "Call (416) 558-5915", or equivalent).
- Each service `summary` first sentence names Golden North + Toronto/GTA (answer-first).
- FAQ counts: tire-change 6, tires 5, battery 5, roadside 6.
- `FaqJsonLd` renders the expanded FAQ sets (rendered on each service detail page automatically).

- [ ] **Step 4: Commit any audit fixes**

If the audit found copy tweaks (e.g., a description out of range), fix and:

```bash
git add -u
git commit -m "fix: metadata audit corrections"
```

If nothing to fix, no commit — task complete.
