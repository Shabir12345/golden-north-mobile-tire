// ─── ReviewsWidget ────────────────────────────────────────────────────────────
// Featurable Google-reviews embed. Featured on the home and contact pages only.
// Featurable's bundle.js scans the DOM for `[data-featurable-async]` containers
// and renders the carousel into them. Because the App Router mounts/unmounts the
// container on client-side navigation, we (re)load the bundle on each mount so a
// freshly-rendered container always gets populated — and clean it up on unmount.
// If the embed fails or never populates, the whole section collapses rather than
// leaving an empty labelled band.

"use client";

import { useEffect, useRef, useState } from "react";
import { FEATURABLE_WIDGET_ID } from "@/lib/reviews";

const WIDGET_ID = `featurable-${FEATURABLE_WIDGET_ID}`;
const SCRIPT_SRC = "https://featurable.com/assets/bundle.js";

export function ReviewsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.defer = true;
    script.charset = "UTF-8";

    const onError = () => setFailed(true);
    script.addEventListener("error", onError);
    document.body.appendChild(script);

    // If nothing rendered into the container after a grace period, collapse the
    // section instead of showing an empty "Reviews from drivers…" band.
    const timer = setTimeout(() => {
      if (!containerRef.current || containerRef.current.childElementCount === 0) {
        setFailed(true);
      }
    }, 6000);

    return () => {
      script.removeEventListener("error", onError);
      script.remove();
      clearTimeout(timer);
    };
  }, []);

  if (failed) return null;

  return (
    <section
      className="bg-[var(--color-page)] border-y border-[var(--color-border)]"
      aria-label="Customer reviews"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-deep)]">
          Reviews from drivers across the GTA
        </p>
        <div id={WIDGET_ID} data-featurable-async ref={containerRef} />
      </div>
    </section>
  );
}
