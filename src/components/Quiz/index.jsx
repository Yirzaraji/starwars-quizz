import React from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";

const Quiz = (props) => {
  //destructuring
  const { email, pseudo } = props.userData;
  return (
    <div>
      Pseudo : {pseudo}
      <br />
      Email : {email}
      <Levels />
      <ProgressBar />
      <h2>Quiz question</h2>
      <p className="answerOptions">Question 1</p>
      <p className="answerOptions">Question 2</p>
      <p className="answerOptions">Question 3</p>
      <p className="answerOptions">Question 4</p>
      <button className="btnSubmit">Submit</button>
    </div>
  );
};

export default Quiz;
