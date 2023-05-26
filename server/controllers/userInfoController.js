const db = require("../module/db");
const sessionUtil = require("./sessionUtil");

// This function fetches a random label from the database
const handleUserInput = async (req, res) => {
  console.log("userInputController executed!");
  const cachedUsername = sessionUtil.getUsernameFromSession(req);
  if (cachedUsername) {
    console.log("현재 로그인한 사용자:", cachedUsername);
  }

  // define the SQL query to fetch a random label
  const query =
    "SELECT name, height, weight, sex, age, unpreferred_ingredients, allergen FROM users WHERE name = '" +
    cachedUsername +
    "';"; // get information of user

  // execute the query using the db object and handle the results
  db.query(query, function (err, data) {
    console.log(data);

    if (err) return res.json(err); // if there's an error, return it as JSON
    return res.json(data); // if successful, return the data as JSON
  });
};

module.exports = { handleUserInput };