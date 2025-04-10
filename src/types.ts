/**
 * This file contains all type definitions for the Empire Trail game.
 * Following OOP principles, we define interfaces for all major game entities.
 */

/**
 * Interface for Player class
 * Represents a player in the game with their profession, bank balance, and salary
 */
export interface Player {
  profession: string;
  bankBalance: number;
  salary: number;
  location?: City; // Current location of the player
  inventory?: Item[]; // Items collected by the player
}

/**
 * Interface for Event class
 * Represents an event that can occur during gameplay
 */
export interface Event {
  type: "Very Good" | "Good" | "Neutral" | "Bad" | "Very Bad";
  description: string;
  bankBalanceChange: number;
  professionProbabilities?: {
    [profession: string]: number;
  };
}

/**
 * Interface for InvestmentProperty class
 * Represents a property that can be purchased, renovated, and rented or sold
 */
export interface InvestmentProperty {
  id: string;
  name: string;
  purchaseCost: number;
  closingCost: number;
  renovationCost: number;
  renovationTime: number;
  arvRentalIncome: number;
  isRented: boolean;
  monthlyExpenses: number;
  arvSalePrice: number;
  purchaseMonth?: number;
  purchaseYear?: number;
  location?: City; // The city where the property is located
}

/**
 * Interface for City class
 * Represents a location in the game that the player can visit
 */
export interface City {
  name: string;
  description?: string;
  availableProperties?: InvestmentProperty[]; // Properties available in this city
}

/**
 * Interface for Item class
 * Represents items that can be collected and used by the player
 */
export interface Item {
  id: string;
  name: string;
  description: string;
  quantity: number;
  weight: number;
  value: number;
  canBeUsed: boolean;
  use?: (player: Player) => void; // Function to define what happens when item is used
}

/**
 * Interface for Action class
 * Represents actions that can be performed by the player
 */
export interface Action {
  name: string;
  description: string;
  perform: (player: Player, ...args: unknown[]) => void;
}

/**
 * Interface for Game class
 * Represents the overall game state and logic
 */
export interface Game {
  player: Player | null;
  currentMonth: number;
  gameState: GameState;
  portfolio: InvestmentProperty[];
  currentEvent: Event | null;
  currentCity: City;
  cities: City[];
  events: Event[];
  availableProperties: InvestmentProperty[];
  currentBankBalance: number;
}

/**
 * Type for possible game states
 */
export type GameState =
  | "gameInfo"
  | "playerSelect"
  | "city"
  | "portfolio"
  | "deals"
  | "event";

/**
 * Type for player professions
 */
export type Profession =
  | "Carpenter"
  | "Banker"
  | "Realtor"
  | "Plumber"
  | "Electrician"
  | "Accountant";

/**
 * Type for property types
 */
export type PropertyType =
  | "Apartment"
  | "Condo"
  | "Duplex"
  | "Townhome"
  | "House"
  | "Mansion"
  | "Estate";

/**
 * Type for player actions
 */
export type PlayerAction =
  | "travel"
  | "rest"
  | "viewPortfolio"
  | "findDeals"
  | "purchaseProperty";
