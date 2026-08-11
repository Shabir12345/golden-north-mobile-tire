import { describe, it, expect } from "vitest";
import nextConfig from "../../../next.config";
import { SERVICES } from "@/lib/services";

// Legacy Wix URLs that Google still ranks. Each 404'd for weeks while holding a
// page-one position, so the redirect map is load-bearing SEO, not tidiness.
// Sourced from GSC page data, 90 days to 2026-08-10.
const LEGACY = {
  "/tire-changes": "/services/mobile-tire-service/seasonal-tire-change",
  "/sell-new-used-tires": "/services/mobile-tire-service/new-used-tires",
  "/roadside-assistance": "/services/roadside-assistance",
  "/contact-5": "/contact",
  "/general-8": "/",
  "/services/tire-change": "/services/mobile-tire-service/seasonal-tire-change",
  "/services/tires": "/services/mobile-tire-service/new-used-tires",
  "/services/battery": "/services/battery-jump-start",
  "/services/roadside": "/services/roadside-assistance",
} as const;

async function redirectMap() {
  const list = await nextConfig.redirects!();
  return new Map(list.map((r) => [r.source, r]));
}

describe("legacy URL redirects", () => {
  it("maps every known ranking legacy URL to its replacement", async () => {
    const map = await redirectMap();
    for (const [source, destination] of Object.entries(LEGACY)) {
      const rule = map.get(source);
      expect(rule, `no redirect configured for ${source}`).toBeDefined();
      expect(rule!.destination).toBe(destination);
    }
  });

  it("makes every legacy redirect permanent so ranking signals consolidate", async () => {
    const map = await redirectMap();
    for (const source of Object.keys(LEGACY)) {
      expect(map.get(source)!.permanent, `${source} must be a permanent redirect`).toBe(true);
    }
  });

  it("points every redirect at a route that actually exists", async () => {
    const live = new Set<string>(["/", "/contact", "/services", "/blog", "/gallery", "/privacy"]);
    for (const s of SERVICES) {
      live.add(`/services/${s.slug}`);
      for (const x of s.subServices) live.add(`/services/${s.slug}/${x.slug}`);
    }
    const list = await nextConfig.redirects!();
    for (const rule of list) {
      expect(live.has(rule.destination), `${rule.source} -> ${rule.destination} is not a real route`).toBe(true);
    }
  });
});
