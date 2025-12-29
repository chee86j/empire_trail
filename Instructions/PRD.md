# Product Requirements Document (PRD)

## Summary
Empire Trail is a turn-based real estate game inspired by classic “travel and survive” loops, reframed as a city-to-city investing journey. The player manages cash flow, evaluates deals, survives random events, and grows a portfolio over time.

## Goals
- Create a fast, replayable loop with meaningful tradeoffs.
- Make the game readable and learnable without external tutorials.
- Keep the UI responsive and accessible on desktop and mobile.

## Target player
- Players who enjoy light strategy, progression, and “one more turn” loops.
- Players who want short sessions and easy re-entry via save/load.

## Core gameplay loop
1. Select profession.
2. Travel/rest to advance time.
3. Find deals and purchase properties if affordable.
4. Wait out rehab time.
5. Rent or sell for income and profit.
6. Resolve events and repeat.

## Key screens
- Game info: overview and onboarding entry point.
- Profession select: choose starting stats.
- City: primary hub for actions and progression.
- Deals: browse and filter available properties.
- Portfolio: rent/sell and review holdings.
- Event: apply random event outcomes.
- Save/load: manage slots and auto-save.

## Must-have features
- Profession selection with distinct starting stats.
- City progression and time advancement.
- Deal generation and purchasing.
- Rehab gating before rent/sell actions.
- Events with profession-weighted probability.
- Save/load with multiple slots plus auto-save.
- Achievements with progress tracking.

## Edge cases and rules
- Prevent purchases when bank balance is insufficient.
- Treat missing `purchaseMonth` as not eligible for rehab completion checks.
- Avoid duplicate achievement unlocks and ensure progress updates are consistent.
- Keep persistence tolerant of older save versions (warn but attempt to load).

## Non-goals (for now)
- Multiplayer.
- Server-side persistence or accounts.
- Real-world market simulation accuracy.

