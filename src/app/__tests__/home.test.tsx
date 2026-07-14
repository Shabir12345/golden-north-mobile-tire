import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

vi.mock("@/lib/reviews", () => ({
  getReviewStats: vi.fn().mockResolvedValue({ rating: 4.9, count: 87 }),
}));

describe("Home", () => {
  it("renders all five service cards", async () => {
    render(await Home());
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

  it("shows trust signals and a FAQ section", async () => {
    render(await Home());
    expect(screen.getByText("Licensed & insured")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /questions drivers ask us/i })).toBeInTheDocument();
  });
});
