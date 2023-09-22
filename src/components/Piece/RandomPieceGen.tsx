import React, { useEffect, useRef, useState } from "react";
import Piece from "./Piece";
import options from "../../config.json";
import { AnimationDefinition, motion } from "framer-motion";
import {
  generateRandomPiece,
  pieceTransition,
  pieceVariants,
} from "../../modules/Piece/utils";

const defaultCycle = {
  time: options.pieces.cycleTime,
  piece: generateRandomPiece(),
  show: true,
  animate: "active",
};

const RandomPieceGen: React.FC = () => {
  const [cycle, setCycle] = useState(defaultCycle);
  const exit = useRef(false);

  useEffect(() => {
    const delay = setInterval(() => {
      setCycle((prev) => ({ ...prev, animate: "inactive" }));
      setTimeout(() => {
        setCycle((prev) => ({ ...prev, show: false }));
      }, pieceTransition.duration * 1000);
    }, defaultCycle.time * 1000);
    return () => clearInterval(delay);
  }, []);

  const animationCompleteHandle = (definition: AnimationDefinition) => {
    if (definition === "inactive")
      setTimeout(() => {
        setCycle({ ...defaultCycle, piece: generateRandomPiece() });
      }, options.time.breakTimeBetweenPiecesCycle * 1000);
  };

  useEffect(() => {
    console.log(cycle);
  }, [cycle]);

  return (
    <div className="random-component-gen">
      <motion.div
        className="random-piece-spawn"
        initial="initial"
        animate={cycle.animate}
        variants={pieceVariants}
        transition={pieceTransition}
        onAnimationComplete={animationCompleteHandle}
      >
        {cycle.show && <Piece piece={cycle.piece} exit={exit.current} />}
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
