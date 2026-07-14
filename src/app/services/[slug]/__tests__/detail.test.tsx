import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page, { generateStaticParams, generateMetadata } from "@/app/services/[slug]/page";

describe("Service detail", () => {
  it("pre-generates all five slugs", async () => {
    const params = await generateStaticParams();
    expect(params.map((p) => p.slug).sort()).toEqual([
      "battery-jump-start",
      "car-lockout",
      "mobile-mechanic",
      "mobile-tire-service",
      "roadside-assistance",
    ]);
  });

  it("renders the battery page with a call CTA", async () => {
    render(await Page({ params: Promise.resolve({ slug: "battery-jump-start" }) }));
    const calls = screen.getAllByRole("link", { name: /call/i });
    expect(calls.length).toBeGreaterThan(0);
    expect(calls[0]).toHaveAttribute("href", "tel:+14165585915");
  });

  it("shows the service heading and at least one FAQ question", async () => {
    render(await Page({ params: Promise.resolve({ slug: "roadside-assistance" }) }));
    expect(screen.getByRole("heading", { level: 1, name: /roadside/i })).toBeInTheDocument();
    expect(screen.getByText(/how fast can you reach me/i)).toBeInTheDocument();
  });

  it("builds keyword-first metadata from the service SEO fields", async () => {
    const m = await generateMetadata({ params: Promise.resolve({ slug: "mobile-tire-service" }) });
    expect(m.title).toBe("Mobile Tire Service Toronto — Flats, Swaps, New & Used");
    expect(m.description).toContain("(416) 558-5915");
  });

  it("wires the service's keywords array into page metadata", async () => {
    const m = await generateMetadata({ params: Promise.resolve({ slug: "mobile-tire-service" }) });
    expect(m.keywords).toContain("mobile tire service Toronto");
  });

  it("shows professional trust signals", async () => {
    render(await Page({ params: Promise.resolve({ slug: "battery-jump-start" }) }));
    expect(screen.getByText("Licensed & insured")).toBeInTheDocument();
    expect(screen.getByText("Warranty-backed parts")).toBeInTheDocument();
  });

  it("renders the problem→solution hero", async () => {
    render(await Page({ params: Promise.resolve({ slug: "car-lockout" }) }));
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Locked out of your car?");
    expect(h1).toHaveTextContent("Back inside without a scratch — in as little as 20–30 minutes.");
  });
});
