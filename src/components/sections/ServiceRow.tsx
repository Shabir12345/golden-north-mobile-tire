// ─── ServiceRow ───────────────────────────────────────────────────────────────
// Each service is a full editorial row: a sequence numeral (01–04), a real photo,
// the name, what it is, a few inclusions, and the call-first CTA. Rows alternate
// the photo side so the page reads as a varied list, not a repeating template.

import { CallButton, Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICE_PHOTO } from "@/lib/photos";
import type { Service } from "@/lib/services";

interface ServiceRowProps {
  service: Service;
  index: number;
}

export function ServiceRow({ service, index }: ServiceRowProps) {
  const photo = SERVICE_PHOTO[service.slug];
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  return (
    <Reveal as="article" className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14" aria-label={service.name}>
      <div className={flip ? "lg:order-1" : "lg:order-2"}>
        <Photo src={photo.src} alt={photo.alt} ratio="4 / 3" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>

      <div className={flip ? "lg:order-2" : "lg:order-1"}>
        <div className="flex items-baseline gap-4">
          <span
            aria-hidden="true"
            className="font-bold leading-none text-[var(--color-accent)]/45 tabular-nums"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
          >
            {num}
          </span>
          <h3 className="font-bold leading-tight text-[var(--color-heading)] text-3xl lg:text-4xl">
            {service.name}
          </h3>
        </div>

        <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--color-body)]">
          {service.tagline}
        </p>

        <ul className="mt-5 space-y-2" aria-label={`What's included in ${service.name}`}>
          {service.included.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--color-muted)]">
              <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <CallButton />
          <Button variant="ghost" href={`/services/${service.slug}`} aria-label={`See what's included in ${service.name}`}>
            What&rsquo;s included
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
