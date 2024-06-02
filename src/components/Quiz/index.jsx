import React, { useState, useEffect, Fragment, useRef } from "react";
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
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0,
  });

  const storeDataRef = useRef(null);

  useEffect(() => {
    //default arg = debutant
    const quiz = questions.levelNames[questions.quizLevel];
    const fetchQuestions = QuizStarWars[0].quiz[quiz];
    if (fetchQuestions.length >= questions.maxQuestions) {
      storeDataRef.current = fetchQuestions;

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
    if (questions.idQuestion > 0) {
      setQuestions((prevState) => ({
        ...prevState,
        question: questions.storedQuestions[questions.idQuestion].question,
        options: questions.storedQuestions[questions.idQuestion].options,
        btnDisabled: true,
        userAnswer: null,
      }));
    }
  }, [questions.idQuestion]);

  const { email, pseudo } = props.userData;
  const { question, options, storedQuestions } = questions;

  const submitAnswer = (selectedAnswer) => {
    setQuestions((prevState) => ({
      ...prevState,
      btnDisabled: false,
      userAnswer: selectedAnswer,
    }));
  };

  const nextQuestions = () => {
    if (questions.idQuestion === questions.maxQuestions) {
    } else {
      setQuestions((prevState) => ({
        ...prevState,
        idQuestion: prevState.idQuestion + 1,
      }));
    }

    const goodAnswer = storeDataRef.current[questions.idQuestion].answer;
    if (questions.userAnswer === goodAnswer) {
      setQuestions((prevState) => ({
        ...prevState,
        score: prevState.score + 1,
      }));
    }
  };

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
        <Fragment>
          <h2>{question}</h2>
          {options.map((option, index) => (
            <p
              onClick={() => submitAnswer(option)}
              key={index}
              className={`answerOptions ${
                questions.userAnswer === option && "selected" //Compare the onlClick user selected option with the state
              }`}
            >
              {option}
            </p>
          ))}
        </Fragment>
      )}
      <button
        onClick={nextQuestions}
        disabled={questions.btnDisabled}
        className="btnSubmit"
      >
        Suivant
      </button>
    </Fragment>
  );
};

export default Quiz;
