import React from "react";

const Popup = ({ showPopup, children, closePopup }) => {
  return (
    showPopup && (
      <div onClick={closePopup} className="modalBackground">
        <div className="modalContainer">{children}</div>
      </div>
    )
  );
};

export default Popup;
