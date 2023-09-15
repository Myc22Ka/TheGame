import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useGame } from "../contexts/GameContext";
import { formatTime } from "../utils/timeDisplay";
import options from "../config.json";

const Timer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<number>(options.time.maxTime);
  const { gameLoseEvent } = useGame();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (currentTime >= 0) {
      interval = setInterval(() => {
        setCurrentTime(currentTime - 1);
      }, options.time.defaultTimeTick * 1000);
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
        <div className="timer-text">{formatTime(currentTime)}</div>
        <div
          className="timer-metter"
          style={{ width: `${(currentTime / options.time.maxTime) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
