import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders all four service cards", () => {
    render(<Home />);
    for (const name of [/tire change/i,/used tires/i,/battery/i,/roadside/i]) {
      expect(screen.getByRole("heading", { name, level: 3 })).toBeInTheDocument();
    }
  });

  it("shows trust signals and a FAQ section", () => {
    render(<Home />);
    expect(screen.getByText("Licensed & insured")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /questions drivers ask us/i })).toBeInTheDocument();
  });
});
