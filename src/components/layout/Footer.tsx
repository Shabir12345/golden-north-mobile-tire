// Footer — server component (no client state needed).
//
// Design decision: two-row layout over a generic three-column grid.
// Row 1: NAP block left + tagline right — identity and tone in one breath.
// Row 2: nav, social, copyright — all tertiary, quieter than the NAP.
//
// The `bg-ink` background is one shade darker than the page `bg-midnight`,
// encoding depth: the footer sits below the content layer, not at the same
// visual elevation. A thin gold-tinted top rule marks the boundary.
//
// Social links open in a new tab with rel="noopener noreferrer" — standard
// security practice for cross-origin nav, and the explicit target="_blank"
// makes the intent clear to AT users (they get the warning from the browser).

import Link from "next/link";
import { BUSINESS, telHref, mailHref } from "@/lib/business";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

// TikTok SVG — inline, no external icon library dependency.
function TikTokIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.62a8.26 8.26 0 0 0 4.83 1.55V6.72a4.85 4.85 0 0 1-1.06-.03z" />
    </svg>
  );
}

// Instagram SVG — inline.
function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--color-ink)] border-t border-[rgba(232,176,75,0.12)]"
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* ── Row 1: NAP + Tagline ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 pb-8 border-b border-[rgba(232,176,75,0.08)]">

          {/* NAP block */}
          <div className="space-y-3">
            <p className="font-display font-bold tracking-widest uppercase text-frost text-sm">
              {BUSINESS.name}
            </p>
            <div className="space-y-1.5 text-sm text-slate-muted">
              <p>
                <a
                  href={telHref}
                  className="hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-ink)] rounded-sm transition-colors duration-150"
                  aria-label={`Call us at ${BUSINESS.phoneDisplay}`}
                >
                  {BUSINESS.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={mailHref}
                  className="hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-ink)] rounded-sm transition-colors duration-150"
                >
                  {BUSINESS.email}
                </a>
              </p>
              <p>{BUSINESS.areaServed}</p>
              <p className="text-signal font-display font-semibold tracking-widest uppercase text-xs">
                {BUSINESS.hours}
              </p>
            </div>
          </div>

          {/* Tagline — italic, quieter, right-aligned on desktop */}
          <blockquote className="sm:text-right sm:max-w-xs">
            <p className="text-slate-muted text-sm italic leading-relaxed">
              &ldquo;{BUSINESS.tagline}&rdquo;
            </p>
          </blockquote>
        </div>

        {/* ── Row 2: Nav · Social · Copyright ── */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

          {/* Nav links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-display text-xs font-semibold tracking-widest uppercase text-slate-muted hover:text-frost focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-ink)] rounded-sm transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={BUSINESS.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Golden North on TikTok (opens in new tab)"
              className="text-slate-muted hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-ink)] rounded-sm transition-colors duration-150"
            >
              <TikTokIcon />
            </a>
            <a
              href={BUSINESS.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Golden North on Instagram (opens in new tab)"
              className="text-slate-muted hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-ink)] rounded-sm transition-colors duration-150"
            >
              <InstagramIcon />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-slate-muted text-xs font-sans">
            &copy; {year} {BUSINESS.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
