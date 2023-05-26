const sessionUtil = require('./sessionUtil');

const handleLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out:", err);
        } else {
            res.clearCookie('sessionID');
            const logoutUserName = sessionUtil.getUsernameFromSession(res);
            console.log('로그아웃:', logoutUserName);
            res.redirect('/'); // 로그아웃 후 리디렉션 URL 설정
        }
    });
};
  
module.exports = { handleLogout };