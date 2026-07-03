"use client";

// ─── ContactForm ──────────────────────────────────────────────────────────────
// The secondary contact path (the phone call is primary). Labeled fields with
// inline validation, POST to /api/contact, and loading / success / error states
// announced via aria-live. Validation messages are field-level; the server's
// own message is surfaced when a submit is rejected.

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";
type FieldErrors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function validate(data: Record<string, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name?.trim()) errors.name = "Please add your name.";
  if (!data.phone?.trim()) errors.phone = "A phone number lets us call you back.";
  else if (data.phone.replace(/\D/g, "").length < 7) errors.phone = "That phone number looks too short.";
  if (data.email?.trim() && !isEmail(data.email)) errors.email = "That email doesn't look right.";
  if (!data.message?.trim()) errors.message = "Tell us what you need and where you are.";
  return errors;
}

const field =
  "w-full rounded-lg border bg-[var(--color-card)] px-4 py-3 text-base text-[var(--color-heading)] placeholder:text-[var(--color-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]";
const fieldOk = "border-[var(--color-border)] focus-visible:border-[var(--color-accent)]";
const fieldBad = "border-[#D92D20] focus-visible:ring-[#D92D20]";
const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-body)]";
const errCls = "mt-1.5 text-sm text-[#D92D20]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const found = validate(data);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setApiError("");
      // Move focus to the first field with a problem for keyboard/SR users.
      const firstKey = (["name", "phone", "email", "message"] as const).find((k) => found[k]);
      form.querySelector<HTMLElement>(`#cf-${firstKey}`)?.focus();
      return;
    }

    setErrors({});
    setApiError("");
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
        // Surface the server's specific message (e.g. a validation reason)
        // instead of a generic "something went wrong".
        setApiError(typeof json.error === "string" ? json.error : "");
        setStatus("error");
      }
    } catch {
      setApiError("");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-accent-soft)] p-6 text-center">
        <p className="text-xl font-bold text-[var(--color-accent-deep)]">Thanks — message received.</p>
        <p className="mt-2 text-sm text-[var(--color-body)]">
          We&rsquo;ll reply shortly. Need help right now? Calling is always fastest.
        </p>
      </div>
    );
  }

  const cls = (bad: boolean) => `${field} ${bad ? fieldBad : fieldOk}`;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>Name</label>
          <input
            id="cf-name" name="name" type="text" autoComplete="name" placeholder="Your name"
            className={cls(!!errors.name)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-err" : undefined}
          />
          {errors.name && <p id="cf-name-err" className={errCls}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelCls}>Phone</label>
          <input
            id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="(416) 000-0000"
            className={cls(!!errors.phone)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "cf-phone-err" : undefined}
          />
          {errors.phone && <p id="cf-phone-err" className={errCls}>{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className={labelCls}>Email <span className="text-[var(--color-muted)] normal-case tracking-normal">(optional)</span></label>
        <input
          id="cf-email" name="email" type="email" autoComplete="email" placeholder="you@example.com"
          className={cls(!!errors.email)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cf-email-err" : undefined}
        />
        {errors.email && <p id="cf-email-err" className={errCls}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>Message</label>
        <textarea
          id="cf-message" name="message" rows={4} placeholder="What do you need, and where are you?"
          className={cls(!!errors.message)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
        />
        {errors.message && <p id="cf-message-err" className={errCls}>{errors.message}</p>}
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-[#D92D20]">
          {apiError || "Something went wrong sending your message."} Or just call us at{" "}
          <a href="tel:+14165585915" className="font-semibold underline">(416) 558-5915</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group/btn inline-flex items-center justify-center gap-2.5 rounded-lg bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--color-navy)] shadow-sm transition-[transform,box-shadow,background-color] duration-200 [transition-timing-function:var(--ease-out-quart)] hover:-translate-y-0.5 hover:bg-[#D99500] hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p aria-live="polite" className="sr-only">
        {status === "sending" ? "Sending your message" : ""}
      </p>
    </form>
  );
}
