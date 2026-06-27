import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/business";

// Branded social-share card (Midnight & High-Vis Amber). next/og renders this
// at build time; system fonts are used (no custom font needed for OG).
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
          backgroundColor: "#0B1220",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top hazard edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 14,
            backgroundImage:
              "repeating-linear-gradient(-45deg, #F5A81C 0 28px, #0B1220 28px 56px)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="40" height="40" viewBox="0 0 64 64">
            <path d="M32 6 L38 26 L58 32 L38 38 L32 58 L26 38 L6 32 L26 26 Z" fill="#F5A81C" />
          </svg>
          <div style={{ color: "#EEF2F8", fontSize: 28, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>
            {BUSINESS.shortName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#F5A81C", fontSize: 26, fontWeight: 700, letterSpacing: 6, textTransform: "uppercase", marginBottom: 16 }}>
            Open 24/7 · We come to you
          </div>
          <div style={{ display: "flex", color: "#EEF2F8", fontSize: 104, fontWeight: 800, lineHeight: 1 }}>
            We come to you.
          </div>
          <div style={{ display: "flex", color: "#C3CDDB", fontSize: 32, marginTop: 24 }}>
            Mobile tire change · tires · battery · roadside — across the GTA
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", color: "#F5A81C", fontSize: 44, fontWeight: 800 }}>
            {BUSINESS.phoneDisplay}
          </div>
          <div style={{ display: "flex", color: "#93A1B4", fontSize: 24 }}>
            goldennorthmobiletires.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
