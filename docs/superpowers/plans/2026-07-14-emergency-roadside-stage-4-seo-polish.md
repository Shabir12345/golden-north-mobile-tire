# Emergency Roadside Repositioning — Stage 4: SEO Audit & Polish

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align every remaining surface (schema, docs, blog links, contact/CTA copy) with the emergency-roadside positioning, run the SEO agents over the finished site, apply their findings, and close with a full verification pass.

**Architecture:** No new components. This stage is copy/schema/docs alignment plus audit-driven fixes. The one code-level change is upgrading the LocalBusiness JSON-LD to include `EmergencyService`.

**Prerequisite:** Stages 1–3 merged; `npm run build` clean with 17 service routes and the new homepage.

**Spec:** `docs/superpowers/specs/2026-07-14-emergency-roadside-redesign-design.md`

## Global Constraints

Same copy rules as all stages: ETA phrase "in as little as 20–30 minutes"; pricing "fair, upfront price quoted on the call — no membership, no hidden fees"; banned cheap/affordable/best/premier/#1; no dollar figures; claims limited to `src/lib/trust.ts`; seoTitle ≤60, seoDescription 120–165. `npm run test` green before every commit. Commits end with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: EmergencyService schema + root metadata

**Files:**
- Modify: `src/lib/jsonld.tsx:7` (`@type` array)
- Modify: `src/lib/__tests__/jsonld.test.tsx`
- Modify: `src/app/layout.tsx:17-22` (default title/description)

- [ ] **Step 1: Failing test** — in `jsonld.test.tsx`, assert the business type includes EmergencyService:

```tsx
it("declares the business as an EmergencyService", () => {
  const { container } = render(<LocalBusinessJsonLd />);
  const data = JSON.parse(container.querySelector("script")!.innerHTML);
  expect(data["@type"]).toEqual(["LocalBusiness", "AutoRepair", "EmergencyService"]);
});
```

Run: `npm run test -- jsonld` — Expected: FAIL.

- [ ] **Step 2: Implement**

In `src/lib/jsonld.tsx` change:

```ts
"@type": ["LocalBusiness", "AutoRepair", "EmergencyService"],
```

In `src/app/layout.tsx` update the default metadata:

```ts
title: {
  default: "GoldenNorth — 24/7 Roadside Assistance & Mobile Tire Service, Toronto & GTA",
  template: `%s | ${BUSINESS.shortName}`,
},
description:
  "24/7 emergency roadside assistance across Toronto & the GTA — mobile tire service, battery jump starts, car lockouts, and mobile mechanics. We come to you.",
```

- [ ] **Step 3: Run + commit**

Run: `npm run test` — Expected: PASS.

```bash
git add src/lib/jsonld.tsx src/lib/__tests__/jsonld.test.tsx src/app/layout.tsx
git commit -m "feat: EmergencyService schema type + roadside-first root metadata"
```

---

### Task 2: Site-wide copy & link sweep

**Files (audit-driven — the greps define the worklist):**
- Modify: `src/lib/faqs.ts` (SERVICES_FAQS + CONTACT_FAQS mention only tires/batteries — widen to the 5-service catalog)
- Modify: `src/app/contact/page.tsx`, `src/components/sections/CTABand.tsx`, `src/components/sections/HowItWorks.tsx`, `src/components/sections/CoverageMap.tsx` (wherever the greps hit)
- Modify: `content/blog/*.md` (internal links to redirected URLs)

- [ ] **Step 1: Find every stale reference**

```bash
grep -rn "45–90\|45-90" src/ content/
grep -rn "services/tire-change\|services/tires\|services/battery\b\|services/roadside\b" src/ content/
grep -rn "four ways\|tire change, new & used\|mobile tire change, new" src/ -i
```

- [ ] **Step 2: Fix each hit**

- Any `45–90` → rewrite the sentence around "in as little as 20–30 minutes" (keep honesty qualifiers like "depending on location and traffic").
- Blog-post links: `/services/tire-change` → `/services/mobile-tire-service/seasonal-tire-change`; `/services/tires` → `/services/mobile-tire-service/new-used-tires`; `/services/battery` → `/services/battery-jump-start`; `/services/roadside` → `/services/roadside-assistance`.
- `SERVICES_FAQS` first two answers: widen the service list to "roadside assistance, mobile tire service, battery jump starts, car lockouts, and mobile mechanic repairs".
- CTABand / HowItWorks / contact page: ensure the sequence reads call → fair quote & dispatch → back on the road, that at least one of them carries the ETA phrase verbatim, and that any service enumeration covers the five categories (not just tires/batteries).

