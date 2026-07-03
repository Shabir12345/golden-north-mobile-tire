import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page, { metadata } from "@/app/blog/page";
import { POSTS } from "@/lib/blog";

describe("Blog index", () => {
  it("renders a card linking to each post", () => {
    render(<Page />);
    for (const p of POSTS) {
      const link = screen.getByRole("link", { name: new RegExp(p.title.slice(0, 18), "i") });
      expect(link).toHaveAttribute("href", `/blog/${p.slug}`);
    }
  });

  it("has blog metadata", () => {
    expect(metadata.title).toContain("Blog");
  });
});
