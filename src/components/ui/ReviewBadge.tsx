// ─── ReviewBadge ─────────────────────────────────────────────────────────────
// Live Google rating + count for the hero trust anchor. Data comes from
// getReviewStats(); when that's null this renders nothing — never a made-up
// number. This component is server-rendered and static — it has no motion.

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
  const iconColor = onDark ? "text-[var(--color-accent)]" : "text-[var(--color-accent-deep)]";
  return (
    <p
      className={`inline-flex items-center gap-2.5 text-sm font-semibold ${
        onDark ? "text-[var(--color-on-navy)]" : "text-[var(--color-body)]"
      }`}
      aria-label={`Rated ${stats.rating.toFixed(1)} out of 5 from ${stats.count} Google reviews`}
    >
      <span aria-hidden="true" className={`flex items-center gap-0.5 ${iconColor}`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={i < full ? "" : "opacity-30"} />
        ))}
      </span>
      <span aria-hidden="true">
        {stats.rating.toFixed(1)} · {stats.count} Google reviews
      </span>
    </p>
  );
}
