import React, { useEffect } from "react";
import { GridEntry } from "src/modules/Grid/types";
import { Variants, motion } from "framer-motion";
import { useGame } from "src/contexts/GameContext";
import options from "src/config.json";
import { useScore } from "src/contexts/ScoreContext";

type CellPieceServiceDisplayPropsType = {
  cell: GridEntry;
};

const CellPieceServiceDisplay: React.FC<CellPieceServiceDisplayPropsType> = ({
  cell,
}) => {
  const { destroyPiece } = useGame();
  const { score, currentGameSpeed } = useScore();

  const variants: Variants = {
    on: { scale: 1 },
    off: {
      scale: [1, 1.2, 1],
      boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
      transition: {
        duration: currentGameSpeed({ devider: 1000 }) / 2,
        repeat: Infinity,
        repeatDelay: currentGameSpeed({ devider: 1000 }),
        repeatType: "reverse",
      },
    },
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const piece = options.pieces.types.find(
      (piece) => piece.id === cell.insideCell.id
    );

    if (!piece || cell.isDestroyed) return;

    interval = setInterval(
      () => {
        const resistance = Math.random() + (score.gameStats.resistance || 0);
        if (resistance > piece.destroyChance) return;

        destroyPiece(cell);
        clearInterval(interval);
      },
      currentGameSpeed({ devider: 0.2 }) // default 5s
    );

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
