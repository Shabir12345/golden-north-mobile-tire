import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/business";

// Branded social-share card — Clean & Trustworthy (white + trust-blue #1D6FE0).
// next/og renders this at build time; system fonts are used (no custom font).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${BUSINESS.name} — 24/7 mobile tire & roadside service in the GTA`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top trust-blue edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            backgroundColor: "#1D6FE0",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="44" height="44" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#1D6FE0" />
            <path d="M32 11 L36.5 27.5 L53 32 L36.5 36.5 L32 53 L27.5 36.5 L11 32 L27.5 27.5 Z" fill="#FFFFFF" />
          </svg>
          <div style={{ color: "#16202E", fontSize: 28, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
            {BUSINESS.shortName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#1657B0", fontSize: 26, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", marginBottom: 16 }}>
            Open 24/7 · We come to you
          </div>
          <div style={{ display: "flex", color: "#16202E", fontSize: 104, fontWeight: 800, lineHeight: 1 }}>
            We come to you.
          </div>
          <div style={{ display: "flex", color: "#4A5564", fontSize: 32, marginTop: 24 }}>
            Mobile tire change · tires · battery · roadside — across the GTA
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", color: "#1D6FE0", fontSize: 44, fontWeight: 800 }}>
            {BUSINESS.phoneDisplay}
          </div>
          <div style={{ display: "flex", color: "#6B7685", fontSize: 24 }}>
            goldennorthmobiletires.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
