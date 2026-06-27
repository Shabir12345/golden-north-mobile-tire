// ─── Photo catalog ──────────────────────────────────────────────────────────
// Real Golden North photos (in /public/photos). Alt text is written as voice,
// not filler — it describes the scene a stranded driver recognises. When the
// client delivers higher-res or additional shots, swap the files in
// /public/photos keeping these names, or edit the paths here. See
// /public/README-assets.md.

export interface CatalogPhoto {
  src: string;
  alt: string;
}

// Per-service signature image, keyed by service slug.
export const SERVICE_PHOTO: Record<string, CatalogPhoto> = {
  "tire-change": {
    src: "/photos/action-mercedes-street.webp",
    alt: "Golden North changing a wheel on a red Mercedes on a quiet GTA residential street, yellow service van parked behind",
  },
  tires: {
    src: "/photos/tires-warehouse.webp",
    alt: "Racks of new and used tires in sizes for common GTA vehicles, sourced and installed on-site",
  },
  battery: {
    src: "/photos/night-mini-station.webp",
    alt: "Night roadside battery and tire service for a MINI at a lit gas station, the open yellow van alongside",
  },
  roadside: {
    src: "/photos/night-sedan-roadside.webp",
    alt: "Late-night roadside rescue: a sedan up on the jack with the Golden North van's headlights lighting the work",
  },
};

// Hero / signature shots used around the site.
export const HERO_PHOTO: CatalogPhoto = {
  src: "/photos/hero-night-tech.webp",
  alt: "A Golden North technician in a hi-vis vest balancing a wheel inside the lit yellow service van at night",
};

// Gallery set — the full job log. Ratios hint the masonry layout.
export const GALLERY: (CatalogPhoto & { ratio: string })[] = [
  { src: "/photos/hero-night-tech.webp", alt: "Hi-vis technician balancing a wheel inside the lit van at night", ratio: "3 / 4" },
  { src: "/photos/action-mercedes-street.webp", alt: "Wheel-off tire change on a red Mercedes on a GTA residential street", ratio: "4 / 3" },
  { src: "/photos/action-mustang-jack.webp", alt: "Black Mustang on the jack for a tire change, yellow van behind on a sunny day", ratio: "3 / 4" },
  { src: "/photos/action-porsche-winter.webp", alt: "Red Porsche Taycan getting a winter wheel changed in a parking lot", ratio: "3 / 4" },
  { src: "/photos/van-mansion-driveway.webp", alt: "Yellow Golden North van parked in a large GTA home driveway for a mobile service call", ratio: "4 / 3" },
  { src: "/photos/night-sedan-roadside.webp", alt: "Night roadside tire change lit by the van's headlights", ratio: "4 / 3" },
  { src: "/photos/van-interior-balancer.webp", alt: "Inside the van: a tire on the balancing machine with hoses, tools and a fire extinguisher", ratio: "3 / 4" },
  { src: "/photos/tires-warehouse.webp", alt: "Warehouse racks of new and used tires", ratio: "3 / 4" },
  { src: "/photos/van-residential-driveway.webp", alt: "Van in a residential driveway, side door open, servicing a black SUV", ratio: "3 / 4" },
  { src: "/photos/tire-puncture.webp", alt: "Close-up of a punctured winter tire — the kind of flat Golden North fixes on the spot", ratio: "3 / 4" },
  { src: "/photos/night-mini-station.webp", alt: "Night service for a MINI at a lit gas station", ratio: "4 / 3" },
  { src: "/photos/van-loadingdock-bmw.webp", alt: "Servicing a gray BMW beside the van at a loading dock", ratio: "4 / 3" },
  { src: "/photos/rim-on-machine.jpg", alt: "An alloy wheel mounted on the van's tire machine for balancing", ratio: "3 / 4" },
  { src: "/photos/van-shop-winter.webp", alt: "The branded yellow Golden North van in winter", ratio: "16 / 9" },
];
