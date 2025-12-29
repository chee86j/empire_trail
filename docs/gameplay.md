# Gameplay

## Core loop
1. Start game and pick a profession (initial cash and salary differ by profession).
2. Enter the city screen and advance time by traveling or resting.
3. Find deals, purchase properties, then wait for rehab time to complete.
4. Rent out or sell properties to grow bank balance and net worth.
5. Random events trigger bank balance changes, weighted by profession.

## Time and progression
- Time is tracked as a month counter (`currentMonth`), which maps to a displayed month name and year.
- “Rehab complete” gating is based on `purchaseMonth + renovationTime` compared to `currentMonth`.

## Properties
Each `InvestmentProperty` has:
- Up-front costs (purchase, closing, renovation).
- Rehab duration (months).
- ARV rental income and ARV sale price.
- Monthly expenses and rental status.

## Events
- Events are defined in `src/assets/gameData.ts` with a type, description, and bank balance delta.
- Profession probabilities influence which events are eligible when picking a random event.

## Dice outcomes
- Dice rolls are used for some rent/sell outcomes (see `src/components/DiceRollModal.tsx` and constants in `src/constants/gameConstants.ts`).

