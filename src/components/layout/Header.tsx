"use client";

import { useState } from "react";
import Link from "next/link";
import { CallButton } from "@/components/ui/Button";
import { LiveStatus } from "@/components/ui/LiveStatus";
import { BUSINESS } from "@/lib/business";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

// North-star mark — references "Golden North" + precise navigation. Slow
// twinkle suppressed under prefers-reduced-motion by globals.css.
function NorthStar() {
  return (
    <span
      aria-hidden="true"
      className="text-[var(--color-gold)] text-xl leading-none select-none"
      style={{ animation: "goldPulse 4s ease-in-out infinite" }}
    >
      ✦
    </span>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" focusable="false" width="22" height="22" viewBox="0 0 20 20" fill="currentColor">
      {open ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        />
      ) : (
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
// Sticky tinted-glass panel over the night canvas. Call-first law: the amber
// CallButton is visible at every breakpoint (compact on mobile so it never
// wraps) and is always the loudest control in the bar.
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="sticky top-0 border-b border-[rgba(245,168,28,0.18)]"
      style={{
        zIndex: "var(--z-sticky)",
        backgroundColor: "rgba(5,8,14,0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center gap-3 sm:gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
          aria-label="Golden North — home"
        >
          <NorthStar />
          <span className="font-display font-bold tracking-[0.14em] text-[var(--color-frost)] uppercase text-sm leading-none">
            {BUSINESS.shortName}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 ml-6" aria-label="Primary navigation">
          {NAV.filter((n) => n.href !== "/").map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-display text-xs font-semibold tracking-[0.16em] uppercase text-[var(--color-slate-muted)] hover:text-[var(--color-frost)] rounded-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-ink)]"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <div className="hidden lg:block">
            <LiveStatus />
          </div>
          <CallButton compact />
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-[var(--color-frost)] hover:text-[var(--color-gold)] rounded-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu. Container always in DOM (so aria-controls is a
          valid reference); hidden attribute removes it from the a11y tree so its
          links don't double-match role queries. */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="md:hidden border-t border-[rgba(245,168,28,0.14)] bg-[var(--color-ink)] px-4 py-5"
      >
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="font-display text-base font-semibold tracking-[0.16em] uppercase text-[var(--color-slate-muted)] hover:text-[var(--color-frost)] px-2 py-3 border-b border-[rgba(245,168,28,0.08)] last:border-0 rounded-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-ink)]"
            >
              {label}
            </Link>
          ))}
        </nav>
        {/* Only mounted when open → avoids a duplicate "Open 24/7" text node. */}
        {menuOpen && (
          <div className="mt-4">
            <LiveStatus variant="line" />
          </div>
        )}
      </div>
    </header>
  );
}
