// ─── Hero ─────────────────────────────────────────────────────────────────────
// High-Vis Rescue hero. One uncommon promise — "We come to you." — at display
// scale, a live dispatch status that makes 24/7 feel active, and the real
// night photo of the hi-vis tech working out of the lit yellow van. A headlight
// beam sweeps behind the type; a hazard hairline edges the top like a reflective
// stripe. No placeholder void: the photograph carries the right half.

import { Glow } from "@/components/ui/Glow";
import { HazardStripe } from "@/components/ui/HazardStripe";
import { Photo } from "@/components/ui/Photo";
import { LiveStatus } from "@/components/ui/LiveStatus";
import { CallButton, Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/business";

const CHIPS = ["24/7", "GTA-wide", "No tow needed"] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-midnight" aria-label="Hero — Golden North Mobile Tire Services">
      {/* Reflective hazard edge at the very top */}
      <HazardStripe height={6} className="absolute inset-x-0 top-0 z-10" />

      {/* Headlight beam sweeping from upper-right, as if the van just turned in */}
      <Glow intensity="high" sweep className="top-0 right-0 h-[680px] w-[760px] translate-x-1/4 -translate-y-1/4" />
      {/* Low ambient pool from below */}
      <Glow intensity="low" className="bottom-0 left-0 h-[300px] w-[500px] -translate-x-1/4 translate-y-1/3" />

      <div className="relative z-[1] mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid min-h-[88vh] items-center gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-28">
          {/* ── Text column ── */}
          <div>
            <LiveStatus variant="line" className="mb-7" />

            <h1
              className="font-display font-bold leading-[0.88] text-[var(--color-frost)]"
              style={{ fontSize: "clamp(2.9rem, 8.5vw, 5.75rem)", letterSpacing: "-0.03em" }}
            >
              We come
              <br />
              <span className="text-[var(--color-gold)]">to you.</span>
            </h1>

            <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-[var(--color-frost-dim)]">
              Mobile tire change, new &amp; used tires, battery and roadside rescue — at your
              driveway, lot, or roadside, anywhere in the GTA. {BUSINESS.tagline}
            </p>

            {/* Blocky high-vis chips */}
            <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="At a glance">
              {CHIPS.map((chip, i) => (
                <li
                  key={chip}
                  className={
                    "font-display text-xs font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-[3px] " +
                    (i === 0
                      ? "bg-[var(--color-gold)] text-[var(--color-ink)]"
                      : "text-[var(--color-frost)] border border-[rgba(245,168,28,0.45)]")
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

            <p className="mt-7 font-sans text-xs uppercase tracking-[0.14em] text-[var(--color-slate-muted)]">
              {BUSINESS.areaServed}
            </p>
          </div>

          {/* ── Image column ── */}
          <div className="relative">
            <Photo
              src="/photos/hero-night-tech.webp"
              alt="A Golden North technician in a hi-vis vest balancing a wheel inside the lit yellow service van at night"
              ratio="3 / 4"
              priority
              overlay
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
            />
            {/* Dispatched tag over the photo */}
            <div className="absolute left-4 bottom-4 right-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-[3px] border border-[rgba(245,168,28,0.25)] bg-[rgba(5,8,14,0.82)] px-3 py-2 backdrop-blur-sm">
                <LiveStatus label="On a job · tonight" />
              </span>
              <span className="hidden rounded-[3px] bg-[rgba(5,8,14,0.82)] px-3 py-2 font-display text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-frost)] backdrop-blur-sm sm:inline">
                Real Golden North van
              </span>
            </div>
          </div>
        </div>
      </div>

      <HazardStripe height={8} className="relative z-[1]" />
    </section>
  );
}
