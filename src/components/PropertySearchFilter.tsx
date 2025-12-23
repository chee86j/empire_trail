import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { InvestmentProperty, PropertyType } from "../types";
import {
  PropertySearchService,
  PropertySearchFilters,
  PropertySortOptions,
} from "../services/propertySearchService";
import "../styles/PropertySearchFilter.css";
import { createButtonTransition } from "../animations/motionPresets";

interface Props {
  properties: InvestmentProperty[];
  onFilteredPropertiesChange: (
    filteredProperties: InvestmentProperty[]
  ) => void;
  showRentalStatusFilter?: boolean; // For portfolio screen
  showReadyForActionFilter?: boolean; // For portfolio screen
  currentMonth?: number; // For portfolio screen
}

const PropertySearchFilter: React.FC<Props> = ({
  properties,
  onFilteredPropertiesChange,
  showRentalStatusFilter = false,
  showReadyForActionFilter = false,
  currentMonth = 0,
}) => {
  const reduceMotion = useReducedMotion();
  const buttonTransition = createButtonTransition(reduceMotion);
  const [filters, setFilters] = useState<PropertySearchFilters>(
    PropertySearchService.getDefaultFilters()
  );
  const [sortOptions, setSortOptions] = useState<PropertySortOptions>({
    field: "name",
    direction: "asc",
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [availablePropertyTypes, setAvailablePropertyTypes] = useState<
    PropertyType[]
  >([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [statistics, setStatistics] = useState(
    PropertySearchService.getPropertyStatistics(properties)
  );
  const filtersInitialized = useRef(false);

  // Update available options when properties change
  useEffect(() => {
    setAvailablePropertyTypes(
      PropertySearchService.getAvailablePropertyTypes(properties)
    );
    setAvailableCities(PropertySearchService.getAvailableCities(properties));
    setStatistics(PropertySearchService.getPropertyStatistics(properties));
  }, [properties]);

  // Initialize filter ranges only once when component mounts
  useEffect(() => {
    if (properties.length > 0 && !filtersInitialized.current) {
      const stats = PropertySearchService.getPropertyStatistics(properties);
      setFilters((prev) => ({
        ...prev,
        minPurchaseCost: stats.minPurchaseCost,
        maxPurchaseCost: stats.maxPurchaseCost,
        minRenovationCost: stats.minRenovationCost,
        maxRenovationCost: stats.maxRenovationCost,
        minRenovationTime: stats.minRenovationTime,
        maxRenovationTime: stats.maxRenovationTime,
        minRentalIncome: stats.minRentalIncome,
        maxRentalIncome: stats.maxRentalIncome,
        minSalePrice: stats.minSalePrice,
        maxSalePrice: stats.maxSalePrice,
        minROI: stats.minROI,
        maxROI: stats.maxROI,
      }));
      filtersInitialized.current = true;
    }
  }, [properties]);

  // Apply filters and sorting when they change
  useEffect(() => {
    let filteredProperties = PropertySearchService.filterProperties(
      properties,
      filters,
      currentMonth
    );
    filteredProperties = PropertySearchService.sortProperties(
      filteredProperties,
      sortOptions
    );
    onFilteredPropertiesChange(filteredProperties);
  }, [filters, sortOptions, properties, onFilteredPropertiesChange, currentMonth]);

  const handleFilterChange = (
    field: keyof PropertySearchFilters,
    value: any
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSortChange = (field: PropertySortOptions["field"]) => {
    setSortOptions((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const resetFilters = () => {
    const defaultFilters = PropertySearchService.getDefaultFilters();
    const stats = PropertySearchService.getPropertyStatistics(properties);

    setFilters({
      ...defaultFilters,
      minPurchaseCost: stats.minPurchaseCost,
      maxPurchaseCost: stats.maxPurchaseCost,
      minRenovationCost: stats.minRenovationCost,
      maxRenovationCost: stats.maxRenovationCost,
      minRenovationTime: stats.minRenovationTime,
      maxRenovationTime: stats.maxRenovationTime,
      minRentalIncome: stats.minRentalIncome,
      maxRentalIncome: stats.maxRentalIncome,
      minSalePrice: stats.minSalePrice,
      maxSalePrice: stats.maxSalePrice,
      minROI: stats.minROI,
      maxROI: stats.maxROI,
    });
    setSortOptions({ field: "name", direction: "asc" });
    filtersInitialized.current = true; // Mark as initialized after reset
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="property-search-filter">
      <div className="search-header">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Search properties by name..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
            className="search-input"
            aria-label="Search properties"
          />
          <motion.button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="btn btn-outline"
            aria-label="Toggle advanced filters"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={buttonTransition}
          >
            {showAdvancedFilters ? "Hide Filters" : "Show Filters"}
          </motion.button>
          <motion.button
            onClick={resetFilters}
            className="btn btn-secondary"
            aria-label="Reset all filters"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={buttonTransition}
          >
            Reset
          </motion.button>
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="advanced-filters">
          <div className="filters-grid">
            {/* Property Type Filter */}
            <div className="filter-group">
              <label>Property Types:</label>
              <div className="checkbox-group">
                {availablePropertyTypes.map((type) => (
                  <label key={type} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.propertyTypes.includes(type)}
                      onChange={(e) => {
                        const newTypes = e.target.checked
                          ? [...filters.propertyTypes, type]
                          : filters.propertyTypes.filter((t) => t !== type);
                        handleFilterChange("propertyTypes", newTypes);
                      }}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* City Filter */}
            <div className="filter-group">
              <label>Cities:</label>
              <div className="checkbox-group">
                {availableCities.map((city) => (
                  <label key={city} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.cities.includes(city)}
                      onChange={(e) => {
                        const newCities = e.target.checked
                          ? [...filters.cities, city]
                          : filters.cities.filter((c) => c !== city);
                        handleFilterChange("cities", newCities);
                      }}
                    />
                    {city}
                  </label>
                ))}
              </div>
            </div>

            {/* Purchase Cost Range */}
            <div className="filter-group">
              <label>
                Purchase Cost: {formatCurrency(filters.minPurchaseCost)} -{" "}
                {formatCurrency(filters.maxPurchaseCost)}
              </label>
              <div className="range-inputs">
                <input
                  type="range"
                  min={statistics.minPurchaseCost}
                  max={statistics.maxPurchaseCost}
                  value={filters.minPurchaseCost}
                  onChange={(e) =>
                    handleFilterChange(
                      "minPurchaseCost",
                      Number(e.target.value)
                    )
                  }
                  className="range-slider"
                />
                <input
                  type="range"
                  min={statistics.minPurchaseCost}
                  max={statistics.maxPurchaseCost}
                  value={filters.maxPurchaseCost}
                  onChange={(e) =>
                    handleFilterChange(
                      "maxPurchaseCost",
                      Number(e.target.value)
                    )
                  }
                  className="range-slider"
                />
              </div>
            </div>

            {/* Renovation Cost Range */}
            <div className="filter-group">
              <label>
                Renovation Cost: {formatCurrency(filters.minRenovationCost)} -{" "}
                {formatCurrency(filters.maxRenovationCost)}
              </label>
              <div className="range-inputs">
                <input
                  type="range"
                  min={statistics.minRenovationCost}
                  max={statistics.maxRenovationCost}
                  value={filters.minRenovationCost}
                  onChange={(e) =>
                    handleFilterChange(
                      "minRenovationCost",
                      Number(e.target.value)
                    )
                  }
                  className="range-slider"
                />
                <input
                  type="range"
                  min={statistics.minRenovationCost}
                  max={statistics.maxRenovationCost}
                  value={filters.maxRenovationCost}
                  onChange={(e) =>
                    handleFilterChange(
                      "maxRenovationCost",
                      Number(e.target.value)
                    )
                  }
                  className="range-slider"
                />
              </div>
            </div>

            {/* Renovation Time Range */}
            <div className="filter-group">
              <label>
                Renovation Time: {filters.minRenovationTime} -{" "}
                {filters.maxRenovationTime} months
              </label>
              <div className="range-inputs">
                <input
                  type="range"
                  min={statistics.minRenovationTime}
                  max={statistics.maxRenovationTime}
                  value={filters.minRenovationTime}
                  onChange={(e) =>
                    handleFilterChange(
                      "minRenovationTime",
                      Number(e.target.value)
                    )
                  }
                  className="range-slider"
                />
                <input
                  type="range"
                  min={statistics.minRenovationTime}
                  max={statistics.maxRenovationTime}
                  value={filters.maxRenovationTime}
                  onChange={(e) =>
                    handleFilterChange(
                      "maxRenovationTime",
                      Number(e.target.value)
                    )
                  }
                  className="range-slider"
                />
              </div>
            </div>

            {/* Rental Income Range */}
            <div className="filter-group">
              <label>
                Rental Income: {formatCurrency(filters.minRentalIncome)} -{" "}
                {formatCurrency(filters.maxRentalIncome)}
              </label>
              <div className="range-inputs">
                <input
                  type="range"
                  min={statistics.minRentalIncome}
                  max={statistics.maxRentalIncome}
                  value={filters.minRentalIncome}
                  onChange={(e) =>
                    handleFilterChange(
                      "minRentalIncome",
                      Number(e.target.value)
                    )
                  }
                  className="range-slider"
                />
                <input
                  type="range"
                  min={statistics.minRentalIncome}
                  max={statistics.maxRentalIncome}
                  value={filters.maxRentalIncome}
                  onChange={(e) =>
                    handleFilterChange(
                      "maxRentalIncome",
                      Number(e.target.value)
                    )
                  }
                  className="range-slider"
                />
              </div>
            </div>

            {/* Sale Price Range */}
            <div className="filter-group">
              <label>
                Sale Price: {formatCurrency(filters.minSalePrice)} -{" "}
                {formatCurrency(filters.maxSalePrice)}
              </label>
              <div className="range-inputs">
                <input
                  type="range"
                  min={statistics.minSalePrice}
                  max={statistics.maxSalePrice}
                  value={filters.minSalePrice}
                  onChange={(e) =>
                    handleFilterChange("minSalePrice", Number(e.target.value))
                  }
                  className="range-slider"
                />
                <input
                  type="range"
                  min={statistics.minSalePrice}
                  max={statistics.maxSalePrice}
                  value={filters.maxSalePrice}
                  onChange={(e) =>
                    handleFilterChange("maxSalePrice", Number(e.target.value))
                  }
                  className="range-slider"
                />
              </div>
            </div>

            {/* ROI Range */}
            <div className="filter-group">
              <label>
                ROI: {filters.minROI.toFixed(1)}% - {filters.maxROI.toFixed(1)}%
              </label>
              <div className="range-inputs">
                <input
                  type="range"
                  min={statistics.minROI}
                  max={statistics.maxROI}
                  value={filters.minROI}
                  onChange={(e) =>
                    handleFilterChange("minROI", Number(e.target.value))
                  }
                  className="range-slider"
                />
                <input
                  type="range"
                  min={statistics.minROI}
                  max={statistics.maxROI}
                  value={filters.maxROI}
                  onChange={(e) =>
                    handleFilterChange("maxROI", Number(e.target.value))
                  }
                  className="range-slider"
                />
              </div>
            </div>

            {/* Portfolio-specific filters */}
            {showRentalStatusFilter && (
              <div className="filter-group">
                <label>Rental Status:</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="rentalStatus"
                      checked={filters.isRented === undefined}
                      onChange={() => handleFilterChange("isRented", undefined)}
                    />
                    All
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="rentalStatus"
                      checked={filters.isRented === true}
                      onChange={() => handleFilterChange("isRented", true)}
                    />
                    Rented
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="rentalStatus"
                      checked={filters.isRented === false}
                      onChange={() => handleFilterChange("isRented", false)}
                    />
                    Vacant
                  </label>
                </div>
              </div>
            )}

            {showReadyForActionFilter && (
              <div className="filter-group">
                <label>Action Status:</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="actionStatus"
                      checked={filters.isReadyForAction === undefined}
                      onChange={() =>
                        handleFilterChange("isReadyForAction", undefined)
                      }
                    />
                    All
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="actionStatus"
                      checked={filters.isReadyForAction === true}
                      onChange={() =>
                        handleFilterChange("isReadyForAction", true)
                      }
                    />
                    Ready to Act
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="actionStatus"
                      checked={filters.isReadyForAction === false}
                      onChange={() =>
                        handleFilterChange("isReadyForAction", false)
                      }
                    />
                    In Progress
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="sort-controls">
        <label>Sort by:</label>
        <div className="sort-buttons">
          {(
            [
              "name",
              "purchaseCost",
              "renovationCost",
              "renovationTime",
              "arvRentalIncome",
              "arvSalePrice",
              "roi",
            ] as const
          ).map((field) => (
            <motion.button
              key={field}
              onClick={() => handleSortChange(field)}
              className={`btn btn-sm ${
                sortOptions.field === field ? "btn-primary" : "btn-outline"
              }`}
              aria-label={`Sort by ${field}`}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={buttonTransition}
            >
              {field === "arvRentalIncome"
                ? "Rental Income"
                : field === "arvSalePrice"
                ? "Sale Price"
                : field === "purchaseCost"
                ? "Purchase Cost"
                : field === "renovationCost"
                ? "Renovation Cost"
                : field === "renovationTime"
                ? "Renovation Time"
                : field.toUpperCase()}
              {sortOptions.field === field && (
                <span className="sort-indicator">
                  {sortOptions.direction === "asc" ? "↑" : "↓"}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertySearchFilter;
