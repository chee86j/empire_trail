Empire Trail

A React + TypeScript, Vite-powered strategy game where you grow wealth by traveling city-to-city, buying distressed properties, renovating, renting, and selling — all while reacting to random life events.


---

✨ Features

Player professions with different starting cash & salaries

City travel loop with month & year progression (starting 2008)

Deals marketplace with ROI calculation

Portfolio management (rent/sell actions gated by rehab time)

Random events that affect your bank balance

Dice-based outcomes via react-dice-complete

Toasts & notifications with react-toastify

Responsive UI: improved layouts for medium and small screens



---

🧰 Tech Stack

UI: React 18, TypeScript, Vite

UX: react-toastify, custom CSS

Game UI: react-dice-complete



---

🚀 Getting Started

Prerequisites

Node.js 18+

npm 9+


Install

npm ci

Run (dev)

npm run dev

Vite will print a local URL (usually http://localhost:5173).

Build (production)

npm run build

Preview the production build locally

npm run preview


---

☁️ Deploying to Railway

Recommended settings:

Install Command: npm ci

Build Command: npm run build

Start Command: npm run preview -- --host --port $PORT


> vite preview serves the built app. The --host and --port $PORT flags ensure Railway binds to the right interface and port.



No environment variables are required.


---

🗂️ Project Structure (high level)

src/
  assets/
    gameData.ts          # Core data & interfaces (InvestmentProperty, events, properties)
  components/
    App.tsx              # Main state & screen routing
    CityScreen.tsx       # Travel, events, dates, stats
    DealsScreen.tsx      # Property marketplace + ROI calc
    PortfolioScreen.tsx  # Owned properties; rent/sell via dice modal
    DiceRollModal.tsx    # Dice roll overlay (success/fail gating)
    EventScreen.tsx      # Random event details
    GameInfoScreen.tsx   # Intro / start
    PlayerSelectScreen.tsx # Pick a profession
  styles/
    *.css                # Responsive styles


---

🧮 Core Types

export interface InvestmentProperty {
  id: string;
  name: string;
  purchaseCost: number;
  closingCost: number;
  renovationCost: number;
  renovationTime: number;       // in months
  arvRentalIncome: number;      // monthly rent after repair
  monthlyExpenses: number;      // taxes, maintenance, etc.
  arvSalePrice: number;
  isRented: boolean;

  // These remain *empty* on seed data, set later when purchased
  purchaseMonth?: number;       // set when the player buys the property
  purchaseYear?: number;        // (optional) derived from the starting year + months progressed
}

> Seeded properties in gameData.ts intentionally omit purchaseMonth/purchaseYear. Components should defensively handle undefined (e.g., treat missing purchaseMonth as 0 when gating actions).




---

🕹️ Gameplay Notes

Travel / Rest: advance the month and progress time-bound actions (e.g., rehab time).

Events: selected based on profession-weighted probabilities and can change your bank balance.

Deals: choose a property if you have enough cash (purchase + closing + renovation).

Portfolio: after rehab time, you can Rent (mark isRented: true) or Sell (bank proceeds and remove from portfolio).

Dice rolls: success is decided by roll parity/sets; feedback shown via toasts.



---

📱 Responsive Design

Medium screens (769–1024px): tables become horizontally scrollable with table-container, font sizes scale down slightly, buttons stack when needed.

Small screens (≤768px): tighter spacing, single-column button groups, shortened number formatting possible (e.g., $20K).

Buttons in table cells use a .button-container with wrapping and consistent gaps for touch ergonomics.



---

🔔 Toasts & Error Handling

A single <ToastContainer /> is mounted once at the root (in App.tsx).

Avoid placing additional containers in child screens to prevent react-toastify runtime errors.

If you previously saw “Cannot set properties of undefined (setting 'toggle')”, ensure:

Only one <ToastContainer /> exists.

You’re on a recent react-toastify version (v10+ recommended).




---

🧩 Common Fixes / Tips

TypeScript errors for missing purchaseMonth/purchaseYear: keep them optional in the interface and only set them on purchase. Components should guard with ?? 0 when comparing.

Props mismatches: ensure each screen’s props match their TypeScript interfaces (e.g., remove unused props like setInvestmentProperties if no longer required).

Strict typing: prefer typing portfolio as InvestmentProperty[] instead of any[].



---

🛣️ Roadmap Ideas

Animated city transitions (slide/fade)

Dice roll micro-interaction (scale/bounce)

Event card motion (spring-in/out)

Confetti on big wins (e.g., selling above ARV)

Sound feedback (toggleable in settings)

Save/load game state (localStorage)



---

🤝 Contributing

1. Fork the repo


2. Create a feature branch: git checkout -b feat/your-idea


3. Commit your changes: git commit -m "feat: add your idea"


4. Push and open a PR




---

📝 License

MIT — see LICENSE (or update to your preferred license).


---

🙌 Acknowledgements

Dice UI by react-dice-complete

Toast notifications by react-toastify

Built with React + Vite + TypeScript


