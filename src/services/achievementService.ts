import {
  Achievement,
  PlayerStats,
  InvestmentProperty,
  City,
  PropertyType,
} from "../types";
import { achievements } from "../assets/achievements";
import { logger } from "./logger";

/* Achievement Service

This service handles all achievement-related functionality including:
- Tracking player statistics
- Validating achievement criteria
- Unlocking achievements
- Calculating progress
- Managing achievement state

*/

export class AchievementService {
  private static instance: AchievementService;
  private unlockedAchievements: Set<string> = new Set();
  private onAchievementUnlocked?: (achievement: Achievement) => void;

  private constructor() {
    this.loadUnlockedAchievements();
  }

  public static getInstance(): AchievementService {
    if (!AchievementService.instance) {
      AchievementService.instance = new AchievementService();
    }
    return AchievementService.instance;
  }

  /* Set callback for when achievements are unlocked */
  public setAchievementUnlockedCallback(
    callback: (achievement: Achievement) => void
  ): void {
    this.onAchievementUnlocked = callback;
  }

  /* Initialize player stats for a new game */
  public initializePlayerStats(): PlayerStats {
    logger.info("🎯 Initializing player statistics for achievement tracking");

    return {
      totalPropertiesPurchased: 0,
      totalPropertiesSold: 0,
      totalPropertiesRented: 0,
      totalRevenue: 0,
      totalProfit: 0,
      totalInvestment: 0,
      currentNetWorth: 0,
      currentMonthlyIncome: 0,
      citiesVisited: [],
      propertiesByType: {},
      propertiesByCity: {},
      longestPropertyHeld: 0,
      fastestFlip: Infinity,
      highestROI: 0,
      consecutiveSuccessfulRolls: 0,
      totalDiceRolls: 0,
      successfulDiceRolls: 0,
      gameStartTime: Date.now(),
      totalPlayTime: 0,
    };
  }

  /* Update player stats when a property is purchased */
  public updateStatsOnPropertyPurchase(
    stats: PlayerStats,
    property: InvestmentProperty,
    currentBankBalance: number
  ): PlayerStats {
    logger.info(`🏠 Updating stats for property purchase: ${property.name}`);

    const updatedStats = { ...stats };
    updatedStats.totalPropertiesPurchased += 1;
    updatedStats.totalInvestment +=
      property.purchaseCost + property.closingCost + property.renovationCost;
    updatedStats.currentNetWorth = this.calculateNetWorth(currentBankBalance, [
      property,
    ]);

    // Update property type count
    const propertyType = this.getPropertyTypeFromName(property.name);
    if (propertyType) {
      updatedStats.propertiesByType[propertyType] =
        (updatedStats.propertiesByType[propertyType] || 0) + 1;
    }

    // Update city count
    if (property.location) {
      updatedStats.propertiesByCity[property.location.name] =
        (updatedStats.propertiesByCity[property.location.name] || 0) + 1;
    }

    return updatedStats;
  }

  /* Update player stats when a property is sold */
  public updateStatsOnPropertySale(
    stats: PlayerStats,
    property: InvestmentProperty,
    currentBankBalance: number,
    portfolio: InvestmentProperty[]
  ): PlayerStats {
    logger.info(`💰 Updating stats for property sale: ${property.name}`);

    const updatedStats = { ...stats };
    updatedStats.totalPropertiesSold += 1;
    updatedStats.totalRevenue += property.arvSalePrice;

    // Calculate profit from this sale
    const totalInvestment =
      property.purchaseCost + property.closingCost + property.renovationCost;
    const profit = property.arvSalePrice - totalInvestment;
    updatedStats.totalProfit += profit;

    // Calculate ROI
    const roi = (profit / totalInvestment) * 100;
    if (roi > updatedStats.highestROI) {
      updatedStats.highestROI = roi;
    }

    // Update net worth
    updatedStats.currentNetWorth = this.calculateNetWorth(
      currentBankBalance,
      portfolio
    );

    return updatedStats;
  }

