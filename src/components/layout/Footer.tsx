// Footer — server component. Sits one shade below the page (bg-ink) with a
// hazard hairline marking the boundary. The phone number is treated as the
// loudest text element here too: the footer is a last-chance conversion point.

import Link from "next/link";
import { BUSINESS, telHref, mailHref } from "@/lib/business";
import { HazardStripe } from "@/components/ui/HazardStripe";
import { LiveStatus } from "@/components/ui/LiveStatus";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

function TikTokIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.62a8.26 8.26 0 0 0 4.83 1.55V6.72a4.85 4.85 0 0 1-1.06-.03z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-ink)]" aria-label="Site footer">
      <HazardStripe height={8} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
        {/* Row 1: identity + big call */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between pb-10 border-b border-[rgba(245,168,28,0.12)]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="text-[var(--color-gold)] text-lg">✦</span>
              <p className="font-display font-bold tracking-[0.14em] uppercase text-[var(--color-frost)] text-sm">
                {BUSINESS.name}
              </p>
            </div>
            <div className="space-y-2 text-sm text-[var(--color-frost-dim)]">
              <p>
                <a
                  href={mailHref}
                  className="hover:text-[var(--color-gold)] rounded-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-ink)]"
                >
                  {BUSINESS.email}
                </a>
              </p>
              <p className="text-[var(--color-slate-muted)]">{BUSINESS.areaServed}</p>
              <LiveStatus />
            </div>
            <blockquote className="max-w-xs pt-1">
              <p className="text-[var(--color-slate-muted)] text-sm italic leading-relaxed">
                &ldquo;{BUSINESS.tagline}&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Big click-to-call */}
          <div className="lg:text-right">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-slate-muted)] mb-2">
              One call. We come to you.
            </p>
            <a
              href={telHref}
              className="inline-block font-display font-bold tracking-tight text-[var(--color-gold)] leading-none rounded-sm transition-colors duration-150 hover:text-[#FFB733] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
              aria-label={`Call Golden North at ${BUSINESS.phoneDisplay}`}
            >
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Row 2: nav · social · copyright */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-display text-xs font-semibold tracking-[0.16em] uppercase text-[var(--color-slate-muted)] hover:text-[var(--color-frost)] rounded-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-ink)]"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={BUSINESS.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Golden North on TikTok (opens in new tab)"
              className="text-[var(--color-slate-muted)] hover:text-[var(--color-gold)] rounded-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-ink)]"
            >
              <TikTokIcon />
            </a>
            <a
              href={BUSINESS.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Golden North on Instagram (opens in new tab)"
              className="text-[var(--color-slate-muted)] hover:text-[var(--color-gold)] rounded-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-ink)]"
            >
              <InstagramIcon />
            </a>
          </div>

          <p className="text-[var(--color-slate-muted)] text-xs font-sans">
            &copy; {year} {BUSINESS.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
