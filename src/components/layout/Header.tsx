"use client";

import { useState } from "react";
import Link from "next/link";
import { CallButton } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/business";

// ─── Primary navigation ───────────────────────────────────────────────────────
// Four destinations only — the site is a service directory, not a platform.
// Each label maps exactly to its slug so tests can match by accessible name.
const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

// ─── North-star mark ──────────────────────────────────────────────────────────
// A four-pointed compass star (✦) in gold, referencing both the brand name
// ("Golden North") and the automotive context of precise navigation.
// The slow CSS twinkle is suppressed under prefers-reduced-motion by globals.css.
function NorthStar() {
  return (
    <span
      aria-hidden="true"
      className="text-gold text-xl leading-none select-none"
      style={{ animation: "goldPulse 4s ease-in-out infinite" }}
    >
      ✦
    </span>
  );
}

// ─── Open 24/7 status badge ───────────────────────────────────────────────────
// Reads as a telemetry indicator — a live status dot + label — not a pill.
// Uses the `signal` token (#F5A623) which is distinct from gold (#E8B04B) and
// never used for decorative elements, so it immediately reads as "live/active".
function StatusBadge() {
  return (
    <div className="flex items-center gap-1.5" role="status" aria-label="Service status: Open 24/7">
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full bg-signal"
        style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
      />
      <span className="font-display text-xs font-semibold tracking-widest uppercase text-signal">
        {BUSINESS.hours}
      </span>
    </div>
  );
}

// ─── Hamburger icon ───────────────────────────────────────────────────────────
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      {open ? (
        // X / close
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        />
      ) : (
        // Three bars
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        />
      )}
    </svg>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
// Sticky, translucent ink background with backdrop blur — "tinted glass panel"
// feel specific to premium dark automotive UI. Not a plain black bar.
// Call-first law: CallButton is always visible at every breakpoint and always
// renders as primary (gold). Nav links are secondary; they never outrank the CTA.
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-[rgba(232,176,75,0.08)]"
      style={{ backgroundColor: "rgba(7,11,18,0.92)", backdropFilter: "blur(10px)" }}
    >
      {/* ── Top bar ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo: north-star mark + wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] rounded-sm"
          aria-label="Golden North — home"
        >
          <NorthStar />
          <span className="font-display font-bold tracking-widest text-frost uppercase text-sm leading-none">
            {BUSINESS.shortName}
          </span>
        </Link>

        {/* Desktop primary nav — hidden on mobile */}
        <nav
          className="hidden md:flex items-center gap-6 ml-6"
          aria-label="Primary navigation"
        >
          {NAV.filter((n) => n.href !== "/").map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-display text-xs font-semibold tracking-widest uppercase text-slate-muted hover:text-frost focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-ink)] rounded-sm transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right cluster: status badge + call CTA + hamburger */}
        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          {/* 24/7 badge — always in DOM; CSS-hidden below sm */}
          <div className="hidden sm:block">
            <StatusBadge />
          </div>

          {/* Call CTA — always visible, always primary (call-first law) */}
          <CallButton />

          {/* Hamburger — mobile only */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-frost hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] rounded-sm transition-colors duration-150"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* ── Mobile slide-down menu ── */}
      {/* The outer div is always in the DOM so aria-controls="mobile-nav" on the
          hamburger button is never a broken ARIA reference. Visibility is toggled
          via the `hidden` HTML attribute (sets display:none) rather than by
          unmounting. The StatusBadge inside is still conditionally rendered so
          the DOM never contains two "Open 24/7" text nodes simultaneously —
          which would break the getByText assertion in the covering test. */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="md:hidden border-t border-[rgba(232,176,75,0.12)] bg-[var(--color-ink)] px-4 py-5"
      >
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="font-display text-sm font-semibold tracking-widest uppercase text-slate-muted hover:text-frost px-2 py-3 border-b border-[rgba(232,176,75,0.06)] last:border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-ink)] rounded-sm transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </nav>
        {/* Status badge in mobile menu — only mounted when menu is open to avoid
            duplicate text nodes alongside the always-in-DOM desktop badge. */}
        {menuOpen && (
          <div className="mt-4 sm:hidden">
            <StatusBadge />
          </div>
        )}
      </div>
    </header>
  );
}
