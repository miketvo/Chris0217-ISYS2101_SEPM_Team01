const db = require("../module/db"); 

const handleEdit= async (req, res) => {
    const age = req.body.age;
    const sex = req.body.sex;
    const height = req.body.height;
    const weight = req.body.weight;

    //console.log(sessionStorage.getItem("name"));
    var sql1 = "SELECT * FROM users WHERE name = '"+req.session.name+"';";
    db.query(sql1, function(err, rows) {
        if(rows.length == 1) {
            var sql2 = {
                age: age,
                sex: sex,
                height: height,
                weight: weight,
            }; 
        var sql3 = db.query("UPDATE users SET ? WHERE name = '"+req.session.name+"'", sql2, function(err, rows) {
            if(err) {
                return console.log("errorcode:", err);
            } else {
                console.log("input age:[", age, "], sex: [", sex, "], input height: [", height, "], input weight: [", weight, "]");

                req.session.age = age;
                req.session.height = height;
                req.session.weight = weight;
                req.session.save();

                console.log(req.session);
                
                res.end();
            }
        })
    } else {
        console.log("errorcode:", err);
        return res.sendStatus(400);
    }
});
};

module.exports = { handleEdit };
