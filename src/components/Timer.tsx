import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useGame } from "../contexts/GameContext";

const DEFAULT_TIME = 3600;

const Timer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<number>(DEFAULT_TIME);
  const { gameLoseEvent } = useGame();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(currentTime - 1);
      }, 1000);
    }
    if (currentTime === 0) {
      setCurrentTime(currentTime - 1);
      gameLoseEvent();
    }
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="timer-component">
      <FontAwesomeIcon className="timer-icon" icon={faClock} />
      <div className="timer">
        <div className="timer-text">{currentTime}</div>
        <div
          className="timer-metter"
          style={{ width: `${(currentTime / DEFAULT_TIME) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
