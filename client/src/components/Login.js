import { useRef, useState, useEffect, useContext } from "react"; //user state랑 validation 설정 해주려구~~~
import { Link } from "react-router-dom"; // 링크 이어주려구~~

import AuthContext from "../context/AuthProvider";
import axios from "axios";
const LOGIN_URL = "/auth";

const Login = () => {
  //어텐티케이트 빼고 레지스터랑 다 비슷합니다!

  //세팅 해주고
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //컴포넌트 포커스 맞춰주고
  useEffect(() => {
    userRef.current.focus();
  }, []);
  //에러 뜬 다음 user, pwd 에 변화 있음 에러 비우고~~
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  //입력 후 엔터 했을때의 펑션!!
  const handleSubmit = async (e) => {
    //리로딩 막고 axios 불러올 준비~~
    e.preventDefault();

    try {
      //define the response!!
      //포스트 안에 우리 유알엘, 입력한 거 json 으로 보내구,
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // 이 밑에 몇줄은 말이죠 로그인 토큰 관련된 부분인데효,
      // 제가 nodejs 좀 더 공부를 하구 설명해드릴게요, 눙물,,,
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      //components 비우깅
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      //에러에 따라 메세지 설정~~
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  //여기는 레지스터랑 거의 똑같아용~~~~ 밑에 루트 링크만 서로 이어지게 해줬숩니댭! 글고 Home 루트도 일단 임시로 그냥 href 로 놔뒀어용!
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <a style={{ textAlign: "center" }}>
            <img
              src={require("../images/Mearie_Logo_nw.png")}
              className="logo"
              alt="Mearie"
            />
          </a>
          <h1
            style={{
              textAlign: "center",
              color: "rgb(106, 110, 136)",
            }}
          >
            Log in
          </h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p style={{ textAlign: "center" }}>
            New to Mearie?
            <br />
            <span className="line">
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  fontWeight: 650,
                }}
              >
                Make an account
              </Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
