# Empire Trail

Empire Trail is a turn-based, single-player real-estate strategy game built with React, TypeScript, and Vite. Move from city to city, evaluate property deals, and balance cash flow against renovation timelines and random events. The experience is intentionally lightweight for fast play sessions, yet structured enough to model real-world trade-offs.

## Why Empire Trail?
- **Focused gameplay loop:** Travel, review deals, buy/sell, and advance the month with clear feedback at every step.
- **Investor-minded mechanics:** Rehab gating, ARV-driven rent/sale outcomes, and profession-weighted events influence your bankroll.
- **Built for iteration:** Simple components, typed game data, and CSS modules keep the codebase easy to extend.

## Feature Highlights
- **City progression:** Cycle through major U.S. cities and advance time month by month.
- **Deals marketplace:** Surface randomized property opportunities with purchase, closing, and renovation costs.
- **Portfolio management:** Track holdings, complete rehabs, and choose to rent or sell based on ARV.
- **Dice-driven outcomes:** A modal dice roll powers rent and sale results for quick risk/reward decisions.
- **Event system:** Profession-weighted events add or remove cash, encouraging adaptive play.
- **Toast feedback:** Non-blocking notifications summarize actions and results.

## Tech Stack
- **Framework:** React 18 + TypeScript on Vite.
- **UI/UX:** CSS modules in `src/styles`; React-Toastify for notifications.
- **Dice:** `react-dice-complete` for the dice modal experience.

## Quickstart
1. **Requirements:** Node.js 18+ (20+ recommended) and npm 9+.
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the dev server:**
   ```bash
   npm run dev
   ```
   Vite prints both local and network URLs when ready.
4. **Production build and preview:**
   ```bash
   npm run build
   npm run preview
   ```
   The `preview` command serves the production build from `/dist`.

### Available Scripts
- `npm run dev` – start the Vite dev server.
- `npm run build` – typecheck and build the production bundle.
- `npm run preview` – serve the production build locally.
- `npm run lint` – run ESLint checks.

## Gameplay Overview
- **Property lifecycle:** Each property defines purchase, closing, and renovation costs, plus ARV-based rent/sale values. Rent or sell actions unlock after `purchaseMonth + renovationTime`.
- **Events:** Weighted by chosen profession and can add or subtract from the bank balance.
- **Notifications:** A single `<ToastContainer />` in `App.tsx` handles global toasts.

## Project Structure
```
src/
  assets/
    gameData.ts              # typed events, InvestmentProperty seeds, and helpers
  components/
    App.tsx                  # top-level state & navigation
    GameInfoScreen.tsx       # intro and onboarding screen
    PlayerSelectScreen.tsx   # profession selection
    CityScreen.tsx           # travel/rest/events & player stats
    DealsScreen.tsx          # property marketplace
    PortfolioScreen.tsx      # manage holdings, rent/sell actions
    DiceRollModal.tsx        # dice modal for rent/sale outcomes
    EventScreen.tsx          # renders event details
  styles/
    *.css                    # component-scoped styling
```

## Deployment
Deploy on any platform that can run a Node server.

### Railway
1. Create a Railway project and link your GitHub repo.
2. Configure service commands:
   - **Build:** `npm run build`
   - **Start:** `npm run preview -- --host 0.0.0.0 --port $PORT`
3. Railway supplies `$PORT`; the start command binds to it automatically. Push to your default branch to deploy.

## Troubleshooting
- **TypeScript additions:** When extending `InvestmentProperty` in `gameData.ts`, keep optional fields (`purchaseMonth`, `purchaseYear`) nullable and gate rent/sell actions with:
  ```ts
  currentMonth >= (property.purchaseMonth ?? 0) + property.renovationTime
  ```
- **Toast duplication:** Ensure only one `<ToastContainer />` is rendered (kept in `App.tsx`).
- **Preview port binding:** On hosts that inject `PORT`, use `npm run preview -- --host 0.0.0.0 --port $PORT`.

## Roadmap
- Mobile-first and mid-breakpoint layout refinements.
- Currency formatting utilities (e.g., `$20,000 → $20K`).
- Animations for month advances, dice rolls, and win states.
- Broader event variety and profession balancing.
- Save/Load game state.

