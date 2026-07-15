import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS.name,
    short_name: BUSINESS.shortName,
    description:
      "24/7 emergency roadside assistance — mobile tire service, battery jump starts, car lockouts, and mobile mechanic repairs — across the Greater Toronto Area.",
    start_url: "/",
    display: "standalone",
    background_color: "#151D2E",
    theme_color: "#151D2E",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
