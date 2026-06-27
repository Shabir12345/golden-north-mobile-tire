import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GalleryPage from "@/app/gallery/page";

describe("Gallery", () => {
  it("renders images with descriptive alt text", () => {
    render(<GalleryPage />);
    const imgs = screen.getAllByRole("img");
    expect(imgs.length).toBeGreaterThan(0);
    imgs.forEach((img) => expect((img.getAttribute("alt") ?? "").length).toBeGreaterThan(3));
  });
});
