import { Achievement, AchievementCategory, AchievementRarity } from "../types";

/* Achievement Data for Empire Trail Real Estate Game

This file contains all the creative real estate themed achievements that players can unlock.
Achievements are organized by category and include various milestones that reflect real-world
real estate investing scenarios and goals.

*/

export const achievements: Achievement[] = [
  // ===== FINANCIAL ACHIEVEMENTS =====
  {
    id: "first_property",
    name: "First Property",
    description: "Purchase your very first investment property",
    category: "financial",
    rarity: "common",
    icon: "🏠",
    emoji: "🏠",
    criteria: {
      type: "purchase_property",
      target: 1,
    },
    reward: {
      type: "cash",
      value: 5000,
      description: "Bonus $5,000 for your first investment!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: "thousandaire",
    name: "Thousandaire",
    description: "Reach $100,000 in bank balance",
    category: "financial",
    rarity: "common",
    icon: "💰",
    emoji: "💰",
    criteria: {
      type: "reach_bank_balance",
      target: 100000,
    },
    reward: {
      type: "cash",
      value: 10000,
      description: "Bonus $10,000 for reaching six figures!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 100000,
  },
  {
    id: "millionaire",
    name: "Millionaire",
    description: "Reach $1,000,000 in net worth",
    category: "financial",
    rarity: "rare",
    icon: "💎",
    emoji: "💎",
    criteria: {
      type: "reach_net_worth",
      target: 1000000,
    },
    reward: {
      type: "cash",
      value: 50000,
      description: "Bonus $50,000 for becoming a millionaire!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 1000000,
  },
  {
    id: "multi_millionaire",
    name: "Multi-Millionaire",
    description: "Reach $5,000,000 in net worth",
    category: "financial",
    rarity: "epic",
    icon: "👑",
    emoji: "👑",
    criteria: {
      type: "reach_net_worth",
      target: 5000000,
    },
    reward: {
      type: "cash",
      value: 100000,
      description: "Bonus $100,000 for reaching multi-millionaire status!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 5000000,
  },
  {
    id: "passive_income_king",
    name: "Passive Income King",
    description: "Generate $50,000+ in monthly rental income",
    category: "financial",
    rarity: "epic",
    icon: "💸",
    emoji: "💸",
    criteria: {
      type: "monthly_income",
      target: 50000,
    },
    reward: {
      type: "bonus",
      value: 25000,
      description: "Bonus $25,000 for mastering passive income!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 50000,
  },

  // ===== PROPERTY ACHIEVEMENTS =====
  {
    id: "property_collector",
    name: "Property Collector",
    description: "Own 10 properties simultaneously",
    category: "property",
    rarity: "uncommon",
    icon: "🏘️",
    emoji: "🏘️",
    criteria: {
      type: "own_property_type",
      target: 10,
    },
    reward: {
      type: "cash",
      value: 15000,
      description: "Bonus $15,000 for building a diverse portfolio!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: "flip_master",
    name: "Flip Master",
    description: "Successfully flip 25 properties",
    category: "property",
    rarity: "rare",
    icon: "🔄",
    emoji: "🔄",
    criteria: {
      type: "flip_property",
      target: 25,
    },
    reward: {
      type: "cash",
      value: 30000,
      description: "Bonus $30,000 for mastering the art of flipping!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 25,
  },
  {
    id: "landlord_legend",
    name: "Landlord Legend",
    description: "Have 20 properties rented out simultaneously",
    category: "property",
    rarity: "rare",
    icon: "🏢",
    emoji: "🏢",
    criteria: {
      type: "rent_property",
      target: 20,
    },
    reward: {
      type: "cash",
      value: 40000,
      description: "Bonus $40,000 for becoming a legendary landlord!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 20,
  },
  {
    id: "luxury_specialist",
    name: "Luxury Specialist",
    description: "Own 5 luxury properties (Mansion, Estate, Palace)",
    category: "property",
    rarity: "epic",
    icon: "🏰",
    emoji: "🏰",
    criteria: {
      type: "own_property_type",
      target: 5,
      property: {
        propertyTypes: ["Mansion", "Estate"],
      },
    },
    reward: {
      type: "cash",
      value: 75000,
      description: "Bonus $75,000 for specializing in luxury real estate!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 5,
  },
  {
    id: "speed_flipper",
    name: "Speed Flipper",
    description: "Flip a property in 3 months or less",
    category: "property",
    rarity: "uncommon",
    icon: "⚡",
    emoji: "⚡",
    criteria: {
      type: "flip_property",
      target: 1,
      time: {
        maxMonths: 3,
      },
    },
    reward: {
      type: "cash",
      value: 8000,
      description: "Bonus $8,000 for lightning-fast flipping!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
  },

  // ===== EXPLORATION ACHIEVEMENTS =====
  {
    id: "coast_to_coast",
    name: "Coast to Coast",
    description: "Visit all 9 cities in the game",
    category: "exploration",
    rarity: "rare",
    icon: "🗺️",
    emoji: "🗺️",
    criteria: {
      type: "visit_city",
      target: 9,
    },
    reward: {
      type: "cash",
      value: 20000,
      description: "Bonus $20,000 for exploring the entire empire!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 9,
  },
  {
    id: "city_specialist_la",
    name: "LA Specialist",
    description: "Own 5 properties in Los Angeles",
    category: "exploration",
    rarity: "uncommon",
    icon: "🌴",
    emoji: "🌴",
    criteria: {
      type: "own_properties_in_city",
      target: 5,
      property: {
        cities: ["Los Angeles"],
      },
    },
    reward: {
      type: "cash",
      value: 12000,
      description: "Bonus $12,000 for dominating the LA market!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 5,
  },
  {
    id: "city_specialist_nyc",
    name: "NYC Specialist",
    description: "Own 5 properties in New York City",
    category: "exploration",
    rarity: "uncommon",
    icon: "🗽",
    emoji: "🗽",
    criteria: {
      type: "own_properties_in_city",
      target: 5,
      property: {
        cities: ["New York City"],
      },
    },
    reward: {
      type: "cash",
      value: 12000,
      description: "Bonus $12,000 for conquering the Big Apple!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 5,
  },
  {
    id: "empire_builder",
    name: "Empire Builder",
    description: "Own properties in 5 different cities",
    category: "exploration",
    rarity: "rare",
    icon: "🌍",
    emoji: "🌍",
    criteria: {
      type: "own_properties_in_city",
      target: 5,
    },
    reward: {
      type: "cash",
      value: 25000,
      description: "Bonus $25,000 for building a true empire!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 5,
  },

  // ===== SKILL ACHIEVEMENTS =====
  {
    id: "dice_master",
    name: "Dice Master",
    description: "Achieve 50 successful dice rolls",
    category: "skill",
    rarity: "uncommon",
    icon: "🎲",
    emoji: "🎲",
    criteria: {
      type: "dice_rolls",
      target: 50,
    },
    reward: {
      type: "cash",
      value: 10000,
      description: "Bonus $10,000 for mastering the dice!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 50,
  },
  {
    id: "lucky_streak",
    name: "Lucky Streak",
    description: "Get 10 consecutive successful dice rolls",
    category: "skill",
    rarity: "rare",
    icon: "🍀",
    emoji: "🍀",
    criteria: {
      type: "consecutive_successes",
      target: 10,
    },
    reward: {
      type: "cash",
      value: 15000,
      description: "Bonus $15,000 for an incredible lucky streak!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: "roi_champion",
    name: "ROI Champion",
    description: "Achieve 200% ROI on a single property",
    category: "skill",
    rarity: "epic",
    icon: "📈",
    emoji: "📈",
    criteria: {
      type: "achieve_roi",
      target: 200,
    },
    reward: {
      type: "cash",
      value: 50000,
      description: "Bonus $50,000 for exceptional investment skills!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 200,
  },
  {
    id: "patient_investor",
    name: "Patient Investor",
    description: "Hold a property for 24+ months",
    category: "skill",
    rarity: "uncommon",
    icon: "⏰",
    emoji: "⏰",
    criteria: {
      type: "hold_property_duration",
      target: 24,
    },
    reward: {
      type: "cash",
      value: 12000,
      description: "Bonus $12,000 for patient, long-term investing!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 24,
  },

  // ===== COLLECTION ACHIEVEMENTS =====
  {
    id: "apartment_tycoon",
    name: "Apartment Tycoon",
    description: "Own 10 apartment properties",
    category: "collection",
    rarity: "uncommon",
    icon: "🏢",
    emoji: "🏢",
    criteria: {
      type: "own_property_type",
      target: 10,
      property: {
        propertyTypes: ["Apartment"],
      },
    },
    reward: {
      type: "cash",
      value: 18000,
      description: "Bonus $18,000 for becoming an apartment tycoon!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: "house_hunter",
    name: "House Hunter",
    description: "Own 8 house properties",
    category: "collection",
    rarity: "uncommon",
    icon: "🏡",
    emoji: "🏡",
    criteria: {
      type: "own_property_type",
      target: 8,
      property: {
        propertyTypes: ["House"],
      },
    },
    reward: {
      type: "cash",
      value: 16000,
      description: "Bonus $16,000 for collecting houses!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 8,
  },
  {
    id: "condo_collector",
    name: "Condo Collector",
    description: "Own 6 condo properties",
    category: "collection",
    rarity: "uncommon",
    icon: "🏬",
    emoji: "🏬",
    criteria: {
      type: "own_property_type",
      target: 6,
      property: {
        propertyTypes: ["Condo"],
      },
    },
    reward: {
      type: "cash",
      value: 14000,
      description: "Bonus $14,000 for your condo collection!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 6,
  },

  // ===== MILESTONE ACHIEVEMENTS =====
  {
    id: "first_sale",
    name: "First Sale",
    description: "Sell your first property",
    category: "milestone",
    rarity: "common",
    icon: "💼",
    emoji: "💼",
    criteria: {
      type: "sell_property",
      target: 1,
    },
    reward: {
      type: "cash",
      value: 3000,
      description: "Bonus $3,000 for your first successful sale!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: "first_rental",
    name: "First Rental",
    description: "Rent out your first property",
    category: "milestone",
    rarity: "common",
    icon: "🔑",
    emoji: "🔑",
    criteria: {
      type: "rent_property",
      target: 1,
    },
    reward: {
      type: "cash",
      value: 2000,
      description: "Bonus $2,000 for your first rental income!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: "century_club",
    name: "Century Club",
    description: "Sell properties worth $1,000,000+ total",
    category: "milestone",
    rarity: "rare",
    icon: "💯",
    emoji: "💯",
    criteria: {
      type: "properties_sold_value",
      target: 1000000,
    },
    reward: {
      type: "cash",
      value: 35000,
      description: "Bonus $35,000 for joining the century club!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 1000000,
  },
  {
    id: "time_investor",
    name: "Time Investor",
    description: "Play for 2+ hours total",
    category: "milestone",
    rarity: "uncommon",
    icon: "⏳",
    emoji: "⏳",
    criteria: {
      type: "time_played",
      target: 120, // 2 hours in minutes
    },
    reward: {
      type: "cash",
      value: 8000,
      description: "Bonus $8,000 for your dedication!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 120,
  },

  // ===== SPECIAL ACHIEVEMENTS =====
  {
    id: "jackpot",
    name: "Jackpot",
    description: "Reach $10,000,000 in net worth",
    category: "special",
    rarity: "legendary",
    icon: "🎰",
    emoji: "🎰",
    criteria: {
      type: "reach_net_worth",
      target: 10000000,
    },
    reward: {
      type: "cash",
      value: 200000,
      description: "Bonus $200,000 for hitting the jackpot!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 10000000,
  },
  {
    id: "real_estate_mogul",
    name: "Real Estate Mogul",
    description: "Own 50 properties simultaneously",
    category: "special",
    rarity: "legendary",
    icon: "🏆",
    emoji: "🏆",
    criteria: {
      type: "own_property_type",
      target: 50,
    },
    reward: {
      type: "cash",
      value: 100000,
      description: "Bonus $100,000 for becoming a true mogul!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 50,
  },
  {
    id: "perfect_investor",
    name: "Perfect Investor",
    description: "Achieve 100% dice roll success rate with 20+ rolls",
    category: "special",
    rarity: "legendary",
    icon: "⭐",
    emoji: "⭐",
    criteria: {
      type: "dice_rolls",
      target: 20,
    },
    reward: {
      type: "cash",
      value: 75000,
      description: "Bonus $75,000 for perfect investment skills!",
    },
    isUnlocked: false,
    progress: 0,
    maxProgress: 20,
  },
];

/* Achievement Categories for UI Organization */
export const achievementCategories: {
  [key in AchievementCategory]: {
    name: string;
    description: string;
    color: string;
  };
} = {
  financial: {
    name: "Financial",
    description: "Money and wealth milestones",
    color: "#4CAF50",
  },
  property: {
    name: "Property",
    description: "Real estate ownership achievements",
    color: "#2196F3",
  },
  exploration: {
    name: "Exploration",
    description: "City and location achievements",
    color: "#FF9800",
  },
  skill: {
    name: "Skill",
    description: "Dice rolling and investment skills",
    color: "#9C27B0",
  },
  collection: {
    name: "Collection",
    description: "Property type collections",
    color: "#607D8B",
  },
  milestone: {
    name: "Milestone",
    description: "Major game progress markers",
    color: "#795548",
  },
  special: {
    name: "Special",
    description: "Legendary and rare achievements",
    color: "#FFD700",
  },
};

/* Rarity Colors for UI */
export const rarityColors: { [key in AchievementRarity]: string } = {
  common: "#9E9E9E",
  uncommon: "#4CAF50",
  rare: "#2196F3",
  epic: "#9C27B0",
  legendary: "#FFD700",
};