  /* Update player stats when a property is rented */
  public updateStatsOnPropertyRent(
    stats: PlayerStats,
    property: InvestmentProperty,
    currentBankBalance: number,
    portfolio: InvestmentProperty[]
  ): PlayerStats {
    logger.info(`🔑 Updating stats for property rental: ${property.name}`);

    const updatedStats = { ...stats };
    updatedStats.totalPropertiesRented += 1;
    updatedStats.currentMonthlyIncome = this.calculateMonthlyIncome(portfolio);
    updatedStats.currentNetWorth = this.calculateNetWorth(
      currentBankBalance,
      portfolio
    );

    return updatedStats;
  }

  /* Update player stats when visiting a city */
  public updateStatsOnCityVisit(stats: PlayerStats, city: City): PlayerStats {
    logger.info(`🗺️ Updating stats for city visit: ${city.name}`);

    const updatedStats = { ...stats };
    if (!updatedStats.citiesVisited.includes(city.name)) {
      updatedStats.citiesVisited.push(city.name);
    }

    return updatedStats;
  }

  /* Update player stats for dice rolls */
  public updateStatsOnDiceRoll(
    stats: PlayerStats,
    isSuccess: boolean
  ): PlayerStats {
    logger.info(
      `🎲 Updating stats for dice roll: ${isSuccess ? "success" : "failure"}`
    );

    const updatedStats = { ...stats };
    updatedStats.totalDiceRolls += 1;

    if (isSuccess) {
      updatedStats.successfulDiceRolls += 1;
      updatedStats.consecutiveSuccessfulRolls += 1;
    } else {
      updatedStats.consecutiveSuccessfulRolls = 0;
    }

    return updatedStats;
  }

  /* Update play time */
  public updatePlayTime(stats: PlayerStats): PlayerStats {
    const updatedStats = { ...stats };
    updatedStats.totalPlayTime = Math.floor(
      (Date.now() - updatedStats.gameStartTime) / 60000
    ); // Convert to minutes
    return updatedStats;
  }

  /* Check and unlock achievements based on current stats */
  public checkAchievements(
    stats: PlayerStats,
    currentBankBalance: number,
    portfolio: InvestmentProperty[]
  ): Achievement[] {
    logger.info("🔍 Checking achievements for potential unlocks");

    const newlyUnlocked: Achievement[] = [];
    const currentAchievements = this.getCurrentAchievements();

    for (const achievement of currentAchievements) {
      // Skip already unlocked achievements - they cannot be re-unlocked
      if (achievement.isUnlocked) continue;

      const progress = this.calculateAchievementProgress(
        achievement,
        stats,
        currentBankBalance,
        portfolio
      );
      const wasUnlocked = achievement.isUnlocked;

      // Update progress
      achievement.progress = Math.min(progress, achievement.maxProgress);

      // Check if achievement should be unlocked (only if not already unlocked)
      if (progress >= achievement.maxProgress && !wasUnlocked) {
        this.unlockAchievement(achievement);
        newlyUnlocked.push(achievement);
        logger.info(`🏆 Achievement unlocked: ${achievement.name}`);
      }
    }

    return newlyUnlocked;
  }

