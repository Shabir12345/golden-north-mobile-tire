// ─── FAQ content ──────────────────────────────────────────────────────────────
// Page-level FAQ sets. Each set is DISTINCT so FAQ schema is not duplicated
// across URLs. Answers reflect only confirmed-true claims (licensed & insured,
// upfront/no-membership pricing, warranty-backed parts) and name no removed
// service-area cities.

export interface Faq {
  q: string;
  a: string;
}

export const HOME_FAQS: Faq[] = [
  {
    q: "Do you really come to me, or do I bring the car to a shop?",
    a: "We're fully mobile — we come to your driveway, condo garage, office lot, or the roadside anywhere in the GTA. There's no shop to visit and no tow required; we do the work on the spot.",
  },
  {
    q: "How much does it cost, and is there a membership?",
    a: "No membership and no annual fee — you pay per call for the help you actually use. Pricing is upfront: tell us your vehicle, location, and what's wrong at (416) 558-5915 and we'll give you a straight quote before we head out, with no hidden fees.",
  },
  {
    q: "How fast can you get to me?",
    a: "We aim to reach most Toronto and GTA addresses in as little as 20–30 minutes, depending on location and traffic — and we give you an honest ETA when you call. We run 24/7 — days, nights, weekends, and holidays.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. GoldenNorth is a licensed and insured mobile service, and every job is handled by a professional technician.",
  },
  {
    q: "What areas do you cover?",
    a: "We serve Toronto and across the Greater Toronto Area — Vaughan, Markham, Scarborough, Etobicoke, North York, Oakville, Richmond Hill, and surrounding areas. Call to confirm your address.",
  },
];

export const SERVICES_FAQS: Faq[] = [
  {
    q: "I'm not sure which service I need — can you help?",
    a: "Yes. Call (416) 558-5915 and describe what happened; we'll tell you whether it's roadside assistance, mobile tire service, a battery jump start, a car lockout, or mobile mechanic repairs, and give you an upfront quote.",
  },
  {
    q: "Do I have to bring my car to a shop for any of these?",
    a: "No. Every service we offer is mobile — roadside assistance, mobile tire service, battery jump starts, car lockouts, and mobile mechanic repairs all happen at your location across the GTA.",
  },
  {
    q: "Do you carry my tire size?",
    a: "We stock the sizes most common on GTA roads, from compact sedans to full-size pickups, in touring, all-season, winter, and all-terrain options. Tell us your vehicle and we'll confirm before we come out.",
  },
  {
    q: "Do the parts you install come with a warranty?",
    a: "Yes — the tires and batteries we install are warranty-backed, and we'll go over the details with you at the time of service.",
  },
  {
    q: "Is there a membership or annual fee for any service?",
    a: "Never. Everything we do is pay-per-call with upfront pricing — no membership card, no annual fee, and no coverage limits.",
  },
];

export const CONTACT_FAQS: Faq[] = [
  {
    q: "What information should I have ready when I call?",
    a: "Your location, your vehicle's year, make, and model, and a quick description of the problem. That's enough for us to give you an accurate quote and head your way.",
  },
  {
    q: "What are your hours?",
    a: "We're open 24/7 — day, night, weekends, and holidays. If you need help now, calling is always the fastest way to reach us.",
  },
  {
    q: "Do you charge just to come out?",
    a: "Pricing is upfront and per-call, with no membership or hidden fees. We'll confirm the full cost with you before any work begins.",
  },
  {
    q: "Can I book ahead for a seasonal tire swap?",
    a: "Absolutely. Call or send a message with your preferred timing and location, and we'll get you scheduled.",
  },
];
