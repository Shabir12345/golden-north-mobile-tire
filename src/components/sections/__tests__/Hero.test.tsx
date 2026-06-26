import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("leads with call CTA and shows the tagline", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /call/i })).toHaveAttribute("href", "tel:+14165585915");
    expect(screen.getByText(/living room/i)).toBeInTheDocument();
  });
});
