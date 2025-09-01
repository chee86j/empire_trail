/* Game Utilities

Common utility functions for the Empire Trail game
*/

import { InvestmentProperty, Profession, Event } from '../types';
import { PROFESSION_STATS, MONTH_NAMES } from '../constants/gameConstants';

/* Calculate total cost of a property including all fees */
export const calculatePropertyTotalCost = (property: InvestmentProperty): number => {
  return property.purchaseCost + property.closingCost + property.renovationCost;
};

/* Get profession statistics */
export const getProfessionStats = (profession: string): { bankBalance: number; salary: number } => {
  return PROFESSION_STATS[profession as keyof typeof PROFESSION_STATS] || { bankBalance: 0, salary: 0 };
};

/* Calculate total rental income from portfolio */
export const calculateTotalRentalIncome = (portfolio: InvestmentProperty[]): number => {
  return portfolio
    .filter(property => property.isRented)
    .reduce((total, property) => total + property.arvRentalIncome, 0);
};

/* Format game date from month number */
export const formatGameDate = (month: number): { monthName: string; year: number } => {
  const year = Math.floor((month - 1) / 12) + 1;
  const monthIndex = (month - 1) % 12;
  return {
    monthName: MONTH_NAMES[monthIndex],
    year
  };
};

/* Check if property is ready for action (renovation complete) */
export const isPropertyReadyForAction = (property: InvestmentProperty, currentMonth: number): boolean => {
  return (
    typeof property.purchaseMonth === "number" &&
    currentMonth >= property.purchaseMonth + property.renovationTime
  );
};

/* Choose random event based on profession */
export const chooseRandomEvent = (events: Event[], profession?: Profession): Event | null => {
  if (!profession || events.length === 0) return null;
  
  // Filter events based on profession probabilities if they exist
  const professionEvents = events.filter(event => {
    if (!event.professionProbabilities) return true; // Include events without profession restrictions
    
    const probability = event.professionProbabilities[profession] || 0;
    return Math.random() * 100 < probability;
  });
  
  if (professionEvents.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * professionEvents.length);
  return professionEvents[randomIndex];
};

/* Format currency for display */
export const formatCurrency = (amount: number): string => {
  return `$${amount.toLocaleString()}`;
};

/* Calculate new bank balance after changes */
export const calculateNewBankBalance = (
  currentBalance: number,
  salary: number,
  rentalIncome: number,
  eventImpact: number
): number => {
  return currentBalance + salary + rentalIncome + eventImpact;
};
