// ─── CTABand ──────────────────────────────────────────────────────────────────
// A calm, accent-tinted band (not a loud full-blue slab). Friendly closing
// nudge to call; the blue CallButton stays the loudest object. Prop-light so any
// page can drop it in.

import { CallButton } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/business";

export function CTABand() {
  return (
    <section className="bg-[var(--color-accent-soft)]" aria-labelledby="cta-band-heading">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-deep)]">
          24/7 · GTA-wide · we come to you
        </p>

        <h2
          id="cta-band-heading"
          className="font-bold leading-[1.05] text-[var(--color-heading)]"
          style={{ fontSize: "clamp(2.25rem, 6vw, 3.5rem)", letterSpacing: "-0.02em" }}
        >
          Ready when you are.
        </h2>

        <p className="mx-auto mt-5 mb-9 max-w-md text-lg leading-relaxed text-[var(--color-body)]">
          Tell us where you are and what happened. You&rsquo;ll get an upfront quote and an
          honest ETA on the call — then a {BUSINESS.shortName} technician is on the way, anywhere
          in the GTA. Day, night, weekends, holidays.
        </p>

        <div className="flex justify-center">
          <CallButton size="lg" />
        </div>
      </div>
    </section>
  );
}
