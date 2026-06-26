// ─── ServiceCard ──────────────────────────────────────────────────────────────
// Design intent: reads like a service order form — structured and businesslike,
// not a consumer-app "feature tile." The left gold border is a measurement
// gauge accent that grounds each card in the automotive world.
//
// Heading hierarchy: the home page uses h2 for section titles and h3 for
// individual service cards so screen readers get a coherent outline.
// The home test asserts getByRole("heading", { name: /tire change/i }) etc.,
// so the `name` prop (full name, not shortName) is rendered as the h3.

import { Button, CallButton } from "@/components/ui/Button";
import type { Service } from "@/lib/services";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      className="relative flex flex-col overflow-hidden rounded-sm border border-[rgba(232,176,75,0.12)] bg-ink"
      aria-label={service.name}
    >
      {/* Left accent stripe — like a gauge strip on an instrument panel */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px] bg-[var(--color-gold)] opacity-60"
      />

      <div className="flex flex-1 flex-col gap-4 p-6 pl-8">
        {/* Service name — the heading the test asserts */}
        <h3 className="font-display font-bold leading-tight text-[var(--color-frost)] text-2xl">
          {service.name}
        </h3>

        {/* Tagline — one punchy line, Inter, subordinate */}
        <p className="font-sans text-sm leading-relaxed text-[var(--color-slate-muted)]">
          {service.tagline}
        </p>

        {/* Included items: up to 3 bullets, compact */}
        <ul className="space-y-1.5" aria-label={`What's included in ${service.name}`}>
          {service.included.slice(0, 3).map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 font-sans text-xs text-[var(--color-slate-muted)]"
            >
              {/* Gold tick — reads as a checklist, not a bullet */}
              <span
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[var(--color-gold)]"
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        {/* Spacer pushes CTAs to the bottom regardless of content height */}
        <div className="flex-1" />

        {/* CTAs: CallButton is dominant, Learn more is subordinate ghost.
            Call-first law: gold CallButton always before/above ghost links. */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap">
          <CallButton />
          <Button
            variant="ghost"
            href={`/services/${service.slug}`}
            aria-label={`Learn more about ${service.name}`}
          >
            Learn more
          </Button>
        </div>
      </div>
    </article>
  );
}
