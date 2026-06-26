# Golden North Mobile Tires Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern, SEO-optimized "Midnight & Gold" marketing website for Golden North Mobile Tires (Home, Services overview, 4 service pages, Gallery, Contact) with call-first conversion.

**Architecture:** Next.js App Router with static generation. A typed content layer (business NAP constants + service definitions) feeds reusable components and per-page SEO metadata/JSON-LD. Tailwind theme tokens centralize the palette/typography. Contact form posts to a Next.js Route Handler with a swappable email provider.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, `next/font`, Vitest + React Testing Library, Vercel.

## Global Constraints

- **Business NAP (use verbatim everywhere):** Name "Golden North Mobile Tire Services"; Phone "(416) 558-5915" → `tel:+14165585915`; Email "info.goldennorth@gmail.com"; Service area "Greater Toronto Area, Ontario, Canada"; Hours "Open 24/7"; Tagline "The best waiting room is the living room."; Socials: TikTok, Instagram.
- **Call-first:** The gold "Call (416) 558-5915" action is the primary CTA on every page. Any form/contact link is a secondary (ghost/outline) action and must never visually outrank the call button.
- **Palette tokens:** `midnight #0B1220`, `ink #070B12`, `gold #E8B04B`, `gold-deep #C9912E`, `frost #E9EEF5`, `slate-muted #8A97A8`, `signal #F5A623`.
- **Fonts:** Headlines Saira Condensed; body Inter (both via `next/font`).
- **Accessibility:** WCAG-AA contrast, alt text on all images, visible focus states, `prefers-reduced-motion` honored for glow/animations.
- **No secrets in repo.** Email provider key via `RESEND_API_KEY` env var; site degrades gracefully when unset.
- **Node:** 20+. Package manager: npm.

---

## File Structure

```
package.json, tsconfig.json, next.config.ts, vitest.config.ts, vitest.setup.ts, .gitignore, .env.example
tailwind/ (via app/globals.css @theme tokens — Tailwind v4)
src/
  lib/
    business.ts          # NAP constants + helpers (single source of truth)
    services.ts          # typed service definitions (slug, copy, FAQ, keywords)
    seo.ts               # metadata builder helper
    jsonld.tsx           # LocalBusiness / Service / FAQ JSON-LD components
  components/
    ui/Button.tsx        # Button + CallButton (primary) / ghost (secondary)
    ui/Glow.tsx          # headlight-glow gradient (reduced-motion safe)
    ui/TreadDivider.tsx  # tire-tread section divider
    ui/StatStrip.tsx
    layout/Header.tsx
    layout/Footer.tsx
    layout/MobileCallBar.tsx
    sections/Hero.tsx
    sections/ServiceCard.tsx
    sections/HowItWorks.tsx
    sections/CoverageMap.tsx
    sections/CTABand.tsx
    sections/GalleryGrid.tsx
    contact/ContactForm.tsx
  app/
    layout.tsx, globals.css, page.tsx
    services/page.tsx
    services/[slug]/page.tsx
    gallery/page.tsx
    contact/page.tsx
    sitemap.ts, robots.ts
    api/contact/route.ts
public/  (logo, photos — placeholders flagged)
```

---

### Task 1: Project scaffold + Tailwind theme + fonts + test harness

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`, `vitest.config.ts`, `vitest.setup.ts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`
- Test: `src/lib/__tests__/smoke.test.ts`

**Interfaces:**
- Produces: a buildable Next.js app; Tailwind tokens `bg-midnight`, `text-frost`, `text-gold`, etc.; fonts wired in `layout.tsx`.

- [ ] **Step 1: Scaffold the app**

Run:
```bash
npx create-next-app@latest . --typescript --app --tailwind --eslint --src-dir --use-npm --no-import-alias --turbopack
```
Accept defaults. Confirm `src/app` exists.

- [ ] **Step 2: Add test tooling**

Run:
```bash
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 3: Configure Vitest**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", setupFiles: ["./vitest.setup.ts"], globals: true },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
```
Create `vitest.setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```
Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 4: Define theme tokens + base styles**

Replace `src/app/globals.css` with:
```css
@import "tailwindcss";

