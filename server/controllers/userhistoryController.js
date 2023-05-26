const db = require("../module/db");
const sessionUtil = require("./sessionUtil");

// This function fetches a random label from the database
const handleUserHistory = async (req, res) => {
  console.log("historyController executed!", req.originalUrl);
  const cachedUsername = sessionUtil.getUsernameFromSession(req);

  // define the SQL query to fetch a random label
  const query = "SELECT * FROM meals WHERE user = '" + cachedUsername + "';";

  // execute the query using the db object and handle the results
  db.query(query, function (err, data) {
    console.log(data);

    if (err) return res.json(err); // if there's an error, return it as JSON
    return res.json(data); // if successful, return the data as JSON
  });
};

module.exports = { handleUserHistory };