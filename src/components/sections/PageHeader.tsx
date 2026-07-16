// ─── PageHeader ───────────────────────────────────────────────────────────────
// Compact, consistent header for inner pages (services, gallery, contact). A
// navy brand band with a faint compass-rose watermark and an optional
// availability line. No glow, no hazard.

import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { CompassRose } from "@/components/ui/CompassRose";

interface PageHeaderProps {
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  showStatus?: boolean;
}

export function PageHeader({ title, intro, children, showStatus = true }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)]" aria-labelledby="page-heading">
      <CompassRose className="pointer-events-none absolute -right-20 -bottom-24 h-80 w-80 text-[var(--color-accent)] opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-10 lg:py-28">
        {showStatus && <AvailabilityBadge variant="line" onDark className="mb-6" />}
        <h1
          id="page-heading"
          className="max-w-3xl font-bold leading-[1.05] text-white"
          style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)", letterSpacing: "-0.02em" }}
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-footer-fg)]">{intro}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap items-center gap-4">{children}</div>}
      </div>
    </section>
  );
}
