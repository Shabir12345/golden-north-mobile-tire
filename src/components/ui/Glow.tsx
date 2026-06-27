// ─── Glow ─────────────────────────────────────────────────────────────────────
// A headlight cone projecting through darkness — an elongated, directional
// ellipse, not a centered orb. This is what makes the light read as an
// approaching vehicle rather than a generic "glowy background".
//
// `sweep` adds the slow beamSweep animation (a headlight panning across the
// dark) — use it once, behind the hero. It is suppressed under
// prefers-reduced-motion by globals.css.

export type GlowIntensity = "low" | "medium" | "high";

interface GlowProps {
  /** Position + size classes. Must already be `absolute`-positioned by the parent context. */
  className?: string;
  intensity?: GlowIntensity;
  /** Animate the cone panning side-to-side (hero only). */
  sweep?: boolean;
}

const opacityMap: Record<GlowIntensity, number> = {
  low: 0.1,
  medium: 0.18,
  high: 0.3,
};

export function Glow({ className = "", intensity = "medium", sweep = false }: GlowProps) {
  const op = opacityMap[intensity];

  // Squashed ellipse (wide, shallow) = headlight projection, not a circle.
  const gradient = `radial-gradient(ellipse 75% 45% at 50% 0%, rgba(245,168,28,${op}) 0%, rgba(245,168,28,${op * 0.35}) 45%, transparent 78%)`;

  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none ${className}`}
      style={{
        background: gradient,
        animation: sweep ? "beamSweep 9s ease-in-out infinite" : undefined,
        willChange: sweep ? "transform" : undefined,
      }}
    />
  );
}