  /* Calculate progress for a specific achievement */
  private calculateAchievementProgress(
    achievement: Achievement,
    stats: PlayerStats,
    currentBankBalance: number,
    portfolio: InvestmentProperty[]
  ): number {
    const criteria = achievement.criteria;

    switch (criteria.type) {
      case "purchase_property":
        return Math.min(stats.totalPropertiesPurchased, criteria.target);

      case "sell_property":
        return Math.min(stats.totalPropertiesSold, criteria.target);

      case "rent_property":
        return Math.min(stats.totalPropertiesRented, criteria.target);

      case "reach_bank_balance":
        return Math.min(currentBankBalance, criteria.target);

      case "reach_net_worth":
        const netWorth = this.calculateNetWorth(currentBankBalance, portfolio);
        return Math.min(netWorth, criteria.target);

      case "visit_city":
        return Math.min(stats.citiesVisited.length, criteria.target);

      case "own_property_type":
        if (criteria.property?.propertyTypes) {
          const count = criteria.property.propertyTypes.reduce(
            (total, type) => {
              return total + (stats.propertiesByType[type] || 0);
            },
            0
          );
          return Math.min(count, criteria.target);
        }
        return Math.min(portfolio.length, criteria.target);

      case "own_properties_in_city":
        if (criteria.property?.cities) {
          const count = criteria.property.cities.reduce((total, cityName) => {
            return total + (stats.propertiesByCity[cityName] || 0);
          }, 0);
          return Math.min(count, criteria.target);
        }
        return Math.min(portfolio.length, criteria.target);

      case "flip_property":
        return Math.min(stats.totalPropertiesSold, criteria.target);

      case "hold_property_duration":
        return Math.min(stats.longestPropertyHeld, criteria.target);

      case "achieve_roi":
        return Math.min(stats.highestROI, criteria.target);

      case "dice_rolls":
        return Math.min(stats.successfulDiceRolls, criteria.target);

      case "consecutive_successes":
        return Math.min(stats.consecutiveSuccessfulRolls, criteria.target);

      case "time_played":
        return Math.min(stats.totalPlayTime, criteria.target);

      case "properties_sold_value":
        return Math.min(stats.totalRevenue, criteria.target);

      case "monthly_income":
        const monthlyIncome = this.calculateMonthlyIncome(portfolio);
        return Math.min(monthlyIncome, criteria.target);

      case "portfolio_value":
        const portfolioValue = portfolio.reduce(
          (total, prop) => total + prop.arvSalePrice,
          0
        );
        return Math.min(portfolioValue, criteria.target);

      default:
        return 0;
    }
  }

  /* Calculate current net worth */
  private calculateNetWorth(
    bankBalance: number,
    portfolio: InvestmentProperty[]
  ): number {
    const portfolioValue = portfolio.reduce((total, property) => {
      return total + property.arvSalePrice;
    }, 0);
    return bankBalance + portfolioValue;
  }

  /* Calculate current monthly income */
  private calculateMonthlyIncome(portfolio: InvestmentProperty[]): number {
    return portfolio
      .filter((property) => property.isRented)
      .reduce((total, property) => total + property.arvRentalIncome, 0);
  }

  /* Get property type from property name */
  private getPropertyTypeFromName(name: string): PropertyType | null {
    const nameLower = name.toLowerCase();

    if (nameLower.includes("apartment")) return "Apartment";
    if (nameLower.includes("condo")) return "Condo";
    if (nameLower.includes("duplex")) return "Duplex";
    if (nameLower.includes("townhome")) return "Townhome";
    if (nameLower.includes("house")) return "House";
    if (nameLower.includes("mansion")) return "Mansion";
    if (nameLower.includes("estate") || nameLower.includes("palace"))
      return "Estate";

    return null;
  }

  /* Unlock an achievement */
  private unlockAchievement(achievement: Achievement): void {
    achievement.isUnlocked = true;
    achievement.unlockedAt = Date.now();
    this.unlockedAchievements.add(achievement.id);
    this.saveUnlockedAchievements();

    // Trigger callback if set
    if (this.onAchievementUnlocked) {
      this.onAchievementUnlocked(achievement);
    }
  }

  /* Get all achievements */
  public getCurrentAchievements(): Achievement[] {
    return achievements.map((achievement) => ({
      ...achievement,
      isUnlocked: this.unlockedAchievements.has(achievement.id),
    }));
  }

  /* Refresh all achievement progress based on current stats */
  public refreshAchievementProgress(
    stats: PlayerStats,
    currentBankBalance: number,
    portfolio: InvestmentProperty[]
  ): Achievement[] {
    // First check for any new achievements that might have been unlocked
    this.checkAchievements(stats, currentBankBalance, portfolio);
    
    const currentAchievements = this.getCurrentAchievements();

    return currentAchievements.map((achievement) => {
      const progress = this.calculateAchievementProgress(
        achievement,
        stats,
        currentBankBalance,
        portfolio
      );

      // For unlocked achievements, ensure progress is at max and status is preserved
      if (achievement.isUnlocked) {
        return {
          ...achievement,
          progress: achievement.maxProgress,
          isUnlocked: true,
        };
      }

      return {
        ...achievement,
        progress: Math.min(progress, achievement.maxProgress),
      };
    });
  }

