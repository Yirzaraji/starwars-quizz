import React, { useState, useEffect, Fragment, useRef } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import QuizStarWars from "../QuizStarWars";
import QuizOver from "../QuizOver";

const Quiz = (props) => {
  //destructuring
  const [quizz, setQuizz] = useState({
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
    quizEnd: false,
  });

  const storeDataRef = useRef(null);

  useEffect(() => {
    //default arg = debutant
    const quiz = quizz.levelNames[quizz.quizLevel];
    const fetchQuestions = QuizStarWars[0].quiz[quiz];
    if (fetchQuestions.length >= quizz.maxQuestions) {
      storeDataRef.current = fetchQuestions;

      const newArray = fetchQuestions.map(
        ({ answer, ...keepRest }) => keepRest //Exclude answers from the array to prevent users to cheat
      );
      setQuizz((prevState) => ({
        ...prevState,
        storedQuestions: newArray,
        question: newArray[0].question,
        options: newArray[0].options,
      }));
    } else {
      console.log("not enough mineral");
    }
  }, []);

  useEffect(() => {
    if (quizz.idQuestion > 0 && quizz.idQuestion < 10) {
      setQuizz((prevState) => ({
        ...prevState,
        question: quizz.storedQuestions[quizz.idQuestion].question,
        options: quizz.storedQuestions[quizz.idQuestion].options,
        btnDisabled: true,
        userAnswer: null,
      }));
    }
  }, [quizz.idQuestion]);

  const { email, pseudo } = props.userData;
  const { question, options, storedQuestions } = quizz;

  const submitAnswer = (selectedAnswer) => {
    setQuizz((prevState) => ({
      ...prevState,
      btnDisabled: false,
      userAnswer: selectedAnswer,
    }));
  };

  const gameOver = () => {
    setQuizz((prevState) => ({
      ...prevState,
      quizEnd: true,
    }));
  };

  const nextQuestions = () => {
    if (quizz.idQuestion === quizz.maxQuestions) {
      console.log("end");
      gameOver();
    } else {
      setQuizz((prevState) => ({
        ...prevState,
        idQuestion: prevState.idQuestion + 1,
      }));
    }

    const currentQuestion = storeDataRef.current?.[quizz.idQuestion];

    if (currentQuestion) {
      const goodAnswer = currentQuestion.answer;
      if (quizz.userAnswer === goodAnswer) {
        setQuizz((prevState) => ({
          ...prevState,
          score: prevState.score + 1,
        }));
      }
    }
  };

  return quizz.quizEnd ? (
    <QuizOver />
  ) : (
    <Fragment>
      <span>
        Bonjour utilisateur <b>{pseudo}.</b>
      </span>
      <span>
        Email associé: <b>{email}</b>
      </span>
      <br />
      <ProgressBar
        idQuestion={quizz.idQuestion}
        maxQuestions={quizz.maxQuestions}
      />
      <Levels />
      {storedQuestions.length > 0 && (
        <Fragment>
          <h2>{question}</h2>
          {options.map((option, index) => (
            <p
              onClick={() => submitAnswer(option)}
              key={index}
              className={`answerOptions ${
                quizz.userAnswer === option && "selected" //Compare the onlClick user selected option with the state
              }`}
            >
              {option}
            </p>
          ))}
        </Fragment>
      )}
      <button
        onClick={nextQuestions}
        disabled={quizz.btnDisabled}
        className="btnSubmit"
      >
        {quizz.idQuestion < quizz.maxQuestions - 1 ? "Suivant" : "Terminer"}
      </button>
    </Fragment>
  );
};

export default Quiz;
