// ─── TreadDivider ─────────────────────────────────────────────────────────────
// A full-width SVG divider that reads unmistakably as tire tread.
//
// Design rationale: a generic horizontal rule would be invisible noise. The
// tread pattern encodes the brand in the divider itself — every section break
// is a reminder of what Golden North does. The blocks are rectangular (not
// diamonds, not chevrons) with a diagonal sipe through each — modeled on
// actual all-season tire tread: main block + drainage channel (sipe) + groove.
//
// The pattern repeats every 24px. Each unit:
//   - rect x=0…19, y=1…9  → the tread block (gold-deep, low opacity)
//   - line from (8,1)→(10.5,9) → the sipe (drainage channel, ink)
//   - gap x=19…24          → the groove between blocks (transparent)
//
// The entire SVG is aria-hidden: it is purely decorative.
//
// useId() generates a stable unique id per instance so that multiple
// TreadDividers on the same page don't share an SVG <pattern> id and
// clobber each other (SVG pattern ids are document-scoped).

import { useId } from "react";

interface TreadDividerProps {
  className?: string;
}

export function TreadDivider({ className = "" }: TreadDividerProps) {
  const uid = useId();
  const patternId = `tread-${uid}`;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="100%"
      height="10"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={`block w-full overflow-visible ${className}`}
    >
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          width="24"
          height="10"
        >
          {/* Tread block — the main rubber land */}
          <rect
            x="0"
            y="1"
            width="19"
            height="8"
            fill="var(--color-gold-deep)"
            fillOpacity="0.22"
          />
          {/* Sipe — the diagonal drainage channel cut through the block.
              Angled slightly (8→10.5 x over full 8px height) mirrors the
              pitch of performance tire sipes. */}
          <line
            x1="8"
            y1="1"
            x2="10.5"
            y2="9"
            stroke="var(--color-ink)"
            strokeWidth="1.5"
          />
          {/* Groove — the gap between blocks; left transparent (no rect needed) */}
        </pattern>
      </defs>

      {/* Full-width fill using the repeating tread pattern */}
      <rect width="100%" height="10" fill={`url(#${patternId})`} />
    </svg>
  );
}
