import { describe, it, expect } from "vitest";
import { SERVICES, getService, SERVICE_SLUGS } from "@/lib/services";

describe("services", () => {
  it("has the four services", () => {
    expect(SERVICE_SLUGS).toEqual(["tire-change","tires","battery","roadside"]);
  });
  it("each service has SEO copy, metadata fields, and at least 5 FAQs", () => {
    for (const s of SERVICES) {
      expect(s.summary.length).toBeGreaterThan(40);
      expect(s.included.length).toBeGreaterThanOrEqual(3);
      expect(s.keywords.length).toBeGreaterThanOrEqual(5);
      expect(s.faqs.length).toBeGreaterThanOrEqual(5);
      expect(s.seoTitle.length).toBeLessThanOrEqual(60);
      expect(s.seoDescription.length).toBeGreaterThanOrEqual(120);
      expect(s.seoDescription.length).toBeLessThanOrEqual(165);
      // Answer-first opener: sentence one must name the brand + a location term.
      expect(s.summary).toMatch(/^GoldenNorth/);
      expect(s.summary.split(".")[0]).toMatch(/GTA|Toronto/);
    }
  });
  it("names no removed service-area cities", () => {
    const blob = JSON.stringify(SERVICES);
    expect(blob).not.toMatch(/Mississauga|Brampton/);
  });
  it("looks up by slug", () => {
    expect(getService("battery")?.name).toMatch(/battery/i);
    expect(getService("nope")).toBeUndefined();
  });
});
