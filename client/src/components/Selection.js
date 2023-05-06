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

  const userInfo = ["Dairy-Free", "Gluten-Free", "Vegetarian"];

  const filteredProducts = products.filter((product) => {
    return userInfo.every((info) => product.healthLabels.includes(info));
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

  const randomBreakfastProduct =
    breakfastProducts[Math.floor(Math.random() * breakfastProducts.length)];

  const randomLunchProduct =
    lunchProducts[Math.floor(Math.random() * lunchProducts.length)];

  const randomDinnerProduct =
    dinnerProducts[Math.floor(Math.random() * dinnerProducts.length)];

  const randomSnackProduct =
    snackProducts[Math.floor(Math.random() * snackProducts.length)];

  const calVal = randomBreakfastProduct
    ? Math.round(
        randomBreakfastProduct.calories +
          randomLunchProduct.calories +
          randomDinnerProduct.calories +
          randomSnackProduct.calories
      )
    : 0;

  /*const calVal = Math.round(

  randomBreakfastProduct.calories +

   randomLunchProduct.calories +

   randomDinnerProduct.calories

 );*/

  const carbVal = randomBreakfastProduct
    ? Math.round(
        randomBreakfastProduct.carb +
          randomLunchProduct.carb +
          randomDinnerProduct.carb +
          randomSnackProduct.carb
      )
    : 0;

  /*const carbVal = Math.round(

  randomBreakfastProduct.carb +

   randomLunchProduct.carb +

   randomDinnerProduct.carb

 );*/

  const proteinVal = randomBreakfastProduct
    ? Math.round(
        randomBreakfastProduct.protein +
          randomLunchProduct.protein +
          randomDinnerProduct.protein +
          randomSnackProduct.protein
      )
    : 0;

  /*const proteinVal = Math.round(

  randomBreakfastProduct.protein +

   randomLunchProduct.protein +

   randomDinnerProduct.protein

 );*/

  const fatVal = randomBreakfastProduct
    ? Math.round(
        randomBreakfastProduct.fat +
          randomLunchProduct.fat +
          randomDinnerProduct.fat +
          randomSnackProduct.fat
      )
    : 0;

  /*const fatVal = Math.round(

  randomBreakfastProduct.fat +

   randomLunchProduct.fat +

   randomDinnerProduct.fat

 );*/

  const totalCal = 2000;
  const carbTotal = 500;
  const proteinTotal = 500;
  const fatTotal = 500;

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
