import React, { Fragment, useEffect, useState } from "react";

const QuizOver = React.forwardRef((props, ref) => {
  //console.log(ref.current);
  const { levelNames, score, maxQuestions, quizLevel, percent } = props;
  const [asked, setAsked] = useState([]);

  useEffect(() => {
    setAsked(ref.current);
    console.log(ref.current);
  }, [ref]);

  const averageQuestions = maxQuestions / 2;
  const decision =
    score >= averageQuestions ? (
      <Fragment>
        <div className="stepBtnContainer">
          {quizLevel < levelNames.length ? (
            <Fragment>
              <p className="successMsg">Bravo, passez au niveau suivant</p>
              <button className="btnResult success">Niveau suivant</button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="successMsg">Bravo, vous etes fort en pomme</p>
              <button className="btnResult gameOver">Niveau suivant</button>
            </Fragment>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Reussite: {percent}%</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="stepBtnContainer">
          <p className="failureMsg">Echec de la quete...</p>
        </div>
        <div className="percentage">
          <div className="progressPercent">Reussite: {percent}</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    );

  const questionAnswer =
    score >= averageQuestions ? (
      asked.map((refQuestion) => {
        return (
          <tr key={refQuestion.id}>
            <td>{refQuestion.question}</td>
            <td>{refQuestion.answer}</td>
            <td>
              <button className="btnInfo">Infos</button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <p style={{ textAlign: "center", color: "red" }}></p>
          Pas de reponses !
        </td>
      </tr>
    );

  return (
    <Fragment>
      {decision}
      <hr />
      <p>Les réponse aux questions posées:</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Reponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
    </Fragment>
  );
});

export default React.memo(QuizOver);
