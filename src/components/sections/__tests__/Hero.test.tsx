import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

vi.mock("@/components/ui/ReviewBadge", () => ({
  ReviewBadge: ({ onDark }: { onDark?: boolean }) => (
    <p data-testid="review-badge-stub" data-on-dark={String(!!onDark)}>stub review badge</p>
  ),
}));

describe("Hero", () => {
  it("leads with the problem→solution headline and ETA", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Stranded in the GTA?");
    expect(h1).toHaveTextContent("in as little as 20-30 minutes");
  });

  it("shows the live-dispatch line and the review badge slot", () => {
    render(<Hero />);
    expect(screen.getByText(/24\/7 emergency dispatch/i)).toBeInTheDocument();
    expect(screen.getByTestId("review-badge-stub")).toBeInTheDocument();
  });

  it("passes onDark to the review badge so it stays AA-contrast on the navy hero", () => {
    render(<Hero />);
    expect(screen.getByTestId("review-badge-stub")).toHaveAttribute("data-on-dark", "true");
  });
});
