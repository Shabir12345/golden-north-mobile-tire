import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("includes home, services overview, all service pages, gallery, contact", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain("https://www.goldennorthmobiletires.com/");
    expect(urls).toContain("https://www.goldennorthmobiletires.com/services");
    expect(urls).toContain("https://www.goldennorthmobiletires.com/services/battery");
    expect(urls).toContain("https://www.goldennorthmobiletires.com/gallery");
    expect(urls).toContain("https://www.goldennorthmobiletires.com/contact");
  });
});
