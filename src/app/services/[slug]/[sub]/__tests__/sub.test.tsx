import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SubServicePage, { generateStaticParams } from "../page";

describe("sub-service page", () => {
  it("generates params for all 12 sub-services", () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(12);
    expect(params).toContainEqual({ slug: "mobile-tire-service", sub: "flat-tire" });
    expect(params).toContainEqual({ slug: "mobile-mechanic", sub: "oil-change" });
  });

  it("renders the problem→solution hero and parent link", async () => {
    render(
      await SubServicePage({
        params: Promise.resolve({ slug: "roadside-assistance", sub: "fuel-delivery" }),
      })
    );
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Out of gas?");
    expect(h1).toHaveTextContent("in as little as 20-30 minutes");
    // The ghost button's aria-label is "See all 24/7 Roadside Assistance services";
    // the cross-link card would also match a looser regex — target the button.
    expect(
      screen.getByRole("link", { name: /all 24\/7 roadside assistance services/i })
    ).toHaveAttribute("href", "/services/roadside-assistance");
  });
});
