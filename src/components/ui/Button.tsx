"use client";

import Link from "next/link";
import { BUSINESS, telHref } from "@/lib/business";

export type ButtonVariant = "primary" | "ghost";

export interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

// Phone handset icon — inline SVG, no external dependency.
// aria-hidden: the aria-label on CallButton carries the accessible name.
function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0 }}
    >
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

// ─── Shared base: instrument-panel feel ───────────────────────────────────────
// Saira Condensed (font-display) all-caps + tight tracking reads as a car
// dashboard label — purposeful, not decorative. No rounded-full: a sharp
// corner (rounded-sm) reads as engineered precision, not consumer softness.
const base = [
  "inline-flex items-center gap-2",
  "font-display font-bold tracking-widest text-sm uppercase",
  "px-6 py-3 rounded-sm",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-midnight)]",
  "transition-colors duration-150 cursor-pointer select-none",
].join(" ");

// ─── Primary: physical key-press feel ─────────────────────────────────────────
// The inset bottom-shadow is the design risk: it simulates a stamped metal
// key rather than a flat web button. AA contrast: gold (#E8B04B) on ink
// (#070B12) gives ~9.6:1 — well above both AA and AAA thresholds.
const primaryStyles = [
  "bg-[var(--color-gold)] text-[var(--color-ink)]",
  // Bevel: the bottom shadow darkens like a pressed car key
  "shadow-[inset_0_-3px_0_0_var(--color-gold-deep)]",
  "hover:brightness-105 hover:shadow-[inset_0_-3px_0_0_var(--color-gold-deep),0_0_24px_rgba(232,176,75,0.2)]",
  "active:shadow-[inset_0_1px_0_0_var(--color-gold-deep)] active:translate-y-px",
].join(" ");

// ─── Ghost: clearly secondary, never competing with primary ───────────────────
const ghostStyles = [
  "bg-transparent text-[var(--color-frost)]",
  "border border-[rgba(232,176,75,0.55)]",
  "hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] hover:bg-[rgba(232,176,75,0.05)]",
].join(" ");

const variantMap: Record<ButtonVariant, string> = {
  primary: primaryStyles,
  ghost: ghostStyles,
};

export function Button({
  variant = "primary",
  href,
  onClick,
  children,
  className = "",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variantMap[variant]} ${className}`.trim();

  if (href) {
    // tel:, mailto:, and absolute URLs bypass Next.js Link to avoid router
    // context issues and because they don't benefit from client-side nav.
    if (/^(tel:|mailto:|https?:)/.test(href)) {
      return (
        <a href={href} className={classes} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

// ─── CallButton ───────────────────────────────────────────────────────────────
// Call-first is the law. This is always primary, always visible, always the
// loudest thing on any surface it sits on.
export function CallButton({ className }: { className?: string }) {
  return (
    <Button
      variant="primary"
      href={telHref}
      aria-label="Call Golden North at (416) 558-5915"
      className={className}
    >
      <PhoneIcon />
      Call {BUSINESS.phoneDisplay}
    </Button>
  );
}
