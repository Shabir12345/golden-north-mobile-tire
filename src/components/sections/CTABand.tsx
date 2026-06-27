// ─── CTABand ──────────────────────────────────────────────────────────────────
// The page's one fully-drenched moment: the surface IS the brand amber. After a
// long dark scroll, the band hits like the van's headlights swinging onto you.
// Black text on amber (AA ≈ 10.7:1); the call is a solid ink button so it stays
// the loudest object even on a loud surface. Prop-light so any page can drop it in.

import { CallButton } from "@/components/ui/Button";
import { HazardStripe } from "@/components/ui/HazardStripe";
import { BUSINESS } from "@/lib/business";

export function CTABand() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-gold)]" aria-labelledby="cta-band-heading">
      <HazardStripe height={8} tone="ink" />

      {/* faint tread texture in the band */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--color-ink) 0 2px, transparent 2px 22px)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
        <p className="mb-4 font-display text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-ink)]/70">
          24/7 · GTA-wide · we come to you
        </p>

        <h2
          id="cta-band-heading"
          className="font-display font-bold leading-[0.95] text-[var(--color-ink)]"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", letterSpacing: "-0.03em" }}
        >
          Stop waiting. Start rolling.
        </h2>

        <p className="mx-auto mt-5 mb-9 max-w-md font-sans text-lg leading-relaxed text-[var(--color-ink)]/80">
          One call to {BUSINESS.shortName} gets a technician moving to your location — no app,
          no queue, no tow. Day, night, weekends, holidays.
        </p>

        <div className="flex justify-center">
          <CallButton size="lg" tone="ink" />
        </div>
      </div>

      <HazardStripe height={8} tone="ink" />
    </section>
  );
}
