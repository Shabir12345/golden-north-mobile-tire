// ─── Live Google review stats ─────────────────────────────────────────────────
// Server-side fetch of the Featurable widget API (same widget that renders the
// homepage carousel). Revalidates hourly so the hero badge tracks the real
// Google rating/count. ANY failure returns null — the badge renders nothing
// rather than a wrong or stale-looking number.

const WIDGET_ID = "98741542-19aa-4991-9281-32fab2ebcb3f";
const API_URL = `https://featurable.com/api/v1/widgets/${WIDGET_ID}`;

export interface ReviewStats {
  rating: number; // e.g. 4.9 (one decimal)
  count: number;  // total Google reviews
}

export async function getReviewStats(): Promise<ReviewStats | null> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    const d = data as { averageRating?: unknown; totalReviewCount?: unknown };
    const rating = Number(d.averageRating);
    const count = Number(d.totalReviewCount);
    if (!Number.isFinite(rating) || rating <= 0 || rating > 5) return null;
    if (!Number.isFinite(count) || count <= 0) return null;
    return { rating: Math.round(rating * 10) / 10, count: Math.round(count) };
  } catch {
    return null;
  }
}
