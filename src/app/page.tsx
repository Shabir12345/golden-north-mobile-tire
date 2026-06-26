// ─── Home page ────────────────────────────────────────────────────────────────
// Assembly: Hero → StatStrip → Services grid → HowItWorks → CoverageMap →
//            Gallery teaser → CTABand
//
// The root layout already renders Header, Footer, and MobileCallBar; this file
// renders only the page body. The metadata export requires this to be a server
// component — no "use client" directive here.

import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { SERVICES } from "@/lib/services";
import { StatStrip } from "@/components/ui/StatStrip";
import { TreadDivider } from "@/components/ui/TreadDivider";
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/sections/Hero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { CTABand } from "@/components/sections/CTABand";

export const metadata = buildMetadata({
  title: "24/7 Mobile Tire Service in the GTA",
  description: `${BUSINESS.name} provides 24/7 mobile tire change, new & used tire supply, battery replacement, and roadside assistance across the ${BUSINESS.areaServed}. We come to you — no shop visit required.`,
  path: "/",
});

export default function Home() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <Hero />

      {/* ── StatStrip ─────────────────────────────────────────────────── */}
      {/* Anchored in the dark background — not a contrasting white band.
          Sits directly below the hero tread divider for visual continuity. */}
      <div className="bg-midnight py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <StatStrip
            items={[
              { value: "24/7", label: "Available" },
              { value: "GTA-wide", label: "Coverage" },
              { value: "One call", label: "To book" },
              { value: "Your spot", label: "We come to" },
            ]}
          />
        </div>
      </div>

      <TreadDivider />

      {/* ── Services grid ─────────────────────────────────────────────── */}
      <section
        className="bg-midnight py-24 lg:py-32"
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16">
            <p
              className="mb-3 font-display text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-gold)] opacity-70"
              aria-hidden="true"
            >
              What we do
            </p>
            <h2
              id="services-heading"
              className="font-display font-bold text-4xl leading-tight text-[var(--color-frost)] lg:text-5xl"
            >
              Every service, at your location.
            </h2>
          </div>

          {/* 2-up on md+, stacked on mobile */}
          <div className="grid gap-6 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <TreadDivider />

      {/* ── How It Works ──────────────────────────────────────────────── */}
      <HowItWorks />

      <TreadDivider />

      {/* ── Coverage Map ──────────────────────────────────────────────── */}
      <CoverageMap />

      <TreadDivider />

      {/* ── Gallery teaser ────────────────────────────────────────────── */}
      {/* TODO: replace placeholder tiles with actual gallery photos once
          the photo library is delivered. Each photo should show a tech
          on-site: driveway tire change, condo-garage battery swap, etc. */}
      <section
        className="bg-midnight py-24 lg:py-32"
        aria-labelledby="gallery-teaser-heading"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p
                className="mb-3 font-display text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-gold)] opacity-70"
                aria-hidden="true"
              >
                Work photos
              </p>
              <h2
                id="gallery-teaser-heading"
                className="font-display font-bold text-3xl leading-tight text-[var(--color-frost)]"
              >
                On the job, GTA-wide.
              </h2>
            </div>
            <Button variant="ghost" href="/gallery" aria-label="View the full photo gallery">
              View gallery
            </Button>
          </div>

          {/* Photo placeholder tiles */}
          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
            aria-label="Gallery photo previews — photos coming soon"
          >
            {[
              "Tire change · residential driveway",
              "Battery swap · condo garage",
              "Roadside · highway 401 shoulder",
              "Seasonal changeover · office lot",
            ].map((caption) => (
              <div
                key={caption}
                className="aspect-square rounded-sm bg-ink border border-[rgba(232,176,75,0.08)] flex items-center justify-center p-4"
                data-placeholder="gallery-photo"
                aria-label={`Photo placeholder: ${caption}`}
              >
                <p className="text-center font-sans text-[10px] text-[var(--color-slate-muted)] opacity-60 leading-relaxed">
                  {caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TreadDivider />

      {/* ── CTA Band ──────────────────────────────────────────────────── */}
      <CTABand />
    </>
  );
}