@theme {
  --color-midnight: #0B1220;
  --color-ink: #070B12;
  --color-gold: #E8B04B;
  --color-gold-deep: #C9912E;
  --color-frost: #E9EEF5;
  --color-slate-muted: #8A97A8;
  --color-signal: #F5A623;
  --font-display: var(--font-saira), system-ui, sans-serif;
  --font-sans: var(--font-inter), system-ui, sans-serif;
}

body { background-color: var(--color-midnight); color: var(--color-frost); }
h1,h2,h3 { font-family: var(--font-display); letter-spacing: -0.01em; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

- [ ] **Step 5: Wire fonts + root layout**

Replace `src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Inter, Saira_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const saira = Saira_Condensed({ subsets: ["latin"], weight: ["500","600","700"], variable: "--font-saira" });

export const metadata: Metadata = {
  title: "Golden North Mobile Tire Services",
  description: "24/7 mobile tire change, new & used tires, battery replacement, and roadside assistance across the Greater Toronto Area.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${saira.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```
Set `src/app/page.tsx` to a temporary `export default function Home(){return <main className="p-10"><h1 className="text-4xl text-gold">Golden North</h1></main>;}`.

- [ ] **Step 6: Smoke test + build**

Create `src/lib/__tests__/smoke.test.ts`:
```ts
import { describe, it, expect } from "vitest";
describe("smoke", () => { it("runs", () => { expect(1 + 1).toBe(2); }); });
```
Run: `npm run test` → Expected: PASS.
Run: `npm run build` → Expected: build succeeds.

- [ ] **Step 7: Commit**
```bash
git add -A && git commit -m "feat: scaffold Next.js app with Midnight & Gold theme tokens and test harness"
```

---

### Task 2: Business NAP constants (single source of truth)

**Files:**
- Create: `src/lib/business.ts`
- Test: `src/lib/__tests__/business.test.ts`

**Interfaces:**
- Produces: `BUSINESS` object and `telHref` constant consumed by every component.

- [ ] **Step 1: Write the failing test**

`src/lib/__tests__/business.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { BUSINESS, telHref } from "@/lib/business";

describe("business", () => {
  it("exposes verbatim NAP", () => {
    expect(BUSINESS.name).toBe("Golden North Mobile Tire Services");
    expect(BUSINESS.phoneDisplay).toBe("(416) 558-5915");
    expect(BUSINESS.email).toBe("info.goldennorth@gmail.com");
    expect(BUSINESS.hours).toBe("Open 24/7");
  });
  it("builds a tel: href with no formatting", () => {
    expect(telHref).toBe("tel:+14165585915");
  });
});
```

- [ ] **Step 2: Run → FAIL** (`Cannot find module '@/lib/business'`). Run: `npm run test -- business`.

- [ ] **Step 3: Implement**

`src/lib/business.ts`:
```ts
export const BUSINESS = {
  name: "Golden North Mobile Tire Services",
  shortName: "Golden North",
  phoneDisplay: "(416) 558-5915",
  phoneRaw: "+14165585915",
  email: "info.goldennorth@gmail.com",
  areaServed: "Greater Toronto Area, Ontario, Canada",
  hours: "Open 24/7",
  tagline: "The best waiting room is the living room.",
  url: "https://www.goldennorthmobiletires.com",
  socials: {
    tiktok: "https://www.tiktok.com/@goldennorthmobiletires",
    instagram: "https://www.instagram.com/goldennorthmobiletires",
  },
} as const;

export const telHref = `tel:${BUSINESS.phoneRaw}`;
export const mailHref = `mailto:${BUSINESS.email}`;
```
> NOTE: Confirm exact social URLs with client; placeholders flagged.

- [ ] **Step 4: Run → PASS.** Run: `npm run test -- business`.
- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add business NAP constants as single source of truth"
```

---

### Task 3: Typed services content layer

**Files:**
- Create: `src/lib/services.ts`
- Test: `src/lib/__tests__/services.test.ts`

**Interfaces:**
- Produces: `Service` type, `SERVICES: Service[]`, `getService(slug)`, `SERVICE_SLUGS`.
  Each `Service` = `{ slug, name, shortName, tagline, summary, included: string[], whenYouNeed: string[], keywords: string[], faqs: {q:string;a:string}[] }`.
- Consumed by: services overview, `[slug]` page, ServiceCard, JSON-LD, sitemap.

- [ ] **Step 1: Write the failing test**

`src/lib/__tests__/services.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { SERVICES, getService, SERVICE_SLUGS } from "@/lib/services";

describe("services", () => {
  it("has the four services", () => {
    expect(SERVICE_SLUGS).toEqual(["tire-change","tires","battery","roadside"]);
  });
  it("each service has SEO copy and at least 2 FAQs", () => {
    for (const s of SERVICES) {
      expect(s.summary.length).toBeGreaterThan(40);
      expect(s.included.length).toBeGreaterThanOrEqual(3);
      expect(s.keywords.length).toBeGreaterThanOrEqual(3);
      expect(s.faqs.length).toBeGreaterThanOrEqual(2);
    }
  });
  it("looks up by slug", () => {
    expect(getService("battery")?.name).toMatch(/battery/i);
    expect(getService("nope")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run → FAIL.** Run: `npm run test -- services`.

- [ ] **Step 3: Implement** `src/lib/services.ts` with full real copy for all four services (tire-change, tires, battery, roadside). Each entry must include: `name`, `shortName`, `tagline`, `summary` (2 sentences, GTA local keywords), `included` (3–5 bullet strings), `whenYouNeed` (3 bullet strings), `keywords` (e.g. `["mobile tire change Toronto","seasonal tire swap GTA","on-rim tire change"]`), and 2–3 `faqs`. Export `Service` type, `SERVICES`, `SERVICE_SLUGS = SERVICES.map(s=>s.slug)`, and `getService = (slug)=>SERVICES.find(s=>s.slug===slug)`. Order must be `tire-change, tires, battery, roadside`.

- [ ] **Step 4: Run → PASS.** Run: `npm run test -- services`.
- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add typed services content layer with SEO copy and FAQs"
```

---

### Task 4: SEO metadata helper

**Files:**
- Create: `src/lib/seo.ts`
- Test: `src/lib/__tests__/seo.test.ts`

**Interfaces:**
- Produces: `buildMetadata({ title, description, path, image? }): Metadata` returning title, description, canonical (`alternates.canonical`), and OpenGraph. Consumed by every page's `generateMetadata`/`metadata`.

- [ ] **Step 1: Failing test**

`src/lib/__tests__/seo.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { buildMetadata } from "@/lib/seo";

describe("buildMetadata", () => {
  it("sets canonical and OG from path", () => {
    const m = buildMetadata({ title: "Battery", description: "Mobile battery replacement", path: "/services/battery" });
    expect(m.title).toContain("Battery");
    expect(m.alternates?.canonical).toBe("https://www.goldennorthmobiletires.com/services/battery");
    expect((m.openGraph as any)?.url).toContain("/services/battery");
  });
});
```

- [ ] **Step 2: Run → FAIL.** Run: `npm run test -- seo`.

- [ ] **Step 3: Implement** `src/lib/seo.ts`:
```ts
import type { Metadata } from "next";
import { BUSINESS } from "./business";

export function buildMetadata(opts: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = `${BUSINESS.url}${opts.path}`;
  const title = opts.path === "/" ? opts.title : `${opts.title} | ${BUSINESS.shortName}`;
  return {
    title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title, description: opts.description, url, siteName: BUSINESS.name, type: "website",
      images: opts.image ? [{ url: opts.image }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description: opts.description },
  };
}
```

- [ ] **Step 4: Run → PASS.** Run: `npm run test -- seo`.
- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add SEO metadata helper with canonical + OpenGraph"
```

---

### Task 5: JSON-LD structured data components

**Files:**
- Create: `src/lib/jsonld.tsx`
- Test: `src/lib/__tests__/jsonld.test.tsx`

**Interfaces:**
- Produces: `<LocalBusinessJsonLd/>`, `<ServiceJsonLd service={Service}/>`, `<FaqJsonLd faqs={{q,a}[]}/>` — each renders a `<script type="application/ld+json">`.

- [ ] **Step 1: Failing test**

`src/lib/__tests__/jsonld.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { LocalBusinessJsonLd, FaqJsonLd } from "@/lib/jsonld";

function parse(container: HTMLElement) {
  return JSON.parse(container.querySelector('script[type="application/ld+json"]')!.innerHTML);
}
describe("jsonld", () => {
  it("emits LocalBusiness with phone + area", () => {
    const { container } = render(<LocalBusinessJsonLd />);
    const d = parse(container);
    expect(d["@type"]).toContain("LocalBusiness");
    expect(d.telephone).toBe("+14165585915");
  });
  it("emits FAQPage", () => {
    const { container } = render(<FaqJsonLd faqs={[{ q: "Q?", a: "A." }]} />);
    const d = parse(container);
    expect(d["@type"]).toBe("FAQPage");
    expect(d.mainEntity[0].acceptedAnswer.text).toBe("A.");
  });
});
```

- [ ] **Step 2: Run → FAIL.** Run: `npm run test -- jsonld`.

- [ ] **Step 3: Implement** `src/lib/jsonld.tsx` with three components. `LocalBusinessJsonLd` uses `BUSINESS` (`@type: ["LocalBusiness","AutoRepair"]`, `name`, `telephone: BUSINESS.phoneRaw`, `email`, `areaServed`, `url`, `openingHours: "Mo-Su 00:00-24:00"`). `ServiceJsonLd` maps a `Service` to schema.org `Service` (`name`, `description: summary`, `provider`, `areaServed`, `serviceType`). `FaqJsonLd` maps faqs to `FAQPage.mainEntity[]` Question/Answer. Each returns `<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />`.

- [ ] **Step 4: Run → PASS.** Run: `npm run test -- jsonld`.
- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add LocalBusiness/Service/FAQ JSON-LD components"
```

---

### Task 6: UI primitives — Button/CallButton, Glow, TreadDivider, StatStrip

**Files:**
- Create: `src/components/ui/Button.tsx`, `src/components/ui/Glow.tsx`, `src/components/ui/TreadDivider.tsx`, `src/components/ui/StatStrip.tsx`
- Test: `src/components/ui/__tests__/Button.test.tsx`

**Interfaces:**
- Produces: `<Button variant="primary"|"ghost" href? onClick? />`; `<CallButton/>` (primary, label "Call (416) 558-5915", href `telHref`, `aria-label`); `<Glow/>` decorative; `<TreadDivider/>`; `<StatStrip items={{label,value}[]}/>`.
- Consumed by: Header, Hero, CTABand, MobileCallBar, all pages.

- [ ] **Step 1: Failing test**

`src/components/ui/__tests__/Button.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CallButton, Button } from "@/components/ui/Button";

describe("CallButton", () => {
  it("links to the tel: number and shows the phone", () => {
    render(<CallButton />);
    const link = screen.getByRole("link", { name: /call/i });
    expect(link).toHaveAttribute("href", "tel:+14165585915");
    expect(link).toHaveTextContent("(416) 558-5915");
  });
});
describe("Button ghost", () => {
  it("renders secondary link", () => {
    render(<Button variant="ghost" href="/contact">Message us</Button>);
    expect(screen.getByRole("link", { name: /message us/i })).toHaveAttribute("href", "/contact");
  });
});
```

- [ ] **Step 2: Run → FAIL.** Run: `npm run test -- Button`.

- [ ] **Step 3: Implement** the four primitives.
  - `Button.tsx`: a `Button` that renders `<Link>`/`<a>` when `href` given else `<button>`. `variant="primary"` → gold background, dark text, bold (the dominant CTA); `variant="ghost"` → transparent with gold/frost outline (secondary). Export `CallButton` = `<Button variant="primary" href={telHref} aria-label="Call Golden North at (416) 558-5915">` with a phone icon + `Call ${BUSINESS.phoneDisplay}`.
  - `Glow.tsx`: absolutely-positioned radial-gradient div (gold, low opacity, `pointer-events-none`, `aria-hidden`); directional cone via CSS, animation gated by reduced-motion.
  - `TreadDivider.tsx`: thin full-width SVG/CSS tread-pattern divider, `aria-hidden`.
  - `StatStrip.tsx`: renders `items` as label/value pairs with tabular numerals.

- [ ] **Step 4: Run → PASS.** Run: `npm run test -- Button`.
- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add UI primitives (CallButton, Glow, TreadDivider, StatStrip)"
```

---

### Task 7: Header, Footer, MobileCallBar + root layout integration

**Files:**
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/MobileCallBar.tsx`
- Modify: `src/app/layout.tsx`
- Test: `src/components/layout/__tests__/Header.test.tsx`

**Interfaces:**
- Consumes: `CallButton`, `BUSINESS`, `SERVICES`. Produces: site chrome rendered on every page via root layout; `LocalBusinessJsonLd` injected once in layout.

- [ ] **Step 1: Failing test**

`src/components/layout/__tests__/Header.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

describe("Header", () => {
  it("always shows the call CTA and 24/7 badge", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /call/i })).toHaveAttribute("href", "tel:+14165585915");
    expect(screen.getByText(/24\/7/i)).toBeInTheDocument();
  });
  it("links to all primary nav destinations", () => {
    render(<Header />);
    for (const href of ["/services","/gallery","/contact"]) {
      expect(screen.getByRole("link", { name: new RegExp(href.slice(1), "i") })).toHaveAttribute("href", href);
    }
  });
});
```

- [ ] **Step 2: Run → FAIL.** Run: `npm run test -- Header`.

- [ ] **Step 3: Implement.**
  - `Header.tsx` (`"use client"` for mobile menu toggle): sticky top, logo wordmark + north-star mark, nav (Home, Services, Gallery, Contact), "Open 24/7" `signal` badge, and a `<CallButton/>`. Mobile: hamburger → slide-down menu; CallButton stays visible.
  - `MobileCallBar.tsx`: fixed bottom, full-width `<CallButton/>`, shown only `< md` (`md:hidden`), with safe-area padding.
  - `Footer.tsx`: NAP, hours, area served, nav, TikTok/Instagram links, tagline, copyright `© {year}`.
  - Modify `layout.tsx`: wrap children with `<Header/>`, `<main>`, `<Footer/>`, `<MobileCallBar/>`; add `<LocalBusinessJsonLd/>`; add bottom padding so MobileCallBar doesn't cover content.

- [ ] **Step 4: Run → PASS** and `npm run build` succeeds.
- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add Header, Footer, MobileCallBar and wire into root layout"
```

---

### Task 8: Home page sections + assembly

**Files:**
- Create: `src/components/sections/Hero.tsx`, `ServiceCard.tsx`, `HowItWorks.tsx`, `CoverageMap.tsx`, `CTABand.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/components/sections/__tests__/Hero.test.tsx`, `src/app/__tests__/home.test.tsx`

**Interfaces:**
- Consumes: `CallButton`, `Button`, `Glow`, `TreadDivider`, `StatStrip`, `SERVICES`, `BUSINESS`. Produces: home route.

- [ ] **Step 1: Failing tests**

`src/components/sections/__tests__/Hero.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("leads with call CTA and shows the tagline", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /call/i })).toHaveAttribute("href", "tel:+14165585915");
    expect(screen.getByText(/living room/i)).toBeInTheDocument();
  });
});
```
`src/app/__tests__/home.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders all four service cards", () => {
    render(<Home />);
    for (const name of [/tire change/i,/used tires/i,/battery/i,/roadside/i]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run → FAIL.** Run: `npm run test -- Hero home`.

- [ ] **Step 3: Implement** sections, then assemble `page.tsx` in order: Hero (glow + photo placeholder, slogan, primary CallButton + ghost "See services"), StatStrip (24/7 · We come to you · GTA-wide · Fast response), service cards grid (map `SERVICES` → `ServiceCard` linking to `/services/{slug}`, each card's CTA a CallButton or "Learn more" ghost), HowItWorks (Call → We come to you → Back on the road), CoverageMap (GTA visual + area served), Gallery teaser (3–4 photos linking to `/gallery`), CTABand (gold band, big CallButton). Add `export const metadata = buildMetadata({title:"24/7 Mobile Tire Service in the GTA", description: BUSINESS-based, path:"/"})`.

- [ ] **Step 4: Run → PASS** and `npm run build` succeeds.
- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: build home page with hero, services, how-it-works, coverage, CTA"
```

---

### Task 9: Services overview page

**Files:**
- Create: `src/app/services/page.tsx`
- Test: `src/app/services/__tests__/services.test.tsx`

**Interfaces:**
- Consumes: `SERVICES`, `ServiceCard`, `buildMetadata`, `CTABand`.

- [ ] **Step 1: Failing test**
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServicesPage from "@/app/services/page";

describe("Services overview", () => {
  it("lists all services with links to detail pages", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("link", { name: /tire change/i })).toHaveAttribute("href", "/services/tire-change");
    expect(screen.getByRole("link", { name: /roadside/i })).toHaveAttribute("href", "/services/roadside");
  });
});
```

- [ ] **Step 2: Run → FAIL.** Run: `npm run test -- services.test`.
- [ ] **Step 3: Implement** intro header + grid of rich `ServiceCard`s linking to `/services/{slug}` + a CTABand. Add `metadata` via `buildMetadata({path:"/services"})`.
- [ ] **Step 4: Run → PASS** and `npm run build` succeeds.
- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add services overview page"
```

