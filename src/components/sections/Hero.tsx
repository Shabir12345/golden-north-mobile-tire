// ─── Hero ─────────────────────────────────────────────────────────────────────
// The navy brand stage. One clear promise — "We come to you." — a calm
// availability badge, simple at-a-glance chips, the gold call-first CTA, and
// the real photo of the van and tech. A faint compass-rose watermark nods to
// the logo. No glow, no hazard stripes, no alarm.

import { Photo } from "@/components/ui/Photo";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { CallButton, Button } from "@/components/ui/Button";
import { CompassRose } from "@/components/ui/CompassRose";
import { BUSINESS } from "@/lib/business";

const CHIPS = ["24/7", "GTA-wide", "No tow needed"] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)]" aria-label="Hero — GoldenNorth Mobile Tire Services">
      <CompassRose className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 text-[var(--color-accent)] opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14 lg:py-20">
          {/* Text column */}
          <div>
            <AvailabilityBadge variant="line" onDark className="mb-7" />

            <h1
              className="font-bold leading-[1.04] text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}
            >
              We come <span className="text-[var(--color-accent)]">to you.</span>
              <span aria-hidden="true" className="mt-5 block h-1 w-20 rounded-full bg-[var(--color-accent)]" />
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-footer-fg)]">
              Flat tire, dead battery, or a seasonal swap — one call sends a mobile tire
              technician to your driveway, office lot, or highway shoulder, anywhere in Toronto
              &amp; the GTA. {BUSINESS.tagline}
            </p>

            {/* At-a-glance chips */}
            <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="At a glance">
              {CHIPS.map((chip, i) => (
                <li
                  key={chip}
                  className={
                    "text-xs font-semibold px-3 py-1.5 rounded-full " +
                    (i === 0
                      ? "bg-[var(--color-accent)] text-[var(--color-navy)]"
                      : "bg-white/10 text-[var(--color-on-navy)]")
                  }
                >
                  {chip}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <CallButton size="lg" />
              <Button variant="ghost" size="lg" href="/services" aria-label="See all services">
                See services
              </Button>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--color-footer-fg)]">
              Straight quote and an honest ETA on the call — no membership, no hidden fees.
            </p>

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
            <div className="absolute left-4 bottom-4 right-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 backdrop-blur-sm shadow-sm">
                <AvailabilityBadge label="Serving the GTA" />
              </span>
              <span className="hidden rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-[var(--color-body)] backdrop-blur-sm shadow-sm sm:inline">
                The real GoldenNorth van
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
