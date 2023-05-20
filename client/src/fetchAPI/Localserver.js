import express from "express";
import mysql from "mysql";
import axios from "axios";


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "api",
});

const APP_ID = "25d1f83f";
const APP_KEY = "73d5699d0f6499668c30c852dcb1d442";
const label = [];
const calories = [];

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello this is the backend!");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM apiData";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });1
});

const getData = async () => {
  const response = await axios.get(
    `https://api.edamam.com/api/recipes/v2?type=public&q=egg&app_id=${APP_ID}&app_key=${APP_KEY}`
  );
  const data = response.data.hits;
  // console.log(data)
  data.map((item) => {
    label.push(item.recipe.label);
    calories.push(item.recipe.calories);
  });
  console.log(label);
  console.log(calories.length);
  app.post("/books", (req, res) => {
    for (var i = 0; i < label.length; i++) {
      const q = "INSERT INTO apiData (`name`, `calories`) VALUES (?)";
      var values = [label[i], calories[i]];
      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Data created successfully!");
      });
    }
    
  });
};
getData();
// app.post("/books", (req, res) => {
//   const q = "INSERT INTO apiData (`name`, `calories`) VALUES (?)"
//   const values = ["joo", 1.2]
//   db.query(q, [values], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("Data created successfully!");
//   });
// });

app.listen(8800, () => {
  console.log("Never give up");
});