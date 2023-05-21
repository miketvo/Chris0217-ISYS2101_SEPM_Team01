import { Link } from "react-router-dom";
import ReactDOM from "react-dom";

const NotLoggedIn = () => {
  return (
    <section>
        <div class="title">
            <h1>You are not logged in!</h1>
        </div>
        <div class="register">
            <p>New to Mearie?</p>
            <Link to="/register">Make an account</Link>
        </div>
        <div class="login">
            <p>Already registered?</p>
            <Link to="/login">Sign In</Link>
        </div>
    </section>
  )
};

ReactDOM.render(<NotLoggedIn />, document.getElementById("root"));
export default NotLoggedIn;