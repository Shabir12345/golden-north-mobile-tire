// ─── CompassRose ──────────────────────────────────────────────────────────────
// Decorative 8-point compass star echoing the brand mark. Rendered in
// currentColor at very low opacity as a watermark on navy bands. Purely
// visual — always aria-hidden.

export function CompassRose({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M50 0 L56 44 L100 50 L56 56 L50 100 L44 56 L0 50 L44 44 Z" />
      <path
        d="M50 20 L54 46 L80 50 L54 54 L50 80 L46 54 L20 50 L46 46 Z"
        opacity="0.55"
        transform="rotate(45 50 50)"
      />
    </svg>
  );
}
