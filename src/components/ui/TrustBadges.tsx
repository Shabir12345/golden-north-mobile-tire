// ─── TrustBadges ──────────────────────────────────────────────────────────────
// Data-driven row of professional trust signals. "row" (default) shows an icon,
// label, and supporting line; "compact" shows a tight icon + label line for the
// footer. Icons are decorative (aria-hidden); labels carry the meaning.

import { TRUST_SIGNALS, type TrustSignal } from "@/lib/trust";

const ICON_PATHS: Record<TrustSignal["icon"], string> = {
  shield: "M12 2 4 5v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V5l-8-3Zm-1 13-3-3 1.4-1.4L11 12.2l4.6-4.6L17 9l-6 6Z",
  tag: "M2 12 12 2h8v8L10 20 2 12Zm14-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
  check: "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 11h5v-2h-3V6h-2v7Z",
};

function Icon({ name, className }: { name: TrustSignal["icon"]; className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

interface TrustBadgesProps {
  variant?: "row" | "compact";
  onDark?: boolean;
  className?: string;
}

export function TrustBadges({ variant = "row", onDark = false, className = "" }: TrustBadgesProps) {
  const iconColor = onDark ? "text-[var(--color-accent)]" : "text-[var(--color-accent-deep)]";
  const labelColor = onDark ? "text-[var(--color-on-navy)]" : "text-[var(--color-heading)]";
  const subColor = onDark ? "text-[var(--color-footer-fg)]" : "text-[var(--color-body)]";

  if (variant === "compact") {
    return (
      <ul
        className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}
        aria-label="Why drivers trust GoldenNorth"
      >
        {TRUST_SIGNALS.map((s) => (
          <li key={s.label} className="inline-flex items-center gap-2">
            <Icon name={s.icon} className={`h-4 w-4 shrink-0 ${iconColor}`} />
            <span className={`text-sm font-medium ${labelColor}`}>{s.label}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
      aria-label="Why drivers trust GoldenNorth"
    >
      {TRUST_SIGNALS.map((s) => (
        <li key={s.label} className="flex items-start gap-3">
          <Icon name={s.icon} className={`mt-0.5 h-6 w-6 shrink-0 ${iconColor}`} />
          <div>
            <p className={`font-bold ${labelColor}`}>{s.label}</p>
            <p className={`mt-0.5 text-sm leading-snug ${subColor}`}>{s.sub}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
