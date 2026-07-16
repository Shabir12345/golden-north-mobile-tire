"use client";

// MobileCallBar — fixed bottom strip, mobile only (<md). The call-first law made
// physical: wherever the page's own call CTA isn't on screen, this one is. Navy
// with a hairline top border + soft shadow so the gold call button pops;
// safe-area padding clears notched iPhones (see the `viewport` export in
// layout.tsx — without viewport-fit: cover the insets resolve to 0).
//
// A page marks its primary call CTA with `data-call-anchor` to avoid showing the
// same number twice at the fold: while that CTA is visible the bar stays down,
// and it slides up once the CTA scrolls away. Pages with no anchor (every inner
// route) raise the bar as soon as the observer's first callback lands. The
// <noscript> rule pins it visible when JS never runs — a missing call button is
// worse than a redundant one.

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CallButton } from "@/components/ui/Button";

export function MobileCallBar() {
  const [visible, setVisible] = useState(false);
  const fallbackRef = useRef<HTMLSpanElement>(null);
  // The bar lives in the root layout and never remounts across client
  // navigations, so the anchor has to be re-resolved whenever the route changes.
  const pathname = usePathname();

  useEffect(() => {
    // Routes with no anchor fall back to a hidden sentinel, which a
    // display:none target reports as never intersecting — the same signal as
    // "the page's own CTA is off screen", so the bar pins up. One observer, one
    // place that sets state, no branch.
    const target = document.querySelector("[data-call-anchor]") ?? fallbackRef.current;
    if (!target) return;
    // An anchor already off-screen at load (a 320px phone) leaves the bar up,
    // which is exactly right: !isIntersecting means the page's own call CTA is
    // not reachable, so this one has to be.
    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    io.observe(target);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <>
      <span ref={fallbackRef} hidden aria-hidden="true" />
      <div
        className={`mobile-call-bar md:hidden fixed bottom-0 inset-x-0 border-t border-white/10 bg-[var(--color-navy)] transition-[opacity,transform] duration-300 [transition-timing-function:var(--ease-out-quart)] ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
        style={{
          zIndex: "var(--z-mobilebar)",
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
          boxShadow: "0 -8px 24px -12px rgba(8,12,22,0.45)",
        }}
      >
        {/* py-3.5 matches the 14px pulse spread below, so the ring fades out
            exactly at the bar's edges instead of bleeding over the page. */}
        <div className="px-4 py-3.5">
          {/* The pulse animates box-shadow, so it goes on this wrapper — on the
              button itself it would outrank the focus ring. See globals.css. */}
          <span className="btn-pulse block rounded-lg">
            <CallButton size="lg" className="w-full" />
          </span>
        </div>
      </div>
      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html:
              ".mobile-call-bar{opacity:1!important;transform:none!important;pointer-events:auto!important}",
          }}
        />
      </noscript>
    </>
  );
}
