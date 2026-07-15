import { describe, expect, it } from "vitest";
import { SERVICES, SERVICE_SLUGS, getService, getSubService } from "@/lib/services";

const BANNED = [/\bcheap\b/i, /\baffordable\b/i, /\bbest\b/i, /\bpremier\b/i, /#1/];
const ETA = "in as little as 20-30 minutes";

describe("service catalog", () => {
  it("has the five main services in display order", () => {
    expect(SERVICE_SLUGS).toEqual([
      "roadside-assistance",
      "mobile-tire-service",
      "battery-jump-start",
      "car-lockout",
      "mobile-mechanic",
    ]);
  });

  it("every service has complete problem→solution content", () => {
    for (const s of SERVICES) {
      expect(s.problem.length).toBeGreaterThan(8);
      expect(s.problem.endsWith("?")).toBe(true);
      expect(s.solution.length).toBeGreaterThan(10);
      expect(s.blurb.length).toBeGreaterThan(20);
      expect(s.summary.length).toBeGreaterThan(100);
      expect(s.included.length).toBeGreaterThanOrEqual(4);
      expect(s.whenYouNeed.length).toBeGreaterThanOrEqual(3);
      expect(s.keywords.length).toBeGreaterThanOrEqual(4);
      expect(s.faqs.length).toBeGreaterThanOrEqual(4);
      expect(Array.isArray(s.subServices)).toBe(true);
    }
  });

  it("SEO fields respect length budgets", () => {
    for (const s of SERVICES) {
      expect(s.seoTitle.length).toBeLessThanOrEqual(60);
      expect(s.seoDescription.length).toBeGreaterThanOrEqual(120);
      expect(s.seoDescription.length).toBeLessThanOrEqual(165);
    }
  });

  it("uses the exact ETA phrase wherever an arrival time is promised", () => {
    for (const s of SERVICES) {
      const text = [s.solution, s.summary, ...s.faqs.map((f) => f.a)].join(" ");
      if (/20-30/.test(text)) expect(text).toContain(ETA);
      expect(text).not.toMatch(/45-90/);
    }
  });

  it("never uses banned marketing words", () => {
    for (const s of SERVICES) {
      const text = JSON.stringify(s);
      for (const rx of BANNED) expect(text).not.toMatch(rx);
    }
  });

  it("getService / getSubService look up by slug", () => {
    expect(getService("car-lockout")?.name).toBe("Car Lockout");
    expect(getService("nope")).toBeUndefined();
    expect(getSubService("roadside-assistance", "nope")).toBeUndefined();
  });

  it("sub-services match the approved catalog", () => {
    const subs = (slug: string) => getService(slug)!.subServices.map((x) => x.slug);
    expect(subs("roadside-assistance")).toEqual(["fuel-delivery", "tow-coordination"]);
    expect(subs("mobile-tire-service")).toEqual([
      "flat-tire", "spare-tire-install", "new-used-tires", "seasonal-tire-change",
    ]);
    expect(subs("battery-jump-start")).toEqual(["battery-replacement", "battery-testing"]);
    expect(subs("car-lockout")).toEqual([]);
    expect(subs("mobile-mechanic")).toEqual(["diagnostics", "brakes", "oil-change", "general-repairs"]);
  });

  it("every sub-service has complete landing-page content and SEO budgets", () => {
    for (const s of SERVICES) for (const x of s.subServices) {
      expect(x.problem.endsWith("?")).toBe(true);
      expect(x.solution.length).toBeGreaterThan(10);
      expect(x.summary.length).toBeGreaterThan(100);
      expect(x.included.length).toBeGreaterThanOrEqual(3);
      expect(x.keywords.length).toBeGreaterThanOrEqual(3);
      expect(x.faqs.length).toBeGreaterThanOrEqual(3);
      expect(x.seoTitle.length).toBeLessThanOrEqual(60);
      expect(x.seoDescription.length).toBeGreaterThanOrEqual(120);
      expect(x.seoDescription.length).toBeLessThanOrEqual(165);
      expect(JSON.stringify(x)).not.toMatch(/\b(cheap|affordable|best|premier)\b|#1|45-90/i);
    }
  });
});
