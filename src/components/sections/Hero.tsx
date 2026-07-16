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

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)]" aria-label="24/7 emergency roadside assistance">
      <CompassRose className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 text-[var(--color-accent)] opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-8 py-10 sm:gap-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14 lg:py-20">
          {/* Text column */}
          <div>
            {/* Attention anchor 1 — live dispatch */}
            <p className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[var(--color-on-navy)] sm:mb-7">
              <span className="live-dot" aria-hidden="true" />
              24/7 Emergency Dispatch · answering now
            </p>

            {/* The 2.75rem floor cost this headline five lines and 236px on a
                360-390px phone, pushing the call button to the fold edge — the
                one thing the stranded-on-mobile visitor is here to find. The
                7vw slope reaches the same 5rem ceiling by ~1150px. */}
            <h1 className="font-bold leading-[1.02] text-white" style={{ fontSize: "clamp(2.25rem, 7vw, 5rem)" }}>
              Stranded in the GTA?
              <span className="mt-3 block text-[var(--color-accent)]">
                We&rsquo;re on our way in as little as 20-30 minutes.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-footer-fg)] sm:mt-6 sm:text-lg">
              Flat tire, dead battery, locked out, out of gas, or a breakdown. One call sends a
              roadside technician to you, anywhere in Toronto &amp; the GTA. Fair price quoted
              before we roll: no membership, no hidden fees.
            </p>

            {/* Attention anchor 2 — the call. `data-call-anchor` tells
                MobileCallBar to stay down while this button is on screen. */}
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4">
              <span data-call-anchor className="btn-pulse inline-flex rounded-lg">
                <CallButton size="lg" />
              </span>
              <Button variant="ghost" size="lg" href="/services" aria-label="See all services">
                See services
              </Button>
            </div>

            {/* Attention anchor 3 — live reviews */}
            <div className="mt-6 empty:mt-0">
              <ReviewBadge onDark />
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.08em] text-[var(--color-footer-fg)] sm:mt-7">
              {BUSINESS.areaServed}
            </p>
          </div>

          {/* Image column */}
          <div className="relative">
            {/* Portrait is right beside the text column on desktop; on a phone it
                stacks underneath, where a 3/4 crop eats ~440px of scroll. */}
            <Photo
              src="/photos/hero-night-tech.webp"
              alt="A GoldenNorth technician in a hi-vis vest balancing a wheel beside the yellow service van"
              ratio="3 / 4"
              priority
              overlay
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="shadow-[0_20px_50px_-20px_rgba(16,32,63,0.35)] [--photo-ratio:4/3] lg:[--photo-ratio:3/4]"
            />
            <span className="absolute left-4 bottom-4 inline-flex rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-[var(--color-body)] backdrop-blur-sm shadow-sm">
              The real GoldenNorth van, on a real GTA call
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
