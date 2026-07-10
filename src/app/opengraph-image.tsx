import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/business";

// Branded social-share card — GoldenNorth Premium (navy #151D2E + gold #F0A500).
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
          backgroundColor: "#151D2E",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top gold edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            backgroundColor: "#F0A500",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="44" height="44" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#F0A500" />
            <path d="M32 8 L36 28 L56 32 L36 36 L32 56 L28 36 L8 32 L28 28 Z" fill="#151D2E" />
          </svg>
          <div style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
            {BUSINESS.shortName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#F0A500", fontSize: 26, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", marginBottom: 16 }}>
            Open 24/7 · We come to you
          </div>
          <div style={{ display: "flex", color: "#FFFFFF", fontSize: 104, fontWeight: 800, lineHeight: 1 }}>
            We come to you.
          </div>
          <div style={{ display: "flex", color: "#C7CEDC", fontSize: 32, marginTop: 24 }}>
            Mobile tire change · tires · battery · roadside — across the GTA
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", color: "#F0A500", fontSize: 44, fontWeight: 800 }}>
            {BUSINESS.phoneDisplay}
          </div>
          <div style={{ display: "flex", color: "#C7CEDC", fontSize: 24 }}>
            goldennorthmobiletires.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
