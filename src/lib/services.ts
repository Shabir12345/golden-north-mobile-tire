// ─── Service catalog ────────────────────────────────────────────────────────
// The five emergency-roadside services GoldenNorth leads with, in display
// order. Copy is client-approved — do not rewrite or "improve" it; edit only
// via the spec in .superpowers/sdd. `problem` + `solution` drive the detail
// page hero (Stage 1: problem→solution framing); `subServices` is populated
// in Stage 2. See the spec for the exact ETA phrase and banned-word rules.

export interface Faq {
  q: string;
  a: string;
}

export interface SubService {
  slug: string; // URL segment under the parent, e.g. "flat-tire"
  name: string;
  problem: string; // H1 line 1 — names the visitor's problem
  solution: string; // H1 line 2 — the promise; carries the ETA phrase
  seoTitle: string; // ≤60 chars
  seoDescription: string; // 120–165 chars
  summary: string;
  included: string[];
  keywords: string[];
  faqs: Faq[];
}

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  icon: "roadside" | "tire" | "battery" | "lockout" | "mechanic";
  problem: string;
  solution: string;
  blurb: string; // 1–2 line card blurb (grid cards, ServiceRow)
  seoTitle: string;
  seoDescription: string;
  summary: string;
  included: string[];
  whenYouNeed: string[];
  keywords: string[];
  faqs: Faq[];
  subServices: SubService[]; // [] in Stage 1; filled in Stage 2
}

