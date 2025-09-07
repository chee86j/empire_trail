import { InvestmentProperty, PropertyType } from "../types";

/**
 * Property Search and Filter Service
 *
 * Provides comprehensive search and filtering capabilities for investment properties
 * following the DRY principle and modular design patterns.
 */

export interface PropertySearchFilters {
  searchTerm: string;
  minPurchaseCost: number;
  maxPurchaseCost: number;
  minRenovationCost: number;
  maxRenovationCost: number;
  minRenovationTime: number;
  maxRenovationTime: number;
  minRentalIncome: number;
  maxRentalIncome: number;
  minSalePrice: number;
  maxSalePrice: number;
  minROI: number;
  maxROI: number;
  propertyTypes: PropertyType[];
  cities: string[];
  isRented?: boolean; // For portfolio filtering
  isReadyForAction?: boolean; // For portfolio filtering
}

export interface PropertySortOptions {
  field:
    | "name"
    | "purchaseCost"
    | "renovationCost"
    | "renovationTime"
    | "arvRentalIncome"
    | "arvSalePrice"
    | "roi";
  direction: "asc" | "desc";
}

export class PropertySearchService {
  /**
   * Search properties by name using fuzzy matching
   */
  private static searchByName(
    properties: InvestmentProperty[],
    searchTerm: string
  ): InvestmentProperty[] {
    if (!searchTerm.trim()) return properties;

    const term = searchTerm.toLowerCase().trim();
    return properties.filter((property) =>
      property.name.toLowerCase().includes(term)
    );
  }

  /**
   * Filter properties by numeric range
   */
  private static filterByRange(
    properties: InvestmentProperty[],
    getValue: (property: InvestmentProperty) => number,
    min: number,
    max: number
  ): InvestmentProperty[] {
    return properties.filter((property) => {
      const value = getValue(property);
      return value >= min && value <= max;
    });
  }

  /**
   * Calculate ROI for a property
   */
  private static calculateROI(property: InvestmentProperty): number {
    const totalInvestment =
      property.purchaseCost + property.closingCost + property.renovationCost;
    const netProfit = property.arvSalePrice - totalInvestment;
    return (netProfit / totalInvestment) * 100;
  }

  /**
   * Extract property type from property name
   */
  private static extractPropertyType(propertyName: string): PropertyType {
    const name = propertyName.toLowerCase();

    if (
      name.includes("mansion") ||
      name.includes("estate") ||
      name.includes("palace")
    ) {
      return "Mansion";
    } else if (
      name.includes("house") ||
      name.includes("home") ||
      name.includes("bungalow")
    ) {
      return "House";
    } else if (name.includes("townhome") || name.includes("townhouse")) {
      return "Townhome";
    } else if (name.includes("duplex")) {
      return "Duplex";
    } else if (name.includes("condo") || name.includes("penthouse")) {
      return "Condo";
    } else if (
      name.includes("apartment") ||
      name.includes("loft") ||
      name.includes("studio")
    ) {
      return "Apartment";
    }

    return "House"; // Default fallback
  }

  /**
   * Extract city from property name or location
   */
  private static extractCity(property: InvestmentProperty): string {
    if (property.location?.name) {
      return property.location.name;
    }

    const name = property.name.toLowerCase();
    if (name.includes("downtown") || name.includes("urban")) {
      return "Urban";
    } else if (name.includes("suburban") || name.includes("suburbian")) {
      return "Suburban";
    } else if (name.includes("lakeside") || name.includes("lake")) {
      return "Lakeside";
    } else if (name.includes("uptown")) {
      return "Uptown";
    }

    return "Unknown";
  }

  /**
   * Apply all filters to properties
   */
  static filterProperties(
    properties: InvestmentProperty[],
    filters: PropertySearchFilters
  ): InvestmentProperty[] {
    let filteredProperties = [...properties];

    // Search by name
    filteredProperties = this.searchByName(
      filteredProperties,
      filters.searchTerm
    );

    // Filter by purchase cost range
    filteredProperties = this.filterByRange(
      filteredProperties,
      (p) => p.purchaseCost,
      filters.minPurchaseCost,
      filters.maxPurchaseCost
    );

    // Filter by renovation cost range
    filteredProperties = this.filterByRange(
      filteredProperties,
      (p) => p.renovationCost,
      filters.minRenovationCost,
      filters.maxRenovationCost
    );

    // Filter by renovation time range
    filteredProperties = this.filterByRange(
      filteredProperties,
      (p) => p.renovationTime,
      filters.minRenovationTime,
      filters.maxRenovationTime
    );

    // Filter by rental income range
    filteredProperties = this.filterByRange(
      filteredProperties,
      (p) => p.arvRentalIncome,
      filters.minRentalIncome,
      filters.maxRentalIncome
    );

    // Filter by sale price range
    filteredProperties = this.filterByRange(
      filteredProperties,
      (p) => p.arvSalePrice,
      filters.minSalePrice,
      filters.maxSalePrice
    );

    // Filter by ROI range
    filteredProperties = this.filterByRange(
      filteredProperties,
      (p) => this.calculateROI(p),
      filters.minROI,
      filters.maxROI
    );

    // Filter by property types
    if (filters.propertyTypes.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        filters.propertyTypes.includes(this.extractPropertyType(property.name))
      );
    }

