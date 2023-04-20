// database connection
const db = require("../module/db");
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    const name = req.body.user;
    const pw = req.body.pwd;
    const encryptedPwd = await bcrypt.hash(pw, 10);

    // 아래 코드는 백엔드로 데이터가 잘 전달되었는지 확인하기 위한 코드입니다~ 테스트해 보고 싶으시면 해제해서 사용해 보셔도 되는데 백엔드로 전달된 모든 데이터가 쿼리에 들어가는 건 아니에요! (ex. 중복 username)
    // console.log('MySql DB Connect Complete! ID : ' + db.threadId);
    // console.log(name);
    // console.log(pw);
    // console.log(encryptedPwd);
    
    var query = "SELECT name FROM users WHERE name = '" + name + "';";
    db.query(query, function(err, rows) {
        if(rows.length == 0) {
            var sql = {
                name: name,
                pw: encryptedPwd
            };
        var query = db.query('INSERT INTO users set ?', sql, function(err, rows) {
            if(err) {
                return console.log(err)
            } else {
                console.log("Username " + name + " has been created successfully!");
                res.end()
            }
        })
        } else {
            console.log("errorcode: " + err);
            return res.sendStatus(409);
        }
    });
};

module.exports = { handleNewUser };
