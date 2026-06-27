import Image from "next/image";

// ─── Photo ────────────────────────────────────────────────────────────────────
// One cohesive treatment for the real (mixed-quality, mixed-lighting) brand
// photo set so the whole site reads as one brand: object-cover into a fixed
// aspect box, a thin amber hairline ring, an ink gradient at the base for text
// legibility, and a subtle desaturate→full-color + zoom on hover. next/image
// gives us responsive sizing + lazy loading for Core Web Vitals.

interface PhotoProps {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "4 / 3", "3 / 4", "16 / 9", "1 / 1". */
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Add a bottom ink gradient (for overlaid captions/text). */
  overlay?: boolean;
  /** Disable the hover zoom/saturate (e.g. inside a static row). */
  static?: boolean;
}

export function Photo({
  src,
  alt,
  ratio = "4 / 3",
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  overlay = false,
  static: isStatic = false,
}: PhotoProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[4px] bg-ink ring-1 ring-[rgba(245,168,28,0.18)] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={
          "object-cover transition-[transform,filter] duration-700 [transition-timing-function:var(--ease-out-expo)] " +
          (isStatic
            ? "saturate-[0.92]"
            : "saturate-[0.85] group-hover:saturate-100 group-hover:scale-[1.04]")
        }
      />
      {overlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[rgba(5,8,14,0.15)] to-transparent"
        />
      )}
    </div>
  );
}
