export const BUSINESS = {
  name: "Golden North Mobile Tire Services",
  shortName: "Golden North",
  phoneDisplay: "(416) 558-5915",
  phoneRaw: "+14165585915",
  email: "info.goldennorth@gmail.com",
  areaServed: "Greater Toronto Area, Ontario, Canada",
  hours: "Open 24/7",
  tagline: "The best waiting room is the living room.",
  url: "https://www.goldennorthmobiletires.com",
  // Mobile service — we come to the customer — but a registered base address
  // helps local SEO and gives people a real place on the map.
  address: {
    street: "2775 Don Mills Rd.",
    locality: "North York",
    region: "ON",
    postalCode: "M2J 3B5",
    country: "Canada",
  },
  socials: {
    tiktok: "https://www.tiktok.com/@goldennorthmobiletires",
    instagram: "https://www.instagram.com/goldennorthmobiletires",
  },
} as const;

export const telHref = `tel:${BUSINESS.phoneRaw}`;
export const mailHref = `mailto:${BUSINESS.email}`;

// "2775 Don Mills Rd., North York, ON M2J 3B5"
export const addressDisplay = `${BUSINESS.address.street}, ${BUSINESS.address.locality}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}`;

// Interactive Google Map embed — the classic `output=embed` form needs no API
// key or billing setup. Opens the same location in Google Maps for directions.
export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(addressDisplay)}&output=embed`;
export const mapsLinkHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressDisplay)}`;
