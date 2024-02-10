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

const CellPieceServiceDisplay: React.FC<CellPieceServiceDisplayPropsType> = ({
  cell,
}) => {
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

  const transformedValues = Object.entries(cell.insideCell.activators).reduce(
    (acc: ActivatorsType, [key, value]) => {
      acc[key as GameStats] = value * -1; // Transform the value here as needed
      return acc;
    },
    {}
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const piece = options.pieces.types.find(
      (piece) => piece.id === cell.insideCell.id
    );
    if (!piece) return;

    if (cell.isDestroyed) {
      startAnimation();
      return;
    }

    interval = setInterval(
      () => {
        const resistance = Math.random() + (score.gameStats.resistance || 0);
        if (resistance > piece.destroyChance) return;
        destroyPiece(cell);
        clearInterval(interval);
        updateActivators(transformedValues);
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
