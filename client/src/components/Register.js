import { useRef, useState, useEffect } from "react"; //user state랑 validation 설정 해주려구~~~
import { Link } from "react-router-dom"; // 링크 이어주려구~~

/* 밑에 두개는 아이콘들 불러오려구 깔았습니답. 
(npm i --save @fortawesome/fontawesome-svg-core) */
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* axios 가 로그인 레지스터 어텐티케이션 다 제공해주는게 굉장히 많아서 깔았어욥. 
데이터 저장이 굉장히 쉬워욥! 이 파일에서는 엑시오스에서 다이렉트하게 말고 우리가 만들어준 axios.js 파일에서 가져올거에용.
(npm i axios) */
import axios from "../api/axios";

/*아이디, 비번 형식 지정*/
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
    /*set the focus on the user input when the component loads*/
    const userRef = useRef();
    /*set the focus on the error so it can be announced by a screen reader for accessibility*/
    const errRef = useRef();

    /*tied to user input*/
    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []); /*dependency array => 바뀌는 컨디션 */

    /* validate the user name */
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    /*요건 에러 메세지 리셋 시키깅*/
    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd]);

    // handleSubmit은 바로바로 우리가 미리 지정해준 axio를 사용하는 백엔드 부분입니당. 이제 여기서 사용자가 입력한 정보들을 json 으로 바로 올려줄거에용.
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            /* 백엔드에 데이터 보내는 코드! axios.post 를 통해 베이스 url 지정, 
            데이터 보낼 형식 지정 (오브젝트 두개: 아이디, 비번), 
            그리구 마지막 configuration */
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            /*Fetch 보다 axios 가 더 좋은게, 위에 response가 자동으로 json 으로 올라가기 때문입니당*/
            // can look for the data back from axios. response?.data
            // ******* Remove console.logs before deployment *******
            //console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUser("");
            setPwd("");
            setMatchPwd("");
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Registration Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/login">Sign In</Link>
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
                        Register
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validName ? "valid" : "hide"}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validName || !user ? "hide" : "invalid"
                                }
                            />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p
                            id="uidnote"
                            className={
                                userFocus && user && !validName
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.
                            <br />
                            Must begin with a letter.
                            <br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validPwd ? "valid" : "hide"}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validPwd || !pwd ? "hide" : "invalid"
                                }
                            />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p
                            id="pwdnote"
                            className={
                                pwdFocus && !validPwd
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.
                            <br /> 1 Must include uppercase and lowercase
                            letters, a number and a special character.
                            <br />
                            Allowed special characters:{" "}
                            <span aria-label="exclamation mark">!</span>{" "}
                            <span aria-label="at symbol">@</span>{" "}
                            <span aria-label="hashtag">#</span>{" "}
                            <span aria-label="dollar sign">$</span>{" "}
                            <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={
                                    validMatch && matchPwd ? "valid" : "hide"
                                }
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validMatch || !matchPwd ? "hide" : "invalid"
                                }
                            />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p
                            id="confirmnote"
                            className={
                                matchFocus && !validMatch
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button
                            disabled={
                                !validName || !validPwd || !validMatch
                                    ? true
                                    : false
                            }
                        >
                            Sign Up
                        </button>
                    </form>
                    <p style={{ textAlign: "center" }}>
                        Already registered?
                        <br />
                        <span className="line">
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: "none",
                                    fontWeight: 650,
                                }}
                            >
                                Sign In
                            </Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Register;
