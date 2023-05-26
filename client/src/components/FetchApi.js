import React, { useState, useEffect } from "react";
import axios from "axios";
import Recipe from "./Recipe.js";

const APP_ID = "25d1f83f";
const APP_KEY = "73d5699d0f6499668c30c852dcb1d442";

const FetchApi = () => {
  // define a function component called FetchApi
  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  // useEffect hook to fetch the recipes from the Edamam API
  useEffect(() => {
    getRecipe();
  }, [query]);

  // function to make an API reque.st to the Edamam API and update the "recipe" state variable with the response
  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setRecipe(response.data.hits); // update the "recipe" state variable with the hits array from the API response

    console.log(response.data.hits);
  };

  // function to update the "search" state variable with the value entered in the search input field
  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  // function to update the "query" state variable with the value of the "search" state variable when the search button is clicked
  const uppdateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <section>
    <div className="App">
      <form onSubmit={uppdateQuery}>
        <input type="text" value={search} onChange={updateSearch} />
        <button type="button">Search</button>
      </form>
      <div className="fetchedTable">
      {recipe.map((item) => (
        <Recipe
          label={item.recipe.label}
          calories={item.recipe.calories}
          image={item.recipe.image}
          ingredients={item.recipe.ingredients}
        />
      ))}
      </div>
    </div>
    </section>
  );
};
export default FetchApi;

// 돌 아 가 는 코 드
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Recipe from "./Recipe.js";

// const APP_ID = "25d1f83f";
// const APP_KEY = "73d5699d0f6499668c30c852dcb1d442";

// const FetchApi = () => {
//   // define a function component called FetchApi
//   const [recipe, setRecipe] = useState([]);
//   const [query, setQuery] = useState("");

//   // function to update the "query" state variable with a random label from the database when the search button is clicked
//   const updateQuery = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get("http://localhost:3500/api/label"); //fetch item that is selected randomly
//       const label = response.data[0].label;
//       setQuery(label);
//       // getRecipe(label); // pass the label to the getRecipe function
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // useEffect hook to fetch the recipes from the Edamam API and calories from the database
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
//         );
//         setRecipe(response.data.hits); // update the "recipe" state variable with the hits array from the API response

//         console.log(response.data.hits);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, [query]);

//   return (
//     <div className="App">
//       <form onSubmit={updateQuery}>
//         <button type="submit">Get Random Recipe</button>
//       </form>
//       {recipe.map((item) => (
//         <Recipe
//           label={query} //import label from mysql
//           // label={item.recipe.label} //import label from mysql
//           calories={item.recipe.calories}
//           image={item.recipe.image}
//           ingredients={item.recipe.ingredients}
//         />
//       ))}
//     </div>
//   );
// };

// export default FetchApi;

//------------------------------------------------------------------경계
/* import React, { useState, useEffect } from "react";
import axios from "axios";
import Recipe from "./Recipe.js";

const APP_ID = "25d1f83f";
const APP_KEY = "73d5699d0f6499668c30c852dcb1d442";


const FetchApi = () => {
  const [recipe, setRecipe] = useState([]);
  const [query, setQuery] = useState("");
  const [calories, setCalories] = useState(0);
  const updateQuery = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3500/api/label");
      const label = response.data[0].label;
      setQuery(label);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          `http://localhost:3500/api/calories?label=${query}`
        );
        const response2 = await axios.get(
          `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        setRecipe(response2.data.hits);
        setCalories(response1.data[0].calories);
      } catch (error) {
        console.log(error);
      }
    };
    if (query !== "") {
      fetchData();
    }
  }, [query]);

  return (
    <div>
      <form onSubmit={updateQuery}>
        <button type="submit">Get a random food item</button>
      </form>
      {query && (
        <p>
          Showing results for {query} ({calories} calories)
        </p>
      )}
      <div className="recipes">
        {recipe.map((recipe) => (
          <Recipe
            key={recipe.recipe.uri}
            label={query}
            calories={calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default FetchApi; */

/* 

//------------------------------------------------------------------경계
import React, { useState, useEffect } from "react";
import axios from "axios";
import Recipe from "./Recipe.js";

const APP_ID = "25d1f83f";
const APP_KEY = "73d5699d0f6499668c30c852dcb1d442";


const FetchApi = () => {
  const [recipe, setRecipe] = useState([]);
  const [query, setQuery] = useState("");
  const updateQuery = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3500/api/label");
      const label = response.data[0].label;
      setQuery(label);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response2 = await axios.get(
          `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        setRecipe(response2.data.hits);
      } catch (error) {
        console.log(error);
      }
    };
    if (query !== "") {
      fetchData();
    }
  }, [query]);

  return (
    <div>
      <form onSubmit={updateQuery}>
        <button type="submit">Get a random food item</button>
      </form>

      <div className="recipes">
        {recipe.map((recipe) => (
          <Recipe
            key={recipe.recipe.uri}
            label={query}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default FetchApi;
 */