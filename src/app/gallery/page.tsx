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
  title: "Mobile Tire Service Photos: On the Job Across the GTA",
  description: `See real ${BUSINESS.shortName} jobs across the GTA: driveway tire changes, night roadside rescues, and battery swaps. Call ${BUSINESS.phoneDisplay} for service.`,
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
            <span className="text-[var(--color-accent)]">GTA-wide.</span>
          </>
        }
        intro="Driveways, parking lots, gas stations, highway shoulders, day and night. This is the real van and the real work, not stock photography."
      />

      <section className="bg-[var(--color-page)] py-16 lg:py-24" aria-label="Photo gallery">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <GalleryGrid items={GALLERY} />
        </div>
      </section>

      <CTABand />
    </>
  );
}
