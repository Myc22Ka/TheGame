import React, { useEffect, useState } from "react";
import { GridEntry } from "src/modules/Grid/types";
import { Variants, motion } from "framer-motion";
import { useGame } from "src/contexts/GameContext";
import options from "src/config.json";

type CellPieceServiceDisplayPropsType = {
  cell: GridEntry;
};

const variants: Variants = {
  on: { scale: 1 },
  off: {
    scale: [1, 1.2, 1],
    boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)", // Add a red glowing effect
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 1,
      repeatType: "reverse",
    },
  },
};

const CellPieceServiceDisplay: React.FC<CellPieceServiceDisplayPropsType> = ({
  cell,
}) => {
  const { destroyPiece } = useGame();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const destroyChance = options.pieces.types.find(
      (piece) => piece.id === cell.insideCell.id
    )!.destroyChance;

    if (!cell.isDestroyed)
      interval = setInterval(() => {
        if (Math.random() < destroyChance) {
          destroyPiece(cell);
          clearInterval(interval);
        }
      }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [cell.isDestroyed, destroyPiece, cell]);

  return (
    <motion.div
      key={+cell.isDestroyed}
      className={`piece-state${cell.isDestroyed ? " destroyed" : ""}`}
      animate={!cell.isDestroyed ? "on" : "off"}
      variants={variants}
    />
  );
};

export default CellPieceServiceDisplay;
