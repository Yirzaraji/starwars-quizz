import React from "react";

const Popup = ({ showPopup, children }) => {
  return (
    showPopup && (
      <div className="modalBackground">
        <div className="modalContainer">{children}</div>
      </div>
    )
  );
};

export default Popup;
