import React, { useState, useEffect, Fragment, useRef } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import QuizStarWars from "../QuizStarWars";
import QuizOver from "../QuizOver";
import { FaChevronRight } from "react-icons/fa";

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
    percent: 0,
  });

  const storeDataRef = useRef(null);

  useEffect(() => {
    //default arg = debutant
    const quiz = quizz.levelNames[quizz.quizLevel];
    const fetchQuestions = QuizStarWars[0].quiz[quiz];
    //console.log(QuizStarWars[0].quiz[quiz]);
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

  const getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  const gameOver = () => {
    const gradePercent = getPercentage(quizz.maxQuestions, quizz.score);
    console.log(gradePercent);
    if (gradePercent >= 50) {
      setQuizz((prevState) => ({
        ...prevState,
        quizLevel: quizz.quizLevel + 1,
        percent: gradePercent,
        quizEnd: true,
      }));
    } else {
      setQuizz((prevState) => ({
        ...prevState,
        percent: gradePercent,
        quizEnd: true,
      }));
    }
  };

  const nextQuestions = () => {
    if (quizz.idQuestion === quizz.maxQuestions - 1) {
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

  const loadLevelsQuestions = (param) => {
    const quiz = quizz.levelNames[param];
    const fetchQuestions = QuizStarWars[0].quiz[quiz];

    if (fetchQuestions.length >= quizz.maxQuestions) {
      storeDataRef.current = fetchQuestions;

      const newArray = fetchQuestions.map(
        ({ answer, ...keepRest }) => keepRest
      );

      setQuizz({
        levelNames: ["debutant", "confirme", "expert"],
        quizLevel: param,
        maxQuestions: 10,
        storedQuestions: newArray,
        question: newArray[0].question,
        options: newArray[0].options,
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
        quizEnd: false,
        percent: 0,
      });
    }
  };

  //JSX START HERE
  return quizz.quizEnd ? (
    <QuizOver
      levelNames={quizz.levelNames}
      score={quizz.score}
      maxQuestions={quizz.maxQuestions}
      quizLevel={quizz.quizLevel}
      percent={quizz.percent}
      ref={storeDataRef}
      loadLevelsQuestions={loadLevelsQuestions}
    />
  ) : (
    <Fragment>
      <span>
        Bonjour utilisateur <b>{pseudo}.</b>
      </span>
      <span>
        Email associé: <b>{email}</b>
      </span>
      <br />
      <Levels quizLevel={quizz.quizLevel} levelNames={quizz.levelNames} />
      <ProgressBar
        idQuestion={quizz.idQuestion}
        maxQuestions={quizz.maxQuestions}
      />
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
              {<FaChevronRight />}
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
