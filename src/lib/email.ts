// ─── email ────────────────────────────────────────────────────────────────────
// Swappable contact-email delivery. When RESEND_API_KEY is set, the message is
// sent via Resend (dynamically imported so the dependency is optional and never
// bundled when unused). Without a key the route degrades gracefully: it logs the
// submission so nothing is lost in dev, and still resolves successfully. Swap
// the provider by replacing only the body of sendContactEmail.

export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "info.goldennorth@gmail.com";

  if (!apiKey) {
    // Graceful degradation — no provider configured yet.
    console.info("[contact] No RESEND_API_KEY set; would email:", { to, ...payload });
    return;
  }

  // Dynamically imported so it's only loaded when a key is actually configured.
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "GoldenNorth Website <onboarding@resend.dev>",
    to,
    replyTo: payload.email,
    subject: `New website enquiry from ${payload.name}`,
    text: [
      `Name:  ${payload.name}`,
      `Phone: ${payload.phone}`,
      `Email: ${payload.email}`,
      "",
      payload.message,
    ].join("\n"),
  });
}
