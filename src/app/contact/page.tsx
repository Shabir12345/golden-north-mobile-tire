// ─── Contact (/contact) ───────────────────────────────────────────────────────
// Call-first: the headline action is the phone call. The message form is
// explicitly the secondary option ("Prefer to message us?"). Service-area map
// at the bottom. No CTA band here — the whole page IS the CTA.

import { buildMetadata } from "@/lib/seo";
import { BUSINESS, mailHref } from "@/lib/business";
import { CallButton } from "@/components/ui/Button";
import { Glow } from "@/components/ui/Glow";
import { HazardStripe } from "@/components/ui/HazardStripe";
import { LiveStatus } from "@/components/ui/LiveStatus";
import { ContactForm } from "@/components/contact/ContactForm";
import { CoverageMap } from "@/components/sections/CoverageMap";

export const metadata = buildMetadata({
  title: "Contact — Call 24/7",
  description: `Reach ${BUSINESS.name} 24/7 for mobile tire and roadside help across the ${BUSINESS.areaServed}. Call ${BUSINESS.phoneDisplay} — or send a message.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* Call-first hero */}
      <section className="relative overflow-hidden bg-midnight" aria-labelledby="contact-heading">
        <HazardStripe height={6} className="absolute inset-x-0 top-0 z-10" />
        <Glow intensity="high" className="top-0 right-0 h-[480px] w-[600px] translate-x-1/4 -translate-y-1/4" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <LiveStatus variant="line" className="mb-6" />
          <h1
            id="contact-heading"
            className="max-w-3xl font-display font-bold leading-[0.95] text-[var(--color-frost)]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)", letterSpacing: "-0.03em" }}
          >
            We pick up. <span className="text-[var(--color-gold)]">Day or night.</span>
          </h1>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-[var(--color-frost-dim)]">
            The fastest way to get help moving is to call. One number, a real person, no queue —
            then we&rsquo;re on our way to you.
          </p>

          <div className="mt-9">
            <CallButton size="lg" />
          </div>

          {/* Contact facts */}
          <dl className="mt-12 grid gap-px overflow-hidden rounded-[4px] bg-[rgba(245,168,28,0.14)] sm:grid-cols-3">
            <div className="bg-[var(--color-steel)] px-6 py-6">
              <dt className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-slate-muted)]">Hours</dt>
              <dd className="mt-2 font-display text-xl font-bold text-[var(--color-frost)]">{BUSINESS.hours}</dd>
              <p className="mt-1 font-sans text-sm text-[var(--color-frost-dim)]">Day, night, weekends, holidays.</p>
            </div>
            <div className="bg-[var(--color-steel)] px-6 py-6">
              <dt className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-slate-muted)]">Email</dt>
              <dd className="mt-2">
                <a
                  href={mailHref}
                  className="font-display text-lg font-bold text-[var(--color-gold)] hover:text-[#FFB733] rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-steel)]"
                  aria-label={`Email Golden North at ${BUSINESS.email}`}
                >
                  {BUSINESS.email}
                </a>
              </dd>
            </div>
            <div className="bg-[var(--color-steel)] px-6 py-6">
              <dt className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-slate-muted)]">Service area</dt>
              <dd className="mt-2 font-display text-lg font-bold text-[var(--color-frost)]">{BUSINESS.areaServed}</dd>
            </div>
          </dl>
        </div>

        <HazardStripe height={8} />
      </section>

      {/* Secondary: message form */}
      <section className="bg-[var(--color-ink)] py-20 lg:py-28" aria-labelledby="message-heading">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 id="message-heading" className="font-display font-bold text-3xl text-[var(--color-frost)] lg:text-4xl">
            Prefer to message us?
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-[var(--color-frost-dim)]">
            Not an emergency? Send the details and we&rsquo;ll get back to you. For anything urgent,
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
