import React, { useEffect, useState } from "react";
import { GridEntry } from "src/modules/Grid/types";
import { Variants, motion, useAnimation } from "framer-motion";
import { useGame } from "src/contexts/GameContext";
import options from "src/config.json";
import { useScore } from "src/contexts/ScoreContext";
import { GameStats } from "src/modules/Game/types";
import { ActivatorsType } from "src/modules/Score/types";

type CellPieceServiceDisplayPropsType = {
  cell: GridEntry;
};

const CellPieceServiceDisplay: React.FC<CellPieceServiceDisplayPropsType> = ({ cell }) => {
  const { destroyPiece } = useGame();
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
        updateActivators(cell.insideCell, "-");
      },
      currentGameSpeed({ devider: 0.5 })
    );

    return () => {
      clearInterval(interval);
    };
  }, [cell, score.gameStats.resistance, score.gameStats.speed]);

  return (
    <motion.div
      key={+cell.isDestroyed}
      className={`piece-state${cell.isDestroyed ? " destroyed" : ""}`}
      animate={controls}
    />
  );
};

export default CellPieceServiceDisplay;
