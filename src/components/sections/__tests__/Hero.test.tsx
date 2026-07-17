import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

vi.mock("@/components/ui/ReviewBadge", () => ({
  ReviewBadge: ({ onDark, variant }: { onDark?: boolean; variant?: string }) => (
    <p data-testid="review-badge-stub" data-on-dark={String(!!onDark)} data-variant={variant ?? "plate"}>
      stub review badge
    </p>
  ),
}));

describe("Hero", () => {
  it("leads with the problem→solution headline and ETA", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Stranded in the GTA?");
    expect(h1).toHaveTextContent("in as little as 20-30 minutes");
  });

  it("shows the live-dispatch line and the review badge slot", () => {
    render(<Hero />);
    expect(screen.getByText(/24\/7 emergency dispatch/i)).toBeInTheDocument();
    expect(screen.getByTestId("review-badge-stub")).toBeInTheDocument();
  });

  it("passes onDark to the review badge so it stays AA-contrast on the navy hero", () => {
    render(<Hero />);
    expect(screen.getByTestId("review-badge-stub")).toHaveAttribute("data-on-dark", "true");
  });

  it("lists the five emergencies as scannable items, not prose", () => {
    render(<Hero />);
    const items = screen.getAllByRole("listitem").map((li) => li.textContent);
    expect(items).toEqual(
      expect.arrayContaining(["Flat tire", "Dead battery", "Locked out", "Out of gas", "Breakdown"]),
    );
  });

  it("keeps the no-membership promise alongside the list", () => {
    render(<Hero />);
    expect(screen.getByText(/no membership, no hidden fees/i)).toBeInTheDocument();
  });

  it("renders the review badge as a chip so it pairs with the live-dispatch pill", () => {
    render(<Hero />);
    expect(screen.getByTestId("review-badge-stub")).toHaveAttribute("data-variant", "chip");
  });

  it("opens with the credibility row rather than burying reviews under the CTA", () => {
    render(<Hero />);
    const badge = screen.getByTestId("review-badge-stub");
    const h1 = screen.getByRole("heading", { level: 1 });
    // Node.compareDocumentPosition: badge must precede the headline in the DOM.
    expect(badge.compareDocumentPosition(h1) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("carries the credentials that the ETA promise and service list can't", () => {
    render(<Hero />);
    const trust = screen.getByRole("list", { name: /why drivers trust/i });
    expect(trust).toHaveTextContent("Licensed & insured");
    expect(trust).toHaveTextContent("Warranty-backed parts");
    expect(trust).toHaveTextContent("No membership, no hidden fees");
  });
});
