import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

vi.mock("@/components/ui/ReviewBadge", () => ({
  ReviewBadge: ({ onDark }: { onDark?: boolean }) => (
    <p data-testid="review-badge-stub" data-on-dark={String(!!onDark)}>stub review badge</p>
  ),
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

  it("renders the emergency flow: hero → credentials → service grid", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/20-30 minutes/);
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBeGreaterThanOrEqual(5); // grid
    expect(screen.queryByRole("link", { name: /view the full photo gallery/i })).toBeNull(); // teaser gone
  });

  // The credentials row used to sit under a stat strip that restated the hero's
  // 24/7 / 20-30 min / GTA-wide / no-membership claims a third time.
  it("states the hero's promises once, not twice", () => {
    render(<Home />);
    expect(screen.queryByText("Live dispatch")).toBeNull();
    expect(screen.queryByText("We can be on our way")).toBeNull();
    expect(screen.queryByText("Fair pricing, no membership")).toBeNull();
  });
});
