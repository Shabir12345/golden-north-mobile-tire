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
    ];
  },
};

export default nextConfig;
