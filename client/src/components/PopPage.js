import React, { useState } from "react";
import Progress from "./Progress";
import "./PopPage.css";
import "./Dashboard.css";
import axios from "../api/axios";
import PopResult from "./PopResult";
import Selection from "./Selection";
function PopPage() {
  //우선 마지막 3-4개가 Meal Type, 나머지는 Meal Style
  const [checkedState, setCheckedState] = useState([
    { id: 1, value: "Vegan", isChecked: false },
    { id: 2, value: "Vegetarian", isChecked: false },
    { id: 3, value: "Gluten-Free", isChecked: false },
    { id: 4, value: "Egg-Free", isChecked: false },
    { id: 5, value: "Breakfast", isChecked: false },
    { id: 6, value: "Lunch", isChecked: false },
    { id: 7, value: "Dinner", isChecked: false },
    { id: 8, value: "Snack", isChecked: false },
  ]);

  //필요한 constant 설정 -> set array를 통해서 받아옵니다
  const [selectedValues, setSelectedValues] = useState([]);
  const [showDiv, setShowDiv] = useState(false);

  //이거는 그냥 홈페이지 다시 로드하면서 팝업 꺼지게
  const handleConfirmClick = () => {
    window.location.href = "http://localhost:3000/home";
  };

  //이건 display될 탄단지 비율입니다
  const calValue = 1500;
  const calTotal = 2000;

  const carbValue = 100;
  const carbTotal = 200;

  const proteinValue = 150;
  const proteinTotal = 200;

  const fatValue = 50;
  const fatTotal = 200;

  //json challenge
  const POPUP_URL = "/home";

  //submit 이전에는 꼭 meal type 중 1개는 선탁해야 submit 가능
  //submit 이후에 콘솔로 선택한 value 리턴하고 메뉴 출력함
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      checkedState.filter(
        (item) => item.isChecked && item.id >= 5 && item.id <= 7
      ).length === 0
    ) {
      alert("Please select at least one meal type.");
      return;
    }
    const selectedItems = checkedState.filter((item) => item.isChecked);
    const selectedValues = selectedItems.map((item) => item.value);
    //selected style array creation
    const selectedStyleItems = selectedItems.filter(
      (item) => item.id >= 1 && item.id <= 4
    );
    const selectedStyleValues = selectedStyleItems.map((item) => item.value);
    console.log("Selected style:", selectedStyleValues);
    //selected type array creation
    const selectedTypeItems = selectedItems.filter(
      (item) => item.id >= 5 && item.id <= 8
    );
    const selectedTypeValues = selectedTypeItems.map((item) => item.value);
    console.log("Selected type:", selectedTypeValues);
    window.selectedStyle = selectedStyleValues;
    window.selectedType = selectedTypeValues;
    //json 보내는 코드(우선 지금은 비활성화)
    /*const userInput = {
      userType: selectedTypeValues,
      userStyle: selectedStyleValues,
    };
    try {
      const responseInput = await axios.post(
        POPUP_URL,
        JSON.stringify({ selectedTypeValues, selectedStyleValues }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (err) {
      /*if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Failed");
      }
      errRef.current.focus();
      console.error(err);
    }
    */
    setSelectedValues(selectedValues);
    setShowDiv(true);
  };

  //체크박스 체크되었는지 확인하는 function
  function handleCheckboxChange(event) {
    const { id } = event.target;
    setCheckedState((prevState) => {
      const newState = prevState.map((item) => {
        if (item.id === Number(id)) {
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      });
      return newState;
    });
  }
  const [countRe, setCountRe] = useState(0);
  function handleReRecommend() {
    setCountRe(countRe + 1);
  }
  return (
    <>
      <div className="popup-wrapper">
        <div className="popup-container">
          <div className="popup-content">
            <form onSubmit={handleSubmit}>
              <h2> Set your wants!</h2>
              <div className="checkbox-container">
                <h3>Meal Style</h3>
                <div className="checkbox-row">
                  {checkedState.slice(0, 4).map((item) => (
                    <label key={item.id}>
                      <input
                        type="checkbox"
                        id={item.id}
                        value={item.value}
                        checked={item.isChecked}
                        onChange={handleCheckboxChange}
                      />
                      {item.value}
                    </label>
                  ))}
                </div>
              </div>
              <div className="checkbox-container">
                <h3>Meal Type</h3>
                {[1].map((rowIndex) => (
                  <div key={rowIndex} className="checkbox-row">
                    {checkedState
                      .slice(rowIndex * 4, rowIndex * 4 + 4)
                      .map((item) => (
                        <label key={item.id}>
                          <input
                            type="checkbox"
                            id={item.id}
                            value={item.value}
                            checked={item.isChecked}
                            onChange={handleCheckboxChange}
                          />
                          {item.value}
                        </label>
                      ))}
                  </div>
                ))}
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="popup-content">
            {showDiv && (
              <>
                <div className="popup-result-title">
                  <h2>Today's Recommendation</h2>
                </div>
                <Selection></Selection>
                <div className="popup-buttons">
                  <button onClick={handleReRecommend}>Re-recommend</button>
                  <button onClick={handleConfirmClick}>Confirm</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PopPage;
