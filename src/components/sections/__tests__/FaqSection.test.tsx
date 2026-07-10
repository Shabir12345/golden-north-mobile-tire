import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FaqSection } from "@/components/sections/FaqSection";

const FAQS = [
  { q: "Do you come to me?", a: "Yes, anywhere in the GTA." },
  { q: "Is there a membership?", a: "No membership, ever." },
];

describe("FaqSection", () => {
  it("renders the heading and every question", () => {
    render(<FaqSection heading="Common questions" faqs={FAQS} />);
    expect(screen.getByRole("heading", { name: /common questions/i })).toBeInTheDocument();
    expect(screen.getByText("Do you come to me?")).toBeInTheDocument();
    expect(screen.getByText("Is there a membership?")).toBeInTheDocument();
  });

  it("emits FAQPage JSON-LD when emitJsonLd is set", () => {
    const { container } = render(<FaqSection heading="Q" faqs={FAQS} emitJsonLd />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.innerHTML);
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity).toHaveLength(2);
  });

  it("omits JSON-LD by default", () => {
    const { container } = render(<FaqSection heading="Q" faqs={FAQS} />);
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
  });
});
