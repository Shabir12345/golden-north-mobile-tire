import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactPage from "@/app/contact/page";

describe("Contact page", () => {
  it("headlines the call action and 24/7", () => {
    render(<ContactPage />);
    expect(screen.getByRole("link", { name: /call/i })).toHaveAttribute("href", "tel:+14165585915");
    expect(screen.getByText(/24\/7/i)).toBeInTheDocument();
  });

  it("presents the form as a secondary option", () => {
    render(<ContactPage />);
    expect(screen.getByText(/prefer to message/i)).toBeInTheDocument();
  });
});
