import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

function Register() {
    const userRef = useRef();
    const errRef = useRef();

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
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const users = {
            user: user, 
            pwd: pwd
        };

        try {
            
            // axios.post(REGISTER_URL, users)
            //     .then((res) => {
            //         console.log(res.users)
            //     }).catch((error) => {
            //         console.log(error)
            //     }); 
            
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            setSuccess(true);
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
