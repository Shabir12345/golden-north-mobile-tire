import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page, { generateStaticParams, generateMetadata } from "@/app/blog/[slug]/page";
import { POST_SLUGS } from "@/lib/blog";

describe("Blog post page", () => {
  it("pre-generates a param per post", async () => {
    const params = await generateStaticParams();
    expect(params.map((p) => p.slug).sort()).toEqual([...POST_SLUGS].sort());
  });

  it("renders the winter-tires post with heading and a call CTA", async () => {
    render(await Page({ params: Promise.resolve({ slug: "winter-tires-ontario" }) }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/winter tires/i);
    const calls = screen.getAllByRole("link", { name: /call/i });
    expect(calls[0]).toHaveAttribute("href", "tel:+14165585915");
  });

  it("links to the related service page", async () => {
    render(await Page({ params: Promise.resolve({ slug: "winter-tires-ontario" }) }));
    // Both the inline article body ("mobile tire change") and the funnel card's
    // aria-label ("Mobile Tire Change — view service") match /tire change/i, so
    // this asserts every matching link resolves to the service page.
    const links = screen.getAllByRole("link", { name: /tire change/i });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/services/mobile-tire-service");
    }
  });

  it("builds keyword-first metadata from frontmatter", async () => {
    const m = await generateMetadata({ params: Promise.resolve({ slug: "winter-tires-ontario" }) });
    expect((m.title as string).length).toBeLessThanOrEqual(60);
    expect(m.keywords).toContain("when to put on winter tires ontario");
  });
});
