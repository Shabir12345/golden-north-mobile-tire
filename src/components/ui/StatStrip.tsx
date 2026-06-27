// ─── StatStrip ────────────────────────────────────────────────────────────────
// A row of headline facts (24/7, GTA-wide, one call, your spot). High-vis
// treatment: each stat is a block topped by a short amber tick, big condensed
// value, quiet label below. Reads like a dispatch readout, not a SaaS metric
// grid. dt-before-dd keeps valid <dl> semantics; order-* fixes the visual stack.

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
    <dl className={`grid grid-cols-2 gap-px overflow-hidden rounded-[4px] bg-[rgba(245,168,28,0.14)] md:grid-cols-4 ${className}`}>
      {items.map((item, i) => (
        <div key={i} className="bg-[var(--color-steel)] px-5 py-6 sm:px-7 sm:py-8">
          <span aria-hidden="true" className="mb-3 block h-1 w-8 bg-[var(--color-gold)]" />
          <dd className="font-display text-3xl font-bold leading-none text-[var(--color-frost)] tabular-nums sm:text-4xl">
            {item.value}
          </dd>
          <dt className="mt-2 font-sans text-xs uppercase tracking-[0.16em] text-[var(--color-slate-muted)]">
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
