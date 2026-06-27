// ─── LiveStatus ───────────────────────────────────────────────────────────────
// A dispatch-console "we're live" indicator: a pulsing signal dot + label. This
// is how the 24/7 promise is made to feel *active* rather than stated. The
// `signal` token (a hotter orange than the gold accent) is reserved for this
// live cue and urgency only, so it always reads as "on air".
//
// role="status" exposes it to assistive tech; the dot is aria-hidden. The pulse
// is killed by the global prefers-reduced-motion rule.

import { BUSINESS } from "@/lib/business";

interface LiveStatusProps {
  className?: string;
  /** "badge" = compact (header). "line" = larger, with the dispatch sub-label. */
  variant?: "badge" | "line";
  label?: string;
}

export function LiveStatus({ className = "", variant = "badge", label }: LiveStatusProps) {
  const text = label ?? (variant === "line" ? "Open now · dispatching the GTA" : BUSINESS.hours);

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      role="status"
      aria-label={`Service status: ${text}`}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        {/* Expanding ring */}
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-signal)] opacity-60"
          style={{ animation: "livePulse 1.8s var(--ease-out-quart) infinite" }}
        />
        {/* Solid core */}
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-signal)]" />
      </span>
      <span
        className={
          variant === "line"
            ? "font-display font-bold uppercase tracking-[0.18em] text-[var(--color-signal)] text-sm"
            : "font-display font-semibold uppercase tracking-[0.16em] text-[var(--color-signal)] text-xs"
        }
      >
        {text}
      </span>
    </div>
  );
}
