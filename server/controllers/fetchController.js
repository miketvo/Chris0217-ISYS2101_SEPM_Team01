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

// This function fetches a random label from the database
const getLabelController = async (req, res) => {
  console.log("getLabelController executed!");

  // define the SQL query to fetch a random label
  const query = "SELECT label FROM data ORDER BY RAND() LIMIT 1;"; // display random label

  // execute the query using the db object and handle the results
  db.query(query, function (err, data) {
    console.log(data);

    if (err) return res.json(err); // if there's an error, return it as JSON
    return res.json(data); // if successful, return the data as JSON
  });
};

// This function gets the calories for the random label obtained from the previous function
const getCaloriesController = async (req, res) => {
  console.log("getCaloriesController executed!");

  // call getLabelController to fetch a random label
  getLabelController(null, {
    json: (labelData) => {
      // extract the label from the response and convert it to a string
      const label = labelData[0].label.toString();

      // define the SQL query to fetch the calories for the random label
      const query = "SELECT calories FROM data WHERE label = ?";

      // execute the query using the db object, passing in the label as a parameter, and handle the results
      db.query(query, label, function (err, data) {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
        } else if (data.length === 0) {
          res.status(404).json({ message: "No data found" });
        } else {
          console.log(data);

          res.json(data); // if successful, return the data as JSON STRING
        }
      });
    },
    // send: () => {},
  });
};

// This function gets the calories for the random label obtained from the previous function
const getDietabelsController = async (req, res) => {
  console.log("getDietLabelsController executed!");

  // call getLabelController to fetch a random label
  getLabelController(null, {
    json: (labelData) => {
      // extract the label from the response and convert it to a string
      const label = labelData[0].label.toString();

      // define the SQL query to fetch the calories for the random label
      const query = "SELECT dietLabels FROM data WHERE label = ?";

      // execute the query using the db object, passing in the label as a parameter, and handle the results
      db.query(query, label, function (err, data) {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
        } else if (data.length === 0) {
          res.status(404).json({ message: "No data found" });
        } else {
          console.log(data);

          const dietLabelsArray = JSON.parse(data[0].dietLabels); // parse json data as json object or json string
          const balanced = dietLabelsArray; //get 0th index value of array
          res.json(balanced); // if successful, return the data as JSON STRING
        }
      });
    },
    send: () => {},
  });
};

module.exports = {
  getAllController,
  getLabelController,
  getCaloriesController,
  getDietabelsController,
};