---

### Task 10: Service detail pages ([slug]) with FAQ + Service JSON-LD

**Files:**
- Create: `src/app/services/[slug]/page.tsx`
- Test: `src/app/services/[slug]/__tests__/detail.test.tsx`

**Interfaces:**
- Consumes: `getService`, `SERVICE_SLUGS`, `ServiceJsonLd`, `FaqJsonLd`, `buildMetadata`, `CTABand`, `CallButton`. Produces: 4 static routes via `generateStaticParams`.

- [ ] **Step 1: Failing test**
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { generateStaticParams } from "@/app/services/[slug]/page";
import Page from "@/app/services/[slug]/page";

describe("Service detail", () => {
  it("pre-generates all four slugs", async () => {
    const params = await generateStaticParams();
    expect(params.map(p => p.slug).sort()).toEqual(["battery","roadside","tire-change","tires"]);
  });
  it("renders the battery page with a call CTA", async () => {
    render(await Page({ params: Promise.resolve({ slug: "battery" }) }));
    expect(screen.getByRole("link", { name: /call/i })).toHaveAttribute("href", "tel:+14165585915");
  });
});
```

- [ ] **Step 2: Run → FAIL.** Run: `npm run test -- detail`.
- [ ] **Step 3: Implement** async server component: `generateStaticParams` from `SERVICE_SLUGS`; `generateMetadata` via `buildMetadata` using the service's name/summary/keywords; body = focused hero (CallButton primary), "What's included" (`included`), "When you need it" (`whenYouNeed`), FAQ accordion (`faqs`), cross-links to other 3 services, CTABand. Render `<ServiceJsonLd/>` + `<FaqJsonLd/>`. Call `notFound()` for unknown slug.
- [ ] **Step 4: Run → PASS** and `npm run build` shows 4 prerendered service routes.
- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add SEO service detail pages with FAQ and JSON-LD"
```

