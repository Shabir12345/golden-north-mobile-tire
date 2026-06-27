// ─── Home page ────────────────────────────────────────────────────────────────
// Assembly with deliberate sectional rhythm (midnight → steel trust bar →
// midnight service rows → ink process → midnight coverage → ink gallery teaser
// → amber drenched CTA). The root layout renders Header/Footer/MobileCallBar.

import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { SERVICES } from "@/lib/services";
import { GALLERY } from "@/lib/photos";
import { StatStrip } from "@/components/ui/StatStrip";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/sections/Hero";
import { ServiceRow } from "@/components/sections/ServiceRow";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { CTABand } from "@/components/sections/CTABand";

export const metadata = buildMetadata({
  title: "24/7 Mobile Tire Service in the GTA",
  description: `${BUSINESS.name} provides 24/7 mobile tire change, new & used tire supply, battery replacement, and roadside assistance across the ${BUSINESS.areaServed}. We come to you — no shop visit required.`,
  path: "/",
});

const TEASER = GALLERY.slice(0, 6);

export default function Home() {
  return (
    <>
      <Hero />

      {/* Trust bar */}
      <section className="bg-midnight py-14" aria-label="Why drivers call Golden North">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <StatStrip
            items={[
              { value: "24/7", label: "Always open" },
              { value: "GTA-wide", label: "We come to you" },
              { value: "1 call", label: "To dispatch" },
              { value: "No tow", label: "Fixed on the spot" },
            ]}
          />
        </div>
      </section>

      {/* Services — numbered editorial rows */}
      <section className="bg-midnight py-20 lg:py-28" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <h2 id="services-heading" className="font-display font-bold text-4xl leading-[1.02] text-[var(--color-frost)] lg:text-5xl">
              Four ways we get you <span className="text-[var(--color-gold)]">rolling.</span>
            </h2>
            <p className="mt-5 font-sans text-lg leading-relaxed text-[var(--color-frost-dim)]">
              Whatever stopped you — a seasonal swap, a worn tire, a dead battery, a flat on
              the shoulder — we bring the shop to your location and handle it on the spot.
            </p>
          </div>

          <div className="space-y-20 lg:space-y-28">
            {SERVICES.map((service, i) => (
              <ServiceRow key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <CoverageMap />

      {/* Gallery teaser — real photos */}
      <section className="bg-[var(--color-ink)] py-24 lg:py-32" aria-labelledby="gallery-teaser-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 id="gallery-teaser-heading" className="font-display font-bold text-3xl leading-tight text-[var(--color-frost)] lg:text-4xl">
              On the job, <span className="text-[var(--color-gold)]">GTA-wide.</span>
            </h2>
            <Button variant="ghost" href="/gallery" aria-label="View the full photo gallery">
              View gallery
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {TEASER.map((photo, i) => (
              <Reveal key={photo.src} delay={i * 60}>
                <Link
                  href="/gallery"
                  className="block rounded-[4px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
                  aria-label="View the full photo gallery"
                >
                  <Photo src={photo.src} alt={photo.alt} ratio="1 / 1" sizes="(max-width: 640px) 50vw, 33vw" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
