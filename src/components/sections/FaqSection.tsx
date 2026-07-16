// ─── FaqSection ───────────────────────────────────────────────────────────────
// Reusable accessible FAQ accordion. Renders a <details>/<summary> list and,
// when emitJsonLd is set, a matching FAQPage JSON-LD block. Keep each page's
// FAQ set distinct so Google doesn't see duplicate FAQ schema across URLs.

import { FaqJsonLd } from "@/lib/jsonld";

interface FaqSectionProps {
  heading: string;
  faqs: { q: string; a: string }[];
  id?: string;
  emitJsonLd?: boolean;
  className?: string;
}

export function FaqSection({
  heading,
  faqs,
  id = "faq-heading",
  emitJsonLd = false,
  className = "bg-[var(--color-surface)] py-14 sm:py-20 lg:py-28",
}: FaqSectionProps) {
  return (
    <section className={className} aria-labelledby={id}>
      {emitJsonLd && <FaqJsonLd faqs={faqs} />}
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <h2 id={id} className="font-bold text-3xl text-[var(--color-heading)] lg:text-4xl">
          {heading}
        </h2>
        <div className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {faqs.map((faq) => (
            <details key={faq.q} className="group">
              {/* Padding lives on the summary so the whole row is the tap target. */}
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-semibold text-lg text-[var(--color-heading)] marker:content-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span aria-hidden="true" className="shrink-0 text-[var(--color-accent-deep)] text-xl transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="-mt-2 pb-5 text-base leading-relaxed text-[var(--color-body)]">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
