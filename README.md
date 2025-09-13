Empire Trail

A lightweight, turn-based real-estate strategy game built with React + TypeScript + Vite. Travel city to city, evaluate deals, manage your portfolio, and react to random events—then try to grow your bank balance over time.

Features

City loop: Advance the month as you travel through major US cities.

Deals marketplace: Browse randomly surfaced properties and purchase when funds allow.

Portfolio management: Rent out properties (post-rehab) or sell to realize gains.

Dice-based actions: Simple modal dice mechanic for rent/sale outcomes.

Event system: Profession-weighted random events that affect your bank balance.

Toasts for feedback: Non-blocking notifications for actions and outcomes.

Tech Stack

Frontend: React 18, TypeScript, Vite

UI/UX: Plain CSS modules in /src/styles, React-Toastify for notifications

Dice: react-dice-complete

Getting Started
Requirements

Node.js 18+ (20+ recommended)

npm 9+

Install
npm install

Development
npm run dev


Vite will print a local URL (and a network URL if available).

Production Build & Preview
npm run build
npm run preview


preview serves the production build in /dist.

Scripts

npm run dev – start Vite dev server

npm run build – typecheck then build

npm run preview – preview the production build

npm run lint – run ESLint

src/
  assets/
    gameData.ts              # events, InvestmentProperty seed data & types
  components/
    App.tsx                  # top-level state & navigation
    GameInfoScreen.tsx       # intro screen
    PlayerSelectScreen.tsx   # choose profession
    CityScreen.tsx           # travel/rest/events & stats
    DealsScreen.tsx          # property marketplace
    PortfolioScreen.tsx      # manage holdings, rent/sell actions
    DiceRollModal.tsx        # dice modal for outcomes
    EventScreen.tsx          # shows event details
  styles/
    *.css                    # component CSS (responsive)



Gameplay Notes

Properties include purchase/closing/renovation costs, rehab time, ARV rent/sale, and rental status.

Rehab gating: Rent/Sell actions unlock after purchaseMonth + renovationTime.

Events add or subtract from bank balance, influenced by the chosen profession.

Toasts: A single <ToastContainer /> is mounted in App.tsx for global notifications.

Deploying to Railway

Create a new Railway project and link your GitHub repo.

Set the build & start commands in the Railway service:

Build: npm run build

Start: npm run preview -- --host 0.0.0.0 --port $PORT

Environment: Railway sets $PORT automatically; the command above binds to it.

Deploy: Push to your default branch; Railway will build and deploy.

If you prefer a Node static server, you can serve /dist with Express. The Vite preview command above is usually simpler for this project.

Troubleshooting

TypeScript: missing fields on InvestmentProperty

If you define properties in gameData.ts without purchaseMonth/purchaseYear, keep them optional (e.g., purchaseMonth?: number | null;) and default to safe checks in UI:
currentMonth >= (property.purchaseMonth ?? 0) + property.renovationTime

Toast errors

Ensure only one <ToastContainer /> is rendered (we keep it in App.tsx).

Vite/Port issues on Railway

Use: npm run preview -- --host 0.0.0.0 --port $PORT

Roadmap

Mobile-first and medium-breakpoint refinements across screens

Currency compaction (e.g., $20,000 → $20K) and number formatting utils

Animations for month advances, dice rolls, and success states

Deeper event variety and profession balancing

Save/Load game state
