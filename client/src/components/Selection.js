import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Selection.css";
import Progress from "./Progress";
import Menu from "./Menu";

function Selection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:3500/api");
      setProducts(response.data);
      setLoading(false);
    };

    getProducts();
  }, []);

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

  const userMealType = ["Dairy-Free", "Gluten-Free", "Vegetarian"];
  const userMealStyle = ["breakfast", "lunch", "dinner", "snack"];
  const userUnPreffer = ["Salmon", "beef", "seeds"];

  const totalCal = 2000;
  const carbTotal = 500;
  const proteinTotal = 500;
  const fatTotal = 500;

  const filteredProducts = products.filter((product) => {
    return (
      userMealType.every((info) => product.healthLabels.includes(info)) &&
      product.calories > 100 &&
      product.calories < 2000 &&
      !userUnPreffer.some((unpreffered) =>
        product.ingredients.includes(unpreffered)
      )
    );
  });

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

  let randomBreakfastProduct = userMealStyle.includes("breakfast")
    ? breakfastProducts[Math.floor(Math.random() * breakfastProducts.length)]
    : skipMeal;

  let randomLunchProduct = userMealStyle.includes("lunch")
    ? lunchProducts[Math.floor(Math.random() * lunchProducts.length)]
    : skipMeal;

  let randomDinnerProduct = userMealStyle.includes("dinner")
    ? dinnerProducts[Math.floor(Math.random() * dinnerProducts.length)]
    : skipMeal;
  let randomSnackProduct = userMealStyle.includes("snack")
    ? snackProducts[Math.floor(Math.random() * snackProducts.length)]
    : skipMeal;

  let calVal = Math.round(
    (randomBreakfastProduct?.calories || 0) +
      (randomLunchProduct?.calories || 0) +
      (randomDinnerProduct?.calories || 0) +
      (randomSnackProduct?.calories || 0)
  );

  const calRange = 0.1; // range of +-10%
  let tries = 0;

  while (Math.abs(calVal - totalCal) > totalCal * calRange) {
    if (++tries > 100) {
      console.log(
        "Failed to generate a meal within the desired caloric range."
      );
      break;
    }

    // Generate new random meal products
    randomBreakfastProduct = userMealStyle.includes("breakfast")
      ? breakfastProducts[Math.floor(Math.random() * breakfastProducts.length)]
      : skipMeal;

    randomLunchProduct = userMealStyle.includes("lunch")
      ? lunchProducts[Math.floor(Math.random() * lunchProducts.length)]
      : skipMeal;

    randomDinnerProduct = userMealStyle.includes("dinner")
      ? dinnerProducts[Math.floor(Math.random() * dinnerProducts.length)]
      : skipMeal;

    randomSnackProduct = userMealStyle.includes("snack")
      ? snackProducts[Math.floor(Math.random() * snackProducts.length)]
      : skipMeal;

    // Calculate the total calories of the meal
    calVal = Math.round(
      (randomBreakfastProduct?.calories || 0) +
        (randomLunchProduct?.calories || 0) +
        (randomDinnerProduct?.calories || 0) +
        (randomSnackProduct?.calories || 0)
    );
  }

  let carbVal = Math.round(
    (randomBreakfastProduct?.carb || 0) +
      (randomLunchProduct?.carb || 0) +
      (randomDinnerProduct?.carb || 0) +
      (randomSnackProduct?.carb || 0)
  );

  let proteinVal = Math.round(
    (randomBreakfastProduct?.protein || 0) +
      (randomLunchProduct?.protein || 0) +
      (randomDinnerProduct?.protein || 0) +
      (randomSnackProduct?.protein || 0)
  );

  let fatVal = Math.round(
    (randomBreakfastProduct?.fat || 0) +
      (randomLunchProduct?.fat || 0) +
      (randomDinnerProduct?.fat || 0) +
      (randomSnackProduct?.fat || 0)
  );

  const breakfastSelect = {
    name: randomBreakfastProduct ? randomBreakfastProduct.label : "breakfast",
    img: process.env.PUBLIC_URL + "/oil-pasta.jpg",
  };

  const lunchSelect = {
    name: randomBreakfastProduct ? randomLunchProduct.label : "lunch",
    img: process.env.PUBLIC_URL + "/oil-pasta.jpg",
  };

  const dinnerSelect = {
    name: randomBreakfastProduct ? randomDinnerProduct.label : "dinner",
    img: process.env.PUBLIC_URL + "/oil-pasta.jpg",
  };
  const snackSelect = {
    name: randomBreakfastProduct ? randomSnackProduct.label : "snack",
    img: process.env.PUBLIC_URL + "/oil-pasta.jpg",
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="testing">
            <div className="progress-container">
              <Progress heading="Calories" value={calVal} total={totalCal} />
              <Progress heading="Carb" value={carbVal} total={carbTotal} />
              <Progress
                heading="Protein"
                value={proteinVal}
                total={proteinTotal}
              />
              <Progress heading="Fat" value={fatVal} total={fatTotal} />
            </div>
            <div className="popup-result">
              <div className="item breakfast">
                <div className="item-heading">
                  <h3>Breakfast</h3>
                </div>
                <Menu
                  img={breakfastSelect.img}
                  alt={breakfastSelect.name}
                  menu={breakfastSelect.name}
                ></Menu>
              </div>
              <div className="item lunch">
                <div className="item-heading">
                  <h3>Lunch</h3>
                </div>
                <Menu
                  img={lunchSelect.img}
                  alt={lunchSelect.name}
                  menu={lunchSelect.name}
                ></Menu>
              </div>
              <div className="item dinner">
                <div className="item-heading">
                  <h3>Dinner</h3>
                </div>
                <Menu
                  img={dinnerSelect.img}
                  alt={dinnerSelect.name}
                  menu={dinnerSelect.name}
                ></Menu>
              </div>
              <div className="item snack">
                <div className="item-heading">
                  <h3>Snack</h3>
                </div>
                <Menu
                  img={snackSelect.img}
                  alt={snackSelect.name}
                  menu={snackSelect.name}
                ></Menu>
              </div>
            </div>
          </div>
          <div className="testing">
            <h2>{randomBreakfastProduct.label}</h2>
            <p>Calories: {randomBreakfastProduct.calories}</p>
            <p>Meal Type: {randomBreakfastProduct.mealType}</p>
            <h2>{randomLunchProduct.label}</h2>
            <p>Calories:{randomLunchProduct.calories}</p>
            <p>Meal Type: {randomLunchProduct.mealType}</p>
            <h2>{randomDinnerProduct.label}</h2>
            <p>Calories: {randomDinnerProduct.calories}</p>
            <p>Meal Type: {randomDinnerProduct.mealType}</p>
            <h2>{randomSnackProduct.label}</h2>
            <p>Calories: {randomSnackProduct.calories}</p>
            <p>Meal Type: {randomSnackProduct.mealType}</p>
          </div>
        </>
      )}
    </>
  );
}

export default Selection;
