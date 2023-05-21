import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import MyPage from "./components/MyPage";
import Home from "./components/Home";
import FetchApi from "./fetchAPI/FetchApi";
import Selection from "./components/Selection";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="App">
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/mypage" element={<MyPage />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/api" element={<FetchApi />} />
            <Route exact path="/selection" element={<Selection />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
