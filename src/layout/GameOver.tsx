import React from "react";
import "../styles/gameover.scss";
// import image from "../assets/money.webP";

const GameOver: React.FC = () => {
  return (
    <div className="gameover-background">
      <div className="gameover-container">
        <div className="gameover-title">Game Over, Time&apos;s Up</div>
        <div>Your earnings: {/*<img src={image} />*/}$2137</div>
        <div className="gameover-button">Restart?</div>
      </div>
    </div>
  );
};

export default GameOver;
