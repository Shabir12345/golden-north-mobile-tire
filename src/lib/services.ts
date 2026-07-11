export interface Service {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  /** <title> for the detail page — primary keyword first, ≤60 chars. */
  seoTitle: string;
  /** Meta description — 120–165 chars, answer + call-to-action. */
  seoDescription: string;
  summary: string;
  included: string[];
  whenYouNeed: string[];
  keywords: string[];
  faqs: { q: string; a: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: "tire-change",
    name: "Mobile Tire Change",
    shortName: "Tire Change",
    tagline: "Winter or summer, we swap at your door — no shop, no wait.",
    seoTitle: "Mobile Tire Change Toronto — Seasonal Swaps at Your Door",
    seoDescription:
      "24/7 mobile tire change across Toronto & the GTA. We come to your driveway, condo garage, or roadside for seasonal swaps and flats. Call (416) 558-5915.",
    summary:
      "GoldenNorth provides 24/7 mobile tire change service across Toronto and the GTA — we come to your driveway, office parking lot, or condo garage to mount, balance, and swap your seasonal tires on-site. Whether you're switching to dedicated winters before the first GTA snowfall or doing a spring changeover in Scarborough, the shop comes to you.",
    included: [
      "On-rim seasonal changeover (winter ↔ summer / all-season)",
      "Flat tire replacement with your spare",
      "Torque-wrench tightened to OEM spec",
      "Valve stem inspection and replacement if needed",
      "Post-swap tire pressure set to door-jamb spec",
    ],
    whenYouNeed: [
      "The first frost advisory hits and your winters are still in the garage",
      "You pick up a nail and your flat spare is riding in the trunk",
      "You want the seasonal swap done without burning a Saturday at a tire shop",
    ],
    keywords: [
      "mobile tire change Toronto",
      "seasonal tire swap at home GTA",
      "winter tire changeover Toronto",
      "on-rim tire change North York",
      "tire change at home Vaughan",
    ],
    faqs: [
      {
        q: "How much does a mobile tire change cost in Toronto?",
        a: "It depends on whether your tires are on rims (a straight swap) or need mounting and balancing, your vehicle type, and where you are in the GTA. On-rim seasonal swaps are the most affordable option. Call (416) 558-5915 with your vehicle and location and we'll give you a straight quote in under a minute — no hidden fees, no upsell.",
      },
      {
        q: "When should I put on winter tires in Ontario?",
        a: "The rule of thumb is the 7°C rule: once daytime temperatures stay consistently below 7°C — usually late October to mid-November in the GTA — all-season rubber hardens and loses grip, and it's time for winters. Keep them on until temperatures stay above 7°C in spring, typically mid-April. Booking your swap before the first snowfall rush means faster scheduling.",
      },
      {
        q: "How long does a mobile tire change take?",
        a: "A typical on-rim seasonal swap takes 30–45 minutes for a passenger car, SUV, or light truck — including torque to spec and setting pressures. Tires that need mounting and balancing on rims take longer; we'll give you a realistic time when you book.",
      },
      {
        q: "Do you need a lift or special equipment to change tires at my home?",
        a: "No lift required for on-rim swaps. We work at ground level — your car stays on a level surface and we use a floor jack and stands. For most passenger cars, SUVs, and light trucks this is completely safe and takes about 30–45 minutes.",
      },
      {
        q: "Can you do a seasonal changeover in a condo underground parking garage?",
        a: "Yes. As long as the ceiling clearance is sufficient (most underground garages are fine) and you have a reserved or visitor spot for the duration, we can work there. We use a portable compressor and cordless tools — no shore power needed.",
      },
      {
        q: "What areas of the GTA do you serve for tire changes?",
        a: "We cover Toronto, Vaughan, Markham, Scarborough, Etobicoke, North York, Oakville, Richmond Hill, and surrounding areas across the GTA. Call us to confirm availability at your address.",
      },
    ],
  },
  {
    slug: "tires",
    name: "New & Used Tires",
    shortName: "Tires",
    tagline: "New or quality used, sourced in your size — most within 24 hours, installed wherever you're parked.",
    seoTitle: "New & Used Tires Delivered & Installed — Toronto & GTA",
    seoDescription:
      "New and quality used tires sourced in your size and installed at your home, office, or roadside anywhere in the GTA. Most sizes within 24 hours. Call 24/7.",
    summary:
      "GoldenNorth sources new and quality used tires and installs them at your location anywhere in Toronto and the GTA — no hauling rims to a shop, no waiting room. We carry touring, all-season, winter, and all-terrain options in the sizes most common on GTA roads, from compact sedans to full-size pickups, at honest prices without chain-store upsell pressure.",
    included: [
      "Tire sourcing in your vehicle's exact size (new or quality used)",
      "On-site mounting and inflation to spec",
      "Visual inspection of existing hardware (hub, lug nuts, valve stems)",
      "Torque check after installation",
      "Old tire disposal on request",
    ],
    whenYouNeed: [
      "A tire is beyond repair and you need a replacement — today, not next week",
      "You want a matching used tire to replace a single damaged one without buying a full set",
      "You're setting up a second set of rims and need tires mounted before the season changes",
    ],
    keywords: [
      "used tires Toronto",
      "new tires installed at home GTA",
      "same-day tire replacement Toronto",
      "buy one used tire GTA",
      "mobile tire installation Vaughan",
    ],
    faqs: [
      {
        q: "Do you carry tires in stock or do I have to wait for an order?",
        a: "We stock the most common passenger and light-truck sizes. If your size isn't on the van, we can typically source it within 24 hours. Call ahead with your tire size (e.g. 225/65R17) and we'll confirm availability.",
      },
      {
        q: "Are used tires safe? How do you inspect them?",
        a: "We only sell used tires with at least 4/32\" of tread remaining, no sidewall bubbles, no visible cord damage, and no plugged punctures in the shoulder zone. Each tire is inspected before it leaves with us.",
      },
      {
        q: "Can I buy just one tire instead of a full set?",
        a: "Yes. If one tire is damaged beyond repair, we can source a matching used tire close in tread depth to your remaining three — the safe way to replace a single tire without the expense of a full set. For all-wheel-drive vehicles we'll measure your existing tread first, since large differences can strain the drivetrain.",
      },
      {
        q: "How do I find my tire size?",
        a: "It's printed on the sidewall of your current tire and on the sticker inside the driver's door jamb — a code like 225/65R17. Text or tell us that code when you call and we'll confirm availability, usually within 24 hours for less common sizes.",
      },
      {
        q: "Should I buy new or used tires?",
        a: "Used makes sense when you're matching a single damaged tire, the vehicle is near the end of its life, or the budget is tight — every used tire we sell passes our tread and casing inspection. New is the better buy for a full winter set you'll run for years. We'll give you an honest recommendation either way; we sell both, so we have no reason to push one.",
      },
    ],
  },
  {
    slug: "battery",
    name: "Mobile Battery Replacement",
    shortName: "Battery",
    tagline: "Dead battery? We diagnose, boost, or replace — right where you're parked.",
    seoTitle: "Mobile Car Battery Replacement Toronto — 24/7 Service",
    seoDescription:
      "Dead battery? GoldenNorth tests, boosts, or replaces car batteries on the spot — home, work, or roadside across the GTA, 24/7. Call (416) 558-5915.",
    summary:
      "GoldenNorth replaces car batteries on the spot anywhere in Toronto and the GTA, 24/7 — at your home, workplace, parking garage, or roadside. We test the battery and charging system first, boost it if that's all it needs, or install a fresh warranted unit from the van. A dead battery in a Toronto winter shouldn't mean waiting hours for a tow.",
    included: [
      "Battery load test and charging system check",
      "Boost start if the battery can hold a charge",
      "On-site battery replacement with a fresh, warranted unit",
      "Terminal cleaning and corrosion treatment",
      "Alternator output check to confirm the new battery will stay charged",
    ],
    whenYouNeed: [
      "Your car won't start on a cold morning and you can't get a boost from a neighbour",
      "Your battery keeps dying and you suspect the charging system has a problem",
      "You want a battery replaced without waiting hours for a tow to a shop",
    ],
    keywords: [
      "mobile battery replacement Toronto",
      "car battery boost GTA",
      "24/7 battery service Toronto",
      "car battery installation at home GTA",
      "dead battery help Scarborough",
    ],
    faqs: [
      {
        q: "How do you know if I need a new battery or just a boost?",
        a: "We run a load test on arrival. If the battery is holding charge but was simply drained (lights left on, long period of non-use), a boost and a short drive may be enough. If the battery fails the load test — common on units over 4 years old in cold climates — we'll recommend a replacement and show you the test result.",
      },
      {
        q: "What battery brands and sizes do you carry?",
        a: "We stock trusted replacement brands in the most common group sizes (Group 35, 47, 48, 65, 94R) to cover the majority of Honda, Toyota, Ford, GM, and Nissan vehicles common on Toronto roads. If your vehicle takes an unusual size, call ahead and we'll source it.",
      },
      {
        q: "Will replacing the battery reset my car's computer or radio code?",
        a: "Modern vehicles can lose some memory settings (radio presets, window positions, idle calibration) when the battery is swapped. We use a memory saver during replacement to minimise this. We'll let you know beforehand if your specific vehicle has known sensitivities.",
      },
      {
        q: "How long does a car battery last in Canadian winters?",
        a: "Typically 3–5 years. Cold is the killer: at -18°C a battery delivers roughly half its rated cranking power, which is why batteries that limped through summer die on the first real cold morning. If yours is over 4 years old and the engine cranks slowly, have it load-tested before winter — we can test it when we come out.",
      },
      {
        q: "How much does mobile battery replacement cost?",
        a: "The price depends on your battery's group size and type — standard flooded batteries cost less than the AGM units many newer vehicles require. You pay for the battery plus the service call; there's no tow bill and no shop labour markup. Call with your vehicle's year, make, and model for an exact quote before we roll.",
      },
    ],
  },
  {
    slug: "roadside",
    name: "24/7 Roadside Assistance",
    shortName: "Roadside",
    tagline: "Stuck on the 401 or a Scarborough side street — we get you moving.",
    seoTitle: "24/7 Roadside Assistance Toronto & GTA — No Membership",
    seoDescription:
      "Stranded? 24/7 roadside assistance across Toronto & the GTA — no membership, typical arrival 45–90 min. Flat tires, dead batteries, jump starts. Call (416) 558-5915.",
    summary:
      "GoldenNorth provides 24/7 roadside assistance across Toronto and the GTA with no membership required — flat tire changes, battery boosts, jump starts, and on-the-spot fixes that get you moving without the cost and delay of a tow. One call and we're en route — we aim to reach most GTA locations within 45–90 minutes, day, night, weekends, holidays.",
    included: [
      "Flat tire change using your spare or a replacement tire",
      "Battery boost or on-site battery replacement",
      "Jump start for dead or discharged batteries",
      "Roadside triage — we assess what's wrong and fix what we can on the spot",
      "Honest advice if a tow is genuinely required instead of a patch",
    ],
    whenYouNeed: [
      "You're stranded with a flat and no roadside plan — or your plan's ETA is two hours",
      "Your car won't start in a parking garage or on a highway shoulder",
      "It's 2 a.m. in January and you need someone who actually picks up",
    ],
    keywords: [
      "roadside assistance Toronto",
      "24/7 roadside assistance GTA no membership",
      "flat tire help Toronto",
      "highway 401 roadside assistance",
      "emergency roadside Etobicoke",
    ],
    faqs: [
      {
        q: "How fast can you reach me in the GTA?",
        a: "Response times vary by location and demand, but we aim to reach most Toronto and GTA addresses within 45–90 minutes. During severe weather or peak demand we'll give you an honest ETA when you call — (416) 558-5915.",
      },
      {
        q: "Do you cover highways like the 401, 427, or the DVP?",
        a: "Yes. We service highway shoulders across the GTA corridor. Pull as far onto the shoulder as safely possible, turn on your hazards, and call us. We'll coordinate a safe approach.",
      },
      {
        q: "What if my car needs a repair you can't do roadside?",
        a: "We'll tell you straight. If the problem is beyond a flat tire or battery — a broken axle, seized brakes, or engine failure — we'll help you arrange a tow and point you toward a trustworthy shop rather than charge you for a call we can't resolve.",
      },
      {
        q: "Do I need a membership or subscription?",
        a: "No. GoldenNorth is pay-per-call — you pay for the help you actually use, with no annual fee, no membership card, and no coverage limits per year. If you only need roadside help once every couple of winters, that usually costs far less than a club membership.",
      },
      {
        q: "What should I do while I wait on a highway shoulder?",
        a: "Pull as far right as you safely can, turn on your hazards, and stay in the vehicle with your seatbelt on unless you can exit away from traffic to a safe spot behind a barrier. At night, keep your parking lights on. We'll call when we're close so you know it's us pulling up behind you.",
      },
      {
        q: "What information should I have ready when I call?",
        a: "Your location (a highway marker, exit, intersection, or the nearest address), your vehicle's make, model, and colour, and what happened — flat, no-start, or something else. If you're not sure what's wrong, that's fine: describe what you see and hear and we'll triage on arrival.",
      },
    ],
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);
