// ─── CoverageMap ──────────────────────────────────────────────────────────────
// A friendly schematic GTA service-area diagram on a white card — not a real map.
// The SVG is decorative (aria-hidden); the text list of areas is the accessible
// equivalent.

import { BUSINESS } from "@/lib/business";

const AREAS = [
  "Toronto", "Mississauga", "Brampton", "Vaughan", "Markham",
  "Scarborough", "Etobicoke", "North York", "Oakville", "Richmond Hill",
] as const;

export function CoverageMap() {
  return (
    <section className="bg-[var(--color-page)] py-24 lg:py-32" aria-labelledby="coverage-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <h2 id="coverage-heading" className="font-bold text-4xl leading-[1.05] text-[var(--color-heading)] lg:text-5xl">
              The whole GTA, <span className="text-[var(--color-accent)]">not just downtown.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-body)]">
              {BUSINESS.shortName} covers the full {BUSINESS.areaServed}. A Brampton driveway,
              a Markham condo garage, the shoulder of the 401 through Mississauga — one call
              reaches us.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5" aria-label="Areas served">
              {AREAS.map((area) => (
                <li key={area} className="flex items-center gap-2.5 text-sm text-[var(--color-body)]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm sm:p-6" aria-hidden="true">
            <svg viewBox="0 0 540 360" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <defs>
                <radialGradient id="cov-glow" cx="50%" cy="55%" r="60%">
                  <stop offset="0%" stopColor="rgba(29,111,224,0.12)" />
                  <stop offset="100%" stopColor="rgba(29,111,224,0)" />
                </radialGradient>
              </defs>

              <rect x="0" y="0" width="540" height="360" fill="url(#cov-glow)" />

              <polygon
                points="40,270 70,120 140,60 280,40 400,55 490,110 510,230 480,300 40,305"
                stroke="rgba(29,111,224,0.55)"
                strokeWidth="2"
                fill="rgba(29,111,224,0.08)"
                strokeLinejoin="round"
              />

              <path d="M 20 330 Q 270 322 520 330" stroke="rgba(105,117,134,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="3 7" />
              <text x="40" y="346" fontSize="10" fill="rgba(105,117,134,0.7)" fontFamily="system-ui" letterSpacing="1">Lake Ontario</text>

              {[
                { d: "M50,220 L490,212", label: "401", lx: 486, ly: 207, anchor: "end" as const },
                { d: "M150,95 L150,305", label: "427", lx: 154, ly: 108, anchor: "start" as const },
                { d: "M330,85 L342,305", label: "DVP", lx: 346, ly: 98, anchor: "start" as const },
                { d: "M220,45 L214,210", label: "400", lx: 224, ly: 56, anchor: "start" as const },
              ].map((h) => (
                <g key={h.label}>
                  <path d={h.d} stroke="rgba(29,111,224,0.3)" strokeWidth="1.5" strokeDasharray="9 5" fill="none" />
                  <text x={h.lx} y={h.ly} fontSize="11" fontWeight="bold" fill="rgba(29,111,224,0.8)" fontFamily="system-ui" textAnchor={h.anchor}>
                    {h.label}
                  </text>
                </g>
              ))}

              {[
                { x: 118, y: 175, r: 4, name: "Brampton", strong: false },
                { x: 158, y: 248, r: 4, name: "Mississauga", strong: false },
                { x: 270, y: 250, r: 6, name: "Toronto", strong: true },
                { x: 392, y: 230, r: 4, name: "Scarborough", strong: false },
                { x: 277, y: 158, r: 4, name: "North York", strong: false },
                { x: 412, y: 138, r: 4, name: "Markham", strong: false },
                { x: 196, y: 103, r: 4, name: "Vaughan", strong: false },
              ].map((z) => (
                <g key={z.name}>
                  <circle cx={z.x} cy={z.y} r={z.r} fill="#1D6FE0" opacity={z.strong ? 1 : 0.7} />
                  {z.strong && <circle cx={z.x} cy={z.y} r={z.r + 5} fill="none" stroke="#1D6FE0" strokeWidth="1.5" opacity="0.5" />}
                  <text x={z.x + z.r + 5} y={z.y + 4} fontSize={z.strong ? 13 : 11} fontWeight={z.strong ? "bold" : "normal"} fill={z.strong ? "#16202E" : "rgba(22,32,46,0.75)"} fontFamily="system-ui">
                    {z.name}
                  </text>
                </g>
              ))}

              <text x="270" y="295" fontSize="11" fill="rgba(29,111,224,0.8)" fontFamily="system-ui" textAnchor="middle" letterSpacing="4" fontWeight="bold">FULL COVERAGE</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
