/*이거는 우리가 만든 baseURL! 요기가 이제 우리의 백엔드가 있을 곳.
여기서 임포트 해온 axio를 레지스터 파일에서 사용할거에용
사용하기전에 미리 node - config - allowedOrigin 에 저 localhost:3500 url 추가해놓고, npm run dev 하기!
그러면 터미널에서 정보가 json 형식으로 보여집니다.*/

import axios from "axios";
export default axios.create({
    baseURL: "http://localhost:3500",
    // baseURL: "http://54.151.158.45:3500",
});
