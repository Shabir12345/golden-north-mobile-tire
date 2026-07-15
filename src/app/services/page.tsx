// ─── Services overview (/services) ────────────────────────────────────────────
// Intro header + the ServiceGrid (shared with the home page) + the drenched
// CTA band. Each card and pill links to its SEO detail page.

import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CTABand } from "@/components/sections/CTABand";
import { FaqSection } from "@/components/sections/FaqSection";
import { CallButton, Button } from "@/components/ui/Button";
import { SERVICES_FAQS } from "@/lib/faqs";
import { BreadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "24/7 Roadside & Mobile Services — Toronto & the GTA",
  description: `Roadside assistance, mobile tire service, battery jump starts, car lockouts & mobile mechanics across Toronto & the GTA. We come to you — call ${BUSINESS.phoneDisplay}.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <PageHeader
        title={
          <>
            Whatever stopped you,
            <br />
            <span className="text-[var(--color-accent)]">we come fix it.</span>
          </>
        }
        intro={`Roadside assistance, mobile tire service, battery jump starts, car lockouts, and mobile mechanic repairs — everywhere in Toronto & the GTA, 24/7, in as little as 20–30 minutes. Pick what stopped you, or just call and tell us.`}
      >
        <CallButton size="lg" />
        <Button variant="ghost" size="lg" href="/contact" aria-label="Contact GoldenNorth">
          Contact us
        </Button>
      </PageHeader>

      <section className="bg-[var(--color-page)] py-20 lg:py-28" aria-labelledby="services-grid-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 id="services-grid-heading" className="sr-only">
            Our services
          </h2>
          <ServiceGrid detailed />
        </div>
      </section>

      <FaqSection heading="Service questions, answered" faqs={SERVICES_FAQS} emitJsonLd />

      <CTABand />
    </>
  );
}
