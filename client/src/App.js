import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
//import MyPage from "./components/MyPage"; +<Route exact path="/mypage" element={<MyPage />} />
import Home from "./components/Home";
import MyPage from "./components/MyPage";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="App">
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/mypage" element={<MyPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
