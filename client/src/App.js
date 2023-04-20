import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <div className="App">
                    <Routes>
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/register" element={<Register />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
