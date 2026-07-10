import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrustBadges } from "@/components/ui/TrustBadges";

describe("TrustBadges", () => {
  it("renders every confirmed trust claim", () => {
    render(<TrustBadges />);
    expect(screen.getByText("Licensed & insured")).toBeInTheDocument();
    expect(screen.getByText("Upfront pricing")).toBeInTheDocument();
    expect(screen.getByText("Warranty-backed parts")).toBeInTheDocument();
    expect(screen.getByText(/24\/7/)).toBeInTheDocument();
  });

  it("does not render unconfirmed claims", () => {
    render(<TrustBadges />);
    expect(screen.queryByText(/satisfaction guarantee/i)).toBeNull();
    expect(screen.queryByText(/[0-9]\.[0-9]\s*stars?/i)).toBeNull();
  });
});
