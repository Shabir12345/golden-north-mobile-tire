import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("shows the site-wide trust line", () => {
    render(<Footer />);
    expect(screen.getByText("Licensed & insured")).toBeInTheDocument();
    expect(screen.getByText("Upfront pricing")).toBeInTheDocument();
  });
});
