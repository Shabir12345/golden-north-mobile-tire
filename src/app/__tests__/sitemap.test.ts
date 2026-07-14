import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("includes home, services overview, all service pages, gallery, contact", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain("https://www.goldennorthmobiletires.com/");
    expect(urls).toContain("https://www.goldennorthmobiletires.com/services");
    expect(urls).toContain("https://www.goldennorthmobiletires.com/services/battery-jump-start");
    expect(urls).toContain("https://www.goldennorthmobiletires.com/gallery");
    expect(urls).toContain("https://www.goldennorthmobiletires.com/contact");
  });

  it("includes all sub-service routes", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain("https://www.goldennorthmobiletires.com/services/mobile-tire-service/flat-tire");
    expect(urls.filter((u) => u.includes("/services/")).length).toBe(17); // 5 main + 12 sub
  });
});
