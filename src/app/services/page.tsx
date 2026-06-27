// ─── Services overview (/services) ────────────────────────────────────────────
// Intro header + the four service rows (reusing the home ServiceRow) + the
// drenched CTA band. Each row links to its SEO detail page.

import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { SERVICES } from "@/lib/services";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServiceRow } from "@/components/sections/ServiceRow";
import { CTABand } from "@/components/sections/CTABand";
import { CallButton, Button } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "Mobile Tire & Roadside Services",
  description: `Mobile tire change, new & used tires, battery replacement, and 24/7 roadside assistance across the ${BUSINESS.areaServed}. ${BUSINESS.shortName} brings the shop to you.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Everything we do,
            <br />
            <span className="text-[var(--color-accent)]">at your location.</span>
          </>
        }
        intro={`Four mobile services across the ${BUSINESS.areaServed} — no shop visit, no tow, no wasted Saturday. Pick what stopped you, or just call and tell us.`}
      >
        <CallButton size="lg" />
        <Button variant="ghost" size="lg" href="/contact" aria-label="Contact Golden North">
          Contact us
        </Button>
      </PageHeader>

      <section className="bg-[var(--color-page)] py-20 lg:py-28" aria-label="Our services">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="space-y-20 lg:space-y-28">
            {SERVICES.map((service, i) => (
              <ServiceRow key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