- [ ] **Step 3: Verify + commit**

Run: `npm run test` — Expected: PASS. Re-run the Step 1 greps — Expected: zero hits (excluding this plan/spec under `docs/`).

```bash
git add -A
git commit -m "fix: sweep stale ETA, slugs, and tire-only copy site-wide"
```

---

### Task 3: PRODUCT.md repositioning

**Files:**
- Modify: `PRODUCT.md`

- [ ] **Step 1: Update the drifted sections** (keep the document's voice; these are content replacements, not a rewrite):

- **Product Purpose**: describe the business as "a 24/7 emergency roadside assistance and mobile vehicle-service business serving the GTA (roadside assistance, mobile tire service, battery jump starts, car lockouts, mobile mechanic)"; ranking targets now include "roadside assistance Toronto", "car lockout Toronto", "mobile mechanic Toronto".
- **Users**: add lockout/no-start/out-of-gas scenarios alongside tires.
- **Brand Personality**: type system line changes from "Inter type" to "Barlow type (Barlow Condensed display)".
- Add to **Design Principles** (as principle 6):

```markdown
6. **Attention is rationed.** Repeating motion is reserved for the three
   conversion anchors (live-dispatch dot, call button pulse, review badge);
   everything else animates once or on hover. The 20–30 minute promise is
   always phrased "in as little as 20–30 minutes."
```

- Anywhere "45–90" or a four-service list appears, update to the five-service catalog and the new ETA phrasing.

- [ ] **Step 2: Commit**

```bash
git add PRODUCT.md
git commit -m "docs: PRODUCT.md reflects emergency-roadside positioning"
```

---

### Task 4: SEO agent audit + apply findings

No files listed upfront — the audit produces the worklist.

- [ ] **Step 1: Build and audit content quality**

Run `npm run build`, then dispatch the **seo-content** agent over the built pages (home, one main service, one sub-service, services overview) asking for: E-E-A-T signals, thin-content flags on the 12 sub-pages, title/meta quality, and heading hierarchy. Dispatch **seo-schema** to validate the JSON-LD (LocalBusiness/EmergencyService, Service, FAQPage, BreadcrumbList — duplicate-FAQ-schema check across URLs in particular).

- [ ] **Step 2: Triage findings**

Apply: factual errors, schema validation failures, duplicate FAQ schema, heading-hierarchy breaks, meta-length violations, thin-content pages needing one more substantive paragraph (write it in the catalog data, following the copy rules).
Reject (log why in the commit message): anything that violates Global Constraints — keyword-stuffed titles, dollar-figure suggestions, superlatives, fabricated review markup (`AggregateRating` must NOT be added to JSON-LD from Featurable numbers unless the reviews are displayed on-page — the carousel counts; if seo-schema recommends it, wire it to `getReviewStats()` with the same null-guard, never hardcoded).

- [ ] **Step 3: Verify + commit**

Run: `npm run test && npm run build` — Expected: PASS/clean.

```bash
git add -A
git commit -m "fix: apply SEO audit findings across service catalog and schema"
```

---

### Task 5: Final verification pass

- [ ] **Step 1: Full checks**

```bash
npm run lint && npm run test && npm run build
```

Expected: all clean.

- [ ] **Step 2: Manual conversion-path walkthrough** (`npm run dev`, phone-width 390px and desktop):

1. Home: hero readable in 3 seconds; call button pulsing; review badge live; dispatch dot breathing; nothing else moving at rest.
2. Tap-targets: header call button, hero call button, sticky mobile bar, footer phone — all ≥44px and reachable.
3. Grid: 5 cards, pills navigate to all 12 subs; each sub page renders its own copy (spot-check 4).
4. Redirects: all four legacy URLs land correctly.
5. Reduced motion: everything inert.
6. No horizontal scroll at 360px; footer clears the mobile call bar.

Fix anything found; re-run step 1.

- [ ] **Step 3: Close out**

```bash
git add -A
git commit -m "chore: final verification fixes for emergency-roadside repositioning"
```

Update the spec's status line to "Implemented" and note any deviations at the bottom of the spec file; commit.

---

## Stage 4 exit criteria

- Zero stale references (ETA, slugs, four-service copy) anywhere in `src/` or `content/`.
- EmergencyService schema live; SEO agent findings triaged and applied or logged.
- Lint, tests, build green; manual conversion-path walkthrough passes on mobile and desktop.
