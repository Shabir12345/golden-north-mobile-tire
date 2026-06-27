"use client";

import Link from "next/link";
import { BUSINESS, telHref } from "@/lib/business";

export type ButtonVariant = "primary" | "ghost";
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

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} style={{ flexShrink: 0 }}>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

// Friendly rounded button. Primary = solid blue; ghost = bordered, clearly secondary.
const base = [
  "group/btn inline-flex items-center justify-center gap-2.5",
  "font-semibold leading-none rounded-lg select-none cursor-pointer",
  "transition-[transform,box-shadow,background-color,color,border-color] duration-200",
  "[transition-timing-function:var(--ease-out-quart)]",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]",
].join(" ");

const sizeMap: Record<ButtonSize, string> = {
  md: "text-sm px-5 py-3",
  lg: "text-base px-7 py-4",
};

// Primary: white-on-blue. AA: white on #1D6FE0 ≈ 4.7:1.
const primaryStyles = [
  "bg-[var(--color-accent)] text-white shadow-sm",
  "hover:bg-[var(--color-accent-deep)] hover:-translate-y-0.5 hover:shadow-md",
  "active:translate-y-0",
].join(" ");

// Ghost: bordered white card; never competes with primary.
const ghostStyles = [
  "bg-white text-[var(--color-accent)] border border-[var(--color-border)]",
  "hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]",
].join(" ");

const variantMap: Record<ButtonVariant, string> = {
  primary: primaryStyles,
  ghost: ghostStyles,
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

// CallButton — call-first law: always the primary (blue) button on its surface.
export function CallButton({
  className,
  size = "md",
  compact = false,
}: {
  className?: string;
  size?: ButtonSize;
  compact?: boolean;
}) {
  return (
    <Button
      variant="primary"
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
