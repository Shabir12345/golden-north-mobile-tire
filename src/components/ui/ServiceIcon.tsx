// ─── ServiceIcon ─────────────────────────────────────────────────────────────
// Line-style icons for the five main services. Decorative (aria-hidden);
// color comes from currentColor so cards can tint them accent-gold.

import type { Service } from "@/lib/services";

const PATHS: Record<Service["icon"], React.ReactNode> = {
  roadside: (
    // warning triangle over a road
    <>
      <path d="M12 3.5 21 19H3L12 3.5z" />
      <path d="M12 9.5v4" />
      <path d="M12 16.4v.2" />
    </>
  ),
  tire: (
    // tire: two circles + lug hints
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3.5v2.5M12 18v2.5M3.5 12H6M18 12h2.5M6 6l1.8 1.8M18 18l-1.8-1.8M18 6l-1.8 1.8M6 18l1.8-1.8" />
    </>
  ),
  battery: (
    // battery with bolt
    <>
      <rect x="3" y="8" width="16" height="10" rx="2" />
      <path d="M21 11.5v3" />
      <path d="M11.5 10 9 13.2h3L10 16" />
    </>
  ),
  lockout: (
    // padlock
    <>
      <rect x="5.5" y="10.5" width="13" height="9" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
      <path d="M12 14v2.5" />
    </>
  ),
  mechanic: (
    // wrench
    <>
      <path d="M14.5 6.5a4 4 0 0 0-5.6 4.9L4 16.3a2 2 0 1 0 2.8 2.8l4.9-4.9a4 4 0 0 0 4.9-5.6L13.9 11l-1.8-1.8 2.4-2.7z" />
    </>
  ),
};

export function ServiceIcon({ name, className = "" }: { name: Service["icon"]; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
