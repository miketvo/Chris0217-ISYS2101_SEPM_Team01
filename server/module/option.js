var option = {
    host: 'mearie-user.cgjictz2gicj.ap-southeast-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: '!2345678', 
    database: 'mearie_user',
    table: 'sessions',         // 세션 데이터를 저장할 테이블 이름
    expiration: 86400000,     // 세션의 만료 시간 (예: 1일)
}

module.exports = option;