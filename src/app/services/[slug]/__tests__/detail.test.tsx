import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page, { generateStaticParams, generateMetadata } from "@/app/services/[slug]/page";

describe("Service detail", () => {
  it("pre-generates all four slugs", async () => {
    const params = await generateStaticParams();
    expect(params.map((p) => p.slug).sort()).toEqual(["battery", "roadside", "tire-change", "tires"]);
  });

  it("renders the battery page with a call CTA", async () => {
    render(await Page({ params: Promise.resolve({ slug: "battery" }) }));
    const calls = screen.getAllByRole("link", { name: /call/i });
    expect(calls.length).toBeGreaterThan(0);
    expect(calls[0]).toHaveAttribute("href", "tel:+14165585915");
  });

  it("shows the service heading and at least one FAQ question", async () => {
    render(await Page({ params: Promise.resolve({ slug: "roadside" }) }));
    expect(screen.getByRole("heading", { level: 1, name: /roadside/i })).toBeInTheDocument();
    expect(screen.getByText(/how fast can you reach me/i)).toBeInTheDocument();
  });

  it("builds keyword-first metadata from the service SEO fields", async () => {
    const m = await generateMetadata({ params: Promise.resolve({ slug: "tire-change" }) });
    expect(m.title).toBe("Mobile Tire Change Toronto — Seasonal Swaps at Your Door");
    expect(m.description).toContain("Call (416) 558-5915");
  });
});
