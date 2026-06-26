import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

describe("Header", () => {
  it("always shows the call CTA and 24/7 badge", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /call/i })).toHaveAttribute("href", "tel:+14165585915");
    expect(screen.getByText(/24\/7/i)).toBeInTheDocument();
  });
  it("links to all primary nav destinations", () => {
    render(<Header />);
    for (const href of ["/services","/gallery","/contact"]) {
      expect(screen.getByRole("link", { name: new RegExp(href.slice(1), "i") })).toHaveAttribute("href", href);
    }
  });
});
