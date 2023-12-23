import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { useGame } from "../../contexts/GameContext";
import { useScore } from "../../contexts/ScoreContext";
import { Stack } from "react-bootstrap";
import styles from "../../styles/style.module.scss";

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
    <div>
      <Stack
        className="justify-content-center align-items-center"
        direction="horizontal"
        gap={2}
      >
        <div
          className="h2 m-0"
          style={{
            color: "white",
            fontWeight: "bold",
            fontFamily: styles.font,
          }}
        >
          {score.gold}
        </div>
        <FontAwesomeIcon icon={faCoins} size="xl" color={styles.main} />
      </Stack>
    </div>
  );
};

export default Score;
