// ─── ReviewBadge ─────────────────────────────────────────────────────────────
// Live Google rating + count for the hero trust anchor. Data comes from
// getReviewStats(); when that's null this renders nothing — never a made-up
// number. This component is server-rendered and static — it has no motion.
//
// Two shapes:
//   "plate" (default) — rounded-lg + hairline border, for a badge standing alone
//     in a column. Stays quieter than a gold CallButton near it: the border and
//     the rating's weight carry it, not fill or color.
//   "chip" — rounded-full, for sitting *beside* the hero's live-dispatch pill.
//     Two pills bracketing the same column (top and bottom, content between)
//     would read as one repeated object — but adjacent in a single row they
//     read as one credibility cluster, which is why the hero pairs them.

import { getReviewStats } from "@/lib/reviews";

function Star({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}

export async function ReviewBadge({
  onDark = false,
  variant = "plate",
}: {
  onDark?: boolean;
  variant?: "plate" | "chip";
}) {
  const stats = await getReviewStats();
  if (!stats) return null;

  const full = Math.round(stats.rating);
  const isChip = variant === "chip";

  const plate = onDark
    ? "border-white/15 bg-white/[0.06]"
    : "border-[var(--color-border)] bg-[var(--color-card)] shadow-sm";
  const starColor = onDark ? "text-[var(--color-accent)]" : "text-[var(--color-accent-deep)]";
  const ratingColor = onDark ? "text-white" : "text-[var(--color-heading)]";
  const countColor = onDark ? "text-[var(--color-footer-fg)]" : "text-[var(--color-body)]";
  const ruleColor = onDark ? "bg-white/20" : "bg-[var(--color-border)]";

  return (
    <p
      className={`inline-flex items-center border ${
        isChip ? "gap-2 rounded-full px-3.5 py-2" : "gap-3 rounded-lg px-4 py-2.5"
      } ${plate}`}
      aria-label={`Rated ${stats.rating.toFixed(1)} out of 5 from ${stats.count} Google reviews`}
    >
      <span aria-hidden="true" className={`flex items-center gap-0.5 ${starColor}`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={i < full ? "" : "opacity-30"} />
        ))}
      </span>
      {/* The rating is the fact worth reading; the count is the corroboration.
          Flat one-weight text was why this vanished under the CTA. */}
      <span aria-hidden="true" className={`font-bold leading-none ${isChip ? "text-sm" : "text-base"} ${ratingColor}`}>
        {stats.rating.toFixed(1)}
      </span>
      <span aria-hidden="true" className={`w-px shrink-0 ${isChip ? "h-3.5" : "h-4"} ${ruleColor}`} />
      <span aria-hidden="true" className={`font-medium leading-none ${isChip ? "text-xs" : "text-sm"} ${countColor}`}>
        {stats.count} Google reviews
      </span>
    </p>
  );
}
