import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Selection.css";
import Progress from "./Progress";
import Menu from "./Menu";
import { getMealResult } from "./Memoization";

const APP_ID = "25d1f83f";
const APP_KEY = "73d5699d0f6499668c30c852dcb1d442";

function Selection(props) {
  //products to store database information, loading for useEffect rendering
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set the flag to true when the component is mounted
    setMounted(true);
    // Clean up the event listeners when the component is unmounted
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    //fetching data of recipe database
    const fetchData = async () => {
      // Fetch data only if the component is mounted, only running once.
      if (mounted) {
        try {
          const response = await axios.get("http://localhost:3500/api");
          setProducts(response.data);
          setLoading(false);
          console.log("Loading set to false");
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [mounted]);

  //User information is fetched from PopPage.js and is brought with props
  const userMealType = props.type;
  const userMealStyle = props.style;
  const totalCal = props.cal;
  const userAllergen = props.allergen;
  const userUnPreffer = props.unPreffer;
  const carbTotal = Math.round(((totalCal / 100) * 50) / 4);
  const proteinTotal = Math.round(((totalCal / 100) * 15) / 4);
  const fatTotal = Math.round(((totalCal / 100) * 35) / 9);

  //Setting to make sure getMealResult runs before final output
  //Erases error of empty values being returned
  let mealResult = Array(8).fill("");
  if (!loading) {
    mealResult = getMealResult(
      userMealType,
      userMealStyle,
      products,
      userUnPreffer,
      userAllergen,
      totalCal
    );
    console.log("Meal created!");
  }

  console.log(mealResult);

  //Meal plan created from getMealResult is fetched to print out
  const fixedBreakfastProduct = mealResult[0];
  const fixedLunchProduct = mealResult[1];
  const fixedDinnerProduct = mealResult[2];
  const fixedSnackProduct = mealResult[3];
  const fixedCalVal = mealResult[4];
  const fixedCarbVal = mealResult[5];
  const fixedProteinVal = mealResult[6];
  const fixedFatVal = mealResult[7];

  const breakfastFirstSelect = {
    name: fixedBreakfastProduct ? fixedBreakfastProduct.label : "breakfast",
  };

  const lunchFirstSelect = {
    name: fixedLunchProduct ? fixedLunchProduct.label : "lunch",
  };

  const dinnerFirstSelect = {
    name: fixedDinnerProduct ? fixedDinnerProduct.label : "dinner",
  };
  const snackFirstSelect = {
    name: fixedSnackProduct ? fixedSnackProduct.label : "snack",
  };
  //fetch image from api
  const isBreakfastDataAvailable = Boolean(fixedBreakfastProduct);
  const isLunchDataAvailable = Boolean(fixedLunchProduct);
  const isDinnerDataAvailable = Boolean(fixedDinnerProduct);
  const isSnackDataAvailable = Boolean(fixedSnackProduct);

  const [breakfast, setBreakfast] = useState({});
  const [lunch, setLunch] = useState({});
  const [dinner, setDinner] = useState({});
  const [snack, setSnack] = useState({});
  console.log("Breakfast going in API fetch: ", breakfastFirstSelect.name);
  //useEffect used to avoid API called over the limit.
  useEffect(() => {
    const fetchBreakfastImages = async () => {
      // Fetch breakfast images only if the component is mounted
      if (mounted && isBreakfastDataAvailable) {
        try {
          const response = await axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${breakfastFirstSelect.name}&app_id=${APP_ID}&app_key=${APP_KEY}`
          );
          const hits = response.data.hits;
          if (hits.length > 0) {
            const firstHit = hits[0];
            const recipe = firstHit.recipe;
            if (recipe.image) {
              setBreakfast(recipe.image);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    // Call the fetchBreakfastImages function
    fetchBreakfastImages();
  }, [mounted, breakfastFirstSelect.name]);
  console.log("Lunch going in API fetch: ", lunchFirstSelect.name);
  useEffect(() => {
    const fetchLunchImages = async () => {
      if (mounted && isLunchDataAvailable) {
        try {
          const response = await axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${lunchFirstSelect.name}&app_id=${APP_ID}&app_key=${APP_KEY}`
          );
          const hits = response.data.hits;
          if (hits.length > 0) {
            const firstHit = hits[0]; // Get the first hit
            const recipe = firstHit.recipe; // Extract the recipe object from the hit
            if (recipe.image) {
              setLunch(recipe.image); // Update the recipe state variable with the recipe object from the first hit, if it has an image
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchLunchImages();
  }, [mounted, lunchFirstSelect.name]);
  console.log("Dinner going in API fetch: ", dinnerFirstSelect.name);
  useEffect(() => {
    const fetchDinnerImages = async () => {
      if (mounted && isDinnerDataAvailable) {
        try {
          const response = await axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${dinnerFirstSelect.name}&app_id=${APP_ID}&app_key=${APP_KEY}`
          );
          const hits = response.data.hits;
          if (hits.length > 0) {
            const firstHit = hits[0]; // Get the first hit
            const recipe = firstHit.recipe; // Extract the recipe object from the hit
            if (recipe.image) {
              setDinner(recipe.image); // Update the recipe state variable with the recipe object from the first hit, if it has an image
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchDinnerImages();
  }, [mounted, dinnerFirstSelect.name]);
  console.log("Snack going in API fetch: ", snackFirstSelect.name);
  useEffect(() => {
    const fetchSnackImages = async () => {
      if (mounted && isSnackDataAvailable) {
        try {
          const response = await axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${snackFirstSelect.name}&app_id=${APP_ID}&app_key=${APP_KEY}`
          );
          const hits = response.data.hits;
          if (hits.length > 0) {
            const firstHit = hits[0]; // Get the first hit
            const recipe = firstHit.recipe; // Extract the recipe object from the hit
            if (recipe.image) {
              setSnack(recipe.image); // Update the recipe state variable with the recipe object from the first hit, if it has an image
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchSnackImages();
  }, [mounted, snackFirstSelect.name]);

  //make objects based on selected meals by generator and images fetched from API
  console.log("Breakfast on final output: ", breakfastFirstSelect.name);
  const breakfastSelect = {
    name: breakfastFirstSelect ? breakfastFirstSelect.name : "skip",
    img:
      breakfastFirstSelect && breakfastFirstSelect.name === "Skipped"
        ? process.env.PUBLIC_URL + "/x-mark.jpg"
        : breakfast
        ? breakfast
        : "image",
  };
  console.log("Lunch on final output: ", lunchFirstSelect.name);
  const lunchSelect = {
    name: lunchFirstSelect ? lunchFirstSelect.name : "skip",
    img:
      lunchFirstSelect && lunchFirstSelect.name === "Skipped"
        ? process.env.PUBLIC_URL + "/x-mark.jpg"
        : lunch
        ? lunch
        : "image",
  };
  console.log("Dinner on final output: ", dinnerFirstSelect.name);
  const dinnerSelect = {
    name: dinnerFirstSelect ? dinnerFirstSelect.name : "skip",
    img:
      dinnerFirstSelect && dinnerFirstSelect.name === "Skipped"
        ? process.env.PUBLIC_URL + "/x-mark.jpg"
        : dinner
        ? dinner
        : "image",
  };
  console.log("Snack on final output: ", snackFirstSelect.name);
  const snackSelect = {
    name: snackFirstSelect ? snackFirstSelect.name : "skip",
    img:
      snackFirstSelect && snackFirstSelect.name === "Skipped"
        ? process.env.PUBLIC_URL + "/x-mark.jpg"
        : snack
        ? snack
        : "image",
  };
  //storing inside array(mealArray & mealPlanInfo) to save on database on PopPage.js
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
  console.log(mealPlanInfo);
  // Declare a global variable to track the render count
  window.renderCount = (window.renderCount || 0) + 1;

  // Log the render count to the console
  console.log(`Render count: ${window.renderCount}`);
  console.log(
    breakfastSelect.name,
    lunchSelect.name,
    dinnerSelect.name,
    snackSelect.name
  );

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