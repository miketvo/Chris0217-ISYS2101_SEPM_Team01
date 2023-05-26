import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from "react-router-dom";

import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import Generation from "./Generation.js";
import "./Home.css";

const Home = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get("http://localhost:3500/api/check-login-status");
            const { isLoggedIn } = response.data;
            setIsLoggedIn(isLoggedIn);
        } catch (error) {
            console.error("Error checking login status:", error);
        }
    };
    useEffect(() => {
        checkLoginStatus();
    }, []);

  return (
    <>
    {!isLoggedIn ? (
      <section style={{ textAlign: "center" }} >
        <br/>
        <h1>You are Not logged in!</h1>
        <br />
        <p>
          If you already have an account, <br/>
          <button>
            {/* <Link style={{ textDecoration: "none", color: "gray" }} to="/"> */}
              Login
            {/* </Link> */}
          </button> 
        </p>
        <br/>
        <p>
          If you are new to Mearie,&nbsp;<br/>
          <button>
            {/* <Link style={{ textDecoration: "none", color: "gray" }} to="/register"> */}
              Register
            {/* </Link> */}
          </button>
        </p>
      </section>
    ) : (
      <div className="home">
        <div className="history-container">
          <h1>Meal Plan History</h1>
          <Dashboard />
        </div>
        <div className="popup-outside">
          <h1>Meal Plan Generator</h1>
          <div className="popup-container-home">
            <Generation />
          </div>
        </div>
      </div>
    )}
  </>
  );
};

ReactDOM.render(<Home />, document.getElementById("root"));
export default Home;