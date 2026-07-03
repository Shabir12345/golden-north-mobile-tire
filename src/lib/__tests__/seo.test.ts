import { describe, it, expect } from "vitest";
import { buildMetadata } from "@/lib/seo";

describe("buildMetadata", () => {
  it("sets canonical and OG from path", () => {
    const m = buildMetadata({ title: "Battery", description: "Mobile battery replacement", path: "/services/battery" });
    expect(m.title).toContain("Battery");
    expect(m.alternates?.canonical).toBe("https://www.goldennorthmobiletires.com/services/battery");
    expect((m.openGraph as { url?: string })?.url).toContain("/services/battery");
  });

  it("defaults og:type to website", () => {
    const m = buildMetadata({ title: "Services", description: "d", path: "/services" });
    expect((m.openGraph as { type?: string })?.type).toBe("website");
  });

  it("emits og:type=article with published/modified times when ogType is article", () => {
    const m = buildMetadata({
      title: "Winter Tires",
      description: "d",
      path: "/blog/winter-tires-ontario",
      ogType: "article",
      publishedTime: "2026-07-03",
      modifiedTime: "2026-07-04",
    });
    const og = m.openGraph as { type?: string; publishedTime?: string; modifiedTime?: string };
    expect(og.type).toBe("article");
    expect(og.publishedTime).toBe("2026-07-03");
    expect(og.modifiedTime).toBe("2026-07-04");
  });
});
