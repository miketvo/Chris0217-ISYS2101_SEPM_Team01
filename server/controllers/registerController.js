const db = require("../module/db");  // 데이터베이스 연결
const bcrypt = require('bcrypt');  // 비밀번호 암호화


const handleNewUser = async (req, res) => {
    const name = req.body.user;
    const pw = req.body.pwd;
    const salt = await bcrypt.genSalt(10);
    const encryptedPwd = await bcrypt.hash(pw, salt);  // 유저가 input으로 넣은 비밀번호를 10번 암호화한다는 뜻

    // 아래 코드는 백엔드로 데이터가 잘 전달되었는지 확인하기 위한 코드입니다~ 테스트해 보고 싶으시면 해제해서 사용해 보셔도 되는데 백엔드로 전달된 모든 데이터가 쿼리에 들어가는 건 아니에요! (ex. 중복 username)
    // console.log('MySql DB Connect Complete! ID : ' + db.threadId);
    // console.log("input name: [", name, "]");
    // console.log("input pw: [", pw, "]");
    // console.log("encrypted pw: [", encryptedPwd, "]");
    
    // RDS MySQL users table에서 name을 가진 name을 찾는다는 쿼리문 작성 (중복 가입 방지 목적)
    var sql1 = "SELECT name FROM users WHERE name = '" + name + "';";
    db.query(sql1, function(err, rows) {
        if(rows.length == 0) {  // 쿼리 결과가 0일 때 (중복 없다는 뜻)
            var sql2 = {
                name: name,
                pw: encryptedPwd
            };  // 쿼리로 처리하기 위해 변수 선언
        var sql3 = db.query('INSERT INTO users set ?', sql2, function(err, rows) {
            if(err) {
                return console.log("errorcode:", err);  // 중복 가입 캐치 후 에러 (null 값 리턴)
            } else {
                console.log("Username " + name + " has been created successfully!");
                console.log("input name: [", name, "]");
                console.log("input pw: [", pw, "]");
                console.log("encrypted pw: [", encryptedPwd, "]");
                res.end();
            }
        })
        } else {
            console.log("errorcode:", err);  // 중복일 경우 errorcode: null 출력됨
            return res.sendStatus(409);
        }
    });
};

module.exports = { handleNewUser };
