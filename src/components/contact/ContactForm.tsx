"use client";

// ─── ContactForm ──────────────────────────────────────────────────────────────
// The secondary contact path (the phone call is primary). Labeled fields, POST
// to /api/contact, and loading / success / error states announced via aria-live.

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-base text-[var(--color-heading)] placeholder:text-[var(--color-muted)] focus:outline-none focus-visible:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]";
const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-body)]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-accent-soft)] p-6 text-center">
        <p className="text-xl font-bold text-[var(--color-accent)]">Thanks — message received.</p>
        <p className="mt-2 text-sm text-[var(--color-body)]">
          We&rsquo;ll reply shortly. Need help right now? Calling is always fastest.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>Name</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelCls}>Phone</label>
          <input id="cf-phone" name="phone" type="tel" required autoComplete="tel" className={field} placeholder="(416) 000-0000" />
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className={labelCls}>Email <span className="text-[var(--color-muted)] normal-case tracking-normal">(optional)</span></label>
        <input id="cf-email" name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" />
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>Message</label>
        <textarea id="cf-message" name="message" required rows={4} className={field} placeholder="What do you need, and where are you?" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-[#D92D20]">
          Something went wrong. Please try again — or just call us at (416) 558-5915.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group/btn inline-flex items-center justify-center gap-2.5 rounded-lg bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-[transform,box-shadow,background-color] duration-200 [transition-timing-function:var(--ease-out-quart)] hover:-translate-y-0.5 hover:bg-[var(--color-accent-deep)] hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p aria-live="polite" className="sr-only">
        {status === "sending" ? "Sending your message" : ""}
      </p>
    </form>
  );
}
