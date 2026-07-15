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

  it("renders the emergency flow: hero → trust strip → service grid", () => {
    render(<Home />);
    // getAllByText: the hero's "in as little as 20–30 minutes" also matches.
    expect(screen.getAllByText(/20–30 min/).length).toBeGreaterThanOrEqual(2); // hero + trust strip
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBeGreaterThanOrEqual(5); // grid
    expect(screen.queryByRole("link", { name: /view the full photo gallery/i })).toBeNull(); // teaser gone
  });
});
