import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CallButton, Button } from "@/components/ui/Button";

describe("CallButton", () => {
  it("links to the tel: number and shows the phone", () => {
    render(<CallButton />);
    const link = screen.getByRole("link", { name: /call/i });
    expect(link).toHaveAttribute("href", "tel:+14165585915");
    expect(link).toHaveTextContent("(416) 558-5915");
  });
});
describe("Button ghost", () => {
  it("renders secondary link", () => {
    render(<Button variant="ghost" href="/contact">Message us</Button>);
    expect(screen.getByRole("link", { name: /message us/i })).toHaveAttribute("href", "/contact");
  });
});
