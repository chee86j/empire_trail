# Empire Trail

Empire Trail is a nostalgia-charged, turn-based real-estate odyssey built with React, TypeScript, and Vite. Channeling the adventurous spirit of Oregon Trail with a modern real estate twist, you’ll trek from city to city, negotiate high-stakes property offers, hire the right crew, and manage risk like a savvy pioneer-turned-broker. Every roll of the dice can turn a sleepy town into a boom market, every event card tests your instincts, and every decision shapes the legend of your empire-sized portfolio.

## Features
- **City progression:** Advance the month as you loop through major U.S. cities.
- **Deals marketplace:** Browse randomly surfaced properties and purchase when your funds allow.
- **Portfolio management:** Rent out properties (post-rehab) or sell to realize gains.
- **Dice-driven outcomes:** Use a simple modal dice mechanic for rent and sale results.
- **Event system:** Profession-weighted random events that affect your bank balance.
- **Actionable feedback:** Non-blocking toast notifications for actions and outcomes.
- **Polished animations:** Smooth transitions, responsive UI motion, and celebratory moments that make each action feel satisfying.

## Tech Stack
- **Framework:** React 18 + TypeScript powered by Vite.
- **UI/UX:** Plain CSS modules in `src/styles`; React-Toastify for notifications.
- **Dice:** `react-dice-complete` for the dice modal.
- **Animations:** Framer Motion + Lottie.

## Getting Started
### Requirements
- Node.js 18+ (20+ recommended)
- npm 9+

### Installation
```bash
npm install
```

### Development
Start the Vite dev server:
```bash
npm run dev
```
Vite will print a local URL (and a network URL if available).

### Production Build & Preview
```bash
npm run build
npm run preview
```
`preview` serves the production build from `/dist`.

### Scripts
- `npm run dev` – start the Vite dev server
- `npm run build` – typecheck then build
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint

## Docker
### Build the production image
```bash
docker build -t empire-trail .
```
This multi-stage image runs `npm ci`, builds the Vite app, and serves the static `/dist` assets from `nginx`.

### Run the container
```bash
docker run --rm -p 4173:80 empire-trail
```
Browse to `http://localhost:4173`. Adjust the host port as needed; Nginx continues to listen on port `80` inside the container.

### Dev container (optional)
The `docker-compose.dev.yml` file runs the Vite dev server inside `node:20-alpine` with hot reloads:
```bash
docker compose -f docker-compose.dev.yml up
```
The project folder is bind-mounted, so editor changes on the host instantly reflect inside the container. Use `Ctrl+C` (or `docker compose ... down`) to stop the dev container.

## Project Structure
```
src/
  animations/
    motionPresets.ts
  assets/
    gameData.ts
    lottieAnimations/
  components/
    App.tsx
    LottieOverlay.tsx
    GameInfoScreen.tsx
    PlayerSelectScreen.tsx
    CityScreen.tsx
    DealsScreen.tsx
    PortfolioScreen.tsx
    DiceRollModal.tsx
    EventScreen.tsx
  styles/
    *.css                    # component CSS (responsive)
```

## Gameplay Overview
- Properties include purchase/closing/renovation costs, rehab time, ARV rent/sale, and rental status.
- Rehab gating: rent/sell actions unlock after `purchaseMonth + renovationTime`.
- Events add or subtract from the bank balance, influenced by the chosen profession.
- A single `<ToastContainer />` is mounted in `App.tsx` for global notifications.

## Animations
Empire Trail uses a lightweight animation system to add “game feel” without turning the project into a full game engine.

- **UI motion:** Screen transitions, modals, button feedback, and list reveals keep navigation feeling fast and modern.
- **Action moments:** Full-screen, non-blocking Lottie overlays highlight key moments (travel, deal closure, income, and other wins).
- **Accessibility:** Animations respect `prefers-reduced-motion` so players who prefer less motion get a calmer experience.

### Adding your own Lottie animations
- Drop exported `.json` files into `src/assets/lottieAnimations/`.
- Re-export them from `src/assets/lottieAnimations/index.ts`.
- Trigger them via the shared overlay component in `src/components/LottieOverlay.tsx`.

## Deploying to Railway
1. Create a new Railway project and link your GitHub repo.
2. Configure build and start commands in the Railway service:
   - **Build:** `npm run build`
   - **Start:** `npm run preview -- --host 0.0.0.0 --port $PORT`
3. Railway sets `$PORT` automatically; the start command binds to it.
4. Deploy by pushing to your default branch; Railway will build and deploy.

If you prefer a Node static server, you can serve `/dist` with Express, but `npm run preview` is usually simpler for this project.

## Troubleshooting
- **TypeScript: missing fields on `InvestmentProperty`:** If you define properties in `gameData.ts` without `purchaseMonth`/`purchaseYear`, keep them optional (e.g., `purchaseMonth?: number | null;`) and default to safe checks in UI:
  ```ts
  currentMonth >= (property.purchaseMonth ?? 0) + property.renovationTime
  ```
- **Toast errors:** Ensure only one `<ToastContainer />` is rendered (kept in `App.tsx`).
- **Lottie build warnings:** Bundlers may warn about `lottie-web` and larger JS chunks; this is expected when adding richer animations.
- **Vite/Port issues on Railway:** Use `npm run preview -- --host 0.0.0.0 --port $PORT`.

## Roadmap
- Mobile-first and medium-breakpoint refinements across screens
- Currency compaction (e.g., $20,000 → $20K) and number formatting utilities
- More contextual animations (new events, achievements, and UI polish)
- Deeper event variety and profession balancing
- Save/Load game state
