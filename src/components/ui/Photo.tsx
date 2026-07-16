import Image from "next/image";

// ─── Photo ────────────────────────────────────────────────────────────────────
// One cohesive treatment for the real brand photo set: object-cover into a fixed
// aspect box, a thin neutral ring, an optional navy gradient at the base for
// overlaid text, and a gentle zoom on hover. Full color (light theme).

interface PhotoProps {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  overlay?: boolean;
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
      className={`group relative overflow-hidden rounded-xl bg-[var(--color-surface)] ring-1 ring-[var(--color-border)] ${className}`}
      // Read through a custom property so callers can vary the crop per
      // breakpoint (`[--photo-ratio:4/3] lg:[--photo-ratio:3/4]`); `ratio` stays
      // the default for the callers that don't. An inline aspectRatio would
      // otherwise beat any utility class trying to override it.
      style={{ aspectRatio: `var(--photo-ratio, ${ratio})` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={
          "object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] " +
          (isStatic ? "" : "group-hover:scale-[1.04]")
        }
      />
      {overlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[rgba(16,32,63,0.75)] via-[rgba(16,32,63,0.1)] to-transparent"
        />
      )}
    </div>
  );
}
