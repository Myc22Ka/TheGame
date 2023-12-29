import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useGame } from "../../contexts/GameContext";
import { formatTime } from "../../utils/timeDisplay";
import options from "../../config.json";
import styles from "../../styles/style.module.scss";
import { Stack } from "react-bootstrap";
import { getTime } from "../../modules/game_utils";
import { useScore } from "../../contexts/ScoreContext";

const Timer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(options.time.maxTime);
  const { gameLoseEvent } = useGame();
  const { score } = useScore();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (currentTime > 0)
      interval = setInterval(
        () => setCurrentTime((prev) => prev - 1),
        getTime(score)
      );

    if (currentTime === 0) {
      setCurrentTime(currentTime - 1);
      gameLoseEvent();
    }
    return () => clearInterval(interval);
  });

  return (
    <Stack
      className="justify-content-center align-items-center p-2"
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
            width: `${(currentTime / options.time.maxTime) * 100}%`,
            filter: `hue-rotate(${
              (options.time.maxTime - currentTime) * 0.058
            }deg)`,
          }}
        ></div>
      </Stack>
    </Stack>
  );
};

export default Timer;
