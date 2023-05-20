import { Component } from "react";
import { Link } from "react-router-dom";
import "./NavbarStyle.css";

class Navbar extends Component {
    /*요곳은 모바일 뷰일때, 목록 관련해서 추가한 펑션입니답! 밑에 이어져용~~~
    목록 아이콘 클릭하면 x 아이콘 뜨고, x 아이콘 클릭하면 목록 아이콘 뜨게 한거에욥*/
    state = { clicked: false };
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    };

    render() {
        return (
            /*a href 들은 나중에 페이지 우리가 만들면 Link 임포트 해서 라우트 넣어쥬면 돼효~~~ 지금은 임시입니답!*/
            <>
                <nav>
                    <a><Link to="/home">
                        <img
                            src={require("../images/Mearie_Logo_Hori.png")}
                            className="logo"
                            alt="Mearie"
                        />
                    </Link></a>
                    <div>
                        <ul
                            id="navbar"
                            className={
                                this.state.clicked
                                    ? "#navbar active"
                                    : "#navbar"
                            }
                        >
                            <li>
                                <a><Link to="/archive">Archive</Link></a>
                            </li>
                            <li>
                                <a><Link to="/community">Community</Link></a>
                            </li>
                            <li>
                                <a><Link to="/mypage">My Page</Link></a>
                            </li>
                            <li>
                            <a><Link to="/about">About</Link></a>
                            </li>
                        </ul>
                    </div>

                    <div id="mobile" onClick={this.handleClick}>
                        <i
                            id="bar"
                            className={
                                this.state.clicked
                                    ? "fas fa-times"
                                    : "fas fa-bars"
                            }
                        ></i>
                    </div>
                </nav>
            </>
        );
    }
}

export default Navbar;
