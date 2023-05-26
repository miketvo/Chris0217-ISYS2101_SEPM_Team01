const db = require("../module/db");
const sessionUtil = require("./sessionUtil");

const handleNewInput = async (req, res) => {
  const { mealUserArray, mealPlanInfo } = req.body;
  const cachedUsername = sessionUtil.getUsernameFromSession(req);
  var sql = {
    meal: JSON.stringify(mealUserArray),
    info: JSON.stringify(mealPlanInfo),
    user: cachedUsername,
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