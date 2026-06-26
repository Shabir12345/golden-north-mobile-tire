// MobileCallBar — fixed bottom strip, mobile only (<md).
//
// This is the call-first law made physical: the only chrome element on mobile
// that overlaps page content is the one element that generates the most value
// for the business. It never competes with anything because it's the only
// element in the bar.
//
// Safe-area padding (env(safe-area-inset-bottom)) handles notched iPhones so
// the button doesn't clip behind the home-indicator bar.
//
// No "use client" needed — this component has no interactive state.

import { CallButton } from "@/components/ui/Button";

export function MobileCallBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[rgba(232,176,75,0.15)] bg-[var(--color-ink)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="px-4 py-3">
        <CallButton className="w-full justify-center" />
      </div>
    </div>
  );
}
