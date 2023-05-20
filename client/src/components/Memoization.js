import { Creation } from "./Creation";

let cachedResult = null;

export const getMealResult = (
  userMealType,
  userMealStyle,
  products,
  userUnPreffer,
  totalCal
) => {
  if (!cachedResult) {
    // Run the function and cache the result if it's not already cached
    cachedResult = Creation(
      userMealType,
      userMealStyle,
      products,
      userUnPreffer,
      totalCal
    );
  }

  return cachedResult;
};

export const flushCache = () => {
  cachedResult = null;
};
