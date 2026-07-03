import { describe, it, expect } from "vitest";
import { POSTS, POST_SLUGS, getPost } from "@/lib/blog";
import { SERVICE_SLUGS } from "@/lib/services";

describe("blog", () => {
  it("loads at least one post", () => {
    expect(POSTS.length).toBeGreaterThan(0);
  });

  it("every post meets the SEO contract", () => {
    for (const p of POSTS) {
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.seoTitle.length).toBeLessThanOrEqual(60);
      expect(p.description.length).toBeGreaterThanOrEqual(120);
      expect(p.description.length).toBeLessThanOrEqual(165);
      expect(p.excerpt.length).toBeGreaterThan(40);
      expect(p.keywords.length).toBeGreaterThanOrEqual(3);
      expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(SERVICE_SLUGS).toContain(p.relatedService);
      expect(p.html).toContain("<");
      expect(p.readingMinutes).toBeGreaterThanOrEqual(1);
    }
  });

  it("sorts posts newest-first", () => {
    const dates = POSTS.map((p) => p.date);
    const sorted = [...dates].sort().reverse();
    expect(dates).toEqual(sorted);
  });

  it("looks up by slug", () => {
    expect(getPost(POST_SLUGS[0])?.slug).toBe(POST_SLUGS[0]);
    expect(getPost("nope")).toBeUndefined();
  });
});
