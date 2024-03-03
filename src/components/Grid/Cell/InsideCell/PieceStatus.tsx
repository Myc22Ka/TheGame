import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { initGameState, useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";
import { gridVariants } from "src/modules/Grid/utils";
import options from "src/config.json";
import { useCell } from "src/contexts/CellContext";
import { emptyCell } from "src/modules/Game/utils";

const PieceStatus: React.FC = () => {
  const { destroyPiece } = useGame();
  const { cell } = useCell();
  const { score, currentGameSpeed, updateActivators } = useScore();
  const controls = useAnimation();

  const startAnimation = () => {
    controls.start({
      scale: [1, 1.2, 1],
      boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
      transition: {
        duration: currentGameSpeed({ devider: 1000 }),
        repeat: Infinity,
        repeatDelay: currentGameSpeed({ devider: 1000 }),
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

    interval = setInterval(
      () => {
        const resistance = Math.random() + score.gameStats.resistance;
        if (resistance > pieceDestoryChance) return;
        destroyPiece(cell);
        clearInterval(interval);
        updateActivators(cell.insideCell, initGameState.grid, emptyCell, "-");
      },
      currentGameSpeed({ devider: 0.5 })
    );

    return () => {
      clearInterval(interval);
    };
  }, [cell, score.gameStats.resistance, score.gameStats.speed]);

  return (
    <motion.div
      initial="inactive"
      variants={gridVariants}
      transition={{
        duration: currentGameSpeed({
          defaultTimeTick: options.time.defaultPieceTransition,
          devider: 1000,
        }),
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
