import React, { useEffect, useState } from "react";
import Piece from "./Piece";
import { defaultCycle, setCycleSteps } from "../../../modules/Piece/utils";

const RandomPieceGen: React.FC = () => {
  const [cycle, setCycle] = useState(defaultCycle);

  useEffect(() => {
    const delay = 1000;

    const cycleSequence = async () => {
      const changes = setCycleSteps();

      for (const change of changes) {
        await new Promise((resolve) => {
          setCycle((prev) => ({ ...prev, ...change }));
          setTimeout(resolve, delay);
        });
      }

      // Continue the cycle if needed
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
        {cycle.time}
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
