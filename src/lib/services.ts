export interface Service {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
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
    summary:
      "Golden North comes to your driveway, office parking lot, or condo garage anywhere in the GTA to mount and balance your seasonal tires. Whether you're switching from all-seasons to dedicated winters before the first Brampton snowfall or doing a spring changeover in Scarborough, we bring the equipment to you.",
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
      "seasonal tire swap GTA",
      "on-rim tire change",
      "flat tire replacement Mississauga",
      "winter tire changeover at home Toronto",
      "mobile tire mounting Brampton",
    ],
    faqs: [
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
        a: "We cover Toronto, Mississauga, Brampton, Vaughan, Markham, Scarborough, Etobicoke, and surrounding areas. Call us to confirm availability at your address.",
      },
    ],
  },
  {
    slug: "tires",
    name: "New & Used Tires",
    shortName: "Tires",
    tagline: "The right tire for your car, sourced and installed at your location.",
    summary:
      "Golden North sources new and quality used tires in the sizes most common on GTA roads — from compact sedans to full-size pickups — and installs them on-site so you never have to haul rims to a shop. We carry touring, all-season, winter, and all-terrain options at honest prices, without the upsell pressure of a chain store.",
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
      "mobile tire supply Toronto",
      "used tires GTA",
      "new tires installed at home Mississauga",
      "affordable winter tires Brampton",
      "tire replacement no shop GTA",
      "on-site tire installation Toronto",
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
    ],
  },
  {
    slug: "battery",
    name: "Mobile Battery Replacement",
    shortName: "Battery",
    tagline: "Dead battery? We diagnose, boost, or replace — right where you're parked.",
    summary:
      "A dead battery in a Toronto winter doesn't wait for a tow truck. Golden North's mobile battery service comes to your home, parking lot, or roadside location anywhere in the GTA to test your battery, boost it if possible, or swap it with a fresh unit on the spot. We carry group-size batteries for most common makes and we're available 24/7.",
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
      "dead battery service GTA",
      "car battery boost Mississauga",
      "on-site battery change Brampton",
      "24/7 battery service Toronto",
      "mobile car battery GTA",
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
    ],
  },
  {
    slug: "roadside",
    name: "24/7 Roadside Assistance",
    shortName: "Roadside",
    tagline: "Stuck on the 401 or a Scarborough side street — we get you moving.",
    summary:
      "Golden North runs 24/7 roadside assistance across the Greater Toronto Area for drivers who need help fast without a tow. We handle flat tires, dead batteries, and get-back-on-the-road situations so you can avoid the cost and delay of full tow service. One call and we're en route — day, night, weekends, holidays.",
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
      "24/7 roadside service GTA",
      "mobile roadside help Mississauga",
      "flat tire help Toronto",
      "emergency roadside Brampton",
      "jump start service GTA",
    ],
    faqs: [
      {
        q: "How fast can you reach me in the GTA?",
        a: "Response times vary by location and demand, but we aim to reach most Toronto, Mississauga, and Brampton addresses within 45–90 minutes. During severe weather or peak demand we'll give you an honest ETA when you call — (416) 558-5915.",
      },
      {
        q: "Do you cover highways like the 401, 427, or the DVP?",
        a: "Yes. We service highway shoulders across the GTA corridor. Pull as far onto the shoulder as safely possible, turn on your hazards, and call us. We'll coordinate a safe approach.",
      },
      {
        q: "What if my car needs a repair you can't do roadside?",
        a: "We'll tell you straight. If the problem is beyond a flat tire or battery — a broken axle, seized brakes, or engine failure — we'll help you arrange a tow and point you toward a trustworthy shop rather than charge you for a call we can't resolve.",
      },
    ],
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);
