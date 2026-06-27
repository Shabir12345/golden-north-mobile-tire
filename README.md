# Golden North Mobile Tire Services — Website

Marketing site for Golden North, a 24/7 mobile tire & roadside service in the
Greater Toronto Area. Next.js (App Router) + TypeScript + Tailwind CSS v4,
statically generated, call-first, SEO-ready. Visual direction: **High-Vis
Rescue** — a night canvas, high-vis amber drawn from the real yellow van, and a
black-on-amber hazard motif. See `PRODUCT.md` (strategy) and `DESIGN.md`
(visual system).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run test     # Vitest + React Testing Library
npm run build    # production build (static)
npm run lint
```

Node 20+. Package manager: npm.

## Where content lives

- **Business NAP** (name, phone, email, hours, socials): `src/lib/business.ts` —
  single source of truth, used everywhere.
- **Services** (copy, inclusions, FAQs, SEO keywords): `src/lib/services.ts`.
  To add a service, add an entry here; the overview page, the `/services/[slug]`
  detail page, JSON-LD, and the sitemap all pick it up automatically.
- **Photos**: `src/lib/photos.ts` maps files in `public/photos/` to where they
  appear. See `public/README-assets.md`.
- **Design tokens**: `src/app/globals.css` (`@theme` block).

## SEO

Per-page metadata via `src/lib/seo.ts`; LocalBusiness / Service / FAQ JSON-LD via
`src/lib/jsonld.tsx`; `sitemap.xml` and `robots.txt` generated from the route
list and `SERVICE_SLUGS`.

## Contact form

`POST /api/contact` validates and delivers via `src/lib/email.ts`. Set
`RESEND_API_KEY` (and optional `CONTACT_TO_EMAIL`) to enable email delivery via
Resend; without a key it logs submissions and still returns success (graceful
degradation). Copy `.env.example` → `.env.local`.

## Deploy

Deploy on Vercel (zero-config for Next.js). Set `RESEND_API_KEY` and
`CONTACT_TO_EMAIL` as environment variables in the Vercel project to enable the
contact form email path.
