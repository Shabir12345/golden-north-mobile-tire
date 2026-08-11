import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import { CATALOG_UPDATED } from "@/lib/services";
import { POSTS } from "@/lib/blog";

describe("sitemap", () => {
  it("includes home, services overview, all service pages, gallery, contact", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain("https://www.goldennorthmobiletires.com/");
    expect(urls).toContain("https://www.goldennorthmobiletires.com/services");
    expect(urls).toContain("https://www.goldennorthmobiletires.com/services/battery-jump-start");
    expect(urls).toContain("https://www.goldennorthmobiletires.com/gallery");
    expect(urls).toContain("https://www.goldennorthmobiletires.com/contact");
  });

  // The home page renders the service grid AND the guides block, so a post
  // edit genuinely changes it. Pinning it to CATALOG_UPDATED alone told Google
  // the page was untouched since 2026-07-14 on the day its guides section
  // shipped — the same dishonest lastmod the per-entry dates were added to
  // stop, just under-claiming instead of over-claiming.
  it("dates the home page from the newest of the catalog and the posts", () => {
    const home = sitemap().find((e) => e.url === "https://www.goldennorthmobiletires.com/")!;
    const newestPost = POSTS.reduce((a, p) => (p.updated > a ? p.updated : a), POSTS[0].updated);
    const expected = newestPost > CATALOG_UPDATED ? newestPost : CATALOG_UPDATED;
    expect((home.lastModified as Date).toISOString().slice(0, 10)).toBe(expected);
  });

  it("includes all sub-service routes", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain("https://www.goldennorthmobiletires.com/services/mobile-tire-service/flat-tire");
    expect(urls.filter((u) => u.includes("/services/")).length).toBe(17); // 5 main + 12 sub
  });
});
