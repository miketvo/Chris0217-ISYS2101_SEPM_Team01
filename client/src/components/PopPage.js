import React, { useState, useContext, useEffect } from "react";
import "./PopPage.css";
import "./Dashboard.css";
import axios from "../api/axios";
import Selection from "./Selection";
import { flushCache } from "./Memoization";
function PopPage() {
  //id 1-4: Meal Style, id 5-8: Meal Type
  const [isReRecommendClicked, setIsReRecommendClicked] = useState(false);
  const [checkedState, setCheckedState] = useState([
    { id: 1, value: "Vegan", isChecked: false },
    { id: 2, value: "Vegetarian", isChecked: false },
    { id: 3, value: "Mediterranean", isChecked: false },
    { id: 4, value: "Keto-Friendly", isChecked: false },
    { id: 5, value: "breakfast", isChecked: false },
    { id: 6, value: "lunch", isChecked: false },
    { id: 7, value: "dinner", isChecked: false },
    { id: 8, value: "snack", isChecked: false },
  ]);

  //constant needed for useEffect
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedTypeValues, setSelectedTypeValues] = useState([]);
  const [selectedStyleValues, setSelectedStyleValues] = useState([]);
  const [showDiv, setShowDiv] = useState(false);
  const [userinfos, setUserinfos] = useState([]);

  //get user information for filtering
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get("http://localhost:3500/userinfo");
      console.log("User info loading!");
      const userData = response.data;
      if (userData) {
        setUserinfos(userData);
      } else {
        getUserInfo();
      }
    };
    getUserInfo();
  }, []);

  //save data of user on constant
  const userHeight = userinfos.map((userinfos) => userinfos.height);
  const userWeight = userinfos.map((userinfos) => userinfos.weight);
  const userSex = userinfos.map((userinfos) => userinfos.sex);
  const userAge = userinfos.map((userinfos) => userinfos.age);
  const userUnPreffer = userinfos.map(
    (userinfos) => userinfos.unpreferred_ingredients
  );
  const userAllergen = userinfos.map((userinfos) => userinfos.allergen);

  //calculation of algorithm for AMR
  const userBMR = 10 * userWeight + 6.25 * userHeight - 5 * userAge;
  let userAMR = 100;
  if (userSex.includes("m")) {
    userAMR = userBMR * 1.55;
  } else {
    userAMR = userBMR * 1.375;
  }

  const totalCal = Math.round(userAMR);
  console.log(totalCal);

  //function checking checkboxes are checked
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
  //function of submit after checkbox input
  const [countRe, setCountRe] = useState(0);
  const handleSubmit = async (event) => {
    flushCache();
    setCountRe(countRe + 1);
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
    setSelectedStyleValues(selectedStyleValues);
    //selected type array creation
    const selectedTypeItems = selectedItems.filter(
      (item) => item.id >= 5 && item.id <= 8
    );
    const selectedTypeValues = selectedTypeItems.map((item) => item.value);
    console.log("Selected type:", selectedTypeValues);
    setSelectedTypeValues(selectedTypeValues);
    setSelectedValues(selectedValues);
    setShowDiv(true);
    console.log("Submit button clicked!");

  };

  //function for re-recommend
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  function handleReRecommend(event) {
    if (isButtonDisabled) {
      return; // cannot click if button is disabled
    }
    flushCache();
    setCountRe(countRe + 1);
    const { id } = event.target.id;
    //re-render meal generator for new result
    setCheckedState((prevState) => {
      const newState = prevState.map((item) => {
        if (item.id === Number(id)) {
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      });
      return newState;
    });
    setButtonDisabled(true); // Disable the button
    if (!isReRecommendClicked) {
      console.log("Re-recommend button clicked!");

      // Update the state to indicate that the button has been clicked
      setIsReRecommendClicked(true);
    }
  }

  //timeout for re-recommend button
  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonDisabled(false); // Enable the button after 7 seconds due to limitation of API
    }, 7000);

    return () => clearTimeout(timer); // Clear the timer on component unmount or re-render
  }, [isButtonDisabled]);

  //function for confirm button
  const handleConfirmClick = async (event) => {
    flushCache();
    const mealUserArray = window.mealArray;
    const mealPlanInfo = window.mealPlanInfo;
    console.log(mealUserArray);
    event.preventDefault();
    try {
      //This code needs to change to link based on link
      window.location.href = "http://localhost:3000/home";
      //window.location.href = "http://13.215.209.159:3000/home";
      const responseInput = await axios.post(
        "/home",
        { mealUserArray, mealPlanInfo },
        {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Sent somehow");
    } catch (err) {
      console.log("Failed somehow");
    }
  };
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
                            selectedTypeValues
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
                <Selection
                  type={selectedTypeValues}
                  style={selectedStyleValues}
                  cal={totalCal}
                  allergen={userAllergen}
                  unPreffer={userUnPreffer}
                ></Selection>
                <div className="popup-buttons">
                  <button
                    className={isButtonDisabled ? "disabled" : ""}
                    onClick={handleReRecommend}
                  >
                    Re-recommend
                  </button>
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