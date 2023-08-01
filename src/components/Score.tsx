import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useGame } from "../contexts/GameContext";

const Score: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const { game } = useGame();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!game.gameOver) {
      interval = setInterval(() => {
        setScore(score + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="score-component">
      <FontAwesomeIcon icon={faDollarSign} />
      <div className="score">{score}</div>
    </div>
  );
};

export default Score;
