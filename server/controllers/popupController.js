const db = require("../module/db");

/* SELECT *
FROM my_table
WHERE 
JSON_SEARCH(json_column, 'one', 'value_to_find') 
IS NOT NULL;*/
const handleNewInput = async (req, res) => {
  const type = req.body.selectedTypeValues;
  const style = req.body.selectedStyleValues;

  const typeJson = JSON.stringify(type);
  const styleJson = JSON.stringify(style);

  var sql = {
    type: typeJson,
    style: styleJson,
  };

  var query = db.query(
    "INSERT INTO generator set ?",
    sql,
    function (err, rows) {
      if (err) {
        return console.log(err);
      } else {
        console.log("Input has been created successfully!");
        res.end();
      }
    }
  );

  /*SELECT *
FROM my_table
WHERE my_column LIKE '%part_of_value%'; */
};

module.exports = { handleNewInput };