---

### Task 11: Gallery page

**Files:**
- Create: `src/components/sections/GalleryGrid.tsx`, `src/app/gallery/page.tsx`, `src/lib/gallery.ts`
- Test: `src/app/gallery/__tests__/gallery.test.tsx`

**Interfaces:**
- Consumes: `GALLERY` (typed array `{src,alt}` in `gallery.ts`), `next/image`. Produces: gallery route with responsive grid + lightbox.

- [ ] **Step 1: Failing test**
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GalleryPage from "@/app/gallery/page";

describe("Gallery", () => {
  it("renders images with descriptive alt text", () => {
    render(<GalleryPage />);
    const imgs = screen.getAllByRole("img");
    expect(imgs.length).toBeGreaterThan(0);
    imgs.forEach(img => expect(img.getAttribute("alt")?.length).toBeGreaterThan(3));
  });
});
```

- [ ] **Step 2: Run → FAIL.** Run: `npm run test -- gallery`.
- [ ] **Step 3: Implement** `gallery.ts` with placeholder entries (flagged `// TODO: replace with client photos`), `GalleryGrid` (`"use client"`, masonry/columns layout, duotone-on-hover, click → lightbox overlay; Escape closes; reduced-motion safe), `gallery/page.tsx` with header + `<GalleryGrid items={GALLERY}/>` + CTABand + `metadata`.
- [ ] **Step 4: Run → PASS** and `npm run build` succeeds.
- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add gallery page with masonry grid and lightbox"
```

---

### Task 12: Contact API route (email, swappable provider)

**Files:**
- Create: `src/app/api/contact/route.ts`, `src/lib/email.ts`, `.env.example`
- Test: `src/app/api/contact/__tests__/route.test.ts`

**Interfaces:**
- Produces: `POST /api/contact` accepting `{name,phone,email,message}`; validates; calls `sendContactEmail()`; returns `{ok:true}` (200) or `{ok:false,error}` (400/500). `email.ts` exports `sendContactEmail(payload)` using Resend when `RESEND_API_KEY` set, else logs + resolves (graceful degradation).

- [ ] **Step 1: Failing test**

`src/app/api/contact/__tests__/route.test.ts`:
```ts
import { describe, it, expect, vi } from "vitest";
vi.mock("@/lib/email", () => ({ sendContactEmail: vi.fn().mockResolvedValue(undefined) }));
import { POST } from "@/app/api/contact/route";

