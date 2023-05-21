import { Line } from "rc-progress";
import "./Progress.css";

function Progress(props) {
  const percentage = (props.value / props.total) * 100;
  return (
    <div className="progress-bar">
      <h3>{props.heading}</h3>
      <Line
        percent={percentage}
        strokeWidth="4"
        trailWidth="4"
        strokeColor="#FCF4AC"
        trailColor="#FFFFFF"
      />
      <p>
        {props.value}/{props.total}
      </p>
    </div>
  );
}

export default Progress;