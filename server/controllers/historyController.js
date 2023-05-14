const db = require("../module/db");

// This function fetches a random label from the database
const handleHistory = async (req, res) => {
  console.log("historyController executed!");

  // define the SQL query to fetch a random label
  const query = "SELECT * FROM meals;"; // display random label

  // execute the query using the db object and handle the results
  db.query(query, function (err, data) {
    console.log(data);

    if (err) return res.json(err); // if there's an error, return it as JSON
    return res.json(data); // if successful, return the data as JSON
  });
};

module.exports = { handleHistory };
