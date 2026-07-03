// MobileCallBar — fixed bottom strip, mobile only (<md). The call-first law made
// physical. Navy with a hairline top border + soft shadow so the gold call
// button pops; safe-area padding clears notched iPhones.

import { CallButton } from "@/components/ui/Button";

export function MobileCallBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 border-t border-white/10 bg-[var(--color-navy)]"
      style={{
        zIndex: "var(--z-mobilebar)",
        paddingBottom: "env(safe-area-inset-bottom)",
        boxShadow: "0 -8px 24px -12px rgba(8,12,22,0.45)",
      }}
    >
      <div className="px-4 py-3">
        <CallButton className="w-full" />
      </div>
    </div>
  );
}
