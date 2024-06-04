import React, { Fragment, useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Popup from "../Popup";
import axios from "axios";

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
  const [characterInfos, setCharacterInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAsked(ref.current);
    console.log(ref.current);

    //Clear localstorage each 15 days
    if (localStorage.getItem("swapiStorageDate")) {
      const dataAge = localStorage.getItem("swapiStorageDate");
      checkDataAge(dataAge);
    }
  }, [ref]);

  const checkDataAge = (dataAge) => {
    const today = Date.now();
    const timeDifference = today - Date;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.getItem("swapiStorageDate", Date.now());
    }
  };

  const showPopup = async (id) => {
    setOpenPopup(true);

    if (localStorage.getItem(id)) {
      setCharacterInfos(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
    } else {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/${id}/?format=json`
        );
        const data = response.data;
        console.log(data);
        setLoading(false);
        setCharacterInfos(response.data);

        localStorage.setItem(id, JSON.stringify(data));
        if (!localStorage.getItem("swapiStorageDate")) {
          localStorage.setItem("swapiStorageDate", Date.now());
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const closePopup = () => {
    setOpenPopup(false);
    setLoading(true);
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

  const resultInPopup = !loading ? (
    <Fragment>
      <div className="modalHeader">
        <h2>{characterInfos.name}</h2>
      </div>
      <div className="modalBody">
        <div className="comicImage">
          <img
            src="https://artistmonkeys.com/wp-content/uploads/2021/09/Mitthrawnuruodo-Thrawn-portrait-4.jpg"
            alt=""
          />
          Data provided by the dead API SWAPI :D
        </div>
        <div className="comicDetails">
          <h3>Descriptions</h3>
          <p>
            <ul>
              <li>Année de naissance: {characterInfos.birth_year}</li>
              <li>Genre: {characterInfos.gender}</li>
              <li>Poid: {characterInfos.mass}</li>
              <li>Taille: {characterInfos.height}</li>
            </ul>
          </p>
          <h3>Plus d'infos</h3>
          {characterInfos.films.map((url, index) => {
            return (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Film
              </a>
            );
          })}
        </div>
      </div>
      <div className="modalFooter">
        <button onClick={closePopup} className="modalBtn">
          Fermer
        </button>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="modalHeader">
        <h2>API SWAPI...</h2>
      </div>
      <div className="modalBody">
        <div className="loader"></div>
      </div>
    </Fragment>
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
      <Popup showPopup={openPopup}>{resultInPopup}</Popup>
    </Fragment>
  );
});

export default React.memo(QuizOver);
