import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServicesPage from "@/app/services/page";

describe("Services overview", () => {
  it("lists all services with links to detail pages", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("link", { name: /mobile tire service/i })).toHaveAttribute(
      "href",
      "/services/mobile-tire-service"
    );
    expect(screen.getByRole("link", { name: /roadside assistance/i })).toHaveAttribute(
      "href",
      "/services/roadside-assistance"
    );
  });
});
