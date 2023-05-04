import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Selection.css";
import Progress from "./Progress";
import Menu from "./Menu";

function Selection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3500/api")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
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
  const randomBreakfastProduct =
    breakfastProducts[Math.floor(Math.random() * breakfastProducts.length)];

  const randomLunchProduct =
    lunchProducts[Math.floor(Math.random() * lunchProducts.length)];

  const randomDinnerProduct =
    dinnerProducts[Math.floor(Math.random() * dinnerProducts.length)];

  const calVal = Math.round(
    randomBreakfastProduct.calories +
      randomLunchProduct.calories +
      randomDinnerProduct.calories
  );
  const carbVal = Math.round(
    randomBreakfastProduct.carb +
      randomLunchProduct.carb +
      randomDinnerProduct.carb
  );
  const proteinVal = Math.round(
    randomBreakfastProduct.protein +
      randomLunchProduct.protein +
      randomDinnerProduct.protein
  );
  const fatVal = Math.round(
    randomBreakfastProduct.fat +
      randomLunchProduct.fat +
      randomDinnerProduct.fat
  );
  const totalCal = 5000;
  const carbTotal = 2000;
  const proteinTotal = 2000;
  const fatTotal = 1000;

  const breakfastSelect = {
    name: randomBreakfastProduct.label,
    img: process.env.PUBLIC_URL + "/oil-pasta.jpg",
  };

  const lunchSelect = {
    name: randomLunchProduct.label,
    img: process.env.PUBLIC_URL + "/oil-pasta.jpg",
  };

  const dinnerSelect = {
    name: randomDinnerProduct.label,
    img: process.env.PUBLIC_URL + "/oil-pasta.jpg",
  };

  return (
    <>
      <div className="testing">
        <div className="progress-container">
          <Progress heading="Calories" value={calVal} total={totalCal} />
          <Progress heading="Carb" value={carbVal} total={carbTotal} />
          <Progress heading="Protein" value={proteinVal} total={proteinTotal} />
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
              img={dinnerSelect.img}
              alt={dinnerSelect.name}
              menu={dinnerSelect.name}
            ></Menu>
          </div>
        </div>
      </div>
      <div className="testing">
        <h2>{randomBreakfastProduct.label}</h2>
        <p>Calories: {randomBreakfastProduct.calories}</p>
        <p>Carb: {randomBreakfastProduct.carb}</p>
        <p>Health Labels:{randomBreakfastProduct.healthLabels}</p>
        <p>Meal Type: {randomBreakfastProduct.mealType}</p>
        <h2>{randomLunchProduct.label}</h2>
        <p>Calories:{randomLunchProduct.calories}</p>
        <p>Carb: {randomLunchProduct.carb}</p>
        <p>Health Labels:{randomLunchProduct.healthLabels}</p>
        <p>Meal Type: {randomLunchProduct.mealType}</p>
        <h2>{randomDinnerProduct.label}</h2>
        <p>Calories: {randomDinnerProduct.calories}</p>
        <p>Carb: {randomDinnerProduct.carb}</p>
        <p>Health Labels:{randomDinnerProduct.healthLabels}</p>
        <p>Meal Type: {randomDinnerProduct.mealType}</p>
      </div>
    </>
  );
}

export default Selection;
