/* import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Recipe from "./Recipe";

function App() {
  const APP_ID = "25d1f83f";
  const APP_KEY = "73d5699d0f6499668c30c852dcb1d442";
  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  useEffect(() => {
    getRecipe();
  }, [query]);
  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setRecipe(response.data.hits);
    console.log(response.data.hits);
  };
  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };
  const uppdateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
  }
  return (
    <div className="App">
      <form onSubmit={uppdateQuery}>
        <input type='text' value={search} onChange={updateSearch}/>
        <button type="button">Search</button>
      </form>
      
      {recipe.map((recipe) => (
        <Recipe
        label={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        // dietLabels={recipe.recipe.dietLabels.index}
        /> 
      ))}
    </div>
  );
}

export default App; */

import "./App.css";

import FetchApi from "./fetchAPI";
function App() {

  return (
  FetchApi()
  )

}

export default App;
