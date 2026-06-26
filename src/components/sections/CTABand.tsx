// ─── CTABand ──────────────────────────────────────────────────────────────────
// Design intent: not a generic "Call us today!" gold box. Instead, this band
// opens with a tension statement — addressing the exact failure mode that sends
// GTA drivers to Golden North (slow roadside plans, unanswered calls) — and
// resolves it with a single action. The gold Glow here is at maximum intensity
// because this is the final conversion point on the page.
//
// Kept prop-light so other pages can drop it in unchanged. No page-specific
// copy — the copy is universally applicable to anyone arriving from any page.

import { Glow } from "@/components/ui/Glow";
import { CallButton } from "@/components/ui/Button";

export function CTABand() {
  return (
    <section
      className="relative overflow-hidden bg-ink py-24 lg:py-32"
      aria-labelledby="cta-band-heading"
    >
      {/* Gold glow: centred from below, like amber streetlight on asphalt */}
      <Glow
        intensity="high"
        className="inset-x-0 bottom-0 h-[400px] w-full translate-y-1/4"
      />

      {/* Top tread line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-30"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-10">
        <p
          className="mb-4 font-display text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-gold)] opacity-70"
          aria-hidden="true"
        >
          24/7 · GTA-wide
        </p>

        {/* The tension before the resolution */}
        <h2
          id="cta-band-heading"
          className="font-display font-bold leading-tight text-[var(--color-frost)] mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Still waiting on hold?
        </h2>

        {/* Resolution — active voice, immediate, specific */}
        <p className="font-sans text-lg text-[var(--color-slate-muted)] mb-10 max-w-md mx-auto leading-relaxed">
          Hang up. One call to Golden North gets a technician moving to your location — no app, no wait, no tow.
        </p>

        {/* The single action — the only interactive element in this band */}
        <div className="flex justify-center">
          <CallButton />
        </div>
      </div>
    </section>
  );
}
