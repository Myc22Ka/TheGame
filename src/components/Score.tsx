import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useGame } from "../contexts/GameContext";
import { useScore } from "../contexts/ScoreContext";

const Score: React.FC = () => {
  const { game } = useGame();
  const { addGold, score } = useScore();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!game.gameOver) {
      interval = setInterval(() => {
        addGold();
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="score-component">
      <div className="score">
        <FontAwesomeIcon icon={faDollarSign} />
        {score.gold}
      </div>
    </div>
  );
};

export default Score;
