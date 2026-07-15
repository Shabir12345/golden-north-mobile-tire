import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceGrid } from "../ServiceGrid";

describe("ServiceGrid", () => {
  it("renders five service cards linking to their pages", () => {
    render(<ServiceGrid />);
    expect(screen.getByRole("link", { name: /24\/7 roadside assistance/i })).toHaveAttribute(
      "href", "/services/roadside-assistance");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(5);
  });

  it("renders sub-service pill links", () => {
    render(<ServiceGrid />);
    expect(screen.getByRole("link", { name: /seasonal tire change/i })).toHaveAttribute(
      "href", "/services/mobile-tire-service/seasonal-tire-change");
    expect(screen.getByRole("link", { name: /oil change/i })).toHaveAttribute(
      "href", "/services/mobile-mechanic/oil-change");
  });
});
