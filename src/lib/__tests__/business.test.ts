import { describe, it, expect } from "vitest";
import { BUSINESS, telHref } from "@/lib/business";

describe("business", () => {
  it("exposes verbatim NAP", () => {
    expect(BUSINESS.name).toBe("GoldenNorth Mobile Tire Services");
    expect(BUSINESS.phoneDisplay).toBe("(416) 558-5915");
    expect(BUSINESS.email).toBe("info.goldennorth@gmail.com");
    expect(BUSINESS.hours).toBe("Open 24/7");
  });
  it("builds a tel: href with no formatting", () => {
    expect(telHref).toBe("tel:+14165585915");
  });
});
