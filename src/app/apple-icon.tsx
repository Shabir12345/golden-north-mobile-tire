import { ImageResponse } from "next/og";

// iOS home-screen / Apple touch icon. Generated at build time so it always
// tracks the brand (trust-blue field, white north star).
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
          backgroundColor: "#1D6FE0",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 64 64">
          <path d="M32 11 L36.5 27.5 L53 32 L36.5 36.5 L32 53 L27.5 36.5 L11 32 L27.5 27.5 Z" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
