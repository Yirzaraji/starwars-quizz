import React, { Fragment } from "react";

const ProgressBar = () => {
  return (
    <Fragment>
      <div className="percentage">
        <div className="progressPercent">Question 1/1</div>
        <div className="progressPercent">Progression: 10%</div>
      </div>
      <div className="progressBar">
        <div style={{ width: "10%" }} className="progressBarChange"></div>
      </div>
    </Fragment>
  );
};

export default ProgressBar;
