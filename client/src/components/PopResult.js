import React, { useState } from "react";
import Progress from "./Progress";
import Menu from "./Menu";
import axios from "../api/axios";

//여기는 meal generation result 출력하는 div
function PopResult() {
  //이거는 그냥 홈페이지 다시 로드하면서 팝업 꺼지게
  const [countRe, setCountRe] = useState(0);
  function handleReRecommend() {
    setCountRe(countRe + 1);
  }
  const storedStyle = window.selectedStyle;
  const storedType = window.selectedType;
  //이건 display될 탄단지 비율입니다
  const calValue = 1500;
  const calTotal = 2000;

  const carbValue = 100;
  const carbTotal = 200;

  const proteinValue = 150;
  const proteinTotal = 200;

  const fatValue = 50;
  const fatTotal = 200;

  const menus = [
    {
      name: "Almond Pancake",
      img: process.env.PUBLIC_URL + "/almond-pancake.jpg",
    },
    {
      name: "Oil Pasta with Basil Pesto",
      img: process.env.PUBLIC_URL + "/oil-pasta.jpg",
    },
    {
      name: "Beef Tenderloin steak",
      img: process.env.PUBLIC_URL + "/beef-steak.jpg",
    },
    {
      name: "Beef Tenderloin steak",
      img: process.env.PUBLIC_URL + "/beef-steak.jpg",
    },
  ];

  const shuffledMenus = [...menus].sort(() => 0.5 - Math.random());
  const [breakfast_test, lunch_test, dinner_test, snack_test] = shuffledMenus;

  //json challenge
  const POPUP_URL = "/home";

  return (
    <>
      <div className="progress-container">
        <Progress heading="Calories" value={calValue} total={calTotal} />
        <Progress heading="Carb" value={carbValue} total={carbTotal} />
        <Progress heading="Protein" value={proteinValue} total={proteinTotal} />
        <Progress heading="Fat" value={fatValue} total={fatTotal} />
      </div>
      <div className="popup-result">
        <div className="item breakfast">
          <div className="item-heading">
            <h3>Breakfast</h3>
          </div>
          <Menu
            img={breakfast_test.img}
            alt={breakfast_test.name}
            menu={breakfast_test.name}
          ></Menu>
        </div>
        <div className="item lunch">
          <div className="item-heading">
            <h3>Lunch</h3>
          </div>
          <Menu
            img={lunch_test.img}
            alt={lunch_test.name}
            menu={lunch_test.name}
          ></Menu>
        </div>
        <div className="item dinner">
          <div className="item-heading">
            <h3>Dinner</h3>
          </div>
          <Menu
            img={dinner_test.img}
            alt={dinner_test.name}
            menu={dinner_test.name}
          ></Menu>
        </div>
        <div className="item snack">
          <div className="item-heading">
            <h3>Snack</h3>
          </div>
          <Menu
            img={snack_test.img}
            alt={snack_test.name}
            menu={snack_test.name}
          ></Menu>
        </div>
      </div>
    </>
  );
}

export default PopResult;
