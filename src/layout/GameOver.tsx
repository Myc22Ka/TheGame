import React from "react";
import "../styles/gameover.scss";
import { useScore } from "../contexts/ScoreContext";

const GameOver: React.FC = () => {
  const { score } = useScore();

  return (
    <div className="gameover-background">
      <div className="gameover-container">
        <div className="gameover-title">Game Over, Time&apos;s Up</div>
        <div>Your earnings: ${score.gold}</div>
        <div className="gameover-button">Restart?</div>
      </div>
    </div>
  );
};

export default GameOver;