function req(body: unknown) {
  return new Request("http://x/api/contact", { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } });
}
describe("POST /api/contact", () => {
  it("rejects missing fields with 400", async () => {
    const res = await POST(req({ name: "" }));
    expect(res.status).toBe(400);
  });
  it("accepts a valid submission", async () => {
    const res = await POST(req({ name: "Sam", phone: "4160000000", email: "a@b.com", message: "Need a tire change" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});
```

- [ ] **Step 2: Run → FAIL.** Run: `npm run test -- route`.
- [ ] **Step 3: Implement** `email.ts` (`sendContactEmail` — dynamic-import Resend only when key present; otherwise `console.info("[contact] would email:", payload)`), and `route.ts` (parse JSON, validate non-empty `name`/`message` and basic email/phone presence → 400 on fail; call `sendContactEmail`; 200 `{ok:true}`; catch → 500 `{ok:false,error}`). Add `RESEND_API_KEY=` and `CONTACT_TO_EMAIL=info.goldennorth@gmail.com` to `.env.example`.
- [ ] **Step 4: Run → PASS.** Run: `npm run test -- route`.
- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add contact API route with swappable email provider"
```

---

### Task 13: Contact page (call-first) + ContactForm

**Files:**
- Create: `src/components/contact/ContactForm.tsx`, `src/app/contact/page.tsx`
- Test: `src/components/contact/__tests__/ContactForm.test.tsx`, `src/app/contact/__tests__/contact.test.tsx`

**Interfaces:**
- Consumes: `/api/contact`, `CallButton`, `BUSINESS`. Produces: contact route where call is the headline action and the form is secondary.

- [ ] **Step 1: Failing tests**

`contact.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactPage from "@/app/contact/page";

describe("Contact page", () => {
  it("headlines the call action and 24/7", () => {
    render(<ContactPage />);
    expect(screen.getByRole("link", { name: /call/i })).toHaveAttribute("href", "tel:+14165585915");
    expect(screen.getByText(/24\/7/i)).toBeInTheDocument();
  });
  it("presents the form as a secondary option", () => {
    render(<ContactPage />);
    expect(screen.getByText(/prefer to message/i)).toBeInTheDocument();
  });
});
```
`ContactForm.test.tsx`:
```tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/contact/ContactForm";

beforeEach(() => { global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }) as any; });
describe("ContactForm", () => {
  it("shows a success message after submit", async () => {
    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/name/i), "Sam");
    await userEvent.type(screen.getByLabelText(/phone/i), "4160000000");
    await userEvent.type(screen.getByLabelText(/message/i), "Flat tire");
    await userEvent.click(screen.getByRole("button", { name: /send/i }));
    expect(await screen.findByText(/thanks|received|get back/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run → FAIL.** Run: `npm run test -- ContactForm contact`.
- [ ] **Step 3: Implement** `ContactForm` (`"use client"`: labeled fields name/phone/email/message, POST to `/api/contact`, loading + success + error states, accessible labels). `contact/page.tsx`: big click-to-call hero (CallButton + "Open 24/7" + email + socials + area served + coverage map), then a clearly-secondary section headed "Prefer to message us?" containing `<ContactForm/>`. Add `metadata`.
- [ ] **Step 4: Run → PASS** and `npm run build` succeeds.
- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add call-first contact page with secondary form"
```

---

### Task 14: sitemap.xml + robots.txt

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`
- Test: `src/app/__tests__/sitemap.test.ts`

**Interfaces:**
- Consumes: `SERVICE_SLUGS`, `BUSINESS`. Produces: `/sitemap.xml`, `/robots.txt`.

- [ ] **Step 1: Failing test**
```ts
import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("includes home, services overview, all service pages, gallery, contact", async () => {
    const urls = (await sitemap()).map(e => e.url);
    expect(urls).toContain("https://www.goldennorthmobiletires.com/");
    expect(urls).toContain("https://www.goldennorthmobiletires.com/services/battery");
    expect(urls).toContain("https://www.goldennorthmobiletires.com/contact");
  });
});
```

- [ ] **Step 2: Run → FAIL.** Run: `npm run test -- sitemap`.
- [ ] **Step 3: Implement** `sitemap.ts` (return array for `/`, `/services`, each `/services/{slug}`, `/gallery`, `/contact` with `lastModified`, `changeFrequency`, `priority`) and `robots.ts` (allow all, point `sitemap` to `${BUSINESS.url}/sitemap.xml`).
- [ ] **Step 4: Run → PASS** and `npm run build` lists `/sitemap.xml` + `/robots.txt`.
- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add sitemap and robots"
```

---

### Task 15: Final polish — assets, OG image, favicon, a11y/build verification, README

**Files:**
- Create: `public/README-assets.md`, `src/app/opengraph-image.tsx` (or static), `src/app/icon.svg`, `README.md`
- Modify: any component referencing placeholder images.

- [ ] **Step 1:** Add `public/README-assets.md` listing exactly which files the client must drop in (`logo.svg`, hero/gallery photos with target filenames) and where each is referenced.
- [ ] **Step 2:** Add a branded `opengraph-image` (Midnight & Gold, logo + tagline) and `icon.svg` (north-star mark).
- [ ] **Step 3:** Run full suite: `npm run test` → all PASS.
- [ ] **Step 4:** Run `npm run build` → succeeds with all routes (`/`, `/services`, 4× `/services/[slug]`, `/gallery`, `/contact`, `/sitemap.xml`, `/robots.txt`) statically generated.
- [ ] **Step 5:** Manual a11y pass: every image has alt; tab order reaches the call CTA early; gold-on-midnight and frost-on-midnight meet AA; `prefers-reduced-motion` disables glow animation. Fix any failures.
- [ ] **Step 6:** Write `README.md` (run/dev/build, env vars, where content lives in `src/lib/services.ts`, how to add a service, deploy-to-Vercel notes).
- [ ] **Step 7: Commit**
```bash
git add -A && git commit -m "chore: add OG image, favicon, asset guide, README and final a11y/build polish"
```

---

## Self-Review

**Spec coverage:**
- Brand/visual system → Task 1 (tokens/fonts) + Task 6 (Glow/Tread) + Task 15 (OG/icon). ✓
- Site architecture (8 routes) → Tasks 8–14. ✓
- Call-first CTAs → enforced in Tasks 6,7,8,10,13 tests (`tel:+14165585915`, form secondary). ✓
- SEO (metadata, JSON-LD, sitemap, robots, local keywords, FAQ) → Tasks 4,5,10,14 + service copy in Task 3. ✓
- Contact form swappable provider + graceful degradation → Task 12. ✓
- Accessibility → Task 1 (reduced motion) + Task 15 (a11y pass). ✓
- Typed content / future CMS path → Tasks 2,3,11. ✓
- Component library → Tasks 6,7,8. ✓
- Out-of-scope items (blog/booking/CMS) correctly excluded. ✓

**Placeholder scan:** Image/photo placeholders and social URLs are intentional and explicitly flagged for client input (Tasks 2,11,15); no logic placeholders. Service copy is written as real content in Task 3 (not stubbed).

**Type consistency:** `Service`, `SERVICES`, `SERVICE_SLUGS`, `getService` (Task 3) used consistently in Tasks 8–10,14. `buildMetadata` signature (Task 4) reused unchanged. `telHref`/`BUSINESS.phoneRaw` = `tel:+14165585915` consistent across all CTA tests. `CallButton`/`Button variant` API (Task 6) consistent in Tasks 7,8,13.
