import React from "react";
// const Recipe = ({ label, calories, image, ingredients }) => {
const Recipe = (props) => {
  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Meal: {props.label}</th>
            <th>calories: {props.calories}</th>
            <th>
              <img src={props.image} alt="" />
            </th>
            <th>
              ingredients:{" "}
              {props.ingredients &&
                props.ingredients.map((ingredient) => (
                  <li>{ingredient.text}</li>
                ))}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Recipe;