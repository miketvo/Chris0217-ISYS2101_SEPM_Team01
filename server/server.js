const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// 로그인을 유지하기 위해서 express에서 제공하는 mysql session을 이용 (npm install express-session express-mysql-session)
var session = require('express-session');
var mySqlStore = require('express-mysql-session')(session);  // store로 쓸 데베 연결
var option = require("./module/option");  // 데베 정보를 option.js로 제공 (db.js를 안 쓰는 이유는 커넥션이 두 번 생겨서 에러가 생기기 때문)
var sessionStore = new mySqlStore(option);  // 새로운 store 선언

app.use(
    session({  // 세션 정보
        secret: 'session_cookie_secret',  // 암호화 방식
        resave: false,
        saveUninitialized: false,
        store: sessionStore  // 앞서 선언한 스토어
    })
);

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/mypage', require('./routes/mypage'));
app.use("/home",require("./routes/popup"));
app.use("/api", require("./routes/api"));
app.use("/history", require("./routes/history"));


// 로그인 상태 확인 엔드포인트
app.get("/api/check-login-status", (req, res) => {
    // 세션에서 로그인 상태 확인
    const isLoggedIn = req.session.isLoggedIn || false;
  
    res.json({ isLoggedIn });
});
app.use('/api/logout', require('./routes/logout'));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
