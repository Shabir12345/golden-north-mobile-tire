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
  socials: {
    tiktok: "https://www.tiktok.com/@goldennorthmobiletires",
    instagram: "https://www.instagram.com/goldennorthmobiletires",
  },
} as const;

export const telHref = `tel:${BUSINESS.phoneRaw}`;
export const mailHref = `mailto:${BUSINESS.email}`;
