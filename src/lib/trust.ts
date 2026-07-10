// ─── Trust signals ────────────────────────────────────────────────────────────
// The single source of truth for the professional trust claims shown across the
// site. Every claim here has been confirmed true by the business. Do NOT add a
// satisfaction guarantee or any star-rating number.

export interface TrustSignal {
  /** Short badge label. */
  label: string;
  /** One-line supporting phrase (shown in the "row" variant). */
  sub: string;
  /** Which inline icon to render. */
  icon: "shield" | "tag" | "check" | "clock";
}

export const TRUST_SIGNALS: TrustSignal[] = [
  { label: "Licensed & insured", sub: "Professional, fully covered service", icon: "shield" },
  { label: "Upfront pricing", sub: "No membership, no hidden fees", icon: "tag" },
  { label: "Warranty-backed parts", sub: "Quality parts we stand behind", icon: "check" },
  { label: "24/7 · GTA-wide", sub: "We come to you, day or night", icon: "clock" },
];
