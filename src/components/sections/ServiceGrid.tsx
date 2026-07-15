// ─── ServiceGrid ─────────────────────────────────────────────────────────────
// The 5 main services as compact problem→solution cards with sub-service pill
// links. Replaces the tall editorial row layout — a stranded visitor
// sees the full catalog in one screen. Card hover uses the ambient card-lift;
// pills are real links so ad/search visitors can deep-dive in one tap.

import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {SERVICES.map((service, i) => (
        <Reveal
          key={service.slug}
          delay={i * 60}
          className={i === SERVICES.length - 1 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.625rem)]" : ""}
        >
          <article className="card-lift relative flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="rounded-lg bg-[var(--color-accent-soft)] p-2.5 text-[var(--color-accent-deep)]">
                <ServiceIcon name={service.icon} />
              </span>
              <div>
                <h3 className="font-bold text-2xl leading-tight text-[var(--color-heading)]">
                  <Link
                    href={`/services/${service.slug}`}
                    className="rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-card)] hover:text-[var(--color-accent-deep)] transition-colors duration-150 after:absolute after:inset-0"
                  >
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">{service.blurb}</p>
              </div>
            </div>

            {service.subServices.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-4" aria-label={`${service.name} services`}>
                {service.subServices.map((x) => (
                  <li key={x.slug} className="relative">
                    <Link
                      href={`/services/${service.slug}/${x.slug}`}
                      className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-page)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-heading)] transition-colors duration-150 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1"
                    >
                      {x.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
