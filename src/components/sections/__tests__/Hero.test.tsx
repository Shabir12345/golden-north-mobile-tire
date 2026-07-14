import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

vi.mock("@/lib/reviews", () => ({
  getReviewStats: vi.fn().mockResolvedValue({ rating: 4.9, count: 87 }),
}));

describe("Hero", () => {
  it("leads with the problem→solution headline and ETA", async () => {
    render(await Hero());
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Stranded in the GTA?");
    expect(h1).toHaveTextContent("in as little as 20–30 minutes");
  });

  it("shows the live-dispatch line and review badge", async () => {
    render(await Hero());
    expect(screen.getByText(/24\/7 emergency dispatch/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/4\.9 out of 5 from 87 google reviews/i)).toBeInTheDocument();
  });
});
