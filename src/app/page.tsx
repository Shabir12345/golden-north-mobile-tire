// ─── Home page ────────────────────────────────────────────────────────────────
// Emergency-first assembly: Hero (problem→solution + live dispatch) → trust
// strip → ServiceGrid (all 5 services, one screen) → HowItWorks → ReviewsWidget
// → CoverageMap → FAQs → soft-blue CTA. The root layout renders
// Header/Footer/MobileCallBar.

import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { StatStrip } from "@/components/ui/StatStrip";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { Hero } from "@/components/sections/Hero";
import { ReviewsWidget } from "@/components/sections/ReviewsWidget";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { CTABand } from "@/components/sections/CTABand";
import { FaqSection } from "@/components/sections/FaqSection";
import { HOME_FAQS } from "@/lib/faqs";

export const metadata = buildMetadata({
  title: "24/7 Roadside Assistance Toronto & GTA in 20-30 Min",
  description: `Stranded? 24/7 roadside assistance across Toronto & the GTA: tires, jump starts, lockouts, mobile mechanics, in as little as 20-30 minutes. Call ${BUSINESS.phoneDisplay}.`,
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />

      {/* Trust bar */}
      <section className="bg-[var(--color-surface)] py-14" aria-label="Why drivers call GoldenNorth">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <StatStrip
            items={[
              { value: "24/7", label: "Live dispatch" },
              { value: "20-30 min", label: "We can be on our way" },
              { value: "GTA-wide", label: "We come to you" },
              { value: "Upfront", label: "Fair pricing, no membership" },
            ]}
          />
          <TrustBadges className="mt-10" />
        </div>
      </section>

      {/* Services — problem→solution cards */}
      <section className="bg-[var(--color-page)] py-20 lg:py-28" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <h2 id="services-heading" className="font-bold text-4xl leading-[1.05] text-[var(--color-heading)] lg:text-5xl">
              Whatever stopped you, <span className="text-[var(--color-accent-deep)]">we fix it where you stand.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-body)]">
              Roadside emergencies, tires, batteries, lockouts, and driveway repairs. One call sends
              help anywhere in Toronto &amp; the GTA, in as little as 20-30 minutes.
            </p>
          </div>

          <ServiceGrid />
        </div>
      </section>

      <HowItWorks />

      <ReviewsWidget />

      <CoverageMap />

      <FaqSection heading="Questions drivers ask us" faqs={HOME_FAQS} emitJsonLd />

      <CTABand />
    </>
  );
}
