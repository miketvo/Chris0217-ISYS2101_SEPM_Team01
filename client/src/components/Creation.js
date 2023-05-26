export function Creation(type, style, productsList, unin, allergen, cal) {
  const userMealType = type;
  const userMealStyle = style;
  const products = productsList;
  const userUnPreffer = unin;
  const userAllergen = allergen;
  const totalCal = cal;

  const skipMeal = {
    idx: 0,
    label: "Skipped",
    calories: 0,
    dietLabels: ["Balanced"],
    healthLabels: "[]",
    recipe: "[]",
    ingredients: "[]",
    mealType: "breakfast/lunch/dinner/snack",
    fat: 0,
    carb: 0,
    protein: 0,
  };
  //database first filtered big before being used
  const filteredProducts = products.filter((product) => {
    return (
      userMealStyle.every((info) => product.healthLabels.includes(info)) &&
      product.calories > 100 &&
      product.calories < 2000 &&
      !userUnPreffer.some((unpreffered) =>
        product.ingredients.includes(unpreffered)
      ) &&
      !userAllergen.some((allergens) => product.ingredients.includes(allergens))
    );
  });
  //divided into each meal styles for uses
  const breakfastProducts = filteredProducts.filter(
    (product) => product.mealType && product.mealType.includes("breakfast")
  );

  const lunchProducts = filteredProducts.filter(
    (product) => product.mealType && product.mealType.includes("lunch")
  );

  const dinnerProducts = filteredProducts.filter(
    (product) => product.mealType && product.mealType.includes("dinner")
  );
  const snackProducts = filteredProducts.filter(
    (product) => product.mealType && product.mealType.includes("snack")
  );

  const calRange = 0.05; // range of +-10%

  let fixedBreakfastProduct;
  let fixedLunchProduct;
  let fixedDinnerProduct;
  let fixedSnackProduct;

  while (true) {
    // Generate new random meal products
    const randomBreakfastProduct = userMealType.includes("breakfast")
      ? breakfastProducts[Math.floor(Math.random() * breakfastProducts.length)]
      : skipMeal;

    const randomLunchProduct = userMealType.includes("lunch")
      ? lunchProducts[Math.floor(Math.random() * lunchProducts.length)]
      : skipMeal;

    const randomDinnerProduct = userMealType.includes("dinner")
      ? dinnerProducts[Math.floor(Math.random() * dinnerProducts.length)]
      : skipMeal;

    const randomSnackProduct = userMealType.includes("snack")
      ? snackProducts[Math.floor(Math.random() * snackProducts.length)]
      : skipMeal;

    // Calculate the total calories of the meal
    const calVal = Math.round(
      (randomBreakfastProduct?.calories || 0) +
        (randomLunchProduct?.calories || 0) +
        (randomDinnerProduct?.calories || 0) +
        (randomSnackProduct?.calories || 0)
    );

    if (Math.abs(calVal - totalCal) <= totalCal * calRange) {
      // Requirement met, set fixed product values
      fixedBreakfastProduct = randomBreakfastProduct;
      fixedLunchProduct = randomLunchProduct;
      fixedDinnerProduct = randomDinnerProduct;
      fixedSnackProduct = randomSnackProduct;

      const fixedCalVal = Math.round(
        (fixedBreakfastProduct?.calories || 0) +
          (fixedLunchProduct?.calories || 0) +
          (fixedDinnerProduct?.calories || 0) +
          (fixedSnackProduct?.calories || 0)
      );

      const fixedCarbVal = Math.round(
        (fixedBreakfastProduct?.carb || 0) +
          (fixedLunchProduct?.carb || 0) +
          (fixedDinnerProduct?.carb || 0) +
          (fixedSnackProduct?.carb || 0)
      );

      const fixedProteinVal = Math.round(
        (fixedBreakfastProduct?.protein || 0) +
          (fixedLunchProduct?.protein || 0) +
          (fixedDinnerProduct?.protein || 0) +
          (fixedSnackProduct?.protein || 0)
      );

      const fixedFatVal = Math.round(
        (fixedBreakfastProduct?.fat || 0) +
          (fixedLunchProduct?.fat || 0) +
          (fixedDinnerProduct?.fat || 0) +
          (fixedSnackProduct?.fat || 0)
      );

      const results = [
        fixedBreakfastProduct,
        fixedLunchProduct,
        fixedDinnerProduct,
        fixedSnackProduct,
        fixedCalVal,
        fixedCarbVal,
        fixedProteinVal,
        fixedFatVal,
      ];

      return results;
    }
  }
}