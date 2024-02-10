import React, { useEffect, useState } from "react";
import Piece from "./Piece";
import { defaultCycle, setCycleSteps } from "src/modules/Piece/utils";
import { Stack } from "react-bootstrap";
import styles from "src/styles/style.module.scss";
import { useScore } from "src/contexts/ScoreContext";
import Switch from "../Market/MarketLogic/Switch";

const RandomPieceGen: React.FC = () => {
  const [cycle, setCycle] = useState(defaultCycle);
  const { score, currentGameSpeed } = useScore();

  useEffect(() => {
    let currentIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const cycleSequence = async () => {
      const cycles = setCycleSteps(currentIndex);
      await new Promise((resolve) => {
        setCycle(cycles[currentIndex]);
        timeout = setTimeout(resolve, currentGameSpeed());
      });

      currentIndex = (currentIndex + 1) % cycles.length;
      cycleSequence();
    };

    cycleSequence();

    return () => clearTimeout(timeout);
  }, [score.gameStats.speed]);

  return (
    <Stack
      direction="vertical"
      className="align-items-center justify-content-end h-100"
      gap={5}
      style={{ position: "relative" }}
    >
      <input
        type="range"
        min="0"
        className="piece-metter m-0"
        style={{
          background: `linear-gradient(to top, ${styles.main} 0%, ${
            styles.main
          } ${(100 * cycle.time) / defaultCycle.time}%, transparent ${
            (100 * cycle.time) / defaultCycle.time
          }%, transparent 100%)`,
        }}
        readOnly
        value={cycle.time}
        max={defaultCycle.time}
      />
      <div className="piece-spawn">
        {cycle.show && <Piece piece={cycle.piece} animate={cycle.animate} />}
      </div>
      <Switch />
    </Stack>
  );
};

export default RandomPieceGen;