export const SERVICES: Service[] = [
  {
    slug: "roadside-assistance",
    name: "24/7 Roadside Assistance",
    shortName: "Roadside",
    icon: "roadside",
    problem: "Stranded at the roadside?",
    solution: "Help is on the way — in as little as 20–30 minutes.",
    blurb:
      "Stuck on the 401 or a side street? One call and a technician is on the way to you, 24/7.",
    seoTitle: "24/7 Roadside Assistance Toronto & GTA — No Membership",
    seoDescription:
      "Stranded? 24/7 roadside assistance across Toronto & the GTA — help in as little as 20–30 minutes, no membership. Fair quote on the call. (416) 558-5915.",
    summary:
      "You're stranded and need help now. GoldenNorth answers 24/7 and sends a roadside technician to you anywhere in Toronto and the GTA — in as little as 20–30 minutes. Flat tire, dead battery, empty tank, keys locked inside: we fix it at the roadside so you skip the tow truck and the shop. No membership, and you get a fair, upfront price on the call before we roll.",
    included: [
      "Flat tire change with your spare or a replacement tire",
      "Battery boost, jump start, or on-site replacement",
      "Emergency fuel delivery — enough to reach a station",
      "Roadside triage — we assess and fix what we can on the spot",
      "Tow coordination and honest advice when a roadside fix isn't possible",
    ],
    whenYouNeed: [
      "You're stranded with a flat and no roadside plan — or your plan's ETA is two hours",
      "Your car won't start in a parking garage or on a highway shoulder",
      "It's 2 a.m. in January and you need someone who actually picks up",
    ],
    keywords: [
      "roadside assistance Toronto",
      "24/7 roadside assistance GTA no membership",
      "emergency roadside assistance Toronto",
      "highway 401 roadside assistance",
      "emergency roadside Etobicoke",
    ],
    faqs: [
      {
        q: "How fast can you reach me in the GTA?",
        a: "We aim to reach most Toronto and GTA locations in as little as 20–30 minutes, depending on where you are and traffic. You get an honest ETA the moment you call — (416) 558-5915 — and we call again when we're close.",
      },
      {
        q: "Do you cover highways like the 401, 427, or the DVP?",
        a: "Yes. We service highway shoulders across the GTA corridor. Pull as far onto the shoulder as safely possible, turn on your hazards, and call us. We'll coordinate a safe approach.",
      },
      {
        q: "What if my car needs a repair you can't do roadside?",
        a: "We'll tell you straight. If the problem is beyond a roadside fix — a broken axle, seized brakes, engine failure — we help you arrange a tow and point you toward a trustworthy shop rather than charge you for a call we can't resolve.",
      },
      {
        q: "Do I need a membership or subscription?",
        a: "No. GoldenNorth is pay-per-call — you pay for the help you actually use, with no annual fee and no coverage limits. You get a fair, upfront price quoted on the call — no membership, no hidden fees.",
      },
      {
        q: "What information should I have ready when I call?",
        a: "Your location (a highway marker, exit, intersection, or nearest address), your vehicle's make, model, and colour, and what happened. Not sure what's wrong? Describe what you see and hear and we'll triage on arrival.",
      },
    ],
    subServices: [], // Stage 2: fuel-delivery, tow-coordination
  },
  {
    slug: "mobile-tire-service",
    name: "Mobile Tire Service",
    shortName: "Tires",
    icon: "tire",
    problem: "Flat tire or worn rubber?",
    solution: "The tire shop drives to you — fixed where you're parked.",
    blurb:
      "Flat, worn, or wrong season — flats fixed, spares installed, new and used tires mounted at your door.",
    seoTitle: "Mobile Tire Service Toronto — Flats, Swaps, New & Used",
    seoDescription:
      "24/7 mobile tire service in Toronto & the GTA: flat tire repair, spare installs, seasonal swaps, new & used tires installed where you're parked. (416) 558-5915.",
    summary:
      "A flat on the way to work, a worn tire that won't pass another winter, seasonals still stacked in the garage — GoldenNorth brings the tire shop to your driveway, office lot, or roadside anywhere in Toronto and the GTA, 24/7. We repair flats, install spares, mount new and used tires, and handle seasonal changeovers on the spot, with a fair, upfront price quoted on the call.",
    included: [
      "Flat tire repair or replacement at your location",
      "Spare tire installation with torque to OEM spec",
      "New & used tires sourced in your size — most within 24 hours",
      "On-rim seasonal changeover (winter ↔ summer / all-season)",
      "Pressures set to door-jamb spec before we leave",
    ],
    whenYouNeed: [
      "You pick up a nail and your spare is buried under the trunk floor",
      "One tire is beyond repair and you need a match today, not next week",
      "The first frost advisory hits and your winters are still in the garage",
    ],
    keywords: [
      "mobile tire service Toronto",
      "mobile tire change GTA",
      "flat tire help Toronto",
      "used tires Toronto",
      "seasonal tire swap at home GTA",
    ],
    faqs: [
      {
        q: "How much does mobile tire service cost in Toronto?",
        a: "It depends on the job — a spare install, a flat repair, a seasonal swap, or new rubber — plus your vehicle type and location. Call (416) 558-5915 with your vehicle and location and you'll have a fair, upfront quote in under a minute — no membership, no hidden fees.",
      },
      {
        q: "How long does the work take once you arrive?",
        a: "A spare install or on-rim seasonal swap typically takes 30–45 minutes for a passenger car, SUV, or light truck — including torque to spec and setting pressures. Tires that need mounting and balancing take longer; we quote a realistic time when you book.",
      },
      {
        q: "Can you work in a condo underground parking garage?",
        a: "Yes. As long as ceiling clearance is sufficient (most underground garages are fine) and you have a spot for the duration, we can work there. We use a portable compressor and cordless tools — no shore power needed.",
      },
      {
        q: "Can I buy just one used tire instead of a full set?",
        a: "Yes. If one tire is damaged beyond repair, we source a matching used tire close in tread depth to your remaining three. For all-wheel-drive vehicles we measure your existing tread first, since large differences can strain the drivetrain.",
      },
      {
        q: "What areas do you serve for tire work?",
        a: "Toronto and across the GTA — Scarborough, North York, Etobicoke, Vaughan, Markham, Richmond Hill, Oakville, and surrounding areas. Call to confirm availability at your address.",
      },
    ],
    subServices: [], // Stage 2: flat-tire, spare-tire-install, new-used-tires, seasonal-tire-change
  },
  {
    slug: "battery-jump-start",
    name: "Battery Jump Start",
    shortName: "Battery",
    icon: "battery",
    problem: "Car won't start?",
    solution: "Boosted, tested, or replaced on the spot — in as little as 20–30 minutes.",
    blurb:
      "Dead battery? We boost it, test it, and if it's done, install a fresh one right where you're parked.",
    seoTitle: "Battery Jump Start Toronto — 24/7 Boost & Replacement",
    seoDescription:
      "Car won't start? 24/7 battery jump start across Toronto & the GTA — boost, test, or on-the-spot replacement in as little as 20–30 minutes. (416) 558-5915.",
    summary:
      "Your car won't start and you're going nowhere. GoldenNorth comes to you 24/7, anywhere in Toronto and the GTA — in as little as 20–30 minutes. We jump start the car, load-test the battery and charging system so you know why it died, and if the battery is finished we install a fresh warranted unit from the van. No tow, no waiting room, and a fair, upfront price quoted on the call.",
    included: [
      "Jump start / boost for dead or discharged batteries",
      "Battery load test and charging system check",
      "On-site battery replacement with a fresh, warranted unit",
      "Terminal cleaning and corrosion treatment",
      "Alternator output check so the new battery stays charged",
    ],
    whenYouNeed: [
      "The car won't start on a cold morning and there's no neighbour to boost you",
      "The battery keeps dying and you suspect the charging system",
      "You want the battery replaced without waiting hours for a tow to a shop",
    ],
    keywords: [
      "battery jump start Toronto",
      "car battery boost GTA",
      "mobile battery replacement Toronto",
      "24/7 battery service Toronto",
      "dead battery help Scarborough",
    ],
    faqs: [
      {
        q: "How do you know if I need a new battery or just a boost?",
        a: "We run a load test on arrival. If the battery holds charge and was simply drained — lights left on, a long stretch parked — a boost and a short drive is enough. If it fails the load test (common past 4 years old in our winters), we show you the result and can replace it on the spot.",
      },
      {
        q: "How fast can you get to me?",
        a: "We reach most Toronto and GTA locations in as little as 20–30 minutes, and you get an honest ETA when you call. We run 24/7 — days, nights, weekends, holidays.",
      },
      {
        q: "What battery brands and sizes do you carry?",
        a: "Trusted replacement brands in the most common group sizes (35, 47, 48, 65, 94R), covering most Honda, Toyota, Ford, GM, and Nissan vehicles on Toronto roads. Unusual size? Call ahead and we'll source it.",
      },
      {
        q: "Will replacing the battery reset my car's computer or radio?",
        a: "Modern vehicles can lose some memory settings when the battery is swapped. We use a memory saver during replacement to minimise this, and we'll flag beforehand if your vehicle has known sensitivities.",
      },
      {
        q: "How much does it cost?",
        a: "A boost costs less than a replacement; replacement price depends on your battery's group size and type (AGM units cost more than standard flooded). Either way you get a fair, upfront price quoted on the call — no membership, no hidden fees, no shop markup.",
      },
    ],
    subServices: [], // Stage 2: battery-replacement, battery-testing
  },
  {
    slug: "car-lockout",
    name: "Car Lockout",
    shortName: "Lockout",
    icon: "lockout",
    problem: "Locked out of your car?",
    solution: "Back inside without a scratch — in as little as 20–30 minutes.",
    blurb: "Keys locked inside? We open your car damage-free, day or night.",
    seoTitle: "Car Lockout Service Toronto — 24/7 Damage-Free Entry",
    seoDescription:
      "Locked out of your car in Toronto or the GTA? 24/7 lockout service — damage-free entry in as little as 20–30 minutes. Fair quote on the call. (416) 558-5915.",
    summary:
      "Keys dangling in the ignition, shut in the trunk, or sitting on the seat — GoldenNorth opens your car without damage, 24/7, anywhere in Toronto and the GTA, in as little as 20–30 minutes. We use professional non-destructive entry tools, work on most makes and models, and quote you a fair, upfront price on the call before we head out.",
    included: [
      "Non-destructive entry — no broken windows, no pried doors",
      "Door unlocks on most makes and models",
      "Trunk unlocks, including keys shut in the trunk",
      "Keys-in-ignition and keys-in-cabin retrieval",
      "Ownership verification on arrival, for your protection",
    ],
    whenYouNeed: [
      "The doors auto-locked with the engine running and the keys inside",
      "You're at a gas station and the keys are sitting on the seat",
      "The trunk closed on your keys with the doors already locked",
    ],
    keywords: [
      "car lockout service Toronto",
      "locked keys in car GTA",
      "24/7 car unlock Toronto",
      "keys locked in trunk Toronto",
      "car lockout North York",
    ],
    faqs: [
      {
        q: "How fast can you get me back into my car?",
        a: "We reach most Toronto and GTA locations in as little as 20–30 minutes, and the unlock itself usually takes only a few minutes once we arrive. You get an honest ETA on the call.",
      },
      {
        q: "Will unlocking damage my door or window?",
        a: "No. We use the same non-destructive entry tools professional locksmiths use — inflatable wedges and reach tools that work the lock without bending the frame or touching the glass.",
      },
      {
        q: "What do you need from me before you open the car?",
        a: "Proof it's your vehicle — a driver's licence plus registration or insurance showing your name, or another reasonable proof of ownership. It protects you: we don't open cars for people who can't show they belong in them.",
      },
      {
        q: "Can you open any make and model?",
        a: "Most passenger cars, SUVs, and light trucks, yes. A few exotic and armoured vehicles are outside scope — tell us the make and model when you call and we'll confirm on the spot.",
      },
      {
        q: "What does a lockout cost?",
        a: "You get a fair, upfront price quoted on the call — no membership, no hidden fees — based on your location and time of day. No surprises when the door opens.",
      },
    ],
    subServices: [], // no sub-services
  },
  {
    slug: "mobile-mechanic",
    name: "Mobile Mechanic",
    shortName: "Mechanic",
    icon: "mechanic",
    problem: "Breakdown or warning light?",
    solution: "A mechanic comes to you — diagnosed and fixed in your driveway.",
    blurb: "Diagnostics, brakes, oil changes, and small repairs — done where the car sits.",
    seoTitle: "Mobile Mechanic Toronto — Repairs at Home or Work",
    seoDescription:
      "Mobile mechanic for Toronto & the GTA: diagnostics, brakes, oil changes & small repairs at your home, office, or roadside. Fair upfront quote — (416) 558-5915.",
    summary:
      "The check-engine light is on, the brakes are grinding, or the car simply won't behave — and you don't want to risk the drive to a shop. GoldenNorth sends a mobile mechanic to your home, office, or roadside anywhere in Toronto and the GTA. We diagnose on-site, fix what can be fixed where the car sits, and give you a straight answer — with a fair, upfront price quoted on the call.",
    included: [
      "Computer diagnostics for check-engine and warning lights",
      "Brake pad and rotor replacement at your location",
      "Oil and filter changes at your home or workplace",
      "Batteries, alternators, starters, belts, and sensors",
      "A straight answer when a repair genuinely needs a shop",
    ],
    whenYouNeed: [
      "A warning light came on and you don't want to gamble on the drive",
      "The brakes grind and the nearest shop can't see you for a week",
      "The car needs maintenance and you can't spare time for a shop visit",
    ],
    keywords: [
      "mobile mechanic Toronto",
      "mobile mechanic GTA",
      "car repair at home Toronto",
      "mobile brake replacement Toronto",
      "mobile oil change GTA",
    ],
    faqs: [
      {
        q: "What repairs can you actually do in a driveway?",
        a: "Anything that doesn't need a hoist or specialty shop equipment: diagnostics, brake pads and rotors, oil and filter changes, batteries, alternators, starters, belts, hoses, and sensors. Describe the symptom when you call and we'll tell you straight whether it's driveway-fixable.",
      },
      {
        q: "How does mobile diagnostics work?",
        a: "We plug a professional scan tool into your car's OBD port, read the fault codes, and verify the actual cause — a code alone isn't a diagnosis. You get a plain-language explanation and a quote for the fix before any work starts.",
      },
      {
        q: "What if the repair turns out to need a shop?",
        a: "We tell you, and you only pay for the diagnosis — not a repair we can't do. We'll help arrange a tow and point you to a trustworthy shop rather than guess at your expense.",
      },
      {
        q: "Can you do an oil change at my office parking lot?",
        a: "Yes — home driveway, office lot, or condo garage with permission. We bring everything including disposal of the old oil, and the car is ready when you are.",
      },
      {
        q: "How is the price set?",
        a: "Parts plus a straightforward service call — no shop overhead, no upsell. You get a fair, upfront price quoted on the call — no membership, no hidden fees.",
      },
    ],
    subServices: [], // Stage 2: diagnostics, brakes, oil-change, general-repairs
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);

export const getSubService = (slug: string, sub: string): SubService | undefined =>
  getService(slug)?.subServices.find((x) => x.slug === sub);
