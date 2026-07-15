import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

vi.mock("@/components/ui/ReviewBadge", () => ({
  ReviewBadge: () => <p data-testid="review-badge-stub">stub review badge</p>,
}));

describe("Home", () => {
  it("renders all five service cards", () => {
    render(<Home />);
    for (const name of [
      /roadside assistance/i,
      /mobile tire service/i,
      /battery jump start/i,
      /car lockout/i,
      /mobile mechanic/i,
    ]) {
      expect(screen.getByRole("heading", { name, level: 3 })).toBeInTheDocument();
    }
  });

  it("shows trust signals and a FAQ section", () => {
    render(<Home />);
    expect(screen.getByText("Licensed & insured")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /questions drivers ask us/i })).toBeInTheDocument();
  });
});
