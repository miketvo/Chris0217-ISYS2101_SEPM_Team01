const db = require("../module/db");

const handleNewInput = async (req, res) => {
  const { mealUserArray, mealPlanInfo } = req.body;

  var sql = {
    meal: JSON.stringify(mealUserArray),
    info: JSON.stringify(mealPlanInfo),
  };

  var query = db.query("INSERT INTO meals set ?", sql, function (err, rows) {
    if (err) {
      return console.log(err);
    } else {
      console.log("Input has been created successfully!");
      res.end();
    }
  });
};
module.exports = { handleNewInput };