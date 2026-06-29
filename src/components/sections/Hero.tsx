// ─── Hero ─────────────────────────────────────────────────────────────────────
// Clean, friendly hero on white. One clear promise — "We come to you." — a calm
// availability badge, simple at-a-glance chips, the call-first CTA, and the real
// photo of the van and tech. No glow, no hazard stripes, no alarm.

import { Photo } from "@/components/ui/Photo";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { CallButton, Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/business";

const CHIPS = ["24/7", "GTA-wide", "No tow needed"] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-page)]" aria-label="Hero — Golden North Mobile Tire Services">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14 lg:py-20">
          {/* Text column */}
          <div>
            <AvailabilityBadge variant="line" className="mb-7" />

            <h1
              className="font-bold leading-[1.04] text-[var(--color-heading)]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}
            >
              We come <span className="text-[var(--color-accent)]">to you.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-body)]">
              Mobile tire change, new &amp; used tires, battery and roadside help — at your
              driveway, lot, or roadside, anywhere in the GTA. {BUSINESS.tagline}
            </p>

            {/* At-a-glance chips */}
            <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="At a glance">
              {CHIPS.map((chip, i) => (
                <li
                  key={chip}
                  className={
                    "text-xs font-semibold px-3 py-1.5 rounded-full " +
                    (i === 0
                      ? "bg-[var(--color-accent)] text-white"
                      : "text-[var(--color-body)] bg-[var(--color-accent-soft)]")
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

            <p className="mt-7 text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">
              {BUSINESS.areaServed}
            </p>
          </div>

          {/* Image column */}
          <div className="relative">
            <Photo
              src="/photos/hero-night-tech.webp"
              alt="A Golden North technician in a hi-vis vest balancing a wheel beside the yellow service van"
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
                The real Golden North van
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
