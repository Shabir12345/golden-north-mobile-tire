// ─── Home page ────────────────────────────────────────────────────────────────
// Assembly with deliberate sectional rhythm (page → surface trust bar →
// page service rows → surface process → page coverage → surface gallery teaser
// → soft-blue CTA). The root layout renders Header/Footer/MobileCallBar.

import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { SERVICES } from "@/lib/services";
import { GALLERY } from "@/lib/photos";
import { StatStrip } from "@/components/ui/StatStrip";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { Hero } from "@/components/sections/Hero";
import { ReviewsWidget } from "@/components/sections/ReviewsWidget";
import { ServiceRow } from "@/components/sections/ServiceRow";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { CTABand } from "@/components/sections/CTABand";
import { FaqSection } from "@/components/sections/FaqSection";
import { HOME_FAQS } from "@/lib/faqs";

export const metadata = buildMetadata({
  title: "Mobile Tire Service Toronto & GTA — 24/7",
  description: `24/7 mobile tire change, new & used tires, battery replacement & roadside assistance across Toronto and the GTA. We come to you — call ${BUSINESS.phoneDisplay}.`,
  path: "/",
});

const TEASER = GALLERY.slice(0, 6);

export default function Home() {
  return (
    <>
      <Hero />

      <ReviewsWidget />

      {/* Trust bar */}
      <section className="bg-[var(--color-surface)] py-14" aria-label="Why drivers call GoldenNorth">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <StatStrip
            items={[
              { value: "24/7", label: "Always open" },
              { value: "GTA-wide", label: "We come to you" },
              { value: "1 call", label: "To dispatch" },
              { value: "No tow", label: "Fixed on the spot" },
            ]}
          />
          <TrustBadges className="mt-10" />
        </div>
      </section>

      {/* Services — numbered editorial rows */}
      <section className="bg-[var(--color-page)] py-20 lg:py-28" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <h2 id="services-heading" className="font-bold text-4xl leading-[1.05] text-[var(--color-heading)] lg:text-5xl">
              Mobile tire change, batteries &amp; roadside —{" "}
              <span className="text-[var(--color-accent-deep)]">four ways we get you rolling.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-body)]">
              Whatever stopped you — a seasonal swap in Markham, a worn tire in Etobicoke, a dead
              battery downtown, a flat on the 401 — we bring the shop to your location and handle
              it on the spot.
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
      <section className="bg-[var(--color-surface)] py-20 lg:py-28" aria-labelledby="gallery-teaser-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 id="gallery-teaser-heading" className="font-bold text-3xl leading-tight text-[var(--color-heading)] lg:text-4xl">
              On the job, <span className="text-[var(--color-accent-deep)]">GTA-wide.</span>
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
                  className="block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
                  aria-label="View the full photo gallery"
                >
                  <Photo src={photo.src} alt={photo.alt} ratio="1 / 1" sizes="(max-width: 640px) 50vw, 33vw" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection heading="Questions drivers ask us" faqs={HOME_FAQS} emitJsonLd />

      <CTABand />
    </>
  );
}
