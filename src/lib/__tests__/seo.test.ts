import { describe, it, expect } from "vitest";
import { buildMetadata } from "@/lib/seo";

describe("buildMetadata", () => {
  it("sets canonical and OG from path", () => {
    const m = buildMetadata({ title: "Battery", description: "Mobile battery replacement", path: "/services/battery" });
    expect(m.title).toContain("Battery");
    expect(m.alternates?.canonical).toBe("https://www.goldennorthmobiletires.com/services/battery");
    expect((m.openGraph as { url?: string })?.url).toContain("/services/battery");
  });
});
