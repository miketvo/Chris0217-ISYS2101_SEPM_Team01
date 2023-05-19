import React, { useState } from "react";
import "./Generation.css";
import PopPage from "./PopPage";
import PopResult from "./PopResult";
import "./PopPage.css";

function Generation() {
  const [isOpen, setIsOpen] = useState(false);

  function openPopup() {
    setIsOpen(true);
    window.subSituation = 150;
    console.log(window.subSituation);
    document.body.classList.add("popup-open");
  }

  function closePopup() {
    setIsOpen(false);
    document.body.classList.remove("popup-open");
  }

  const [countSet, setCountSet] = useState(0);
  function setAgain() {
    window.subSituation = 150;
    console.log(window.subSituation);
    setCountSet(countSet + 1);
  }

  return (
    <>
      {window.subSituation === 150 ? (
        <>
          <button onClick={openPopup} className="button-recommend">
            Get Recommendation
          </button>
          {isOpen && (
            <div className="popup">
              <div className="popup-inner">
                <PopPage></PopPage>
                <button className="close-button" onClick={closePopup}>
                  X
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <PopResult></PopResult>
          <button onClick={setAgain}>Reset</button>
        </>
      )}
    </>
  );
}

export default Generation;
