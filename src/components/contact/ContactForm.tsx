"use client";

// ─── ContactForm ──────────────────────────────────────────────────────────────
// The secondary contact path (the phone call is primary). Labeled fields,
// POST to /api/contact, and loading / success / error states announced via
// aria-live. Deliberately understated styling so it never outranks the call.

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-[4px] border border-[rgba(245,168,28,0.22)] bg-[var(--color-steel)] px-4 py-3 font-sans text-base text-[var(--color-frost)] placeholder:text-[var(--color-slate-muted)] focus:outline-none focus-visible:border-[var(--color-gold)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]";
const labelCls = "mb-1.5 block font-display text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-frost-dim)]";

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
      <div
        role="status"
        className="rounded-[4px] border border-[rgba(245,168,28,0.3)] bg-[var(--color-steel)] p-6 text-center"
      >
        <p className="font-display text-xl font-bold text-[var(--color-gold)]">Thanks — message received.</p>
        <p className="mt-2 font-sans text-sm text-[var(--color-frost-dim)]">
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
        <label htmlFor="cf-email" className={labelCls}>Email <span className="text-[var(--color-slate-muted)] normal-case tracking-normal">(optional)</span></label>
        <input id="cf-email" name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" />
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>Message</label>
        <textarea id="cf-message" name="message" required rows={4} className={field} placeholder="What do you need, and where are you?" />
      </div>

      {status === "error" && (
        <p role="alert" className="font-sans text-sm text-[var(--color-signal)]">
          Something went wrong. Please try again — or just call us at (416) 558-5915.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group/btn inline-flex items-center justify-center gap-2.5 rounded-[3px] bg-[var(--color-gold)] px-7 py-3.5 font-display text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-ink)] shadow-[inset_0_-3px_0_0_var(--color-gold-deep)] transition-[transform,box-shadow,background-color] duration-200 [transition-timing-function:var(--ease-out-quart)] hover:-translate-y-0.5 hover:bg-[#FFB733] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-midnight)]"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p aria-live="polite" className="sr-only">
        {status === "sending" ? "Sending your message" : ""}
      </p>
    </form>
  );
}
