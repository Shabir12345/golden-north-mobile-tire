import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/contact/ContactForm";

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }) as unknown as typeof fetch;
});

describe("ContactForm", () => {
  it("shows a success message after submit", async () => {
    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/name/i), "Sam");
    await userEvent.type(screen.getByLabelText(/phone/i), "4160000000");
    await userEvent.type(screen.getByLabelText(/message/i), "Flat tire");
    await userEvent.click(screen.getByRole("button", { name: /send/i }));
    expect(await screen.findByText(/thanks|received|get back/i)).toBeInTheDocument();
  });
});
