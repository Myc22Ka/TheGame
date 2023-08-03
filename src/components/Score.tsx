import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useGame } from "../contexts/GameContext";

const Score: React.FC = () => {
  const { game, addGold } = useGame();

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
        {game.score}
      </div>
    </div>
  );
};

export default Score;
