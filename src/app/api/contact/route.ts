// ─── POST /api/contact ────────────────────────────────────────────────────────
// Validates a contact submission, delivers it via the swappable email layer,
// and returns a small JSON result. Never throws to the client: validation →
// 400, delivery failure → 500, success → 200 { ok: true }.

import { sendContactEmail } from "@/lib/email";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Require a name, a message, and at least one way to reach back (valid email or a phone).
  const reachable = (email && isEmail(email)) || phone.length >= 7;
  if (!name || !message || !reachable) {
    return Response.json(
      { ok: false, error: "Please include your name, a message, and a phone number or email." },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail({ name, phone, email, message });
    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return Response.json({ ok: false, error: "Something went wrong sending your message." }, { status: 500 });
  }
}
