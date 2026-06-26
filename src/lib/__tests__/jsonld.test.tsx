import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { LocalBusinessJsonLd, FaqJsonLd } from "@/lib/jsonld";

function parse(container: HTMLElement) {
  return JSON.parse(container.querySelector('script[type="application/ld+json"]')!.innerHTML);
}
describe("jsonld", () => {
  it("emits LocalBusiness with phone + area", () => {
    const { container } = render(<LocalBusinessJsonLd />);
    const d = parse(container);
    expect(d["@type"]).toContain("LocalBusiness");
    expect(d.telephone).toBe("+14165585915");
  });
  it("emits FAQPage", () => {
    const { container } = render(<FaqJsonLd faqs={[{ q: "Q?", a: "A." }]} />);
    const d = parse(container);
    expect(d["@type"]).toBe("FAQPage");
    expect(d.mainEntity[0].acceptedAnswer.text).toBe("A.");
  });
});
