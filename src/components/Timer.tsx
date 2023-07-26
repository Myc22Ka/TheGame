import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useGameOver } from "../contexts/GameOverContext";

const Timer: React.FC = () => {
  const defaultTime = useRef<number>(3600);
  const [currentTime, setCurrentTime] = useState<number>(defaultTime.current);
  const isGameOver = useGameOver();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(currentTime - 1);
      }, 1);
    }
    if (currentTime === 0) {
      setCurrentTime(currentTime - 1);
      isGameOver.gameLoseEvent();
    }
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="timer-component">
      <FontAwesomeIcon icon={faClock} />
      <div className="timer">
        <div
          className="timer-metter"
          style={{ width: `${(currentTime / defaultTime.current) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
