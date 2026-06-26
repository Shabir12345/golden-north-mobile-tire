// ─── CoverageMap ──────────────────────────────────────────────────────────────
// Design intent: a schematic GTA coverage diagram — not a real map, not an
// embedded iframe, not a placeholder grey box. Looks like a service territory
// overlay you'd find in a contractor's technical brochure: angular, abstract,
// drawn with precision rather than rendered from satellite imagery.
//
// The SVG approximates the GTA's distinctive geography:
//   - Lake Ontario's north shore (flat bottom edge)
//   - The gentle curve of the Escarpment (upper boundary)
//   - Key highway corridors (401, 427, 400, DVP) as thin dashed routes
//   - Zone labels for major areas served
//
// The SVG is aria-hidden; the section has a text list of areas served for
// screen readers.

import { BUSINESS } from "@/lib/business";

export function CoverageMap() {
  return (
    <section
      className="bg-ink py-24 lg:py-32"
      aria-labelledby="coverage-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">

          {/* ── Text column ─────────────────────────────────────────────── */}
          <div>
            <p
              className="mb-3 font-display text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-gold)] opacity-70"
              aria-hidden="true"
            >
              Where we work
            </p>
            <h2
              id="coverage-heading"
              className="font-display font-bold text-4xl leading-tight text-[var(--color-frost)] lg:text-5xl mb-6"
            >
              The whole GTA, not just downtown.
            </h2>
            <p className="font-sans text-base leading-relaxed text-[var(--color-slate-muted)] mb-8">
              Golden North covers the full {BUSINESS.areaServed}. Whether you're in a Brampton
              driveway, a Markham condo garage, or on the shoulder of the 401 through
              Mississauga — one call reaches us.
            </p>

            {/* Area list — screen-reader accessible alternative to the SVG */}
            <ul
              className="grid grid-cols-2 gap-x-6 gap-y-2"
              aria-label="Areas served"
            >
              {[
                "Toronto",
                "Mississauga",
                "Brampton",
                "Vaughan",
                "Markham",
                "Scarborough",
                "Etobicoke",
                "North York",
                "Oakville",
                "Richmond Hill",
              ].map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 font-sans text-sm text-[var(--color-slate-muted)]"
                >
                  <span aria-hidden="true" className="text-[var(--color-gold)] opacity-60">
                    ◆
                  </span>
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Schematic map SVG ────────────────────────────────────────── */}
          {/* aria-hidden: the text list above covers the same information */}
          <div className="relative" aria-hidden="true">
            <svg
              viewBox="0 0 540 360"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{ filter: "drop-shadow(0 0 40px rgba(232,176,75,0.08))" }}
            >
              {/* Lake Ontario shoreline — the flat bottom edge of the GTA */}
              <path
                d="M 20 330 Q 270 320 520 330"
                stroke="rgba(232,176,75,0.20)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4 6"
              />
              <text x="200" y="349" fontSize="9" fill="rgba(232,176,75,0.35)" fontFamily="system-ui">
                Lake Ontario
              </text>

              {/* GTA territory boundary — schematic polygon */}
              <polygon
                points="40,270 70,120 140,60 280,40 400,55 490,110 510,230 480,300 40,305"
                stroke="rgba(232,176,75,0.25)"
                strokeWidth="1.5"
                fill="rgba(232,176,75,0.04)"
                strokeLinejoin="round"
              />

              {/* Highway 401 corridor — the primary east-west artery */}
              <line
                x1="50" y1="220"
                x2="490" y2="215"
                stroke="rgba(232,176,75,0.18)"
                strokeWidth="1"
                strokeDasharray="8 5"
              />
              <text x="480" y="212" fontSize="8" fill="rgba(232,176,75,0.30)" fontFamily="system-ui" textAnchor="end">
                401
              </text>

              {/* Highway 427 — north-south western corridor */}
              <line
                x1="150" y1="100"
                x2="150" y2="310"
                stroke="rgba(232,176,75,0.14)"
                strokeWidth="1"
                strokeDasharray="6 5"
              />
              <text x="153" y="108" fontSize="8" fill="rgba(232,176,75,0.25)" fontFamily="system-ui">
                427
              </text>

              {/* DVP — north-south eastern corridor */}
              <line
                x1="330" y1="90"
                x2="340" y2="310"
                stroke="rgba(232,176,75,0.14)"
                strokeWidth="1"
                strokeDasharray="6 5"
              />
              <text x="333" y="98" fontSize="8" fill="rgba(232,176,75,0.25)" fontFamily="system-ui">
                DVP
              </text>

              {/* Highway 400 — northern corridor */}
              <line
                x1="220" y1="45"
                x2="215" y2="210"
                stroke="rgba(232,176,75,0.14)"
                strokeWidth="1"
                strokeDasharray="6 5"
              />
              <text x="218" y="52" fontSize="8" fill="rgba(232,176,75,0.25)" fontFamily="system-ui">
                400
              </text>

              {/* Zone labels */}
              {/* Brampton */}
              <circle cx="118" cy="175" r="3" fill="var(--color-gold)" opacity="0.5" />
              <text x="125" y="179" fontSize="10" fill="rgba(233,238,245,0.65)" fontFamily="system-ui">
                Brampton
              </text>

              {/* Mississauga */}
              <circle cx="155" cy="245" r="3" fill="var(--color-gold)" opacity="0.5" />
              <text x="162" y="249" fontSize="10" fill="rgba(233,238,245,0.65)" fontFamily="system-ui">
                Mississauga
              </text>

              {/* Toronto core */}
              <circle cx="270" cy="250" r="4" fill="var(--color-gold)" opacity="0.7" />
              <text x="278" y="254" fontSize="10" fill="rgba(233,238,245,0.80)" fontFamily="system-ui" fontWeight="bold">
                Toronto
              </text>

              {/* Scarborough */}
              <circle cx="390" cy="230" r="3" fill="var(--color-gold)" opacity="0.5" />
              <text x="397" y="234" fontSize="10" fill="rgba(233,238,245,0.65)" fontFamily="system-ui">
                Scarborough
              </text>

              {/* North York */}
              <circle cx="275" cy="160" r="3" fill="var(--color-gold)" opacity="0.5" />
              <text x="282" y="164" fontSize="10" fill="rgba(233,238,245,0.65)" fontFamily="system-ui">
                North York
              </text>

              {/* Markham */}
              <circle cx="410" cy="140" r="3" fill="var(--color-gold)" opacity="0.5" />
              <text x="417" y="144" fontSize="10" fill="rgba(233,238,245,0.65)" fontFamily="system-ui">
                Markham
              </text>

              {/* Vaughan */}
              <circle cx="195" cy="105" r="3" fill="var(--color-gold)" opacity="0.5" />
              <text x="202" y="109" fontSize="10" fill="rgba(233,238,245,0.65)" fontFamily="system-ui">
                Vaughan
              </text>

              {/* Coverage badge — centred */}
              <text
                x="270" y="300"
                fontSize="9"
                fill="rgba(232,176,75,0.40)"
                fontFamily="system-ui"
                textAnchor="middle"
                letterSpacing="3"
              >
                FULL COVERAGE
              </text>
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
