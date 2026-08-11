import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GuideLinks } from "@/components/sections/GuideLinks";

const POSTS = [
  { slug: "winter-tires-ontario", title: "When to Put On Winter Tires in Ontario", excerpt: "Below 7°C." },
  { slug: "new-vs-used-tires", title: "New vs. Used Tires: Which Should You Buy?", excerpt: "Depends." },
];

describe("GuideLinks", () => {
  it("links every guide it is given", () => {
    render(<GuideLinks heading="Worth reading first" posts={POSTS} />);
    expect(screen.getByRole("link", { name: /When to Put On Winter Tires/ })).toHaveAttribute(
      "href",
      "/blog/winter-tires-ontario",
    );
    expect(screen.getByRole("link", { name: /New vs\. Used Tires/ })).toHaveAttribute(
      "href",
      "/blog/new-vs-used-tires",
    );
  });

  it("renders nothing when there are no guides", () => {
    const { container } = render(<GuideLinks heading="Worth reading first" posts={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  // The heading is a prop because this renders inside <section>s that already
  // own an h2. Hardcoding a level here would break the document outline on the
  // home page, where it sits under its own section heading.
  it("renders the heading it is given", () => {
    render(<GuideLinks heading="Advice from the road" posts={POSTS} />);
    expect(screen.getByRole("heading", { name: "Advice from the road" })).toBeInTheDocument();
  });

  it("emits no heading when none is given, leaving the outline to the section", () => {
    render(<GuideLinks posts={POSTS} />);
    expect(screen.queryByRole("heading")).toBeNull();
  });
});
