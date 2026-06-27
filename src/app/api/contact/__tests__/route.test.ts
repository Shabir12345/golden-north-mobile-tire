import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/email", () => ({ sendContactEmail: vi.fn().mockResolvedValue(undefined) }));

import { POST } from "@/app/api/contact/route";

function req(body: unknown) {
  return new Request("http://x/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
}

describe("POST /api/contact", () => {
  it("rejects missing fields with 400", async () => {
    const res = await POST(req({ name: "" }));
    expect(res.status).toBe(400);
  });

  it("accepts a valid submission", async () => {
    const res = await POST(req({ name: "Sam", phone: "4160000000", email: "a@b.com", message: "Need a tire change" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});
