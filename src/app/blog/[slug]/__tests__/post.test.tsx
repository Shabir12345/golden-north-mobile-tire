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

  it("keeps every service link inside the related service's URL space", async () => {
    render(await Page({ params: Promise.resolve({ slug: "winter-tires-ontario" }) }));
    // Body links and the funnel card's aria-label both match /tire change/i.
    // Deep links to sub-services are intended, so assert the prefix rather than
    // an exact hub URL — this still catches a typo'd or foreign service path.
    const links = screen.getAllByRole("link", { name: /tire change/i });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.getAttribute("href")).toMatch(/^\/services\/mobile-tire-service(\/|$)/);
    }
  });

  it("deep-links the winter post to the seasonal changeover page", async () => {
    // The changeover page is the November money page; the post is its main
    // internal referrer. Losing this link silently is the regression to catch.
    render(await Page({ params: Promise.resolve({ slug: "winter-tires-ontario" }) }));
    const deep = screen
      .getAllByRole("link")
      .filter((l) => l.getAttribute("href") === "/services/mobile-tire-service/seasonal-tire-change");
    expect(deep.length).toBeGreaterThan(0);
  });

  it("builds keyword-first metadata from frontmatter", async () => {
    const m = await generateMetadata({ params: Promise.resolve({ slug: "winter-tires-ontario" }) });
    expect((m.title as string).length).toBeLessThanOrEqual(60);
    expect(m.keywords).toContain("when to put on winter tires ontario");
  });
});
