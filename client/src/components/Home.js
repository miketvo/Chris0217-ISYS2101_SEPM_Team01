import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import Generation from "./Generation.js";
import "./Home.css";
const Home = () => {
  return (
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
  );
};

ReactDOM.render(<Home />, document.getElementById("root"));
export default Home;