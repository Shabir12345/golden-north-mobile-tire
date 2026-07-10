// ─── CoverageMap ──────────────────────────────────────────────────────────────
// Coverage copy + area list on the left, a real interactive Google Map on the
// right pinned to the base address. The embed uses the keyless `output=embed`
// form (no API key / billing). The text list of areas remains the accessible
// equivalent for the coverage story.

import { BUSINESS, addressDisplay, mapsEmbedSrc, mapsLinkHref } from "@/lib/business";

const AREAS = [
  "Toronto", "Vaughan", "Markham", "Scarborough",
  "Etobicoke", "North York", "Oakville", "Richmond Hill",
] as const;

export function CoverageMap() {
  return (
    <section className="bg-[var(--color-page)] py-24 lg:py-32" aria-labelledby="coverage-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <h2 id="coverage-heading" className="font-bold text-4xl leading-[1.05] text-[var(--color-heading)] lg:text-5xl">
              The whole GTA, <span className="text-[var(--color-accent-deep)]">not just downtown.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-body)]">
              {BUSINESS.shortName} runs mobile tire and roadside service across the full{" "}
              {BUSINESS.areaServed}. A Vaughan driveway, a Markham condo garage, the shoulder of
              the 401 through Etobicoke — one call reaches us.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5" aria-label="Areas served">
              {AREAS.map((area) => (
                <li key={area} className="flex items-center gap-2.5 text-sm text-[var(--color-body)]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
            <iframe
              src={mapsEmbedSrc}
              title={`Map showing ${BUSINESS.shortName} at ${addressDisplay}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[320px] w-full border-0 sm:h-[400px]"
            />
            <address className="flex flex-col gap-3 border-t border-[var(--color-border)] px-5 py-4 not-italic sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm leading-relaxed text-[var(--color-body)]">
                <span className="font-semibold text-[var(--color-heading)]">{BUSINESS.shortName}</span>
                <br className="sm:hidden" />
                <span className="sm:before:content-['_·_']">{addressDisplay}</span>
              </span>
              <a
                href={mapsLinkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm font-semibold text-[var(--color-accent-deep)] hover:text-[var(--color-heading)] rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
              >
                Get directions →
              </a>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}
