import React from "react";

const Recipe = ({ label, calories, image, ingredients }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Meal: {label}</th>
            <th>calories: {calories}</th>
            <th>
              <img src={image} alt="" />
            </th>
            <th>
              ingredients:{" "}
              {ingredients &&
                ingredients.map((ingredient) => <li>{ingredient.text}</li>)}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Recipe;
