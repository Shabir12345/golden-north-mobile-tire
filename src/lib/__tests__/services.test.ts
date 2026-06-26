import { describe, it, expect } from "vitest";
import { SERVICES, getService, SERVICE_SLUGS } from "@/lib/services";

describe("services", () => {
  it("has the four services", () => {
    expect(SERVICE_SLUGS).toEqual(["tire-change","tires","battery","roadside"]);
  });
  it("each service has SEO copy and at least 2 FAQs", () => {
    for (const s of SERVICES) {
      expect(s.summary.length).toBeGreaterThan(40);
      expect(s.included.length).toBeGreaterThanOrEqual(3);
      expect(s.keywords.length).toBeGreaterThanOrEqual(3);
      expect(s.faqs.length).toBeGreaterThanOrEqual(2);
    }
  });
  it("looks up by slug", () => {
    expect(getService("battery")?.name).toMatch(/battery/i);
    expect(getService("nope")).toBeUndefined();
  });
});
