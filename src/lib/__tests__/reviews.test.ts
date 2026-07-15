import { afterEach, describe, expect, it, vi } from "vitest";
import { getReviewStats } from "@/lib/reviews";

afterEach(() => vi.unstubAllGlobals());

const ok = (body: unknown) =>
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => body }));

describe("getReviewStats", () => {
  it("returns rounded rating and count from the widget API", async () => {
    ok({ averageRating: 4.867, totalReviewCount: 87 });
    expect(await getReviewStats()).toEqual({ rating: 4.9, count: 87 });
  });
  it("returns null on HTTP failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    expect(await getReviewStats()).toBeNull();
  });
  it("returns null on malformed payloads and zero counts", async () => {
    ok({ something: "else" });
    expect(await getReviewStats()).toBeNull();
    ok({ averageRating: "n/a", totalReviewCount: 0 });
    expect(await getReviewStats()).toBeNull();
  });
  it("returns null when fetch throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    expect(await getReviewStats()).toBeNull();
  });
});
