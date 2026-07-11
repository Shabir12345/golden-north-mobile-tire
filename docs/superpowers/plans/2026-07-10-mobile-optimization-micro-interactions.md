# Mobile Optimization + Micro-Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add polished CSS-only micro-interactions to the GoldenNorth site and fix every mobile-usability issue found in a phone-width browser audit.

**Architecture:** All motion is CSS keyframes/transitions defined once in `src/app/globals.css` and consumed by components as utility classes. No new dependencies, no new client components. The existing global `prefers-reduced-motion` rule (globals.css:89-92) suppresses all of it automatically because every new effect is an `animation` or `transition`.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4 (`@theme` tokens in globals.css), vitest + testing-library.

## Global Constraints

- **No new dependencies** — CSS only; `package.json` dependencies must not change.
- **Design system (DESIGN.md):** gold `#F0A500` is the only accent; gold fills always carry navy text; no second hue, no glow/hazard/emergency motifs; gold-as-text on light surfaces uses `#8C6200`.
- **Reduced motion:** every effect must be an `animation`/`transition` so the existing global suppression rule covers it; any element hidden pre-animation must be visible when animations are disabled (use `both` fill + visible base state, or off-canvas pseudo-elements that simply never move).
- **No-blank guarantee:** if JS never runs, all content stays visible (existing `Reveal` contract — do not weaken it).
- **AGENTS.md:** this repo's Next.js has breaking changes vs. training data — read the relevant guide in `node_modules/next/dist/docs/` before writing any Next-specific code (Image, Link, metadata).
- Repo commands: `npm run test` (vitest), `npm run lint`, `npm run build`. Windows/PowerShell environment; Bash tool runs Git Bash.

---

### Task 1: Motion foundation in globals.css

**Files:**
- Modify: `src/app/globals.css` (append to the `/* ── Motion ── */` section, after the `.reveal` rules at line ~87, BEFORE the `prefers-reduced-motion` block so the suppression rule stays last)

**Interfaces:**
- Produces CSS classes consumed by later tasks: `.btn-shine`, `.link-grow`, `.card-lift`, `.compass-spin`, `.menu-panel`, `.menu-item`, and keyframes `phoneRing`, `shineSweep`, `menuPanelIn`, `menuItemIn`, `compassSpin`.

- [ ] **Step 1: Append the motion CSS**

Insert the following into `src/app/globals.css` immediately after the `.reveal.is-armed.is-in { ... }` rule and before the `@media (prefers-reduced-motion: reduce)` block:

```css
/* Phone-icon ring wiggle — played on CallButton hover (see Button.tsx). */
@keyframes phoneRing {
  0%, 100% { transform: rotate(0deg); }
  20%      { transform: rotate(-14deg); }
  40%      { transform: rotate(10deg); }
  60%      { transform: rotate(-7deg); }
  80%      { transform: rotate(4deg); }
}

/* One-time gold sheen sweep across primary call buttons shortly after load.
   The overlay lives off-canvas (translateX(-130%)) so with animations
   disabled it simply never appears. Lighter gold, not white, not a glow. */
@keyframes shineSweep {
  from { transform: translateX(-130%) skewX(-18deg); }
  to   { transform: translateX(130%) skewX(-18deg); }
}
.btn-shine { position: relative; overflow: hidden; }
.btn-shine::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  transform: translateX(-130%) skewX(-18deg);
  background: linear-gradient(100deg, transparent 32%, rgba(255, 222, 130, 0.5) 50%, transparent 68%);
  animation: shineSweep 1.1s var(--ease-out-quart) 0.9s 1 both;
}

/* Mobile menu entrance — panel slides/fades, items cascade (delay inline). */
@keyframes menuPanelIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes menuItemIn {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.menu-panel { animation: menuPanelIn 0.25s var(--ease-out-quart) both; }
.menu-item  { animation: menuItemIn 0.3s var(--ease-out-quart) both; }

/* Compass watermark — one turn every 140s, barely perceptible. */
@keyframes compassSpin { to { transform: rotate(360deg); } }
.compass-spin {
  animation: compassSpin 140s linear infinite;
  transform-origin: 50% 50%;
}

/* Underline-grow for text links (uses currentColor so it inherits the
   link's hover color). */
.link-grow {
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-repeat: no-repeat;
  background-position: 0 100%;
  transition: background-size 0.25s var(--ease-out-quart);
}
.link-grow:hover { background-size: 100% 1px; }

/* Card hover — soft lift + gold border. Pair with existing border/shadow
   classes on the card. */
.card-lift {
  transition:
    transform 0.2s var(--ease-out-quart),
    box-shadow 0.2s var(--ease-out-quart),
    border-color 0.2s var(--ease-out-quart);
}
.card-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px -12px rgba(16, 32, 63, 0.18);
  border-color: var(--color-accent);
}
```