    // Filter by cities
    if (filters.cities.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        filters.cities.includes(this.extractCity(property))
      );
    }

    // Filter by rental status (for portfolio)
    if (filters.isRented !== undefined) {
      filteredProperties = filteredProperties.filter(
        (property) => property.isRented === filters.isRented
      );
    }

    return filteredProperties;
  }

  /**
   * Sort properties by specified field and direction
   */
  static sortProperties(
    properties: InvestmentProperty[],
    sortOptions: PropertySortOptions
  ): InvestmentProperty[] {
    return [...properties].sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortOptions.field) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "purchaseCost":
          aValue = a.purchaseCost;
          bValue = b.purchaseCost;
          break;
        case "renovationCost":
          aValue = a.renovationCost;
          bValue = b.renovationCost;
          break;
        case "renovationTime":
          aValue = a.renovationTime;
          bValue = b.renovationTime;
          break;
        case "arvRentalIncome":
          aValue = a.arvRentalIncome;
          bValue = b.arvRentalIncome;
          break;
        case "arvSalePrice":
          aValue = a.arvSalePrice;
          bValue = b.arvSalePrice;
          break;
        case "roi":
          aValue = this.calculateROI(a);
          bValue = this.calculateROI(b);
          break;
        default:
          return 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOptions.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      const numA = Number(aValue);
      const numB = Number(bValue);

      return sortOptions.direction === "asc" ? numA - numB : numB - numA;
    });
  }

  /**
   * Get default filter values
   */
  static getDefaultFilters(): PropertySearchFilters {
    return {
      searchTerm: "",
      minPurchaseCost: 0,
      maxPurchaseCost: Number.MAX_SAFE_INTEGER,
      minRenovationCost: 0,
      maxRenovationCost: Number.MAX_SAFE_INTEGER,
      minRenovationTime: 0,
      maxRenovationTime: 100,
      minRentalIncome: 0,
      maxRentalIncome: Number.MAX_SAFE_INTEGER,
      minSalePrice: 0,
      maxSalePrice: Number.MAX_SAFE_INTEGER,
      minROI: -100,
      maxROI: 1000,
      propertyTypes: [],
      cities: [],
    };
  }

  /**
   * Get available property types from properties
   */
  static getAvailablePropertyTypes(
    properties: InvestmentProperty[]
  ): PropertyType[] {
    const types = new Set<PropertyType>();
    properties.forEach((property) => {
      types.add(this.extractPropertyType(property.name));
    });
    return Array.from(types).sort();
  }

  /**
   * Get available cities from properties
   */
  static getAvailableCities(properties: InvestmentProperty[]): string[] {
    const cities = new Set<string>();
    properties.forEach((property) => {
      cities.add(this.extractCity(property));
    });
    return Array.from(cities).sort();
  }

  /**
   * Get property statistics for filter ranges
   */
  static getPropertyStatistics(properties: InvestmentProperty[]): {
    minPurchaseCost: number;
    maxPurchaseCost: number;
    minRenovationCost: number;
    maxRenovationCost: number;
    minRenovationTime: number;
    maxRenovationTime: number;
    minRentalIncome: number;
    maxRentalIncome: number;
    minSalePrice: number;
    maxSalePrice: number;
    minROI: number;
    maxROI: number;
  } {
    if (properties.length === 0) {
      return {
        minPurchaseCost: 0,
        maxPurchaseCost: 0,
        minRenovationCost: 0,
        maxRenovationCost: 0,
        minRenovationTime: 0,
        maxRenovationTime: 0,
        minRentalIncome: 0,
        maxRentalIncome: 0,
        minSalePrice: 0,
        maxSalePrice: 0,
        minROI: 0,
        maxROI: 0,
      };
    }

    const rois = properties.map((p) => this.calculateROI(p));

    return {
      minPurchaseCost: Math.min(...properties.map((p) => p.purchaseCost)),
      maxPurchaseCost: Math.max(...properties.map((p) => p.purchaseCost)),
      minRenovationCost: Math.min(...properties.map((p) => p.renovationCost)),
      maxRenovationCost: Math.max(...properties.map((p) => p.renovationCost)),
      minRenovationTime: Math.min(...properties.map((p) => p.renovationTime)),
      maxRenovationTime: Math.max(...properties.map((p) => p.renovationTime)),
      minRentalIncome: Math.min(...properties.map((p) => p.arvRentalIncome)),
      maxRentalIncome: Math.max(...properties.map((p) => p.arvRentalIncome)),
      minSalePrice: Math.min(...properties.map((p) => p.arvSalePrice)),
      maxSalePrice: Math.max(...properties.map((p) => p.arvSalePrice)),
      minROI: Math.min(...rois),
      maxROI: Math.max(...rois),
    };
  }
}
