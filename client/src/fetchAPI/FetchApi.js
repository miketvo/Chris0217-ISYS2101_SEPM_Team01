// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Recipe from "./Recipe.js";

// const APP_ID = "25d1f83f";
// const APP_KEY = "73d5699d0f6499668c30c852dcb1d442";

// const FetchApi = () => {
//   // define a function component called FetchApi
//   const [recipe, setRecipe] = useState([]);
//   const [search, setSearch] = useState("");
//   const [query, setQuery] = useState("");

//   // useEffect hook to fetch the recipes from the Edamam API
//   useEffect(() => {
//     getRecipe();
//   }, [query]);

//   // function to make an API request to the Edamam API and update the "recipe" state variable with the response
//   const getRecipe = async () => {
//     const response = await axios.get(
//       `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
//     );
//     setRecipe(response.data.hits); // update the "recipe" state variable with the hits array from the API response

//     console.log(response.data.hits);
//   };

//   // function to update the "search" state variable with the value entered in the search input field
//   const updateSearch = (e) => {
//     setSearch(e.target.value);
//     console.log(e.target.value);
//   };

//   // function to update the "query" state variable with the value of the "search" state variable when the search button is clicked
//   const uppdateQuery = (e) => {
//     e.preventDefault();
//     setQuery(search);
//   };

//   return (
//     <div className="App">
//       <form onSubmit={uppdateQuery}>
//         <input type="text" value={search} onChange={updateSearch} />
//         <button type="button">Search</button>
//       </form>
//       {recipe.map((item) => (
//         <Recipe
//           label={item.recipe.label}
//           calories={item.recipe.calories}
//           image={item.recipe.image}
//           ingredients={item.recipe.ingredients}
//         />
//       ))}
//     </div>
//   );
// };
// export default FetchApi;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Recipe from "./Recipe.js";

const APP_ID = "25d1f83f";
const APP_KEY = "73d5699d0f6499668c30c852dcb1d442";

const FetchApi = () => {
  // define a function component called FetchApi
  const [recipe, setRecipe] = useState([]);
  const [query, setQuery] = useState("");

  /*   ////function to make an API request to the Edamam API and update the "recipe" state variable with the response
  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setRecipe(response.data.hits); // update the "recipe" state variable with the hits array from the API response

    console.log(response.data.hits);
  }; */

  // function to update the "query" state variable with a random label from the database when the search button is clicked
  const updateQuery = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3500/api/label"); //fetch item that is selected randomly
      const label = response.data[0].label;
      setQuery(label);
      // getRecipe(label); // pass the label to the getRecipe function
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect hook to fetch the recipes from the Edamam API
  useEffect(() => {
    const getRecipe = async () => {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      setRecipe(response.data.hits); // update the "recipe" state variable with the hits array from the API response

      console.log(response.data.hits);
    };
    getRecipe();
  }, [query]);

  return (
    <div className="App">
      <form onSubmit={updateQuery}>
        <button type="submit">Get Random Recipe</button>
      </form>
      {recipe.map((item) => (
        <Recipe
          label={query} //import label from mysql
          calories={item.recipe.calories}
          image={item.recipe.image}
          ingredients={item.recipe.ingredients}
        />
      ))}
    </div>
  );
};

export default FetchApi;