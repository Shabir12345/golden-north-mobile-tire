"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CallButton } from "@/components/ui/Button";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { BUSINESS } from "@/lib/business";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

// North-star mark — a simple nod to "Golden North". No animation.
function NorthStar() {
  return (
    <span aria-hidden="true" className="text-[var(--color-accent)] text-xl leading-none select-none">
      ✦
    </span>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" focusable="false" width="22" height="22" viewBox="0 0 20 20" fill="currentColor">
      {open ? (
        <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
      ) : (
        <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
      )}
    </svg>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
// Clean white sticky bar with a hairline border and a soft shadow. Call-first:
// the blue CallButton shows at every breakpoint (compact on mobile).
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    !pathname ? false : href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="sticky top-0 border-b border-[var(--color-border)] bg-white/90 shadow-sm backdrop-blur-md"
      style={{ zIndex: "var(--z-sticky)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center gap-3 sm:gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
          aria-label="Golden North — home"
        >
          <NorthStar />
          <span className="font-bold tracking-tight text-[var(--color-heading)] text-base leading-none">
            {BUSINESS.shortName}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 ml-6" aria-label="Primary navigation">
          {NAV.filter((n) => n.href !== "/").map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={`text-sm rounded-md transition-colors duration-150 hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-page)] ${
                isActive(href) ? "font-semibold text-[var(--color-accent)]" : "font-medium text-[var(--color-body)]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <div className="hidden lg:block">
            <AvailabilityBadge />
          </div>
          <CallButton compact />
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-[var(--color-heading)] hover:text-[var(--color-accent)] rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page)]"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-5"
      >
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              aria-current={isActive(href) ? "page" : undefined}
              className={`text-base px-2 py-3 border-b border-[var(--color-border)] last:border-0 rounded-md transition-colors duration-150 hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-surface)] ${
                isActive(href) ? "font-semibold text-[var(--color-accent)]" : "font-medium text-[var(--color-body)]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        {menuOpen && (
          <div className="mt-4">
            <AvailabilityBadge variant="line" />
          </div>
        )}
      </div>
    </header>
  );
}
