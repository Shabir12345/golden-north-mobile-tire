// ─── HazardStripe ─────────────────────────────────────────────────────────────
// The signature High-Vis motif: a diagonal amber/black caution band lifted
// straight off the van's own livery. Used as a section divider and as a thin
// safety accent. Purely decorative → aria-hidden.
//
// `tone="amber"` (default) = amber stripes on ink, for breaking up dark sections.
// `tone="ink"`   = ink stripes on amber, for the edges of the drenched CTA band.

interface HazardStripeProps {
  className?: string;
  /** Band thickness in px. Default 10. */
  height?: number;
  tone?: "amber" | "ink";
}

export function HazardStripe({ className = "", height = 10, tone = "amber" }: HazardStripeProps) {
  const stripe =
    tone === "amber"
      ? "repeating-linear-gradient(-45deg, var(--color-gold) 0 14px, transparent 14px 28px)"
      : "repeating-linear-gradient(-45deg, var(--color-ink) 0 14px, transparent 14px 28px)";

  return (
    <div
      aria-hidden="true"
      className={`w-full ${className}`}
      style={{ height, backgroundImage: stripe }}
    />
  );
}
