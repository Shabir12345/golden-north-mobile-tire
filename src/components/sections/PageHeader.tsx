// ─── PageHeader ───────────────────────────────────────────────────────────────
// Compact, consistent hero for inner pages (services, gallery, contact, service
// detail). Hazard edge + headlight glow + a live status line, so every page
// opens in the same High-Vis voice as the home hero without repeating its
// full split layout.

import { Glow } from "@/components/ui/Glow";
import { HazardStripe } from "@/components/ui/HazardStripe";
import { LiveStatus } from "@/components/ui/LiveStatus";

interface PageHeaderProps {
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** CTA cluster or extra content under the intro. */
  children?: React.ReactNode;
  /** Hide the live status line (e.g. when the page body leads with it). */
  showStatus?: boolean;
}

export function PageHeader({ title, intro, children, showStatus = true }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-midnight" aria-labelledby="page-heading">
      <HazardStripe height={6} className="absolute inset-x-0 top-0 z-10" />
      <Glow intensity="medium" className="top-0 right-0 h-[420px] w-[560px] translate-x-1/4 -translate-y-1/4" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {showStatus && <LiveStatus variant="line" className="mb-6" />}
        <h1
          id="page-heading"
          className="max-w-3xl font-display font-bold leading-[0.95] text-[var(--color-frost)]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)", letterSpacing: "-0.03em" }}
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-[var(--color-frost-dim)]">{intro}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap items-center gap-4">{children}</div>}
      </div>

      <HazardStripe height={8} />
    </section>
  );
}
