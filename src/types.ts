/**
 * This file contains all type definitions for the Empire Trail game.
 * Following OOP principles, we define interfaces for all major game entities.
 */

/**
 * Interface for Player class
 * Represents a player in the game with their profession, bank balance, and salary
 */
export interface Player {
  profession: Profession;
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

/**
 * Interface for Achievement class
 * Represents an achievement that can be unlocked by the player
 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  icon: string;
  emoji: string;
  criteria: AchievementCriteria;
  reward?: AchievementReward;
  unlockedAt?: number; // timestamp when unlocked
  isUnlocked: boolean;
  progress: number; // 0-100 percentage
  maxProgress: number;
}

/**
 * Interface for Achievement Criteria
 * Defines the conditions that must be met to unlock an achievement
 */
export interface AchievementCriteria {
  type: AchievementCriteriaType;
  target: number;
  property?: {
    minValue?: number;
    maxValue?: number;
    propertyTypes?: PropertyType[];
    cities?: string[];
  };
  time?: {
    maxMonths?: number;
    minMonths?: number;
  };
  financial?: {
    minBankBalance?: number;
    maxBankBalance?: number;
    minNetWorth?: number;
    minMonthlyIncome?: number;
  };
}

/**
 * Interface for Achievement Reward
 * Defines what the player receives when unlocking an achievement
 */
export interface AchievementReward {
  type: "cash" | "bonus" | "unlock" | "title";
  value: number;
  description: string;
}

/**
 * Interface for Player Statistics
 * Tracks player progress for achievement calculations
 */
export interface PlayerStats {
  totalPropertiesPurchased: number;
  totalPropertiesSold: number;
  totalPropertiesRented: number;
  totalRevenue: number;
  totalProfit: number;
  totalInvestment: number;
  currentNetWorth: number;
  currentMonthlyIncome: number;
  citiesVisited: string[];
  propertiesByType: { [key in PropertyType]?: number };
  propertiesByCity: { [cityName: string]: number };
  longestPropertyHeld: number; // in months
  fastestFlip: number; // in months
  highestROI: number;
  consecutiveSuccessfulRolls: number;
  totalDiceRolls: number;
  successfulDiceRolls: number;
  gameStartTime: number;
  totalPlayTime: number; // in minutes
}

/**
 * Type for achievement categories
 */
export type AchievementCategory =
  | "financial"
  | "property"
  | "exploration"
  | "skill"
  | "collection"
  | "milestone"
  | "special";

/**
 * Type for achievement rarity levels
 */
export type AchievementRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary";

/**
 * Type for achievement criteria types
 */
export type AchievementCriteriaType =
  | "purchase_property"
  | "sell_property"
  | "rent_property"
  | "reach_bank_balance"
  | "reach_net_worth"
  | "visit_city"
  | "own_property_type"
  | "own_properties_in_city"
  | "flip_property"
  | "hold_property_duration"
  | "achieve_roi"
  | "dice_rolls"
  | "consecutive_successes"
  | "time_played"
  | "properties_sold_value"
  | "monthly_income"
  | "portfolio_value";

/**
 * Interface for SaveGame class
 * Represents a saved game with metadata and complete game state
 */
export interface SaveGame {
  id: string;
  name: string;
  timestamp: number;
  player: Player | null;
  currentMonth: number;
  portfolio: InvestmentProperty[];
  currentEvent: Event | null;
  currentBankBalance: number;
  currentCity: City;
  gameState: GameState;
  version: string;
  achievements?: Achievement[];
  playerStats?: PlayerStats;
}
