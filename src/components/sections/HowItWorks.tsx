// ─── HowItWorks ───────────────────────────────────────────────────────────────
// Design intent: the three steps ARE a real sequence (call → arrive → done),
// so numbering is justified — but these aren't floating decorative circles.
// They read as route waypoints on a schematic map: compact numbered markers
// connected by a dashed amber line (like a GPS route displayed on a dark screen).
//
// Copy is direct: imperative verb + one sentence. No "our expert technicians
// will leverage their skills to" filler. The brand promise is efficiency.

export function HowItWorks() {
  const steps = [
    {
      n: "1",
      heading: "Call.",
      body: "One number — (416) 558-5915 — connects you directly. No app, no queue, no chatbot. We answer.",
    },
    {
      n: "2",
      heading: "We drive to you.",
      body: "Give us your location. We dispatch immediately and come to your driveway, lot, or roadside — anywhere in the GTA.",
    },
    {
      n: "3",
      heading: "Back on the road.",
      body: "We fix it on the spot. Tires changed, battery swapped, or car assessed — then you carry on with your day.",
    },
  ] as const;

  return (
    <section
      className="bg-midnight py-24 lg:py-32"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-16 max-w-lg">
          <p
            className="mb-3 font-display text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-gold)] opacity-70"
            aria-hidden="true"
          >
            The process
          </p>
          <h2
            id="how-it-works-heading"
            className="font-display font-bold text-4xl leading-tight text-[var(--color-frost)] lg:text-5xl"
          >
            Three steps to moving again.
          </h2>
        </div>

        {/* Steps: horizontal on desktop, stacked on mobile */}
        <ol className="relative grid gap-10 lg:grid-cols-3 lg:gap-0">
          {steps.map((step, idx) => (
            <li key={step.n} className="relative flex flex-col lg:pr-12">
              {/* Route connector: dashed amber line between steps, desktop only */}
              {idx < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute right-0 top-5 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-[var(--color-gold-deep)] to-transparent opacity-30 lg:block"
                  style={{
                    left: "calc(2.75rem + 1rem)",
                    backgroundImage:
                      "repeating-linear-gradient(90deg, var(--color-gold-deep) 0, var(--color-gold-deep) 6px, transparent 6px, transparent 14px)",
                    height: "1px",
                    background: "none",
                  }}
                />
              )}

              {/* Step marker — waypoint dot, not a generic numbered circle */}
              <div className="mb-5 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[var(--color-gold)] bg-ink font-display text-sm font-bold text-[var(--color-gold)]"
                >
                  {step.n}
                </span>
                {/* Mobile connector line */}
                {idx < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="h-px flex-1 bg-[var(--color-gold)] opacity-20 lg:hidden"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, var(--color-gold-deep) 0, var(--color-gold-deep) 6px, transparent 6px, transparent 14px)",
                      background: "none",
                      borderTop: "1px dashed rgba(232,176,75,0.25)",
                    }}
                  />
                )}
              </div>

              {/* Step content */}
              <h3 className="font-display font-bold text-2xl text-[var(--color-frost)] mb-2">
                {step.heading}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[var(--color-slate-muted)]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
