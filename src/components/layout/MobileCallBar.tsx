// MobileCallBar — fixed bottom strip, mobile only (<md). The call-first law made
// physical. White with a hairline top border + soft shadow; safe-area padding
// clears notched iPhones.

import { CallButton } from "@/components/ui/Button";

export function MobileCallBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 border-t border-[var(--color-border)] bg-white"
      style={{
        zIndex: "var(--z-mobilebar)",
        paddingBottom: "env(safe-area-inset-bottom)",
        boxShadow: "0 -8px 24px -12px rgba(16,32,63,0.25)",
      }}
    >
      <div className="px-4 py-3">
        <CallButton className="w-full" />
      </div>
    </div>
  );
}
