// MobileCallBar — fixed bottom strip, mobile only (<md).
//
// The call-first law made physical: the only chrome that overlaps content on
// mobile is the one element that drives the most value. A thin hazard hairline
// on top ties it to the van livery. Safe-area padding clears notched iPhones.

import { CallButton } from "@/components/ui/Button";
import { HazardStripe } from "@/components/ui/HazardStripe";

export function MobileCallBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 bg-[var(--color-ink)]"
      style={{
        zIndex: "var(--z-mobilebar)",
        paddingBottom: "env(safe-area-inset-bottom)",
        boxShadow: "0 -12px 30px -10px rgba(0,0,0,0.7)",
      }}
    >
      <HazardStripe height={6} />
      <div className="px-4 py-3">
        <CallButton className="w-full" />
      </div>
    </div>
  );
}
