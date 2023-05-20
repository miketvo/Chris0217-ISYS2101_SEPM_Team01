let cachedUsername = null;

// 세션 데이터를 활용하는 유틸리티 함수
const getUsernameFromSession = (req) => {
    if (req.session && req.session.username) {
        cachedUsername = req.session.username;
        return cachedUsername;
    } else if (cachedUsername != null) {
        return cachedUsername;
    } else {
        return null;
    }
};
  
module.exports = { getUsernameFromSession };