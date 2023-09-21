import React, { useEffect, useState } from "react";
import Piece from "./Piece";
import options from "../../config.json";
import { generateRandomPiece } from "../../modules/Piece/utils";

const RandomPieceGen: React.FC = () => {
  const [cycle, setCycle] = useState({
    time: options.pieces.cycleTime,
    piece: generateRandomPiece(),
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const tick = options.time.defaultTimeTick;

    interval = setInterval(() => {
      setCycle((prev) => ({
        time: prev.time < tick ? options.pieces.cycleTime : prev.time - tick,
        piece: prev.time < tick ? generateRandomPiece() : prev.piece,
      }));
    }, tick * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="random-component-gen">
      <div>{cycle.time} sec</div>
      {cycle.time > 0 && <Piece piece={cycle.piece} />}
    </div>
  );
};

export default RandomPieceGen;
