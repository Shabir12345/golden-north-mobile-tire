"use client";

// ─── GalleryGrid ──────────────────────────────────────────────────────────────
// Masonry of real job photos (CSS columns → varied heights from each photo's
// ratio) with a keyboard-accessible lightbox. Tiles are <button>s; the lightbox
// is a role="dialog" with Escape + arrow-key nav, backdrop-to-close, and focus
// moved to the close control on open. Reduced-motion is handled globally.

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Photo } from "@/components/ui/Photo";
import type { CatalogPhoto } from "@/lib/photos";

type Item = CatalogPhoto & { ratio: string };

export function GalleryGrid({ items }: { items: Item[] }) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = (i: number) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setActive(i);
  };
  const close = useCallback(() => {
    setActive(null);
    lastFocused.current?.focus?.();
  }, []);
  const step = useCallback(
    (dir: number) => setActive((cur) => (cur === null ? cur : (cur + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  const current = active === null ? null : items[active];

  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 [&>*]:mb-3">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => open(i)}
            className="block w-full break-inside-avoid rounded-[4px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-midnight)]"
            aria-label={`View larger: ${item.alt}`}
          >
            <Photo src={item.src} alt={item.alt} ratio={item.ratio} sizes="(max-width: 768px) 50vw, 33vw" />
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-8"
          style={{ zIndex: "var(--z-overlay)", backgroundColor: "rgba(5,8,14,0.95)", backdropFilter: "blur(6px)" }}
          onClick={close}
        >
          {/* Close */}
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-[4px] border border-[rgba(245,168,28,0.3)] text-[var(--color-frost)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            <svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
          </button>

          {/* Prev / Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-[4px] text-[var(--color-frost)] hover:text-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] text-2xl"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-[4px] text-[var(--color-frost)] hover:text-[var(--color-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] text-2xl"
          >
            ›
          </button>

          {/* Image */}
          <figure
            className="relative max-h-[85vh] w-auto"
            style={{ aspectRatio: current.ratio }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full max-h-[85vh]" style={{ aspectRatio: current.ratio }}>
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="90vw"
                className="rounded-[4px] object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center font-sans text-sm text-[var(--color-frost-dim)]">
              {current.alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
