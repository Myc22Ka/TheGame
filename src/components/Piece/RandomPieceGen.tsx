import React, { useEffect, useState } from "react";
import Piece from "./Piece";
import options from "../../config.json";
import { generateRandomPiece } from "../../modules/Piece/utils";

const defaultCycle = {
  piece: generateRandomPiece(),
  time: options.pieces.cycleTime,
  show: true,
  animate: "",
};

const RandomPieceGen: React.FC = () => {
  const [cycle, setCycle] = useState(defaultCycle);

  const setChanges = () => {
    const restArray = Array.from({ length: defaultCycle.time }, (_, i) => ({
      time: i + 1,
    })).reverse();

    const changes = [
      { ...defaultCycle, piece: generateRandomPiece() },
      ...restArray.slice(1),
      { time: 0, animate: "inactive" },
      { time: 0, show: false },
    ];

    return changes;
  };

  useEffect(() => {
    const delay = 1000;

    const cycleSequence = async () => {
      const changes = setChanges();

      for (const change in changes) {
        await new Promise((resolve) => {
          setCycle((prev) => ({ ...prev, ...changes[change] }));
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
