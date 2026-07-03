// ─── Contact (/contact) ───────────────────────────────────────────────────────
// Call-first: the headline action is the phone call. The message form is the
// secondary option. Service-area map at the bottom. No CTA band — the page IS
// the CTA. Light theme, no emergency motifs.

import { buildMetadata } from "@/lib/seo";
import { BUSINESS, mailHref } from "@/lib/business";
import { CallButton } from "@/components/ui/Button";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { ContactForm } from "@/components/contact/ContactForm";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { ReviewsWidget } from "@/components/sections/ReviewsWidget";

export const metadata = buildMetadata({
  title: "Contact — Call 24/7",
  description: `Reach ${BUSINESS.name} 24/7 for mobile tire and roadside help across the ${BUSINESS.areaServed}. Call ${BUSINESS.phoneDisplay} — or send a message.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* Call-first header */}
      <section className="bg-[var(--color-surface)] border-b border-[var(--color-border)]" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <AvailabilityBadge variant="line" className="mb-6" label="Available · We come to you" />
          <h1
            id="contact-heading"
            className="max-w-3xl font-bold leading-[1.05] text-[var(--color-heading)]"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)", letterSpacing: "-0.02em" }}
          >
            We pick up. <span className="text-[var(--color-accent)]">Day or night.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-body)]">
            The fastest way to get help moving is to call. One number, a real person, no queue —
            then we&rsquo;re on our way to you.
          </p>

          <div className="mt-9">
            <CallButton size="lg" />
          </div>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-xl bg-[var(--color-border)] sm:grid-cols-3">
            <div className="bg-[var(--color-card)] px-6 py-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">Hours</dt>
              <dd className="mt-2 text-xl font-bold text-[var(--color-heading)]">{BUSINESS.hours}</dd>
              <p className="mt-1 text-sm text-[var(--color-body)]">Day, night, weekends, holidays.</p>
            </div>
            <div className="bg-[var(--color-card)] px-6 py-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">Email</dt>
              <dd className="mt-2">
                <a
                  href={mailHref}
                  className="text-lg font-bold text-[var(--color-accent-deep)] hover:text-[var(--color-heading)] rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-card)]"
                  aria-label={`Email Golden North at ${BUSINESS.email}`}
                >
                  {BUSINESS.email}
                </a>
              </dd>
            </div>
            <div className="bg-[var(--color-card)] px-6 py-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">Service area</dt>
              <dd className="mt-2 text-lg font-bold text-[var(--color-heading)]">{BUSINESS.areaServed}</dd>
            </div>
          </dl>
        </div>
      </section>

      <ReviewsWidget />

      {/* Secondary: message form */}
      <section className="bg-[var(--color-page)] py-20 lg:py-28" aria-labelledby="message-heading">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 id="message-heading" className="font-bold text-3xl text-[var(--color-heading)] lg:text-4xl">
            Prefer to message us?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-body)]">
            Not urgent? Send the details and we&rsquo;ll get back to you. For anything time-sensitive,
            calling is always faster.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>

      <CoverageMap />
    </>
  );
}
