// ─── Gallery (/gallery) ───────────────────────────────────────────────────────
// The real job log: a masonry of on-site photos with a lightbox. Header + grid
// + CTA band.

import { buildMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { GALLERY } from "@/lib/photos";
import { PageHeader } from "@/components/sections/PageHeader";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { CTABand } from "@/components/sections/CTABand";

export const metadata = buildMetadata({
  title: "Gallery — On the Job Across the GTA",
  description: `Real Golden North jobs across the ${BUSINESS.areaServed}: driveway tire changes, night roadside rescues, battery swaps, and the fully-equipped mobile van.`,
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            On the job,
            <br />
            <span className="text-[var(--color-gold)]">GTA-wide.</span>
          </>
        }
        intro="Driveways, parking lots, gas stations, highway shoulders — day and night. This is the real van and the real work, not stock photography."
      />

      <section className="bg-midnight py-16 lg:py-24" aria-label="Photo gallery">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <GalleryGrid items={GALLERY} />
        </div>
      </section>

      <CTABand />
    </>
  );
}
