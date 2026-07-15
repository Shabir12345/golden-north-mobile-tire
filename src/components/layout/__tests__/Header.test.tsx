import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/Header";

describe("Header", () => {
  it("always shows the call CTA and 24/7 badge", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /call/i })).toHaveAttribute("href", "tel:+14165585915");
    expect(screen.getByRole("status")).toHaveTextContent(/24\/7/i);
  });
  it("links to all primary nav destinations", () => {
    render(<Header />);
    for (const href of ["/services","/gallery","/contact"]) {
      expect(screen.getByRole("link", { name: new RegExp(href.slice(1), "i") })).toHaveAttribute("href", href);
    }
  });
});

describe("Header desktop Services dropdown", () => {
  it("desktop nav exposes a Services dropdown with the five services", async () => {
    render(<Header />);
    const trigger = screen.getByRole("button", { name: /services menu/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /roadside assistance/i })).toHaveAttribute(
      "href",
      "/services/roadside-assistance"
    );
    expect(screen.getByRole("link", { name: /mobile mechanic/i })).toHaveAttribute(
      "href",
      "/services/mobile-mechanic"
    );
  });

  it("closes the services dropdown on Escape", async () => {
    render(<Header />);
    const trigger = screen.getByRole("button", { name: /services menu/i });
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

describe("Header mobile menu", () => {
  it("mounts the panel on open and unmounts it on close", async () => {
    const user = userEvent.setup();
    render(<Header />);
    expect(document.getElementById("mobile-nav")).toBeNull();

    const toggle = screen.getByRole("button", { name: /open navigation menu/i });
    await user.click(toggle);
    expect(document.getElementById("mobile-nav")).not.toBeNull();
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: /close navigation menu/i }));
    expect(document.getElementById("mobile-nav")).toBeNull();
  });
});
