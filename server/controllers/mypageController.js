const db = require("../module/db"); 
const sessionUtil = require('./sessionUtil');


function getUserInfo(req, res) {
    // 유저 정보를 가져오는 작업 수행
    const cachedUsername = sessionUtil.getUsernameFromSession(req);
    if (cachedUsername) {
        console.log('현재 로그인한 사용자:', cachedUsername);

        // 가져온 유저 정보를 프론트엔드에 전달 등의 작업 수행
        const sql1 = "SELECT * FROM users WHERE BINARY(name) = '" + cachedUsername + "';";
        db.query(sql1, function (err, data) {
            if (err) {
                console.log("console1:", err);
                // 오류 처리
                res.status(500).json({ error: '오류가 발생했습니다.' });
                return;
            }
            res.json({ username: cachedUsername, userData: data });
          });
        } else {
            console.log('로그인되지 않은 사용자');
            res.redirect('/login');
        }
      };

const handleEdit= async (req, res) => {
    const cachedUsername = sessionUtil.getUsernameFromSession(req);
    const age = req.body.age;
    const sex = req.body.sex;
    const height = req.body.height;
    const weight = req.body.weight;
    const allergen = req.body.allergen;
    const unpreferred_ingredients = req.body.unpIngredients


    var sql1 = "SELECT * FROM users WHERE name = '"+cachedUsername+"';";

    db.query(sql1, function(err, rows) {

        if(rows.length == 1) {

            var sql2 = "UPDATE users SET age = "+age+", sex = '"+sex+"', height = "+height+", weight = "+weight+", allergen = '"+JSON.stringify(allergen)+"', unpreferred_ingredients = '"+JSON.stringify(unpreferred_ingredients)+"' WHERE name = '"+cachedUsername+"';";

            db.query(sql2, function(err, rows) {
                if(err) {
                    return console.log("errorcode:", err);
                } else {
                    res.end();
                }
            })
        } else {
            console.log("errorcode:", err);
            return res.sendStatus(400);
        }
    });
};



module.exports = { getUserInfo, handleEdit };
