import React, { useState } from "react";
import "./Learning.css";
import ReactPlayer from "react-player/youtube";

const Learning = () => {
  const [startQuize, setStartQuize] = useState(true);

  const onQuizeChange = () => {
    setStartQuize(false);
  };

  return (
    <div className="learning__main__card">
      {startQuize && (
        <span className="all__pages__over__view">
          Hi There Welcome Back ....!
        </span>
      )}
      {startQuize ? (
        <div className="video__card">
          <ReactPlayer
            width="80%"
            height="80%"
            url="https://youtu.be/J6-girGi-HM?feature=sharedQ"
          />
          <div>
            <button onClick={onQuizeChange}>Start QUize</button>
          </div>
        </div>
      ) : (
        <div className="quize__main__card">
          <div className="quize__left__quetions">
            <h4>QUIZ QUESTIONS AND ANSWERS</h4>
            <div className="questions__number__card">
              <div>
                <span>1</span>
              </div>
              <div>
                <span>2</span>
              </div>
              <div>
                <span>3</span>
              </div>
              <div>
                <span>4</span>
              </div>
              <div>
                <span>5</span>
              </div>
              <div>
                <span>6</span>
              </div>
              <div>
                <span>7</span>
              </div>
              <div>
                <span>8</span>
              </div>
              <div>
                <span>9</span>
              </div>
              <div>
                <span>10</span>
              </div>
            </div>
            <div className="question__card__main">
              <h1>
                Think Of your favorite animal, place, and color now say one of
                them! What Did you say?
              </h1>
            </div>
          </div>
          <div className="quize__right__answer">
            <div className="quize__answer__card">
              <div className="a_quize_cardssss">
                <span>A</span>
                <span>It increases the application’s performance</span>
              </div>
              <div className="a_quize_cardssss">
                <span>A</span>
                <span>It increases the application’s performance</span>
              </div>
              <div className="a_quize_cardssss">
                <span>A</span>
                <span>It increases the application’s performance</span>
              </div>
              <div className="a_quize_cardssss">
                <span>A</span>
                <span>It increases the application’s performance</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learning;
