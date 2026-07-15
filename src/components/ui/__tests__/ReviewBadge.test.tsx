import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { getReviewStats } from "@/lib/reviews";

vi.mock("@/lib/reviews", () => ({
  getReviewStats: vi.fn(),
}));

describe("ReviewBadge", () => {
  it("renders the rating and count when stats are present", async () => {
    vi.mocked(getReviewStats).mockResolvedValue({ rating: 4.9, count: 87 });
    render(await ReviewBadge({ onDark: true }));
    expect(screen.getByLabelText(/4\.9 out of 5 from 87 google reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/4\.9 · 87 google reviews/i)).toBeInTheDocument();
  });

  it("renders nothing when getReviewStats resolves null — never a made-up number", async () => {
    vi.mocked(getReviewStats).mockResolvedValue(null);
    const { container } = render(await ReviewBadge({ onDark: true }));
    expect(container).toBeEmptyDOMElement();
  });
});
