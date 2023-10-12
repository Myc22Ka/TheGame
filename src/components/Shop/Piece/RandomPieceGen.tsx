import React, { useEffect, useState } from "react";
import Piece from "./Piece";
import {
  defaultCycle,
  generateRandomPiece,
  setCycleSteps,
} from "../../../modules/Piece/utils";

const RandomPieceGen: React.FC = () => {
  const [cycle, setCycle] = useState(defaultCycle);

  useEffect(() => {
    console.log(cycle);
  }, [cycle]);

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

    // Start the sequence initially
    cycleSequence();
  }, []);

  return (
    <div className="random-component-gen">
      <div className="random-piece-spawn">
        {cycle.show && <Piece piece={cycle.piece} animate={cycle.animate} />}
      </div>
      <div className="inner-piece-meter">
        <input
          type="range"
          min="0"
          readOnly
          value={cycle.time}
          max={defaultCycle.time}
        />
      </div>
    </div>
  );
};

export default RandomPieceGen;
