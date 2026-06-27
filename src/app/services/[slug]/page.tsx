// ─── Service detail (/services/[slug]) ────────────────────────────────────────
// Statically generated SEO page per service: focused hero with the real action
// photo, what's included, when you need it, an accessible native-<details> FAQ
// (with FAQPage JSON-LD), cross-links to the other services, and the CTA band.

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { SERVICES, SERVICE_SLUGS, getService } from "@/lib/services";
import { SERVICE_PHOTO } from "@/lib/photos";
import { ServiceJsonLd, FaqJsonLd } from "@/lib/jsonld";
import { CallButton, Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Glow } from "@/components/ui/Glow";
import { HazardStripe } from "@/components/ui/HazardStripe";
import { LiveStatus } from "@/components/ui/LiveStatus";
import { CTABand } from "@/components/sections/CTABand";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.name,
    description: service.summary.slice(0, 155),
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const photo = SERVICE_PHOTO[service.slug];
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <ServiceJsonLd service={service} />
      <FaqJsonLd faqs={service.faqs} />

      {/* Focused hero */}
      <section className="relative overflow-hidden bg-midnight" aria-labelledby="service-heading">
        <HazardStripe height={6} className="absolute inset-x-0 top-0 z-10" />
        <Glow intensity="high" className="top-0 right-0 h-[520px] w-[640px] translate-x-1/4 -translate-y-1/4" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-10 lg:py-24">
          <div>
            <LiveStatus variant="line" className="mb-5" />
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
              Mobile service · GTA-wide
            </p>
            <h1
              id="service-heading"
              className="font-display font-bold leading-[0.95] text-[var(--color-frost)]"
              style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              {service.name}
            </h1>
            <p className="mt-5 max-w-md font-sans text-lg leading-relaxed text-[var(--color-frost-dim)]">
              {service.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CallButton size="lg" />
              <Button variant="ghost" size="lg" href="/contact" aria-label="Contact Golden North">
                Contact us
              </Button>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <Photo src={photo.src} alt={photo.alt} ratio="4 / 3" priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>

        <HazardStripe height={8} />
      </section>

      {/* Summary + lists */}
      <section className="bg-midnight py-20 lg:py-28" aria-label={`About ${service.name}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="max-w-3xl font-sans text-xl leading-relaxed text-[var(--color-frost-dim)]">
            {service.summary}
          </p>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display font-bold text-2xl text-[var(--color-frost)]">What&rsquo;s included</h2>
              <ul className="mt-6 space-y-3" aria-label={`What's included in ${service.name}`}>
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-base text-[var(--color-frost-dim)]">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--color-gold)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl text-[var(--color-frost)]">When you need it</h2>
              <ul className="mt-6 space-y-4" aria-label={`When you need ${service.name}`}>
                {service.whenYouNeed.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-[4px] border border-[rgba(245,168,28,0.18)] bg-[var(--color-steel)] px-5 py-4 font-sans text-base leading-relaxed text-[var(--color-frost-dim)]"
                  >
                    <span aria-hidden="true" className="mt-1 shrink-0 font-display font-bold text-[var(--color-gold)]">!</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--color-ink)] py-20 lg:py-28" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 id="faq-heading" className="font-display font-bold text-3xl text-[var(--color-frost)] lg:text-4xl">
            {service.shortName} questions, answered.
          </h2>
          <div className="mt-10 divide-y divide-[rgba(245,168,28,0.14)] border-y border-[rgba(245,168,28,0.14)]">
            {service.faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display font-semibold text-lg text-[var(--color-frost)] marker:content-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span aria-hidden="true" className="shrink-0 text-[var(--color-gold)] text-xl transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 font-sans text-base leading-relaxed text-[var(--color-frost-dim)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="bg-midnight py-20 lg:py-24" aria-labelledby="other-services-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 id="other-services-heading" className="mb-8 font-display font-bold text-2xl text-[var(--color-frost)]">
            We also handle
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center justify-between gap-3 rounded-[4px] border border-[rgba(245,168,28,0.18)] bg-[var(--color-steel)] px-5 py-5 transition-colors duration-200 hover:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-midnight)]"
                aria-label={`${s.name} — view service`}
              >
                <span className="font-display font-bold text-lg text-[var(--color-frost)]">{s.shortName}</span>
                <span aria-hidden="true" className="text-[var(--color-gold)] transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
