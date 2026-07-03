// ─── AvailabilityBadge ────────────────────────────────────────────────────────
// A calm "we're open" cue: a small solid accent dot + label. No pulse, no alarm.
// role="status" exposes it to assistive tech; the dot is decorative.

import { BUSINESS } from "@/lib/business";

interface AvailabilityBadgeProps {
  className?: string;
  /** "badge" = compact (header). "line" = larger, with the friendly sub-label. */
  variant?: "badge" | "line";
  label?: string;
  /** When true, renders text in --color-footer-fg for legibility on the dark navy footer. */
  onDark?: boolean;
}

export function AvailabilityBadge({ className = "", variant = "badge", label, onDark = false }: AvailabilityBadgeProps) {
  const text = label ?? (variant === "line" ? "Available 24/7 · We come to you" : BUSINESS.hours);

  const labelColor = onDark
    ? "text-[var(--color-on-navy)]"
    : variant === "line"
      ? "text-[var(--color-accent-deep)]"
      : "text-[var(--color-muted)]";

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      role="status"
      aria-label={`Service status: ${text}`}
    >
      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
      <span
        className={
          variant === "line"
            ? `font-semibold ${labelColor} text-sm`
            : `font-medium ${labelColor} text-xs`
        }
      >
        {text}
      </span>
    </div>
  );
}
