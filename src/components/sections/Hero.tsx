// ─── Hero ─────────────────────────────────────────────────────────────────────
// Design intent: the hero makes a single, uncommon promise — "We come to you" —
// in the largest type on the page. No marketing superlatives. No feature-icon
// grids. Just one declarative sentence and the call button.
//
// Composition:
//   - Left column: dispatch-style eyebrow → h1 → tagline → CTAs
//   - Right column: photo placeholder (dark panel w/ tread texture + glow)
//   - Headlight Glow: projects from upper-right, as if the tech's truck has
//     just turned the corner — directional light, not a centred bloom.
//
// The aesthetic risk is the headline itself: three words at ~7rem. Most
// automotive/roadside sites use a long descriptive title (SEO anxiety). We
// trust the tagline and the CallButton to close the gap.

import { Glow } from "@/components/ui/Glow";
import { TreadDivider } from "@/components/ui/TreadDivider";
import { CallButton, Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/business";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-midnight"
      aria-label="Hero — Golden North Mobile Tire Services"
    >
      {/* Headlight glow: positioned upper-right so it reads as an approaching
          vehicle, not a centred decorative orb. */}
      <Glow
        intensity="high"
        className="top-0 right-0 h-[600px] w-[700px] translate-x-1/4 -translate-y-1/4"
      />

      {/* Thin amber rail at the top — like a reflective highway stripe */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-40"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid min-h-[90vh] items-center gap-12 py-24 lg:grid-cols-2 lg:py-32">

          {/* ── Text column ─────────────────────────────────────────────── */}
          <div>
            {/* Dispatch-style eyebrow: operational, not decorative */}
            <p
              className="mb-6 font-display text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-gold)] opacity-70"
              aria-hidden="true"
            >
              GTA Coverage · 24/7 Dispatch
            </p>

            {/* h1: the promise in three words — fluid scale, condensed so it
                doesn't wrap until very small screens. */}
            <h1
              className="font-display font-bold leading-[0.9] text-[var(--color-frost)]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
            >
              We come<br />
              <span className="text-[var(--color-gold)]">to you.</span>
            </h1>

            {/* Tagline — Inter, subordinate, reads as a caption to the h1 */}
            <p className="mt-6 max-w-sm font-sans text-lg leading-relaxed text-[var(--color-slate-muted)]">
              {BUSINESS.tagline}
            </p>

            {/* CTAs: CallButton is dominant (primary gold), See services is
                clearly secondary (ghost — same visual weight as body text) */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <CallButton />
              <Button variant="ghost" href="/services" aria-label="See all services">
                See services
              </Button>
            </div>

            {/* Coverage note — a small trust signal without bravado */}
            <p className="mt-6 font-sans text-xs text-[var(--color-slate-muted)]">
              {BUSINESS.areaServed} · Tires, battery, roadside
            </p>
          </div>

          {/* ── Image column ────────────────────────────────────────────── */}
          {/* TODO: replace this placeholder with a hero photo once available.
              Intent: a wide-angle shot of a Golden North technician arriving
              at a residential driveway or parking lot at dusk — the truck
              headlights visible, the customer in the background. The dark
              gold-accent palette of this placeholder already matches the final
              photo treatment (slight midnight overlay + tread divider at base). */}
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-sm bg-ink lg:aspect-[3/4]"
            data-placeholder="hero-photo"
          >
            {/* Directional light seeping through the placeholder */}
            <Glow
              intensity="low"
              className="inset-0 h-full w-full"
            />

            {/* Placeholder label — clearly visible in dev, invisible in prod
                when replaced with the real image */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8">
              <div
                aria-hidden="true"
                className="h-px w-16 bg-[var(--color-gold)] opacity-30"
              />
              <p className="text-center font-display text-sm font-bold uppercase tracking-widest text-[var(--color-slate-muted)]">
                Hero photo
              </p>
              <p className="text-center font-sans text-xs text-[var(--color-slate-muted)] opacity-60">
                Tech arriving at customer location · dusk / GTA
              </p>
              <div
                aria-hidden="true"
                className="h-px w-16 bg-[var(--color-gold)] opacity-30"
              />
            </div>

            {/* Tread pattern at the base — grounds the image in the brand */}
            <div className="absolute inset-x-0 bottom-0">
              <TreadDivider />
            </div>
          </div>
        </div>
      </div>

      {/* Section-exit tread divider */}
      <TreadDivider className="mt-[-1px]" />
    </section>
  );
}
