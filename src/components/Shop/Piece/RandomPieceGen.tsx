import React, { useEffect, useState } from "react";
import Piece from "./Piece";
import { defaultCycle, setCycleSteps } from "../../../modules/Piece/utils";
import { Stack } from "react-bootstrap";
import styles from "../../../styles/style.module.scss";

const RandomPieceGen: React.FC = () => {
  const [cycle, setCycle] = useState(defaultCycle);

  useEffect(() => {
    const delay = 1000;
    let currentIndex = 0;

    const cycleSequence = async () => {
      const cycles = setCycleSteps(currentIndex);
      await new Promise((resolve) => {
        setCycle(cycles[currentIndex]);
        setTimeout(resolve, delay);
      });

      currentIndex = (currentIndex + 1) % cycles.length;
      cycleSequence();
    };

    cycleSequence();
  }, []);

  return (
    <Stack
      direction="vertical"
      className="align-items-center justify-content-center"
      style={{ flex: 1 }}
    >
      <input
        type="range"
        min="0"
        className="w-75 piece-metter m-2"
        style={{
          background: `linear-gradient(to right, ${styles.main} 0%, ${
            styles.main
          } ${(100 * cycle.time) / defaultCycle.time}%, ${styles.background} ${
            (100 * cycle.time) / defaultCycle.time
          }%, ${styles.background} 100%)`,
        }}
        readOnly
        value={cycle.time}
        max={defaultCycle.time}
      />
      <div className="piece-spawn">
        {cycle.show && <Piece piece={cycle.piece} animate={cycle.animate} />}
      </div>
    </Stack>
  );
};

export default RandomPieceGen;
