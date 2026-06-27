"use client";

import Link from "next/link";
import { BUSINESS, telHref } from "@/lib/business";

export type ButtonVariant = "primary" | "ghost" | "onLight" | "solidInk";
export type ButtonSize = "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

// Phone handset icon — inline SVG, no external dependency.
function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0 }}
    >
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

// ─── Shared base ──────────────────────────────────────────────────────────────
// Saira Condensed all-caps, tracked — reads like a stamped control label, not a
// soft consumer pill. Sharp corner (rounded-[3px]) = engineered, not bubbly.
const base = [
  "group/btn inline-flex items-center justify-center gap-2.5",
  "font-display font-bold tracking-[0.12em] uppercase leading-none",
  "rounded-[3px] select-none cursor-pointer",
  "transition-[transform,box-shadow,background-color,color] duration-200",
  "[transition-timing-function:var(--ease-out-quart)]",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-midnight)]",
].join(" ");

const sizeMap: Record<ButtonSize, string> = {
  md: "text-sm px-6 py-3",
  lg: "text-base px-8 py-4",
};

// Primary: black-on-amber. The single loudest object on any surface.
// AA: ink (#05080E) on amber (#F5A81C) ≈ 10.7:1.
const primaryStyles = [
  "bg-[var(--color-gold)] text-[var(--color-ink)]",
  "shadow-[inset_0_-3px_0_0_var(--color-gold-deep)]",
  "hover:bg-[#FFB733] hover:-translate-y-0.5",
  "hover:shadow-[inset_0_-3px_0_0_var(--color-gold-deep),0_10px_30px_-6px_rgba(245,168,28,0.5)]",
  "active:translate-y-0 active:shadow-[inset_0_2px_0_0_var(--color-gold-deep)]",
].join(" ");

// Ghost: clearly secondary against a dark surface. Never competes with primary.
const ghostStyles = [
  "bg-transparent text-[var(--color-frost)]",
  "border border-[rgba(245,168,28,0.5)]",
  "hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:bg-[rgba(245,168,28,0.06)]",
].join(" ");

// onLight: ghost variant for use on the amber drenched band (dark outline).
const onLightStyles = [
  "bg-transparent text-[var(--color-ink)]",
  "border border-[rgba(5,8,14,0.45)]",
  "hover:bg-[var(--color-ink)] hover:text-[var(--color-gold)] hover:border-[var(--color-ink)]",
].join(" ");

// solidInk: a dark filled button for use ON the amber drenched band.
// AA: gold (#F5A81C) on ink (#05080E) ≈ 10.7:1.
const solidInkStyles = [
  "bg-[var(--color-ink)] text-[var(--color-gold)]",
  "hover:-translate-y-0.5 hover:text-[#FFB733]",
  "hover:shadow-[0_10px_30px_-6px_rgba(5,8,14,0.55)]",
  "active:translate-y-0",
  "focus-visible:ring-offset-[var(--color-gold)]",
].join(" ");

const variantMap: Record<ButtonVariant, string> = {
  primary: primaryStyles,
  ghost: ghostStyles,
  onLight: onLightStyles,
  solidInk: solidInkStyles,
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className = "",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${sizeMap[size]} ${variantMap[variant]} ${className}`.trim();

  if (href) {
    // tel:, mailto:, and absolute URLs bypass Next.js Link.
    if (/^(tel:|mailto:|https?:)/.test(href)) {
      return (
        <a href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
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
// Call-first is the law: always primary, always the loudest thing on its surface.
// `compact` collapses the number to just "Call" below sm so the sticky header
// button never wraps to two lines on a phone (the full number lives in the
// fixed MobileCallBar instead).
export function CallButton({
  className,
  size = "md",
  compact = false,
  tone = "amber",
}: {
  className?: string;
  size?: ButtonSize;
  compact?: boolean;
  /** "amber" = default gold button. "ink" = dark button for the amber band. */
  tone?: "amber" | "ink";
}) {
  return (
    <Button
      variant={tone === "ink" ? "solidInk" : "primary"}
      size={size}
      href={telHref}
      aria-label={`Call Golden North at ${BUSINESS.phoneDisplay}`}
      className={className}
    >
      <PhoneIcon className="transition-transform duration-200 group-hover/btn:-rotate-12" />
      {compact ? (
        <>
          <span className="sm:hidden">Call</span>
          <span className="hidden sm:inline">Call {BUSINESS.phoneDisplay}</span>
        </>
      ) : (
        <>Call {BUSINESS.phoneDisplay}</>
      )}
    </Button>
  );
}
