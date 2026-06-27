// ─── AvailabilityBadge ────────────────────────────────────────────────────────
// A calm "we're open" cue: a small solid accent dot + label. No pulse, no alarm.
// role="status" exposes it to assistive tech; the dot is decorative.

import { BUSINESS } from "@/lib/business";

interface AvailabilityBadgeProps {
  className?: string;
  /** "badge" = compact (header). "line" = larger, with the friendly sub-label. */
  variant?: "badge" | "line";
  label?: string;
}

export function AvailabilityBadge({ className = "", variant = "badge", label }: AvailabilityBadgeProps) {
  const text = label ?? (variant === "line" ? "Available 24/7 · We come to you" : BUSINESS.hours);

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
            ? "font-semibold text-[var(--color-accent)] text-sm"
            : "font-medium text-[var(--color-muted)] text-xs"
        }
      >
        {text}
      </span>
    </div>
  );
}
