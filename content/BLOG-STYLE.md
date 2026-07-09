# Blog writing standard

Distilled from analyzing top-ranking blogs in the tire/roadside niche (Canada Drives,
Good Sam, Tire Agent, Chapel Hill Tire) plus 2026 AI-search guidance. Every new post
must meet this bar. Frontmatter contract is enforced by `src/lib/__tests__/blog.test.ts`.

## Length and depth

- **1,100–1,500 words minimum.** Thin posts don't rank and don't get cited by AI
  Overviews (which now appear on 80%+ of local service queries and cite the single
  most comprehensive source).
- Explain the **mechanism, not just the conclusion** — why rubber hardens below 7°C,
  not just "switch tires."

## Structure

1. **Relatable hook** (2–3 sentences): a specific, sensory GTA moment — the sound of
   a blowout on the 401, the click-click-click at -20°C. Never open with the keyword.
2. **Answer-first summary immediately after the hook**, bolded. AI engines quote this.
3. **Question-based H2s** that mirror real searches ("Should you change it yourself?").
4. Numbered steps for anything procedural; bullets for lists; **bold the key facts**.
5. **Brand woven in mid-article** where the problem creates the need — never
   front-loaded. Soft close with phone number at the end.
6. FAQs live in frontmatter (feed FAQ JSON-LD). 4–5 per post, question-keyword phrased.

## Voice

- **Knowledgeable friend, not corporate instruction.** Complete sentences — no
  staccato fragments, no "One call and we're moving" filler.
- **One counterintuitive insight per post** (e.g., "summer heat kills the battery,
  winter just finds out"). This is what makes a post memorable and quotable.
- **Permission-giving language**: "it's okay to ruin the tire," "calling for help is
  the correct read of the situation." Validates the reader instead of lecturing.
- **Honest nuance builds trust**: steelman the case against what we sell (used tires),
  then answer it with standards. Include "when NOT to DIY" sections.

## Specificity (the differentiator)

- **Hyperlocal detail**: named highways (401, DVP, Gardiner), GTA timing windows,
  condo garages, Ontario law vs. Quebec/BC, the Ontario winter-tire insurance discount.
- **Concrete numbers with sources behind them**: 7°C, -18°C ≈ half cranking power,
  4/32" tread floor, DOT date codes, 3PMSF vs M+S.
- **Canadian idiom**: quarter test (caribou nose), not the US penny test; "colour."

## Hard rules

- **No prices, no free offers, no arrival-time promises** without Shabir's explicit OK.
- seoTitle ≤ 60 chars; description 120–165 chars; excerpt > 40 chars; ≥ 3 keywords;
  `relatedService` must be a valid service slug; set `updated` when revising.
- Internal-link each post to its related service page at least once, in context.
