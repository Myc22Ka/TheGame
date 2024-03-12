import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";
import { useCell } from "src/contexts/CellContext";
import { scale } from "src/components/Animations/Variants/scale";

const PieceStatus: React.FC = () => {
  const { destroyPiece } = useGame();
  const { cell } = useCell();
  const { score, updateActivators } = useScore();
  const controls = useAnimation();

  const startAnimation = () => {
    controls.start({
      scale: [1, 1.2, 1],
      boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
      transition: {
        duration: score.speed.statusChangeTime,
        repeat: Infinity,
        repeatDelay: score.speed.statusChangeTime,
        repeatType: "reverse",
      },
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (cell.isEmpty) return;

    if (cell.isDestroyed) {
      startAnimation();
      return;
    }

    const pieceDestoryChance = cell.insideCell.destroyChance[cell.insideCell.level - 1];

    interval = setInterval(() => {
      const resistance = Math.random() + score.gameStats.resistance;
      if (resistance > pieceDestoryChance) return;
      const updatedGrid = destroyPiece(cell);
      updateActivators(updatedGrid);
      clearInterval(interval);
    }, score.speed.destroyTime);

    console.log(score.speed);

    return () => {
      clearInterval(interval);
    };
  }, [cell, score.gameStats.resistance, score.gameStats.speed, score.speed.tick]);

  return (
    <motion.div
      initial="inactive"
      variants={scale}
      transition={{
        duration: score.speed.pieceTransition,
        ease: "anticipate",
      }}
      animate={cell.animate}
      className="piece-status"
    >
      <motion.div
        className={`piece-state${cell.isDestroyed ? " destroyed" : ""}`}
        key={+cell.isDestroyed}
        animate={controls}
      ></motion.div>
    </motion.div>
  );
};

export default PieceStatus;
