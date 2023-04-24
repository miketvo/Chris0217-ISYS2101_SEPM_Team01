import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthProvider"; 
import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
    const { setAuth } = useContext(AuthContext); 
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);
    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //send info to backend
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            //@@@@@@@@@@@@@@@@@@@
            console.log(JSON.stringify(response?.data));

            const accessToken = response?.data?.accessToken;
            setAuth({ user, pwd, accessToken });
            setUser("");
            setPwd("");
            setSuccess(true);
        } catch (err) {
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
