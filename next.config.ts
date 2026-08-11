import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Legacy service URLs — permanent so Ads/indexed links keep working.
    // Stage 2 retargets the two tire redirects to their sub-service pages.
    return [
      { source: "/services/tire-change", destination: "/services/mobile-tire-service/seasonal-tire-change", permanent: true },
      { source: "/services/tires", destination: "/services/mobile-tire-service/new-used-tires", permanent: true },
      { source: "/services/battery", destination: "/services/battery-jump-start", permanent: true },
      { source: "/services/roadside", destination: "/services/roadside-assistance", permanent: true },

      // Root-level Wix-era URLs. These were missed when the legacy /services/*
      // paths were mapped, so they 404'd while still ranking: GSC (90d) shows
      // /tire-changes at position 9.7 with 46 impressions, /contact-5 at 8.1
      // with 48, /sell-new-used-tires at 8.0 with 22. Every one of those was a
      // page-one result landing a real visitor on a dead page.
      { source: "/tire-changes", destination: "/services/mobile-tire-service/seasonal-tire-change", permanent: true },
      { source: "/sell-new-used-tires", destination: "/services/mobile-tire-service/new-used-tires", permanent: true },
      { source: "/roadside-assistance", destination: "/services/roadside-assistance", permanent: true },
      { source: "/contact-5", destination: "/contact", permanent: true },
      { source: "/general-8", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
