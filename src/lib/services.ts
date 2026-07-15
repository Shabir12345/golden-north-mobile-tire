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
  blurb: string; // 1–2 line card blurb (grid cards)
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
    subServices: [
      {
        slug: "fuel-delivery",
        name: "Emergency Fuel Delivery",
        problem: "Out of gas?",
        solution: "Fuel comes to you — in as little as 20–30 minutes.",
        seoTitle: "Emergency Fuel Delivery Toronto — 24/7 Gas to Your Car",
        seoDescription:
          "Ran out of gas in Toronto or the GTA? 24/7 emergency fuel delivery — enough fuel to reach a station, in as little as 20–30 minutes. Call (416) 558-5915.",
        summary:
          "The gauge said you'd make it; the car disagreed. GoldenNorth brings fuel to you anywhere in Toronto and the GTA, 24/7 — in as little as 20–30 minutes. We pour safely, make sure the car starts, and you drive to the nearest station instead of walking to it. Fair, upfront price quoted on the call — no membership, no hidden fees.",
        included: [
          "Gasoline or diesel brought to your location",
          "Enough fuel to reach the nearest station comfortably",
          "Safe pour and a start check before we leave",
          "Highway shoulders, parking garages, and side streets covered",
        ],
        keywords: [
          "emergency fuel delivery Toronto",
          "out of gas GTA",
          "gas delivery to car Toronto",
          "roadside fuel delivery 401",
        ],
        faqs: [
          {
            q: "How much fuel do you bring?",
            a: "Enough to get you comfortably to the nearest station — typically several litres. Tell us your vehicle and location when you call and we'll confirm.",
          },
          {
            q: "Do you deliver diesel too?",
            a: "Yes — tell us gasoline or diesel when you call so we load the right fuel. If you're not sure, the fuel door or owner's manual says.",
          },
          {
            q: "What if the car still won't start after refuelling?",
            a: "Some vehicles need a few extra cranks after running dry, and we know the tricks. If it's genuinely not fuel — a failed pump, a dead battery — we can triage that on the spot, since we're already there.",
          },
        ],
      },
      {
        slug: "tow-coordination",
        name: "Tow Coordination",
        problem: "Need a tow after all?",
        solution: "We assess first, arrange the tow if it's truly needed, and point you to a shop you can trust.",
        seoTitle: "Tow Coordination Toronto & GTA — When It Can't Be Fixed",
        seoDescription:
          "If your car can't be fixed at the roadside, GoldenNorth helps arrange the tow and points you to a trustworthy GTA shop. 24/7 honest triage. (416) 558-5915.",
        summary:
          "Most calls we fix on the spot — that's the point of mobile service. When the problem is genuinely beyond a roadside repair, we say so, help arrange a tow, and point you toward a shop we'd send our own cars to. You get a straight answer instead of a tow bill you didn't need. 24/7, anywhere in Toronto and the GTA.",
        included: [
          "Roadside triage first — most problems don't need a tow",
          "Tow arrangement when the repair genuinely needs a shop",
          "A recommendation for a trustworthy repair shop",
          "Honest advice on what the repair likely involves",
        ],
        keywords: [
          "tow coordination Toronto",
          "do I need a tow GTA",
          "roadside triage Toronto",
          "car breakdown help Toronto",
        ],
        faqs: [
          {
            q: "Do you run your own tow trucks?",
            a: "Our job is fixing your car where it stands. When a tow is genuinely required, we coordinate one for you rather than leaving you to search from the shoulder.",
          },
          {
            q: "How do you decide if my car needs a tow?",
            a: "We triage first. Flat tires, dead batteries, lockouts, and empty tanks get fixed on the spot. Broken axles, seized brakes, and engine failures need a shop — and we tell you which one you're dealing with, plainly.",
          },
          {
            q: "What does this cost me?",
            a: "You get a fair, upfront price quoted on the call — no membership, no hidden fees. If it turns out you need a tow instead of a roadside fix, we tell you straight rather than charge you for work that won't solve it.",
          },
        ],
      },
    ],
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
    subServices: [
      {
        slug: "flat-tire",
        name: "Flat Tire Repair & Change",
        problem: "Flat tire right now?",
        solution: "Repaired or swapped where you stand — in as little as 20–30 minutes.",
        seoTitle: "Flat Tire Repair Toronto — 24/7 Mobile Flat Tire Change",
        seoDescription:
          "Flat tire in Toronto or the GTA? 24/7 mobile flat tire repair and change at your location, in as little as 20–30 minutes. Fair quote on the call. (416) 558-5915.",
        summary:
          "A flat doesn't wait for a convenient moment. GoldenNorth comes to you anywhere in Toronto and the GTA, 24/7 — in as little as 20–30 minutes. We assess the puncture, repair it on the spot when it's safe to, install your spare, or fit a replacement tire if the damage is beyond saving. You get a fair, upfront price quoted on the call — no membership, no hidden fees.",
        included: [
          "Puncture assessment — repair vs. replace, explained plainly",
          "Plug or patch repair where the damage allows it",
          "Spare installation, torqued to OEM spec",
          "Replacement tire sourced if the flat is beyond repair",
          "Pressure set on all four tires before we leave",
        ],
        keywords: [
          "flat tire repair Toronto",
          "flat tire help GTA",
          "mobile flat tire change Toronto",
          "flat tire 401 highway help",
        ],
        faqs: [
          {
            q: "Can my flat be repaired, or does it need replacing?",
            a: "Punctures in the tread face under about 6 mm can usually be plugged or patched. Sidewall damage, shoulder punctures, and runs on a fully deflated tire usually mean replacement. We inspect on arrival and tell you which it is before any work starts.",
          },
          {
            q: "What if I don't have a spare?",
            a: "Many newer cars don't. We can repair the flat on-site when it's repairable, or bring a replacement tire in your size — tell us your tire size (on the sidewall, e.g. 225/65R17) when you call.",
          },
          {
            q: "I'm on a highway shoulder — can you still help?",
            a: "Yes. Pull as far right as safely possible, hazards on, and stay in the vehicle unless you can wait safely behind a barrier. We service shoulders across the GTA corridor and call when we're close.",
          },
        ],
      },
      {
        slug: "spare-tire-install",
        name: "Spare Tire Installation",
        problem: "Spare in the trunk, no way to fit it?",
        solution: "We install it safely — torqued to spec, pressures set.",
        seoTitle: "Spare Tire Installation Toronto — We Come to You 24/7",
        seoDescription:
          "Can't change your own spare? 24/7 mobile spare tire installation across Toronto & the GTA, in as little as 20–30 minutes. Fair quote on the call. (416) 558-5915.",
        summary:
          "You have the spare; the highway shoulder is no place to learn to use it. GoldenNorth comes to you 24/7 anywhere in Toronto and the GTA — in as little as 20–30 minutes — jacks the car safely, fits your spare, torques it to spec, and checks the pressure so it's actually drivable. Fair, upfront price quoted on the call.",
        included: [
          "Safe jacking on level ground — no scraped rockers, no guesswork",
          "Spare fitted and torqued to OEM spec",
          "Spare pressure checked and corrected",
          "Advice on how far and how fast your spare type can go",
        ],
        keywords: [
          "spare tire installation Toronto",
          "install my spare tire GTA",
          "spare tire change service Toronto",
        ],
        faqs: [
          {
            q: "How far can I drive on the spare afterwards?",
            a: "Compact (donut) spares are typically limited to about 80 km/h and roughly 100 km — enough to reach a tire shop, not a road trip. Full-size spares can go further. We tell you exactly what yours can handle before we leave.",
          },
          {
            q: "What if my spare turns out to be flat too?",
            a: "It happens more than you'd think — spares lose pressure sitting in the trunk for years. We carry a compressor and can inflate it; if it's damaged, we can source a replacement tire in your size instead.",
          },
          {
            q: "How long does the install take?",
            a: "Usually 15–20 minutes once we arrive — and we reach most Toronto and GTA locations in as little as 20–30 minutes.",
          },
        ],
      },
      {
        slug: "new-used-tires",
        name: "New & Used Tires",
        problem: "Tire beyond repair?",
        solution: "New or quality used, sourced in your size and installed at your door.",
        seoTitle: "New & Used Tires Delivered & Installed — Toronto & GTA",
        seoDescription:
          "New and quality used tires sourced in your size and installed at your home, office, or roadside anywhere in the GTA. Most sizes within 24 hours. (416) 558-5915.",
        summary:
          "GoldenNorth sources new and quality used tires and installs them at your location anywhere in Toronto and the GTA — no hauling rims to a shop, no waiting room. Touring, all-season, winter, and all-terrain options in the sizes most common on GTA roads, from compact sedans to full-size pickups, at a fair, upfront price quoted on the call — without chain-store upsell pressure.",
        included: [
          "Tire sourcing in your exact size — new or quality used",
          "Most sizes available within 24 hours",
          "On-site mounting and inflation to spec",
          "Torque check after installation",
          "Old tire disposal on request",
        ],
        keywords: [
          "used tires Toronto",
          "new tires installed at home GTA",
          "same-day tire replacement Toronto",
          "buy one used tire GTA",
        ],
        faqs: [
          {
            q: "Are used tires safe? How do you inspect them?",
            a: "We only sell used tires with at least 4/32\" of tread remaining, no sidewall bubbles, no visible cord damage, and no plugged punctures in the shoulder zone. Each tire is inspected before it leaves with us.",
          },
          {
            q: "Can I buy just one tire instead of a full set?",
            a: "Yes. If one tire is damaged beyond repair, we source a matching used tire close in tread depth to your remaining three. For all-wheel-drive vehicles we measure your existing tread first, since large differences can strain the drivetrain.",
          },
          {
            q: "Should I buy new or used?",
            a: "Used makes sense when you're matching a single damaged tire or the vehicle is near end of life. New is the better buy for a full set you'll run for years. We sell both, so you get an honest recommendation either way.",
          },
          {
            q: "How do I find my tire size?",
            a: "It's printed on the sidewall and on the sticker inside the driver's door jamb — a code like 225/65R17. Tell us that code when you call and we'll confirm availability, usually within 24 hours for less common sizes.",
          },
        ],
      },
      {
        slug: "seasonal-tire-change",
        name: "Seasonal Tire Change",
        problem: "Winters still in the garage?",
        solution: "On-rim swaps at your door — no shop, no Saturday lost.",
        seoTitle: "Mobile Seasonal Tire Change Toronto — Swaps at Your Door",
        seoDescription:
          "24/7 mobile seasonal tire change across Toronto & the GTA. We come to your driveway or condo garage for winter and summer swaps. Call (416) 558-5915.",
        summary:
          "GoldenNorth swaps your seasonal tires at your driveway, office lot, or condo garage anywhere in Toronto and the GTA — mounted, torqued to spec, pressures set. Switch to winters before the first snowfall or back to summers in spring without burning a Saturday in a tire-shop waiting room. Fair, upfront price quoted on the call — no membership, no hidden fees.",
        included: [
          "On-rim seasonal changeover (winter ↔ summer / all-season)",
          "Torque-wrench tightened to OEM spec",
          "Valve stem inspection",
          "Pressures set to door-jamb spec on all four",
        ],
        keywords: [
          "seasonal tire swap at home GTA",
          "winter tire changeover Toronto",
          "on-rim tire change North York",
          "mobile tire swap Vaughan",
        ],
        faqs: [
          {
            q: "When should I put on winter tires in Ontario?",
            a: "The 7°C rule: once daytime temperatures stay consistently below 7°C — usually late October to mid-November in the GTA — all-season rubber hardens and loses grip. Keep winters on until spring temperatures hold above 7°C, typically mid-April. Booking before the first snowfall rush means faster scheduling.",
          },
          {
            q: "How long does a mobile seasonal swap take?",
            a: "A typical on-rim swap takes 30–45 minutes for a passenger car, SUV, or light truck — including torque to spec and setting pressures.",
          },
          {
            q: "Can you do the swap in a condo underground garage?",
            a: "Yes — most underground garages have enough clearance, and we use a portable compressor and cordless tools, so no shore power is needed. You just need a spot for the duration.",
          },
          {
            q: "My winters aren't on rims — can you still swap them?",
            a: "Yes, tires that need mounting and balancing on your rims take longer than an on-rim swap, and we'll quote a realistic time and price when you book.",
          },
        ],
      },
    ],
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
    subServices: [
      {
        slug: "battery-replacement",
        name: "Battery Replacement",
        problem: "Battery finally died?",
        solution: "A fresh, warranted battery installed where you're parked.",
        seoTitle: "Mobile Car Battery Replacement Toronto — 24/7 Service",
        seoDescription:
          "Dead battery? We test, then install a fresh warranted battery on the spot — home, work, or roadside across the GTA, 24/7. Call (416) 558-5915.",
        summary:
          "A dead battery in a Toronto winter shouldn't mean waiting hours for a tow. GoldenNorth installs a fresh, warranted battery right where your car sits — home, workplace, parking garage, or roadside, anywhere in Toronto and the GTA, 24/7. We load-test first so you're not buying a battery you don't need, and you get a fair, upfront price quoted on the call.",
        included: [
          "Load test first — you only replace what's actually dead",
          "Fresh, warranted battery installed from the van",
          "Memory saver used to protect radio and computer settings",
          "Terminal cleaning and corrosion treatment",
          "Alternator output check so the new battery stays charged",
        ],
        keywords: [
          "mobile battery replacement Toronto",
          "car battery installation at home GTA",
          "battery replacement service Toronto",
        ],
        faqs: [
          {
            q: "What battery brands and sizes do you carry?",
            a: "Trusted replacement brands in the most common group sizes (35, 47, 48, 65, 94R), covering most Honda, Toyota, Ford, GM, and Nissan vehicles on Toronto roads. Unusual size? Call ahead and we'll source it.",
          },
          {
            q: "Will replacing the battery reset my car's settings?",
            a: "Modern vehicles can lose some memory settings when the battery is swapped. We use a memory saver during replacement to minimise this, and we'll flag beforehand if your vehicle has known sensitivities.",
          },
          {
            q: "How long does a car battery last in Canadian winters?",
            a: "Typically 3–5 years. Cold is the killer: at -18°C a battery delivers roughly half its rated cranking power. If yours is over 4 years old and cranking slowly, have it load-tested before winter does it for you.",
          },
        ],
      },
      {
        slug: "battery-testing",
        name: "Battery Testing",
        problem: "Battery acting up?",
        solution: "Load-tested on the spot — so you know before winter does.",
        seoTitle: "Car Battery Testing Toronto — Mobile Load Test & Check",
        seoDescription:
          "Slow cranks or a battery you don't trust? Mobile battery load testing and charging-system checks at your location across Toronto & the GTA. (416) 558-5915.",
        summary:
          "Slow cranking on cold mornings is a battery telling you something. GoldenNorth comes to your home or workplace anywhere in Toronto and the GTA and runs a proper load test plus a charging-system check — so you know whether the battery is ageing, the alternator is undercharging, or something is draining it. You see the test result yourself, and there's no pressure to replace what still passes.",
        included: [
          "Battery load test with the result shown to you",
          "Charging system / alternator output check",
          "Parasitic drain check when something keeps killing the battery",
          "A plain-language verdict: keep it, watch it, or replace it",
        ],
        keywords: [
          "car battery testing Toronto",
          "battery load test GTA",
          "battery keeps dying Toronto",
        ],
        faqs: [
          {
            q: "What does a load test actually tell you?",
            a: "It measures how much cranking power the battery delivers under load — the thing that matters on a -18°C morning. A voltage reading alone can look fine on a battery that's about to quit; a load test can't be fooled.",
          },
          {
            q: "My battery keeps dying overnight. Is that the battery?",
            a: "Not always — it can be a parasitic drain (a module or light staying awake) or an alternator that isn't charging. We test all three so you fix the actual cause instead of replacing batteries repeatedly.",
          },
          {
            q: "If the battery fails the test, can you replace it right away?",
            a: "Yes — we carry warranted batteries in the most common group sizes and can install one on the spot, with a fair, upfront price quoted before any work starts.",
          },
        ],
      },
    ],
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
    subServices: [
      {
        slug: "diagnostics",
        name: "Mobile Diagnostics",
        problem: "Check-engine light on?",
        solution: "Scanned and explained in plain language, at your location.",
        seoTitle: "Mobile Car Diagnostics Toronto — Check Engine Light",
        seoDescription:
          "Check-engine light on in Toronto or the GTA? A mobile mechanic scans and diagnoses at your home or work, and explains it plainly. Call (416) 558-5915.",
        summary:
          "A warning light without an explanation is just anxiety on a dashboard. GoldenNorth comes to your home, office, or roadside anywhere in Toronto and the GTA, reads the fault codes with a professional scan tool, verifies the actual cause — a code alone isn't a diagnosis — and explains it in plain language, with a quote for the fix before any work starts.",
        included: [
          "Professional OBD scan for check-engine and warning lights",
          "Verification of the real cause behind the code",
          "Plain-language explanation of what it means",
          "A quote for the repair before any work starts",
        ],
        keywords: [
          "mobile car diagnostics Toronto",
          "check engine light help GTA",
          "car diagnostic at home Toronto",
        ],
        faqs: [
          {
            q: "Is it safe to keep driving with the check-engine light on?",
            a: "A steady light usually means 'get it checked soon'; a flashing light means 'stop driving now' — it usually indicates an active misfire that can destroy the catalytic converter. If it's flashing, park it and call; we come to the car.",
          },
          {
            q: "Can't I just get the code read for free at a parts store?",
            a: "You can — but a code names a symptom, not a cause. 'Oxygen sensor code' can mean a bad sensor, a vacuum leak, or a failing catalytic converter. We verify the actual cause so you don't pay to replace parts that weren't the problem.",
          },
          {
            q: "What happens after the diagnosis?",
            a: "If it's driveway-fixable, we quote the repair and can often do it in the same visit. If it genuinely needs a shop, we tell you straight and you've only paid for the diagnosis.",
          },
        ],
      },
      {
        slug: "brakes",
        name: "Mobile Brake Service",
        problem: "Brakes grinding or squealing?",
        solution: "Pads and rotors replaced in your driveway.",
        seoTitle: "Mobile Brake Repair Toronto — Pads & Rotors at Home",
        seoDescription:
          "Grinding or squealing brakes? A mobile mechanic replaces pads and rotors at your home or office across Toronto & the GTA. Fair quote first. (416) 558-5915.",
        summary:
          "Grinding brakes don't book appointments. GoldenNorth replaces brake pads and rotors at your home, office, or wherever the car sits, anywhere in Toronto and the GTA — quality parts, torqued to spec, road-checked before we hand the keys back. You get a fair, upfront price quoted on the call, and a straight answer if what you actually need is less than a full brake job.",
        included: [
          "Brake inspection with the findings shown to you",
          "Pad and rotor replacement with quality parts",
          "Caliper and hardware check while the wheel is off",
          "Torque to spec and a road check before handover",
        ],
        keywords: [
          "mobile brake replacement Toronto",
          "brake repair at home GTA",
          "brake pads and rotors Toronto mobile",
        ],
        faqs: [
          {
            q: "Is it safe to drive with grinding brakes until you arrive?",
            a: "Grinding usually means the pad material is gone and metal is wearing the rotor — every drive makes the repair bigger. If you're hearing grinding, the safest move is to park it and have us come to the car.",
          },
          {
            q: "Do I need pads only, or pads and rotors?",
            a: "It depends on rotor thickness and condition. We measure and show you: if your rotors are within spec and smooth, we say so — you don't buy rotors you don't need.",
          },
          {
            q: "How long does a mobile brake job take?",
            a: "Typically 1–2 hours per axle at your location, depending on the vehicle. We confirm a realistic window when we quote.",
          },
        ],
      },
      {
        slug: "oil-change",
        name: "Mobile Oil Change",
        problem: "Overdue for an oil change?",
        solution: "Done at your home or office — disposal included.",
        seoTitle: "Mobile Oil Change Toronto — At Your Home or Office",
        seoDescription:
          "Mobile oil change across Toronto & the GTA — the right oil and filter for your vehicle, done at your home or office, old oil disposed of. (416) 558-5915.",
        summary:
          "An oil change shouldn't cost you a morning. GoldenNorth comes to your driveway, office lot, or condo garage anywhere in Toronto and the GTA with the right oil and filter for your vehicle, does the job while you get on with your day, and takes the old oil away for proper disposal. Fair, upfront price quoted on the call.",
        included: [
          "Manufacturer-spec oil (conventional, synthetic blend, or full synthetic)",
          "New oil filter",
          "Fluid top-up check while we're under the hood",
          "Old oil and filter taken away for proper disposal",
        ],
        keywords: [
          "mobile oil change Toronto",
          "oil change at home GTA",
          "oil change at work Toronto",
        ],
        faqs: [
          {
            q: "Which oil do you use for my car?",
            a: "Whatever your manufacturer specifies — grade and type come from your vehicle's spec, not a menu. Tell us the year, make, and model when you call and we arrive with the right oil and filter.",
          },
          {
            q: "How long does it take?",
            a: "About 30–45 minutes at your location for most vehicles. You don't need to be standing there — many customers hand us the keys and go back to work.",
          },
          {
            q: "What happens to the old oil?",
            a: "We take it with us, along with the old filter, for proper environmental disposal. Nothing is left in your driveway.",
          },
        ],
      },
      {
        slug: "general-repairs",
        name: "General Repairs",
        problem: "Something's wrong, not sure what?",
        solution: "Diagnosed and repaired where the car sits — when it's driveway-fixable.",
        seoTitle: "Mobile Car Repairs Toronto — Fixed at Your Location",
        seoDescription:
          "Mobile car repairs across Toronto & the GTA: alternators, starters, belts, hoses & sensors fixed at your home or work. Fair upfront quote. (416) 558-5915.",
        summary:
          "Not every repair needs a hoist. Alternators, starters, belts, hoses, sensors, and batteries can all be replaced where the car sits — and GoldenNorth does exactly that, at your home, office, or roadside anywhere in Toronto and the GTA. We diagnose first, quote a fair, upfront price on the call, and tell you honestly when a job genuinely belongs in a shop.",
        included: [
          "Alternators, starters, and batteries",
          "Belts and hoses",
          "Sensors and minor electrical faults",
          "Diagnosis first — you approve the quote before work starts",
        ],
        keywords: [
          "mobile car repair Toronto",
          "alternator replacement at home GTA",
          "mobile auto repair Toronto",
        ],
        faqs: [
          {
            q: "What repairs can be done in a driveway?",
            a: "Anything that doesn't need a hoist or shop-only equipment: alternators, starters, batteries, belts, hoses, sensors, and most bolt-on parts. Describe the symptom when you call and we'll tell you straight whether it's driveway-fixable.",
          },
          {
            q: "Where do the parts come from?",
            a: "We source quality parts for your exact vehicle — often same-day from local suppliers — and quote you the full price, parts and labour, before any work starts.",
          },
          {
            q: "What if it turns out to need a shop after all?",
            a: "You pay for the diagnosis, not for a repair we can't do. We help arrange a tow if needed and point you to a trustworthy shop.",
          },
        ],
      },
    ],
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);

export const getSubService = (slug: string, sub: string): SubService | undefined =>
  getService(slug)?.subServices.find((x) => x.slug === sub);
