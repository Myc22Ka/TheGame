import React, { useEffect, useState } from "react";
import { useScore } from "src/contexts/ScoreContext";
import { DefaultCycleType } from "src/modules/Piece/types";
import { defaultCycle, setCycleSteps } from "src/modules/Piece/utils";
import styles from "src/styles/style.module.scss";

type CycleMetterPropsType = {
  cycle: DefaultCycleType;
  updateCycle: (newStep: DefaultCycleType[], currentIndex: number) => void;
};

const CycleMetter: React.FC<CycleMetterPropsType> = ({ cycle, updateCycle }) => {
  const { score, currentGameSpeed } = useScore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const cycleSequence = async () => {
      const cycles = setCycleSteps(currentIndex);
      await new Promise((resolve) => {
        updateCycle(cycles, currentIndex);
        timeout = setTimeout(resolve, currentGameSpeed());
      });

      setCurrentIndex((currentIndex + 1) % cycles.length);
      cycleSequence();
    };

    cycleSequence();

    return () => clearTimeout(timeout);
  }, [score.gameStats.speed, currentIndex]);

  return (
    <input
      type="range"
      min="0"
      className="piece-metter m-0"
      style={{
        background: `linear-gradient(to top, ${styles.main} 0%, ${styles.main} ${
          (100 * cycle.time) / defaultCycle.time
        }%, transparent ${(100 * cycle.time) / defaultCycle.time}%, transparent 100%)`,
      }}
      readOnly
      value={cycle.time}
      max={defaultCycle.time}
    />
  );
};

export default CycleMetter;
