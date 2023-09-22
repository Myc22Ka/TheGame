import React, { useState } from "react";
import Piece from "./Piece";
import options from "../../config.json";
import { generateRandomPiece } from "../../modules/Piece/utils";

const defaultCycle = {
  piece: generateRandomPiece(),
  time: options.pieces.cycleTime,
};

const RandomPieceGen: React.FC = () => {
  const [cycle, setCycle] = useState(defaultCycle);

  return (
    <div className="random-component-gen">
      <div className="random-piece-spawn">
        <Piece piece={cycle.piece} />
      </div>
      <div className="inner-piece-meter">
        {cycle.time}
        <input
          type="range"
          min="1"
          readOnly
          value={cycle.time}
          max={defaultCycle.time}
        />
      </div>
    </div>
  );
};

export default RandomPieceGen;