  /* Get unlocked achievements */
  public getUnlockedAchievements(): Achievement[] {
    return this.getCurrentAchievements().filter(
      (achievement) => achievement.isUnlocked
    );
  }

  /* Get achievements by category */
  public getAchievementsByCategory(category: string): Achievement[] {
    return this.getCurrentAchievements().filter(
      (achievement) => achievement.category === category
    );
  }

  /* Get achievement progress summary */
  public getAchievementProgress(): {
    total: number;
    unlocked: number;
    byCategory: { [key: string]: { total: number; unlocked: number } };
  } {
    const allAchievements = this.getCurrentAchievements();
    const unlocked = allAchievements.filter((a) => a.isUnlocked);

    const byCategory: { [key: string]: { total: number; unlocked: number } } =
      {};

    allAchievements.forEach((achievement) => {
      if (!byCategory[achievement.category]) {
        byCategory[achievement.category] = { total: 0, unlocked: 0 };
      }
      byCategory[achievement.category].total += 1;
      if (achievement.isUnlocked) {
        byCategory[achievement.category].unlocked += 1;
      }
    });

    return {
      total: allAchievements.length,
      unlocked: unlocked.length,
      byCategory,
    };
  }

  /* Load unlocked achievements from localStorage */
  private loadUnlockedAchievements(): void {
    try {
      const saved = localStorage.getItem("empire_trail_unlocked_achievements");
      if (saved) {
        const unlocked = JSON.parse(saved);
        this.unlockedAchievements = new Set(unlocked);
        logger.info(`📚 Loaded ${unlocked.length} unlocked achievements`);
      }
    } catch (error) {
      logger.error("❌ Failed to load unlocked achievements:", error);
    }
  }

  /* Save unlocked achievements to localStorage */
  private saveUnlockedAchievements(): void {
    try {
      const unlocked = Array.from(this.unlockedAchievements);
      localStorage.setItem(
        "empire_trail_unlocked_achievements",
        JSON.stringify(unlocked)
      );
      logger.info(`💾 Saved ${unlocked.length} unlocked achievements`);
    } catch (error) {
      logger.error("❌ Failed to save unlocked achievements:", error);
    }
  }

  /* Reset all achievements (for testing or new game) */
  public resetAchievements(): void {
    this.unlockedAchievements.clear();
    this.saveUnlockedAchievements();
    logger.info("🔄 Reset all achievements");
  }

  /* Check if an achievement is permanently unlocked */
  public isAchievementPermanentlyUnlocked(achievementId: string): boolean {
    return this.unlockedAchievements.has(achievementId);
  }

  /* Get count of permanently unlocked achievements */
  public getPermanentlyUnlockedCount(): number {
    return this.unlockedAchievements.size;
  }

  /* Verify achievement persistence and prevent re-unlocking */
  public verifyAchievementPersistence(): void {
    const currentAchievements = this.getCurrentAchievements();
    const unlockedCount = currentAchievements.filter(a => a.isUnlocked).length;
    const savedCount = this.unlockedAchievements.size;
    
    if (unlockedCount !== savedCount) {
      logger.warn(`⚠️ Achievement count mismatch: ${unlockedCount} displayed vs ${savedCount} saved`);
    }
    
    // Verify that all saved achievements are marked as unlocked
    for (const achievementId of this.unlockedAchievements) {
      const achievement = currentAchievements.find(a => a.id === achievementId);
      if (achievement && !achievement.isUnlocked) {
        logger.error(`❌ Achievement ${achievementId} is saved but not marked as unlocked`);
      }
    }
    
    logger.info(`✅ Achievement persistence verified: ${unlockedCount} unlocked achievements`);
  }
}
