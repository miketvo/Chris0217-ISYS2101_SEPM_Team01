import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Selection.css";
import Progress from "./Progress";
import Menu from "./Menu";

const APP_ID = "25d1f83f";
const APP_KEY = "73d5699d0f6499668c30c852dcb1d442";

function Selection(props) {
  //products to store database information, loading for useEffect rendering
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breakfast, setBreakfast] = useState({});
  const [lunch, setLunch] = useState({});
  const [dinner, setDinner] = useState({});
  const [snack, setSnack] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:3500/api");
      setProducts(response.data);
      setLoading(false);
    };

    getProducts();
  }, []);

  //constants for filtering database for needs
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

  //this will be fetched from other js file and database on future
  const userMealType = props.type;
  const userMealStyle = props.style;

  console.log(userMealType);
  console.log(userMealStyle);
  const userUnPreffer = ["Salmon", "beef", "seeds"];

  const totalCal = 2000;
  const carbTotal = Math.round(((totalCal / 100) * 50) / 4);
  const proteinTotal = Math.round(((totalCal / 100) * 15) / 4);
  const fatTotal = Math.round(((totalCal / 100) * 35) / 9);

  //database first filtered big before being used
  const filteredProducts = products.filter((product) => {
    return (
      userMealStyle.every((info) => product.healthLabels.includes(info)) &&
      product.calories > 100 &&
      product.calories < 2000 &&
      !userUnPreffer.some((unpreffered) =>
        product.ingredients.includes(unpreffered)
      )
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

  //if mealStyle is selected, it chooses random object from database.
  //if not, set as object "skipmeal"
  //if calories of total meals stay outside of range of error with total calories,
  //run it again until it fits
  let randomBreakfastProduct = userMealType.includes("breakfast")
    ? breakfastProducts[Math.floor(Math.random() * breakfastProducts.length)]
    : skipMeal;

  let randomLunchProduct = userMealType.includes("lunch")
    ? lunchProducts[Math.floor(Math.random() * lunchProducts.length)]
    : skipMeal;

  let randomDinnerProduct = userMealType.includes("dinner")
    ? dinnerProducts[Math.floor(Math.random() * dinnerProducts.length)]
    : skipMeal;
  let randomSnackProduct = userMealType.includes("snack")
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

    // Generate new random meal products after failure
    randomBreakfastProduct = userMealType.includes("breakfast")
      ? breakfastProducts[Math.floor(Math.random() * breakfastProducts.length)]
      : skipMeal;

    randomLunchProduct = userMealType.includes("lunch")
      ? lunchProducts[Math.floor(Math.random() * lunchProducts.length)]
      : skipMeal;

    randomDinnerProduct = userMealType.includes("dinner")
      ? dinnerProducts[Math.floor(Math.random() * dinnerProducts.length)]
      : skipMeal;

    randomSnackProduct = userMealType.includes("snack")
      ? snackProducts[Math.floor(Math.random() * snackProducts.length)]
      : skipMeal;

    // Calculate the total calories of the meal for next loop
    calVal = Math.round(
      (randomBreakfastProduct?.calories || 0) +
        (randomLunchProduct?.calories || 0) +
        (randomDinnerProduct?.calories || 0) +
        (randomSnackProduct?.calories || 0)
    );
  }
  const fixedBreakfastProduct = randomBreakfastProduct;
  const fixedLunchProduct = randomLunchProduct;
  const fixedDinnerProduct = randomDinnerProduct;
  const fixedSnackProduct = randomSnackProduct;

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

  //fetch image from api

  /*const fetchBreakfastImages = async () => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${breakfastSelect.name}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const hits = response.data.hits;
      if (hits.length > 0) {
        const firstHit = hits[0]; // Get the first hit
        const recipe = firstHit.recipe; // Extract the recipe object from the hit
        if (recipe.image) {
          setBreakfast(recipe); // Update the recipe state variable with the recipe object from the first hit, if it has an image
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLunchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${lunchSelect.name}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const hits = response.data.hits;
      if (hits.length > 0) {
        const firstHit = hits[0]; // Get the first hit
        const recipe = firstHit.recipe; // Extract the recipe object from the hit
        if (recipe.image) {
          setLunch(recipe); // Update the recipe state variable with the recipe object from the first hit, if it has an image
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDinnerImages = async () => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${dinnerSelect.name}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const hits = response.data.hits;
      if (hits.length > 0) {
        const firstHit = hits[0]; // Get the first hit
        const recipe = firstHit.recipe; // Extract the recipe object from the hit
        if (recipe.image) {
          setDinner(recipe); // Update the recipe state variable with the recipe object from the first hit, if it has an image
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSnackImages = async () => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${snackSelect.name}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const hits = response.data.hits;
      if (hits.length > 0) {
        const firstHit = hits[0]; // Get the first hit
        const recipe = firstHit.recipe; // Extract the recipe object from the hit
        if (recipe.image) {
          setSnack(recipe); // Update the recipe state variable with the recipe object from the first hit, if it has an image
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBreakfastImages();
    fetchLunchImages();
    fetchDinnerImages();
    fetchSnackImages();
  }, []);*/

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const [
          breakfastResponse,
          lunchResponse,
          dinnerResponse,
          snackResponse,
        ] = await Promise.all([
          axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${fixedBreakfastProduct?.label}&app_id=${APP_ID}&app_key=${APP_KEY}`
          ),
          axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${fixedLunchProduct?.label}&app_id=${APP_ID}&app_key=${APP_KEY}`
          ),
          axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${fixedDinnerProduct?.label}&app_id=${APP_ID}&app_key=${APP_KEY}`
          ),
          axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${fixedSnackProduct?.label}&app_id=${APP_ID}&app_key=${APP_KEY}`
          ),
        ]);

        const breakfastHits = breakfastResponse.data.hits;
        const lunchHits = lunchResponse.data.hits;
        const dinnerHits = dinnerResponse.data.hits;
        const snackHits = snackResponse.data.hits;

        if (breakfastHits.length > 0) {
          const firstHit = breakfastHits[0];
          const recipe = firstHit.recipe;
          if (recipe.image) {
            setBreakfast(recipe);
          }
        }

        if (lunchHits.length > 0) {
          const firstHit = lunchHits[0];
          const recipe = firstHit.recipe;
          if (recipe.image) {
            setLunch(recipe);
          }
        }

        if (dinnerHits.length > 0) {
          const firstHit = dinnerHits[0];
          const recipe = firstHit.recipe;
          if (recipe.image) {
            setDinner(recipe);
          }
        }

        if (snackHits.length > 0) {
          const firstHit = snackHits[0];
          const recipe = firstHit.recipe;
          if (recipe.image) {
            setSnack(recipe);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (fixedBreakfastProduct) {
      fetchImages();
    }
  }, [fixedBreakfastProduct]);

  //make objects based on selected meals by generator
  //image will be fetched with function later
  const breakfastSelect = {
    name: fixedBreakfastProduct ? fixedBreakfastProduct.label : "breakfast",
    img: breakfast ? breakfast.image : "image",
  };

  const lunchSelect = {
    name: fixedLunchProduct ? fixedLunchProduct.label : "lunch",
    img: lunch ? lunch.image : "lunch",
  };

  const dinnerSelect = {
    name: fixedDinnerProduct ? fixedDinnerProduct.label : "dinner",
    img: dinner ? dinner.image : "dinner",
  };
  const snackSelect = {
    name: fixedSnackProduct ? fixedSnackProduct.label : "snack",
    img: snack ? snack.image : "snack",
  };

  const mealArray = [breakfastSelect, lunchSelect, dinnerSelect, snackSelect];
  window.mealArray = mealArray;
  const mealPlanInfo = [
    totalCal,
    fixedCalVal,
    carbTotal,
    fixedCarbVal,
    proteinTotal,
    fixedProteinVal,
    fatTotal,
    fixedFatVal,
  ];
  window.mealPlanInfo = mealPlanInfo;
  console.log(mealArray);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="testing">
            <div className="progress-container">
              <Progress
                heading="Calories"
                value={fixedCalVal}
                total={totalCal}
              />
              <Progress heading="Carb" value={fixedCarbVal} total={carbTotal} />
              <Progress
                heading="Protein"
                value={fixedProteinVal}
                total={proteinTotal}
              />
              <Progress heading="Fat" value={fixedFatVal} total={fatTotal} />
            </div>
            <div className="popup-result">
              <div className="item breakfast">
                <div className="item-heading">
                  <h3>Breakfast</h3>
                </div>
                {breakfastSelect && ( // Only render the Menu component if an image is available in the recipe object
                  <Menu
                    img={breakfastSelect.img}
                    alt={breakfastSelect.name}
                    menu={breakfastSelect.name}
                  />
                )}
              </div>
              <div className="item lunch">
                <div className="item-heading">
                  <h3>Lunch</h3>
                </div>
                {lunchSelect && ( // Only render the Menu component if an image is available in the recipe object
                  <Menu
                    img={lunchSelect.img}
                    alt={lunchSelect.name}
                    menu={lunchSelect.name}
                  />
                )}
              </div>
              <div className="item dinner">
                <div className="item-heading">
                  <h3>Dinner</h3>
                </div>
                {dinnerSelect && ( // Only render the Menu component if an image is available in the recipe object
                  <Menu
                    img={dinnerSelect.img}
                    alt={dinnerSelect.name}
                    menu={dinnerSelect.name}
                  />
                )}
              </div>
              <div className="item snack">
                <div className="item-heading">
                  <h3>Snack</h3>
                </div>
                {snackSelect && ( // Only render the Menu component if an image is available in the recipe object
                  <Menu
                    img={snackSelect.img}
                    alt={snackSelect.name}
                    menu={snackSelect.name}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Selection;