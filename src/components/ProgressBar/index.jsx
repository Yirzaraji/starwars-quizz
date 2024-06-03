import React, { Fragment } from "react";

const ProgressBar = ({ idQuestion, maxQuestions }) => {
  const percentCalcul = (totalQuestions, actualQuestion) => {
    return (actualQuestion / totalQuestions) * 100;
  };

  const getPercent = percentCalcul(maxQuestions, idQuestion);
  console.log(getPercent);
  //const actualQuestion = idQuestion + 1;

  return (
    <Fragment>
      <div className="percentage">
        <div className="progressPercent">{`Question:${idQuestion + 1}/10`}</div>
        <div className="progressPercent">{`Progression: ${getPercent}%`}</div>
      </div>
      <div className="progressBar">
        <div
          style={{ width: `${getPercent}%` }}
          className="progressBarChange"
        ></div>
      </div>
    </Fragment>
  );
};

export default React.memo(ProgressBar);
