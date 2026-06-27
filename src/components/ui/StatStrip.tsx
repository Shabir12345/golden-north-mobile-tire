// ─── StatStrip ────────────────────────────────────────────────────────────────
// A row of headline facts. Each stat is a white cell topped by a short accent
// tick, big value, quiet label. dt-before-dd keeps valid <dl> semantics;
// order is handled by the markup order.

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
    <dl className={`grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[var(--color-border)] md:grid-cols-4 ${className}`}>
      {items.map((item, i) => (
        <div key={i} className="bg-[var(--color-card)] px-5 py-6 sm:px-7 sm:py-8">
          <span aria-hidden="true" className="mb-3 block h-1 w-8 rounded-full bg-[var(--color-accent)]" />
          <dd className="text-3xl font-bold leading-none text-[var(--color-heading)] tabular-nums sm:text-4xl">
            {item.value}
          </dd>
          <dt className="mt-2 text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
