// ─── Sub-service landing page (/services/[slug]/[sub]) ───────────────────────
// One template renders all 12 sub-service pages from the catalog. Each is a
// self-sufficient Ads/SEO landing page: problem→solution hero, summary, what
// we do, FAQs (FAQPage JSON-LD), sibling links, parent link, call CTA.

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { SERVICES, getService, getSubService } from "@/lib/services";
import { SERVICE_PHOTO } from "@/lib/photos";
import { BreadcrumbJsonLd } from "@/lib/jsonld";
import { CallButton, Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { CTABand } from "@/components/sections/CTABand";
import { FaqSection } from "@/components/sections/FaqSection";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { ReviewsWidget } from "@/components/sections/ReviewsWidget";

type Params = { slug: string; sub: string };

export function generateStaticParams(): Params[] {
  return SERVICES.flatMap((s) => s.subServices.map((x) => ({ slug: s.slug, sub: x.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, sub } = await params;
  const x = getSubService(slug, sub);
  if (!x) return {};
  return buildMetadata({
    title: x.seoTitle,
    description: x.seoDescription,
    path: `/services/${slug}/${x.slug}`,
    keywords: x.keywords,
  });
}

export default async function SubServicePage({ params }: { params: Promise<Params> }) {
  const { slug, sub } = await params;
  const service = getService(slug);
  const item = getSubService(slug, sub);
  if (!service || !item) notFound();

  const photo = SERVICE_PHOTO[service.slug];
  const siblings = service.subServices.filter((x) => x.slug !== item.slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.name,
    description: item.summary,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${BUSINESS.url}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.phoneRaw,
      url: BUSINESS.url,
    },
    areaServed: BUSINESS.areaServed,
    serviceType: item.name,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
          { name: item.name, path: `/services/${service.slug}/${item.slug}` },
        ]}
      />

      {/* Problem→solution hero — same pattern as the parent template */}
      <section className="relative overflow-hidden bg-[var(--color-navy)]" aria-labelledby="sub-heading">
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-10 lg:py-24">
          <div>
            <AvailabilityBadge variant="line" onDark className="mb-5" />
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-accent)]">
              {item.name} · Toronto &amp; the GTA
            </p>
            <h1
              id="sub-heading"
              className="font-bold leading-[1.04] text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
            >
              {item.problem}
              <span className="mt-2 block text-[var(--color-accent)]">{item.solution}</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--color-footer-fg)]">
              Fair, upfront price quoted on the call: no membership, no hidden fees.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CallButton size="lg" />
              <Button variant="ghost" size="lg" href={`/services/${service.slug}`}>
                All {service.name} services
              </Button>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <Photo src={photo.src} alt={photo.alt} ratio="4 / 3" priority sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* Summary + what we do */}
      <section className="bg-[var(--color-page)] py-20 lg:py-28" aria-label={`About ${item.name}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="max-w-3xl text-xl leading-relaxed text-[var(--color-body)]">{item.summary}</p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--color-body)]">{item.details}</p>
          <TrustBadges className="mt-10 border-t border-[var(--color-border)] pt-8" />
          <div className="mt-14 max-w-2xl">
            <h2 className="font-bold text-2xl text-[var(--color-heading)]">What we do</h2>
            <ul className="mt-6 space-y-3" aria-label={`What's included in ${item.name}`}>
              {item.included.map((line) => (
                <li key={line} className="flex items-start gap-3 text-base text-[var(--color-body)]">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FaqSection heading={`${item.name} questions, answered.`} faqs={item.faqs} emitJsonLd />

      {/* Parent + sibling cross-links */}
      <section className="bg-[var(--color-page)] py-20 lg:py-24" aria-labelledby="related-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 id="related-heading" className="mb-8 font-bold text-2xl text-[var(--color-heading)]">
            More from {service.name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href={`/services/${service.slug}`}
              className="group card-lift flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
              aria-label={`${service.name}, view service`}
            >
              <span className="font-bold text-lg text-[var(--color-heading)]">{service.name}</span>
              <span aria-hidden="true" className="text-[var(--color-accent-deep)] transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            {siblings.map((x) => (
              <Link
                key={x.slug}
                href={`/services/${service.slug}/${x.slug}`}
                className="group card-lift flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
                aria-label={`${x.name}, view service`}
              >
                <span className="font-bold text-lg text-[var(--color-heading)]">{x.name}</span>
                <span aria-hidden="true" className="text-[var(--color-accent-deep)] transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ReviewsWidget />
      <CTABand />
    </>
  );
}
