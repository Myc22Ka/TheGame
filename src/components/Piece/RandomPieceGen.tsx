import React, { useEffect, useState } from "react";
import Piece from "./Piece";
import options from "../../config.json";
import { generateRandomPiece } from "../../modules/Piece/utils";
import { motion } from "framer-motion";

const defaultCycle = {
  time: options.pieces.cycleTime,
  piece: generateRandomPiece(),
  animate: "active",
};

const variants = {
  initial: {
    scale: 0,
  },
  inactive: {
    scale: 0,
  },
  active: {
    scale: 1,
  },
};

const RandomPieceGen: React.FC = () => {
  const [cycle, setCycle] = useState(defaultCycle);

  const updateCycle = () => {
    setCycle((prev) => ({
      ...prev,
      time: prev.time - 1,
      animate: prev.time === 1 ? "inactive" : "active",
    }));
  };

  useEffect(() => {
    if (cycle.time > 0) {
      const timer = setInterval(updateCycle, 1000); // Update every second
      return () => clearInterval(timer);
    } else {
      const delay = setTimeout(() => {
        setCycle({
          ...defaultCycle,
          piece: generateRandomPiece(),
        });
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [cycle]);

  useEffect(() => {
    console.log(cycle);
  }, [cycle]);

  return (
    <div className="random-component-gen">
      <motion.div
        className="random-piece-spawn"
        animate={cycle.animate}
        variants={variants}
        initial="initial"
      >
        <Piece piece={cycle.piece} />
      </motion.div>
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
