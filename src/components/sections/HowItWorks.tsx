// ─── HowItWorks ───────────────────────────────────────────────────────────────
// Three steps that ARE a real sequence (call → we head out → done). Big gold
// numerals on translucent cards over the navy brand band. Copy is plain and
// friendly.

import { Reveal } from "@/components/ui/Reveal";
import { BUSINESS } from "@/lib/business";

export function HowItWorks() {
  const steps = [
    { n: "01", heading: "Call.", body: `One number — ${BUSINESS.phoneDisplay} — connects you straight to us. No app, no queue, no chatbot. We answer.` },
    { n: "02", heading: "We head out.", body: "Tell us where you are — a Vaughan driveway, a Mississauga office lot, a shoulder on the 401. We come to you, anywhere in the GTA, day or night." },
    { n: "03", heading: "Back on the road.", body: "We handle it on the spot — tire changed, battery swapped, car assessed — and you carry on with your day." },
  ] as const;

  return (
    <section className="bg-[var(--color-navy)] py-24 lg:py-32" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 max-w-xl">
          <h2 id="how-it-works-heading" className="font-bold text-4xl leading-[1.05] text-white lg:text-5xl">
            Three steps to <span className="text-[var(--color-accent)]">moving again.</span>
          </h2>
        </div>

        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 90} className="rounded-xl border border-white/10 bg-white/[0.04] p-7 lg:p-9">
              <span
                aria-hidden="true"
                className="block font-bold leading-none text-[var(--color-accent)] tabular-nums"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
              >
                {step.n}
              </span>
              <h3 className="mt-4 font-bold text-2xl text-white">{step.heading}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-footer-fg)]">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
