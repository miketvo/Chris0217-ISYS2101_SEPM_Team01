import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./NavbarStyle.css";


function Navbar() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/check-login-status");
        const { isLoggedIn } = response.data;
        setIsLoggedIn(isLoggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
        await axios.post("/api/logout");
        setIsLoggedIn(false);
    } catch (error) {
        console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <nav>
        <a>
          <Link to="/home">
            <img
              src={require("../images/Mearie_Logo_Hori.png")}
              className="logo"
              alt="Mearie"
            />
          </Link>
        </a>
        <div>
          <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
            <li>
              <a>
                <Link to="/">Archive</Link>
              </a>
            </li>
            <li>
              <a>
                <Link to="/">Community</Link>
              </a>
            </li>
            <li>
              <a>
                <Link to="/mypage">My Page</Link>
              </a>
            </li>
            <li>
              <a>
                <Link to="/">About</Link>
              </a>
            </li>
            <li>
            {isLoggedIn ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
                <Link to="/login">Login</Link>
            )}
          </li>
          </ul>
        </div>

        <div id="mobile" onClick={handleClick}>
          <i
            id="bar"
            className={clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
      </nav>
    </>
  );
}

export default Navbar;