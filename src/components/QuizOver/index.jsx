import React, { Fragment, useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Popup from "../Popup";

const QuizOver = React.forwardRef((props, ref) => {
  //console.log(ref.current);
  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelsQuestions,
  } = props;

  const [asked, setAsked] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    setAsked(ref.current);
    console.log(ref.current);
  }, [ref]);

  const showPopup = (id) => {
    setOpenPopup(true);
  };

  const closePopup = () => {
    setOpenPopup(false);
  };

  const averageQuestions = maxQuestions / 2;

  if (score < averageQuestions) {
    setTimeout(() => {
      loadLevelsQuestions(quizLevel);
    }, 3000);
  }

  const decision =
    score >= averageQuestions ? (
      <Fragment>
        <div className="stepBtnContainer">
          {quizLevel < levelNames.length ? (
            <Fragment>
              <p className="successMsg">Bravo, passez au niveau suivant</p>
              <button
                onClick={() => loadLevelsQuestions(quizLevel)}
                className="btnResult success"
              >
                Niveau suivant
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="successMsg">
                {<GiTrophyCup size="50px" />}Bravo, vous etes fort en pomme
              </p>
              <button
                onClick={() => loadLevelsQuestions(0)}
                className="btnResult gameOver"
              >
                Accueil
              </button>
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
              <button
                onClick={() => showPopup(refQuestion.heroId)}
                className="btnInfo"
              >
                Infos
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <div className="loader"></div>
          <p style={{ textAlign: "center", color: "red" }}>Echec !</p>
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
      <Popup showPopup={openPopup} closePopup={closePopup}>
        <div className="modalHeader">
          <h2>Titre</h2>
        </div>
        <div className="modalBody">
          <h3>Titre 2</h3>
        </div>
        <div className="modalFooter">
          <button className="modalBtn">Fermer</button>
        </div>
      </Popup>
    </Fragment>
  );
});

export default React.memo(QuizOver);
