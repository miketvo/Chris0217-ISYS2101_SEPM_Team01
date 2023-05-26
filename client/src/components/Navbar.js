import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./NavbarStyle.css";


function Navbar() {
    const [clicked, setClicked] = useState(false);
  
    const handleClick = () => {
      setClicked(!clicked);
    };

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

  
    // const handleLogout = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:3500/api/logout');
    //         if (response.request.responseURL) {
    //             window.location.href = "http://localhost:3000/login";
    //         }
    //     } catch (error) {
    //         console.error('Error logging out:', error);
    //     } finally {
    //         setIsLoggedIn(false); // 로그아웃 후에 isLoggedIn을 false로 설정
    //     }
    // };

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
                    <Link to="#">Archive</Link>
                  </a>
                </li>
                <li>
                  <a>
                    <Link to="#">Community</Link>
                  </a>
                </li>
                <li>
                  <a>
                    <Link to="/search">Search</Link>
                  </a>
                </li>
                <li>
                  <a>
                    <Link to="/mypage">My Page</Link>
                  </a>
                </li>
                <li>
                  <a>
                    <Link to="#">About</Link>
                  </a>
                </li>
                <li>
                  {isLoggedIn ? (
                    <FontAwesomeIcon
                    icon={faCheck}
                    />
                  ) : (
                    <Link to="/">Login</Link>
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