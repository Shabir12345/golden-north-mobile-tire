// ─── Hero ─────────────────────────────────────────────────────────────────────
// The emergency conversion stage. A credibility row (live-dispatch pill + Google
// rating) opens it, then the problem→solution H1 with the ETA promise, the
// scannable "we handle this" service list, the pulsing gold call CTA, and the
// green-check credentials. Exactly three attention anchors move; nothing else in
// the hero animates. Navy stage + real van photo retained.
//
// Centered on phones and tablets, left-aligned from lg where the van photo sits
// beside the copy — a centered column has no room for a photo next to it.

import { Photo } from "@/components/ui/Photo";
import { CallButton, Button } from "@/components/ui/Button";
import { CompassRose } from "@/components/ui/CompassRose";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/lib/services";
import { BUSINESS } from "@/lib/business";

// The visitor's problem in their words, not the catalog's service names — this
// list is the "is my emergency one you handle?" scan, so it stays symptom-side.
const HERO_SERVICES: { icon: Service["icon"]; label: string }[] = [
  { icon: "tire", label: "Flat tire" },
  { icon: "battery", label: "Dead battery" },
  { icon: "lockout", label: "Locked out" },
  { icon: "roadside", label: "Out of gas" },
  { icon: "mechanic", label: "Breakdown" },
];

// The credentials a stranger weighs at 2am, and the only hero claims the service
// list and the ETA promise don't already make. Wording is the confirmed-true set
// from lib/trust.ts — don't add a claim here that isn't in TRUST_SIGNALS.
const HERO_TRUST = ["No membership, no hidden fees", "Licensed & insured", "Warranty-backed parts"];

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 14.6-4.2-4.2 1.4-1.4 2.8 2.8 5.8-5.8 1.4 1.4-7.2 7.2Z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)]" aria-label="24/7 emergency roadside assistance">
      <CompassRose className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 text-[var(--color-accent)] opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-8 py-10 sm:gap-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14 lg:py-20">
          {/* Text column */}
          <div className="text-center lg:text-left">
            {/* Attention anchors 1 & 3 — live dispatch and live reviews, paired.
                Both are "we're real and we're awake" claims, so they open the
                hero together rather than bracketing it top and bottom. Wraps to
                two centered rows below ~430px; that's fine, they stay a cluster. */}
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2.5 sm:mb-7 lg:justify-start">
              <p className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[var(--color-on-navy)]">
                <span className="live-dot" aria-hidden="true" />
                24/7 Emergency Dispatch · answering now
              </p>
              <ReviewBadge onDark variant="chip" />
            </div>

            {/* The 2.75rem floor cost this headline five lines and 236px on a
                360-390px phone, pushing the call button to the fold edge — the
                one thing the stranded-on-mobile visitor is here to find. The
                7vw slope reaches the same 5rem ceiling by ~1150px. */}
            <h1 className="font-bold leading-[1.02] text-white" style={{ fontSize: "clamp(2.25rem, 7vw, 5rem)" }}>
              Stranded in the GTA?
              <span className="mt-3 block text-[var(--color-accent)]">
                We come to you in as little as 20-30 minutes.
              </span>
            </h1>

            {/* Two columns even on the narrowest phone: five stacked rows would
                cost ~60px of fold and push the call button off screen.
                `w-fit mx-auto` hugs the labels so the block centers as a unit —
                equal-width columns under a full-width paragraph left a dead gap
                on the right where "Dead battery"/"Out of gas" ran short. Rows
                stay left-aligned inside the centered block; centering five
                ragged labels individually would read as a word cloud. */}
            <ul className="mx-auto mt-5 grid w-fit grid-cols-2 gap-x-6 gap-y-3 text-left sm:mt-6 sm:gap-x-8 lg:mx-0">
              {HERO_SERVICES.map(({ icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-lg text-[var(--color-on-navy)] sm:text-xl">
                  <ServiceIcon name={icon} className="h-6 w-6 shrink-0 text-[var(--color-accent)]" />
                  {label}
                </li>
              ))}
            </ul>

            {/* The list above carries what we fix and the checks below carry the
                fee structure, so this keeps only what neither can: the promise,
                and when the price lands. */}
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--color-footer-fg)] sm:mt-5 sm:text-lg lg:mx-0">
              One call sends a technician anywhere in Toronto &amp; the GTA — fair price
              quoted before we roll.
            </p>

            {/* Attention anchor 2 — the call. `data-call-anchor` tells
                MobileCallBar to stay down while this button is on screen. */}
            {/* Full-width on phones: centered buttons at their natural ragged
                widths read as debris. Matching widths make one deliberate stack,
                and the wider call target is the point on a one-handed phone. */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-9 sm:gap-4 lg:justify-start">
              <span data-call-anchor className="btn-pulse inline-flex w-full rounded-lg sm:w-auto">
                <CallButton size="lg" className="w-full" />
              </span>
              <Button
                variant="ghost"
                size="lg"
                href="/services"
                aria-label="See all services"
                className="w-full sm:w-auto"
              >
                See services
              </Button>
            </div>

            {/* Credentials, directly under the call — the objections a stranger
                raises with the phone already in their hand. Green is the existing
                --color-live token, not a new hue; the icons are decorative and
                the labels carry the meaning. */}
            {/* Stacked block on phones, one row from sm. `w-fit mx-auto` centers
                the block while the rows stay left-aligned, so the three checks
                line up in a column — same reason the service list does it.
                Centering each row on its own scatters the ticks. */}
            <ul
              className="mx-auto mt-6 flex w-fit flex-col gap-x-5 gap-y-2.5 sm:mt-7 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:mx-0 lg:justify-start"
              aria-label="Why drivers trust GoldenNorth"
            >
              {HERO_TRUST.map((label) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <CheckIcon className="h-[18px] w-[18px] shrink-0 text-[var(--color-live)]" />
                  <span className="text-sm font-semibold text-[var(--color-on-navy)]">{label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs uppercase tracking-[0.08em] text-[var(--color-footer-fg)] sm:mt-7">
              {BUSINESS.areaServed}
            </p>
          </div>

          {/* Image column */}
          <div className="relative">
            {/* Portrait is right beside the text column on desktop; on a phone it
                stacks underneath, where a 3/4 crop eats ~440px of scroll. */}
            <Photo
              src="/photos/hero-night-tech.webp"
              alt="A GoldenNorth technician in a hi-vis vest balancing a wheel beside the yellow service van"
              ratio="3 / 4"
              priority
              overlay
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="shadow-[0_20px_50px_-20px_rgba(16,32,63,0.35)] [--photo-ratio:4/3] lg:[--photo-ratio:3/4]"
            />
            <span className="absolute left-4 bottom-4 inline-flex rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-[var(--color-body)] backdrop-blur-sm shadow-sm">
              The real GoldenNorth van, on a real GTA call
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
