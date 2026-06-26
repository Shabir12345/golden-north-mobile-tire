// ─── StatStrip ────────────────────────────────────────────────────────────────
// Renders a row of label/value stat pairs — e.g. "24/7 Service", "10+ Years",
// "GTA-wide Coverage". Automotive instruments display numbers with tabular
// figures so digits don't jump width as they update; we use the same discipline
// even for static text.
//
// Design decisions:
// - Values: Saira Condensed (font-display), large, gold. Condensed type gives
//   big numbers impact without stealing horizontal space from neighbouring stats.
// - Labels: Inter, small, slate-muted. Clearly subordinate — supporting caption,
//   not competing text.
// - Separator: a thin 28px-tall gold-opacity vertical line. Avoids the generic
//   dot separator or the full-height rule that reads as a column divider.
// - `tabular-nums`: keeps digit columns optically stable across varying values.

export interface StatItem {
  label: string;
  value: string;
}

interface StatStripProps {
  items: StatItem[];
  className?: string;
}

export function StatStrip({ items, className = "" }: StatStripProps) {
  return (
    <dl
      className={`flex flex-wrap items-center gap-x-0 gap-y-6 ${className}`}
    >
      {items.map((item, i) => (
        <div key={i} className="flex items-center">
          {/* Separator between items — not before the first */}
          {i > 0 && (
            <span
              aria-hidden="true"
              className="mx-6 block h-7 w-px bg-[var(--color-gold)] opacity-25"
            />
          )}

          <div className="flex flex-col items-start">
            {/* Value: the number/fact — dominant, gold, condensed */}
            <dd className="font-display text-2xl font-bold leading-none text-[var(--color-gold)] tabular-nums">
              {item.value}
            </dd>
            {/* Label: the descriptor — subordinate, slate-muted */}
            <dt className="mt-0.5 font-sans text-xs uppercase tracking-wider text-[var(--color-slate-muted)]">
              {item.label}
            </dt>
          </div>
        </div>
      ))}
    </dl>
  );
}
