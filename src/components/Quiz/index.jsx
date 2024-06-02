import React, { useState, useEffect, Fragment } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import QuizStarWars from "../QuizStarWars";

const Quiz = (props) => {
  //destructuring
  const [questions, setQuestions] = useState({
    levelNames: ["debutant", "confirme", "expert"],
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
  });

  useEffect(() => {
    //default arg = debutant
    const quiz = questions.levelNames[questions.quizLevel];
    const fetchQuestions = QuizStarWars[0].quiz[quiz];
    if (fetchQuestions.length >= questions.maxQuestions) {
      const newArray = fetchQuestions.map(
        ({ answer, ...keepRest }) => keepRest //Exclude answers from the array to prevent users to cheat
      );
      setQuestions((prevState) => ({
        ...prevState,
        storedQuestions: newArray,
        question: newArray[0].question,
        options: newArray[0].options,
      }));
    } else {
      console.log("not enough mineral");
    }
  }, []);

  const { email, pseudo } = props.userData;
  const { question, options, storedQuestions } = questions;

  return (
    <Fragment>
      <span>
        Bonjour utilisateur <b>{pseudo}.</b>
      </span>
      <span>
        Email associé: <b>{email}</b>
      </span>
      <br />
      <ProgressBar />
      <Levels />
      {storedQuestions.length > 0 && (
        <>
          <h2>{question}</h2>
          {options.map((option, index) => (
            <p key={index} className="answerOptions">
              {option}
            </p>
          ))}
        </>
      )}
      <button className="btnSubmit">Submit</button>
    </Fragment>
  );
};

export default Quiz;
