import { ImageResponse } from "next/og";

// iOS home-screen / Apple touch icon. Generated at build time so it always
// tracks the brand (navy field, gold compass star).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#151D2E",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 64 64">
          <path d="M32 8 L36 28 L56 32 L36 36 L32 56 L28 36 L8 32 L28 28 Z" fill="#F0A500" />
          <path
            d="M32 18 L34.5 29.5 L46 32 L34.5 34.5 L32 46 L29.5 34.5 L18 32 L29.5 29.5 Z"
            fill="#FFFFFF"
            opacity="0.85"
            transform="rotate(45 32 32)"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
