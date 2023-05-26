import { Creation } from "./Creation";

let cachedResult = null;
//function to run getMealResult just once
export const getMealResult = (
  userMealType,
  userMealStyle,
  products,
  userUnPreffer,
  userAllergen,
  totalCal
) => {
  if (!cachedResult) {
    // Run the function and cache the result if it's not already cached
    cachedResult = Creation(
      userMealType,
      userMealStyle,
      products,
      userUnPreffer,
      userAllergen,
      totalCal
    );
  }

  return cachedResult;
};

export const flushCache = () => {
  cachedResult = null;
};