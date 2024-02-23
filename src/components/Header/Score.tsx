import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";
import { Stack } from "react-bootstrap";
import styles from "src/styles/style.module.scss";

const Score: React.FC = () => {
  const { game } = useGame();
  const { addGold, score, currentGameSpeed } = useScore();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!game.gameOver) interval = setInterval(() => addGold(), currentGameSpeed());

    return () => clearInterval(interval);
  }, []);

  return (
    <Stack className="justify-content-center align-items-center" direction="horizontal" gap={2}>
      <div
        className="h3 m-0"
        style={{
          color: "white",
          fontWeight: "bold",
          fontFamily: styles.font,
        }}
      >
        {Math.round(score.gold)}
      </div>
      <FontAwesomeIcon icon={faCoins} size="xl" color={styles.main} />
    </Stack>
  );
};

export default Score;
