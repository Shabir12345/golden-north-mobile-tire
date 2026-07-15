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

  // The <article> carries a stretched-link overlay (h3 Link with
  // after:absolute after:inset-0) so the whole card is clickable. Pills sit
  // in <li> elements marked `relative` so they stack above that overlay and
  // stay independently clickable rather than having their clicks swallowed
  // by the card-wide link. This test only asserts DOM structure and hrefs —
  // jsdom has no layout engine, so it cannot verify real stacking/z-order or
  // that a click on the pill wouldn't actually be intercepted by the
  // overlay in a real browser.
  it("keeps a sub-service pill resolving to its own href, not the parent card's", () => {
    render(<ServiceGrid />);
    const cardLink = screen.getByRole("link", { name: /24\/7 roadside assistance/i });
    const pillLink = screen.getByRole("link", { name: /seasonal tire change/i });

    expect(pillLink).toHaveAttribute("href", "/services/mobile-tire-service/seasonal-tire-change");
    expect(pillLink.getAttribute("href")).not.toBe(cardLink.getAttribute("href"));

    // Pill must not be nested inside the card-heading anchor (no anchor-in-anchor).
    expect(cardLink.contains(pillLink)).toBe(false);

    // The pill's <li> wrapper is `relative` so it stacks above the card's
    // after:absolute stretched-link overlay.
    expect(pillLink.closest("li")).toHaveClass("relative");
  });
});
