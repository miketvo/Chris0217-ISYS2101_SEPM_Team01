import Progress from "./Progress";
import Menu from "./Menu";

function MealPlan(props) {
  return (
    <>
      <div className="progress-container">
        <Progress
          heading="Calories"
          value={props.calValue}
          total={props.calTotal}
        />
        <Progress
          heading="Carb"
          value={props.carbValue}
          total={props.carbTotal}
        />
        <Progress
          heading="Protein"
          value={props.proteinValue}
          total={props.proteinTotal}
        />
        <Progress heading="Fat" value={props.fatValue} total={props.fatTotal} />
      </div>
      <div className="popup-result">
        <div className="item breakfast">
          <div className="item-heading">
            <h3>Breakfast</h3>
          </div>
          <Menu
            img={props.breakfast_test.img}
            alt={props.breakfast_test.name}
            menu={props.breakfast_test.name}
          ></Menu>
        </div>
        <div className="item lunch">
          <div className="item-heading">
            <h3>Lunch</h3>
          </div>
          <Menu
            img={props.lunch_test.img}
            alt={props.lunch_test.name}
            menu={props.lunch_test.name}
          ></Menu>
        </div>
        <div className="item dinner">
          <div className="item-heading">
            <h3>Dinner</h3>
          </div>
          <Menu
            img={props.dinner_test.img}
            alt={props.dinner_test.name}
            menu={props.dinner_test.name}
          ></Menu>
        </div>
        <div className="item snack">
          <div className="item-heading">
            <h3>Snack</h3>
          </div>
          <Menu
            img={props.snack_test.img}
            alt={props.snack_test.name}
            menu={props.snack_test.name}
          ></Menu>
        </div>
      </div>
    </>
  );
}

export default MealPlan();