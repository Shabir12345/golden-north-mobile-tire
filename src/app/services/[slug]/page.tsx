// ─── Service detail (/services/[slug]) ────────────────────────────────────────
// Statically generated SEO page per service: focused hero with the real photo,
// what's included, when you need it, an accessible <details> FAQ (with FAQPage
// JSON-LD), cross-links, and the CTA band. Light theme, no emergency motifs.

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SERVICES, SERVICE_SLUGS, getService } from "@/lib/services";
import { SERVICE_PHOTO } from "@/lib/photos";
import { ServiceJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/lib/jsonld";
import { CallButton, Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { CompassRose } from "@/components/ui/CompassRose";
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
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
      />


      {/* Focused header */}
      <section className="relative overflow-hidden bg-[var(--color-navy)]" aria-labelledby="service-heading">
        <CompassRose className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 text-[var(--color-accent)] opacity-[0.06]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-10 lg:py-24">
          <div>
            <AvailabilityBadge variant="line" onDark className="mb-5" />
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-accent)]">
              Mobile service · GTA-wide
            </p>
            <h1
              id="service-heading"
              className="font-bold leading-[1.05] text-white"
              style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
            >
              {service.name}
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--color-footer-fg)]">
              {service.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CallButton size="lg" />
              <Button variant="ghost" size="lg" href="/contact" aria-label="Contact GoldenNorth">
                Contact us
              </Button>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <Photo src={photo.src} alt={photo.alt} ratio="4 / 3" priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* Summary + lists */}
      <section className="bg-[var(--color-page)] py-20 lg:py-28" aria-label={`About ${service.name}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="max-w-3xl text-xl leading-relaxed text-[var(--color-body)]">
            {service.summary}
          </p>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-bold text-2xl text-[var(--color-heading)]">What&rsquo;s included</h2>
              <ul className="mt-6 space-y-3" aria-label={`What's included in ${service.name}`}>
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-[var(--color-body)]">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-2xl text-[var(--color-heading)]">When you need it</h2>
              <ul className="mt-6 space-y-4" aria-label={`When you need ${service.name}`}>
                {service.whenYouNeed.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-4 text-base leading-relaxed text-[var(--color-body)] shadow-sm"
                  >
                    <span aria-hidden="true" className="mt-1 shrink-0 font-bold text-[var(--color-accent-deep)]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--color-surface)] py-20 lg:py-28" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 id="faq-heading" className="font-bold text-3xl text-[var(--color-heading)] lg:text-4xl">
            {service.shortName} questions, answered.
          </h2>
          <div className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {service.faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-lg text-[var(--color-heading)] marker:content-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span aria-hidden="true" className="shrink-0 text-[var(--color-accent-deep)] text-xl transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-body)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="bg-[var(--color-page)] py-20 lg:py-24" aria-labelledby="other-services-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 id="other-services-heading" className="mb-8 font-bold text-2xl text-[var(--color-heading)]">
            We also handle
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-5 shadow-sm transition-colors duration-200 hover:border-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
                aria-label={`${s.name} — view service`}
              >
                <span className="font-bold text-lg text-[var(--color-heading)]">{s.shortName}</span>
                <span aria-hidden="true" className="text-[var(--color-accent-deep)] transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