- [ ] **Step 2: Verify build and reduced-motion ordering**

Run: `npm run build`
Expected: build succeeds. Manually confirm in the file that the `@media (prefers-reduced-motion: reduce)` block still appears AFTER all new rules.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: motion foundation — keyframes and utility classes for micro-interactions"
```

---

### Task 2: Button press feel + phone-icon ring wiggle

**Files:**
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/contact/ContactForm.tsx` (submit button, line ~148)
- Test: `src/components/ui/__tests__/Button.test.tsx` (existing tests must keep passing; no new assertions needed — changes are class-only)

**Interfaces:**
- Consumes: keyframe `phoneRing` from Task 1.
- Produces: no API changes; `Button`/`CallButton` props unchanged.

- [ ] **Step 1: Add press-down scale to both variants**

In `src/components/ui/Button.tsx`, change the `primaryStyles` array:

```tsx
// Primary: navy-on-gold. AA: #151D2E on #F0A500 ≈ 8:1 (hover gold ≈ 6.6:1).
const primaryStyles = [
  "bg-[var(--color-accent)] text-[var(--color-navy)] shadow-sm",
  "hover:bg-[#D99500] hover:-translate-y-0.5 hover:shadow-md",
  "active:translate-y-0 active:scale-[0.98] active:duration-75",
].join(" ");
```

and the `ghostStyles` array:

```tsx
// Ghost: bordered card; reads as secondary on light and navy surfaces alike.
const ghostStyles = [
  "bg-white/95 text-[var(--color-heading)] border border-[var(--color-border)]",
  "hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]",
  "active:scale-[0.98] active:duration-75",
].join(" ");
```

- [ ] **Step 2: Replace the static phone-icon rotate with the ring wiggle**

In `CallButton` (same file, line ~111), change:

```tsx
<PhoneIcon className="transition-transform duration-200 group-hover/btn:-rotate-12" />
```

to:

```tsx
<PhoneIcon className="group-hover/btn:animate-[phoneRing_0.6s_ease-in-out]" />
```

- [ ] **Step 3: Mirror the press feel on the contact form submit button**

In `src/components/contact/ContactForm.tsx`, in the submit `<button>` className (line ~148), change `active:translate-y-0` to `active:translate-y-0 active:scale-[0.98] active:duration-75`.

- [ ] **Step 4: Run the tests**

Run: `npm run test`
Expected: all pass (Button tests assert href/text, not classes).

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Button.tsx src/components/contact/ContactForm.tsx
git commit -m "feat: button press-down feel and phone-icon ring wiggle"
```

---

### Task 3: Call-button shine sweep

**Files:**
- Modify: `src/components/ui/Button.tsx` (CallButton only)

**Interfaces:**
- Consumes: `.btn-shine` from Task 1.
- Produces: no API changes.

- [ ] **Step 1: Add the class to CallButton**

In `src/components/ui/Button.tsx`, in `CallButton`, pass the class through to `Button`:

```tsx
    <Button
      variant="primary"
      size={size}
      href={telHref}
      aria-label={`Call GoldenNorth at ${BUSINESS.phoneDisplay}`}
      className={`btn-shine ${className ?? ""}`.trim()}
    >
