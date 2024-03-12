import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useGame } from "src/contexts/GameContext";
import { formatTime } from "src/utils/timeDisplay";
import options from "src/config.json";
import styles from "src/styles/style.module.scss";
import { Stack } from "react-bootstrap";
import { useScore } from "src/contexts/ScoreContext";

const Timer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(options.score.speed.maxTime);
  const { gameLoseEvent } = useGame();
  const { score } = useScore();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (currentTime > 0) interval = setInterval(() => setCurrentTime((prev) => prev - 1), score.speed.timer);

    if (currentTime === 0) {
      setCurrentTime(currentTime - 1);
      gameLoseEvent();
    }
    return () => clearInterval(interval);
  }, [score.speed.timer]);

  return (
    <Stack
      className="justify-content-center align-items-center p-1"
      direction="horizontal"
      style={{ width: "200px" }}
      gap={2}
    >
      <FontAwesomeIcon icon={faClock} size="xl" color={styles.main} />
      <Stack className="timer h2 rounded m-0">
        <Stack
          className="justify-content-center align-items-center h6 m-0"
          style={{ fontFamily: styles.font, zIndex: 2 }}
        >
          {formatTime(currentTime)}
        </Stack>
        <div
          className="timer-metter"
          style={{
            width: `${(currentTime / score.speed.maxTime) * 100}%`,
            filter: `hue-rotate(${(score.speed.maxTime - currentTime) * 0.058}deg)`,
          }}
        ></div>
      </Stack>
    </Stack>
  );
};

export default Timer;
