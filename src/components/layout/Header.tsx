"use client";

import { Fragment, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CallButton } from "@/components/ui/Button";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { BUSINESS } from "@/lib/business";
import { SERVICES } from "@/lib/services";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

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
// Navy sticky bar carrying the real brand logo. Call-first: the gold CallButton
// shows at every breakpoint (compact on mobile).
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Hover and click drive the dropdown independently: hovering over the button
  // fires onMouseEnter on the wrapper before the click handler runs, so a
  // plain toggle on click would immediately re-close a hover-opened menu.
  // ORing two booleans keeps hover-to-open and click-to-toggle from fighting.
  const [servicesHoverOpen, setServicesHoverOpen] = useState(false);
  const [servicesClickOpen, setServicesClickOpen] = useState(false);
  const servicesOpen = servicesHoverOpen || servicesClickOpen;
  const closeServicesMenu = () => {
    setServicesHoverOpen(false);
    setServicesClickOpen(false);
  };
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setMenuOpen(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    !pathname ? false : href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="sticky top-0 border-b border-white/10 bg-[#151D2Ee6] shadow-sm backdrop-blur-md"
      style={{ zIndex: "var(--z-sticky)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center gap-3 sm:gap-4">
        <Link
          href="/"
          className="flex items-center flex-shrink-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]"
          aria-label="GoldenNorth — home"
        >
          <Image
            src="/logo-mark.png"
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
            priority
            className="h-10 w-10"
          />
          <span className="ml-2.5 flex flex-col leading-none">
            <span className="font-bold tracking-tight text-white text-base">
              {BUSINESS.shortName}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
              24/7 Roadside Assistance
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 ml-6" aria-label="Primary navigation">
          {NAV.filter((n) => n.href !== "/").map(({ href, label }) => {
            const linkClasses = `link-grow text-sm rounded-md transition-colors duration-150 hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-navy)] ${
              isActive(href) ? "font-semibold text-[var(--color-accent)]" : "font-medium text-white/80"
            }`;

            if (href === "/services") {
              return (
                <div
                  key={href}
                  className="relative"
                  onMouseEnter={() => setServicesHoverOpen(true)}
                  onMouseLeave={() => setServicesHoverOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape" && servicesOpen) {
                      closeServicesMenu();
                      servicesTriggerRef.current?.focus();
                    }
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      closeServicesMenu();
                    }
                  }}
                >
                  <div className="flex items-center">
                    <Link
                      href={href}
                      aria-current={isActive(href) ? "page" : undefined}
                      className={linkClasses}
                    >
                      {label}
                    </Link>
                    <button
                      ref={servicesTriggerRef}
                      type="button"
                      aria-label="Services menu"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setServicesClickOpen((v) => !v)}
                      className="p-1.5 text-white/70 hover:text-[var(--color-accent)] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                    >
                      <svg
                        aria-hidden="true"
                        width="12"
                        height="12"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`transition-transform duration-150 ${servicesOpen ? "rotate-180" : ""}`}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        />
                      </svg>
                    </button>
                  </div>
                  {servicesOpen && (
                    <ul
                      id="services-menu"
                      className="menu-panel absolute left-0 top-full mt-2 w-64 rounded-lg border border-white/10 bg-[var(--color-navy)] p-2 shadow-lg"
                    >
                      {SERVICES.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            onClick={closeServicesMenu}
                            className="block rounded-md px-3 py-2.5 text-sm font-medium text-white/85 transition-colors duration-150 hover:bg-white/5 hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                          >
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={linkClasses}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <div className="hidden lg:block">
            <AvailabilityBadge onDark />
          </div>
          <CallButton compact />
          <button
            type="button"
            className="md:hidden p-3 -mr-3 text-white/90 hover:text-[var(--color-accent)] rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="menu-panel md:hidden border-t border-white/10 bg-[var(--color-navy)] px-4 py-5"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV.map(({ href, label }, i) => (
              <Fragment key={href}>
                <Link
                  href={href}
                  onClick={closeMenu}
                  aria-current={isActive(href) ? "page" : undefined}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className={`menu-item text-base px-2 py-3 border-b border-white/10 last:border-0 rounded-md transition-colors duration-150 hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-navy)] ${
                    isActive(href) ? "font-semibold text-[var(--color-accent)]" : "font-medium text-white/85"
                  }`}
                >
                  {label}
                </Link>
                {href === "/services" &&
                  SERVICES.map((s, j) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={closeMenu}
                      style={{ animationDelay: `${(i + j + 1) * 40}ms` }}
                      className="menu-item pl-6 text-sm px-2 py-3 border-b border-white/10 last:border-0 rounded-md font-medium text-white/85 transition-colors duration-150 hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-navy)]"
                    >
                      {s.name}
                    </Link>
                  ))}
              </Fragment>
            ))}
          </nav>
          <div className="menu-item mt-4" style={{ animationDelay: `${(NAV.length + SERVICES.length) * 40}ms` }}>
            <AvailabilityBadge variant="line" onDark />
          </div>
        </div>
      )}
    </header>
  );
}