```

This covers every CallButton instance (header, hero, CTA bands, MobileCallBar). Plain `Button` primaries (e.g. "See services") intentionally do NOT shine — the sweep marks the call action only.

- [ ] **Step 2: Visual check**

Run: `npm run dev` (background), open `http://localhost:3000` in the browser at desktop and ~375px widths.
Expected: ~0.9s after load, a single subtle lighter-gold sheen sweeps across the gold call buttons once. It must read as a glint, not a flash — if it draws the eye harder than the button label, lower the gradient alpha from 0.5 to 0.35 in globals.css.

- [ ] **Step 3: Run tests and commit**

Run: `npm run test` — expected: all pass.

```bash
git add src/components/ui/Button.tsx
git commit -m "feat: one-time gold shine sweep on call buttons"
```

---

### Task 4: Animated mobile menu open

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Test: `src/components/layout/__tests__/Header.test.tsx`

**Interfaces:**
- Consumes: `.menu-panel`, `.menu-item` from Task 1.
- Produces: mobile nav panel is now conditionally rendered (`{menuOpen && ...}`) instead of toggled with the `hidden` attribute, so the entrance animation replays on every open. `aria-expanded`/`aria-controls` behavior unchanged.

- [ ] **Step 1: Write the failing test**

Add to `src/components/layout/__tests__/Header.test.tsx`:

```tsx
import userEvent from "@testing-library/user-event";

describe("Header mobile menu", () => {
  it("mounts the panel on open and unmounts it on close", async () => {
    const user = userEvent.setup();
    render(<Header />);
    expect(document.getElementById("mobile-nav")).toBeNull();

    const toggle = screen.getByRole("button", { name: /open navigation menu/i });
    await user.click(toggle);
    expect(document.getElementById("mobile-nav")).not.toBeNull();
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: /close navigation menu/i }));
    expect(document.getElementById("mobile-nav")).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- Header`
Expected: FAIL — the panel currently always exists in the DOM (`hidden` attribute), so the initial `toBeNull()` assertion fails.

- [ ] **Step 3: Conditionally render the panel with animation classes**

In `src/components/layout/Header.tsx`, replace the mobile-nav block (`<div id="mobile-nav" hidden={!menuOpen} ...>` through its closing `</div>`) with:

```tsx
      {menuOpen && (
        <div
          id="mobile-nav"
          className="menu-panel md:hidden border-t border-white/10 bg-[var(--color-navy)] px-4 py-5"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                aria-current={isActive(href) ? "page" : undefined}
                style={{ animationDelay: `${i * 40}ms` }}
                className={`menu-item text-base px-2 py-3 border-b border-white/10 last:border-0 rounded-md transition-colors duration-150 hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-navy)] ${
                  isActive(href) ? "font-semibold text-[var(--color-accent)]" : "font-medium text-white/85"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="menu-item mt-4" style={{ animationDelay: `${NAV.length * 40}ms` }}>
            <AvailabilityBadge variant="line" onDark />
          </div>
        </div>
      )}
```

(The `{menuOpen && ...}` wrapper replaces both the old `hidden={!menuOpen}` and the old inner `{menuOpen && ...}` around the badge.)

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test -- Header`
Expected: PASS (new test and both existing tests).

- [ ] **Step 5: Visual check**

