// ─── HowItWorks ───────────────────────────────────────────────────────────────
// Three steps that ARE a real sequence (call → arrive → done), so numbering
// carries information. Big amber numerals on a darker (ink) band for sectional
// rhythm, connected left-to-right like waypoints on a dispatch route. Copy is
// imperative and filler-free.

import { Reveal } from "@/components/ui/Reveal";
import { BUSINESS } from "@/lib/business";

export function HowItWorks() {
  const steps = [
    { n: "01", heading: "Call.", body: `One number — ${BUSINESS.phoneDisplay} — connects you straight to us. No app, no queue, no chatbot. We answer.` },
    { n: "02", heading: "We roll out.", body: "Tell us where you are. We dispatch immediately to your driveway, lot, or roadside — anywhere in the GTA, day or night." },
    { n: "03", heading: "Back on the road.", body: "We fix it on the spot — tire changed, battery swapped, car assessed — and you carry on with your day." },
  ] as const;

  return (
    <section className="bg-[var(--color-ink)] py-24 lg:py-32" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 max-w-xl">
          <h2 id="how-it-works-heading" className="font-display font-bold text-4xl leading-[1.02] text-[var(--color-frost)] lg:text-5xl">
            Three steps to <span className="text-[var(--color-gold)]">moving again.</span>
          </h2>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-[6px] bg-[rgba(245,168,28,0.14)] md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 90} className="relative bg-[var(--color-midnight)] p-7 lg:p-9">
              <span
                aria-hidden="true"
                className="block font-display font-bold leading-none text-[var(--color-gold)] tabular-nums"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
              >
                {step.n}
              </span>
              <h3 className="mt-4 font-display font-bold text-2xl text-[var(--color-frost)]">{step.heading}</h3>
              <p className="mt-2.5 font-sans text-sm leading-relaxed text-[var(--color-frost-dim)]">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
