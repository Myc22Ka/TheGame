import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

const Score: React.FC = () => {
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(score + 1);
    }, 1000);

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
