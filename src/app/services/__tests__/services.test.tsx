import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServicesPage from "@/app/services/page";

describe("Services overview", () => {
  it("lists all services with links to detail pages", () => {
    render(<ServicesPage />);
    expect(screen.getByRole("link", { name: /tire change/i })).toHaveAttribute("href", "/services/tire-change");
    expect(screen.getByRole("link", { name: /roadside/i })).toHaveAttribute("href", "/services/roadside");
  });
});