With `npm run dev` running, at ~375px width open and close the menu.
Expected: panel fades/slides down in ~250ms; items cascade top-to-bottom; close is instant (no exit animation — intentional, keeps it JS-free).

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/__tests__/Header.test.tsx
git commit -m "feat: animated mobile menu with staggered items"
```

---

### Task 5: Compass rose slow rotation

**Files:**
- Modify: `src/components/ui/CompassRose.tsx`

**Interfaces:**
- Consumes: `.compass-spin` from Task 1.
- Produces: no API change; all existing call sites (Hero, Footer, HowItWorks if present) pick it up automatically.

- [ ] **Step 1: Add the class inside the component**

In `src/components/ui/CompassRose.tsx`:

```tsx
export function CompassRose({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={`compass-spin ${className}`.trim()}
      fill="currentColor"
    >
```

Note: call sites position the svg with inset utilities (`absolute -right-24 -top-24`), not transforms, so `rotate` does not conflict.

- [ ] **Step 2: Visual check**

With dev server running, watch the hero and footer watermarks for ~10 seconds.
Expected: rotation is barely perceptible (360° per 140s ≈ 2.6°/s). No layout shift, no scroll jank.

- [ ] **Step 3: Run tests and commit**

Run: `npm run test` — expected: all pass.

```bash
git add src/components/ui/CompassRose.tsx
git commit -m "feat: near-imperceptible compass watermark rotation"
```

---

> **Spec note — staggered reveals:** the spec's "extend `Reveal` with a `delay` prop" item is already implemented (`src/components/ui/Reveal.tsx:23` accepts `delay`, applied as `animationDelay`) and already used with stagger on the home gallery (`src/app/page.tsx:96`, `i * 60`) and HowItWorks (`i * 90`). No task needed; Task 8's audit checklist verifies no other grid reveals as an unstaggered block.

### Task 6: Link underline-grow + consistent card lift

**Files:**
- Modify: `src/components/layout/Header.tsx` (desktop nav links)
- Modify: `src/components/layout/Footer.tsx` (footer nav links)
- Modify: `src/app/blog/page.tsx:56` (post cards)
- Modify: `src/app/blog/[slug]/page.tsx:144` (related-post cards)
- Modify: `src/app/services/[slug]/page.tsx:147` (related-service cards)

**Interfaces:**
- Consumes: `.link-grow`, `.card-lift` from Task 1.

- [ ] **Step 1: Underline-grow on header desktop nav**

In `src/components/layout/Header.tsx`, desktop nav `<Link>` (line ~77), add `link-grow` to the className string (prepend it: `` `link-grow text-sm rounded-md ...` ``).

- [ ] **Step 2: Underline-grow on footer nav**

In `src/components/layout/Footer.tsx`, footer nav `<Link>` (line ~91), prepend `link-grow` to the className.

- [ ] **Step 3: Card lift on the three card grids**

In each of the three files below, add `card-lift` to the card's className (it already has `transition-colors duration-200 hover:border-[var(--color-accent)]` — REMOVE `transition-colors duration-200` and `hover:border-[var(--color-accent)]` from those classNames since `.card-lift` now owns border-color, shadow, and transform transitions):

- `src/app/blog/page.tsx:56` — the post card `<Link className="group flex flex-col rounded-xl border ...">`
- `src/app/blog/[slug]/page.tsx:144` — the related-post card `<Link className="group rounded-lg border ...">`
- `src/app/services/[slug]/page.tsx:147` — the related-service card `<Link className="group flex items-center justify-between ...">`

Keep `group-hover:` text-color effects on inner elements — those still need a transition, so where an inner element relies on the removed `transition-colors`, it already has its own `transition-*` classes (verify per file; add `transition-colors duration-200` to the inner heading spans if they lack it).

- [ ] **Step 4: Run tests + visual check**

Run: `npm run test` — expected: all pass.
With dev server running: hover a blog card, related-service card, header/footer nav links.
Expected: cards lift 3px with gold border + soft shadow; nav underlines grow left-to-right in the link's hover color.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/Footer.tsx src/app/blog/page.tsx "src/app/blog/[slug]/page.tsx" "src/app/services/[slug]/page.tsx"
git commit -m "feat: underline-grow nav links and consistent card hover lift"
```

---

### Task 7: Known mobile fixes — footer clearance + tap targets

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Test: `src/components/layout/__tests__/Footer.test.tsx` (existing tests must keep passing)

**Interfaces:**
- Consumes: nothing new.
- Produces: footer is fully readable above the fixed MobileCallBar on phones.

- [ ] **Step 1: Footer clearance for the fixed MobileCallBar**

`<main>` has `pb-20 md:pb-0` (layout.tsx:44), but the Footer renders AFTER `<main>`, so on phones the fixed MobileCallBar covers the footer's last row (copyright/socials). The bar is `position: fixed`, so clearance only matters at full scroll depth — where the footer is the last element. Move the clearance into the Footer so the spacing lives in one place:

- `src/app/layout.tsx`: change `<main className="pb-20 md:pb-0">{children}</main>` to `<main>{children}</main>` and delete the `pb-20` comment above it.
- `src/components/layout/Footer.tsx` inner container (line ~41): replace `py-14 sm:py-16` with explicit top/bottom padding:

```tsx
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-14 sm:pt-16 pb-36 md:pb-16">
```

(`pb-36` = 144px clears the ~76px bar plus safe-area inset with margin; `md:pb-16` restores the desktop value.)

- [ ] **Step 2: Footer nav + social tap targets**

In `src/components/layout/Footer.tsx`:
- Footer nav links (line ~91): add `inline-block py-2` to the className so each is ≥44px tall including padding.
- Social icon links (lines ~99 and ~102): add `p-2 -m-1` so the 18px icons get a ~34px hit area without shifting layout (icons sit in a `gap-5` row; effective spacing stays comfortable).

- [ ] **Step 3: Run tests + visual check**

Run: `npm run test` — expected: all pass.
With dev server at ~375px: scroll to the very bottom of any page.
Expected: the copyright line and social icons are fully visible above the MobileCallBar; no content is covered at full scroll depth.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx src/app/layout.tsx
git commit -m "fix: footer clears fixed mobile call bar; bigger footer tap targets"
```

---

### Task 8: Phone-width browser audit of every page

**Files:**
- Modify: whatever the audit finds (expected candidates: page-level spacing, `Photo`/`Image` `sizes` attributes, text scaling, overflow)

**Interfaces:**
- Consumes: the running dev server; browser automation tools (claude-in-chrome or Playwright plugin) or manual viewport resize.

This task is exploratory by design: the spec scopes it to "mobile usability fixes found in the audit; unrelated refactors are not in scope."

- [ ] **Step 1: Start the dev server and set up a phone viewport**

Run: `npm run dev` (background). Open a browser tab at 375×812 (iPhone 13 mini class), then repeat findings-checks at 430×932 (Pro Max class).

- [ ] **Step 2: Audit every route against the checklist**

Routes: `/`, `/services`, `/services/flat-tire-change` (or first slug from `src/lib/services.ts`), `/gallery`, `/blog`, first blog post from `content/`, `/contact`.

Checklist per page:
1. **No horizontal overflow** — `document.documentElement.scrollWidth === window.innerWidth` (check via console).
2. **Tap targets ≥ 44px** — nav links, FAQ summaries, gallery tiles, pagination/related links.
3. **Type scale** — headings don't wrap awkwardly or overflow; body ≥ 16px; no clipped `clamp()` values.
4. **Fixed-bar clearance** — bottom-of-page content visible above MobileCallBar (Task 7 should cover; verify).
5. **Form usability (contact)** — inputs ≥ 16px font (they use `text-base`, verify computed), labels visible, error states readable, submit reachable.
6. **Images** — no distorted ratios, `sizes` attributes sensible for ~100vw phone rendering, hero image not causing CLS.
7. **Animations from Tasks 1-6** — shine sweep visible once, menu animation smooth, no scroll jank from compass rotation.

- [ ] **Step 3: Fix every finding**

For each issue: fix it in the relevant component/page, re-check in the browser at both widths. Keep each fix design-system compliant.

- [ ] **Step 4: Record findings + run the suite**

List every finding and its fix in the commit body. Run: `npm run test` and `npm run lint` — expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix: mobile audit fixes across all pages at phone widths"
```

(If the audit finds nothing to fix, skip the commit and note "audit clean" in the task report.)

---

### Task 9: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Full suite**

Run: `npm run test` — expected: all pass.
Run: `npm run lint` — expected: clean.
Run: `npm run build` — expected: build succeeds, no new warnings.

- [ ] **Step 2: Reduced-motion spot check**

In the browser (DevTools → Rendering → emulate `prefers-reduced-motion: reduce`), reload `/` at phone width.
Expected: no shine sweep, no compass rotation, no menu/reveal animations; ALL content fully visible (nothing stuck hidden).

- [ ] **Step 3: Full-page phone pass**

One last scroll-through of every route at 375px confirming the animation set feels "premium and calm": nothing loops visibly except the near-static compass, nothing flashes, the call button remains the loudest object.
