const db = require("../module/db");

// This function fetches a random label from the database
const getAllController = async (req, res) => {
  console.log("getAllController executed!");

  // define the SQL query to fetch a random label
  const query = "SELECT * FROM data;"; // display random label

  // execute the query using the db object and handle the results
  db.query(query, function (err, data) {
    console.log(data);

    if (err) return res.json(err); // if there's an error, return it as JSON
    return res.json(data); // if successful, return the data as JSON
  });
};

// This function fetches all ingredients from the database
const getAllIngredientsController = async (req, res) => {
  console.log("getAllIngredientsController executed!");

  // define the SQL query to fetch all ingredients
  const query = "SELECT ingredients FROM data;";

  // execute the query using the db object and handle the results
  db.query(query, function (err, data) {
    // check if there's an error
    if (err) {
      console.log(err);
      return res.json(err);
    }

    // check if there's data and it has length
    if (data && data.length > 0) {
      // Check if data is not undefined and has length
      const allIngredients = []; // initialize an empty array to store unique ingredients

      // loop through each row of data
      data.forEach((row) => {
        const ingredients = JSON.parse(row.ingredients); // convert ingredient to lowercase to avoid duplicates

        // loop through each ingredient in the array
        ingredients.forEach((ingredient) => {
          const lowerCaseIngredient = ingredient.toLowerCase(); // convert ingredient to lowercase to avoid duplicates

          // check if the lower case ingredient is not already in the allIngredients array
          if (!allIngredients.includes(lowerCaseIngredient)) {
            allIngredients.push(lowerCaseIngredient); // if not, add it to the allIngredients array
          }
        });
      });

      return res.json(allIngredients); // return the array of unique ingredients as JSON
    } else {
      // if there's no data, return an empty array as JSON
      return res.json([]);
    }
  });
};

module.exports = {
  getAllController,
  getAllIngredientsController,
};