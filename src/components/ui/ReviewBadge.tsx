// ─── ReviewBadge ─────────────────────────────────────────────────────────────
// Live Google rating + count for the hero trust anchor. Data comes from
// getReviewStats(); when that's null this renders nothing — never a made-up
// number. This component is server-rendered and static — it has no motion.
//
// Shape is the card-on-navy plate (rounded-lg + hairline border), deliberately
// NOT the rounded-full chip the hero's live-dispatch line uses — two pills
// bracketing the same column would read as one repeated object. It stays
// quieter than the gold CallButton directly above it: the border and the
// rating's weight carry it, not fill or color.

import { getReviewStats } from "@/lib/reviews";

function Star({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}

export async function ReviewBadge({ onDark = false }: { onDark?: boolean }) {
  const stats = await getReviewStats();
  if (!stats) return null;

  const full = Math.round(stats.rating);

  const plate = onDark
    ? "border-white/15 bg-white/[0.06]"
    : "border-[var(--color-border)] bg-[var(--color-card)] shadow-sm";
  const starColor = onDark ? "text-[var(--color-accent)]" : "text-[var(--color-accent-deep)]";
  const ratingColor = onDark ? "text-white" : "text-[var(--color-heading)]";
  const countColor = onDark ? "text-[var(--color-footer-fg)]" : "text-[var(--color-body)]";
  const ruleColor = onDark ? "bg-white/20" : "bg-[var(--color-border)]";

  return (
    <p
      className={`inline-flex items-center gap-3 rounded-lg border px-4 py-2.5 ${plate}`}
      aria-label={`Rated ${stats.rating.toFixed(1)} out of 5 from ${stats.count} Google reviews`}
    >
      <span aria-hidden="true" className={`flex items-center gap-0.5 ${starColor}`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={i < full ? "" : "opacity-30"} />
        ))}
      </span>
      {/* The rating is the fact worth reading; the count is the corroboration.
          Flat one-weight text was why this vanished under the CTA. */}
      <span aria-hidden="true" className={`text-base font-bold leading-none ${ratingColor}`}>
        {stats.rating.toFixed(1)}
      </span>
      <span aria-hidden="true" className={`h-4 w-px shrink-0 ${ruleColor}`} />
      <span aria-hidden="true" className={`text-sm font-medium leading-none ${countColor}`}>
        {stats.count} Google reviews
      </span>
    </p>
  );
}
