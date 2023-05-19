import ReactDOM from "react-dom";
import "./Dashboard.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Dashboard = () => {
  return (
    <div className="grid container_grid">
      <div className="header">1 day ago</div>
      <div className="header">2 day ago</div>
      <div className="header">3 day ago</div>
      <div className="item">
        <p>Breakfast: Banana Pancake</p>
        <p>Lunch: Fish Tacos</p>
        <p>Dinner: Zucchini Tomato Pasta</p>
        <p>Snack: Skipped</p>
      </div>
      <div className="item">
        <p>Breakfast: Eggplant Casserole</p>
        <p>Lunch: Cliantro-Topped Salmon</p>
        <p>Dinner: Jerk-Seasoned Meat Loaves</p>
        <p>Snack: Apple Maple Chops</p>
      </div>
      <div className="item">
        <p>Breakfast: Skipped</p>
        <p>Lunch: Grilled Mahi Mahi</p>
        <p>Dinner: Chicken with Rosemary Butter Sauce</p>
        <p>Snack: Skipped</p>
      </div>
    </div>
  );
};

ReactDOM.render(<Dashboard />, document.getElementById("root"));
export default Dashboard;
