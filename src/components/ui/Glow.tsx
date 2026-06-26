"use client";

// ─── Glow ─────────────────────────────────────────────────────────────────────
// Evokes a headlight cone projecting through darkness — not a floating orb.
// The gradient is an elongated ellipse (wider than tall) radiating from one
// focal point: like a sealed-beam headlamp casting onto asphalt. This
// distinction (directional cone vs. centered radial) is what makes it
// automotive rather than generic "glowy background."
//
// Usage: position the Glow inside a `relative` parent. Use `className` to
// set inset coordinates and size (e.g. `className="-top-32 left-1/2 -translate-x-1/2"`).
// The component itself is always absolute + pointer-events-none.

export type GlowIntensity = "low" | "medium" | "high";

interface GlowProps {
  /** Extra Tailwind classes for position and size. Must be `absolute` already. */
  className?: string;
  /** Controls the gold opacity. Defaults to "medium". */
  intensity?: GlowIntensity;
}

const opacityMap: Record<GlowIntensity, string> = {
  low: "0.07",
  medium: "0.12",
  high: "0.20",
};

export function Glow({ className = "", intensity = "medium" }: GlowProps) {
  const op = opacityMap[intensity];

  // The gradient is a squashed ellipse (x-axis 3× y-axis) to give the
  // headlight-projection shape rather than a circular bloom.
  const gradient = `radial-gradient(ellipse 70% 40% at 50% 0%, rgba(232,176,75,${op}) 0%, rgba(232,176,75,${Number(op) * 0.4}) 50%, transparent 80%)`;

  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none ${className}`}
      style={{ background: gradient }}
    />
  );
}
