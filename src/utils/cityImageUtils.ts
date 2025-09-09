/*
City Image Utilities

Provides mapping between city names and their corresponding background image files.
This utility ensures consistent image loading across the application.
*/

/**
 * Maps city names to their corresponding image filenames
 */
const CITY_IMAGE_MAP: Record<string, string> = {
  "Los Angeles": "la.jpeg",
  Phoenix: "phoenix.jpeg",
  Dallas: "dallas.jpeg",
  "St.Louis": "stlouis.jpeg",
  Chicago: "chicago.jpeg",
  Cleveland: "cleveland.jpeg",
  Pittsburgh: "pittsburgh.jpeg",
  Philadelphia: "philadelphia.jpeg",
  "New York City": "nyc.jpeg",
};

/**
 * Get the background image filename for a given city
 * @param cityName - The name of the city
 * @returns The filename of the city's background image
 */
export const getCityImageFilename = (cityName: string): string => {
  return CITY_IMAGE_MAP[cityName] || "la.jpeg"; // Default to LA if city not found
};

/**
 * Get the full path to a city's background image
 * @param cityName - The name of the city
 * @returns The full path to the city's background image
 */
export const getCityImagePath = (cityName: string): string => {
  const filename = getCityImageFilename(cityName);
  return `/src/assets/${filename}`;
};

/**
 * Get all available city image filenames
 * @returns Array of all city image filenames
 */
export const getAllCityImageFilenames = (): string[] => {
  return Object.values(CITY_IMAGE_MAP);
};

/**
 * Check if a city has a background image available
 * @param cityName - The name of the city
 * @returns True if the city has a background image, false otherwise
 */
export const hasCityImage = (cityName: string): boolean => {
  return cityName in CITY_IMAGE_MAP;
};
