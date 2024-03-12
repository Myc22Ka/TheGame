import React, { ReactNode } from "react";
import { Stack } from "react-bootstrap";
import { PieceType } from "src/modules/Piece/types";
import { useScore } from "src/contexts/ScoreContext";
import usePiece from "src/hooks/usePiece";
import { motion } from "framer-motion";
import PieceInfo from "./Info/PieceInfo";
import { pieceVariants } from "src/modules/Piece/utils";
import { useMarket } from "src/contexts/MarketContext";

type MarketCellProps = {
  piece: PieceType;
  children?: ReactNode;
};

const MarketCell: React.FC<MarketCellProps> = ({ children, piece }) => {
  const { score } = useScore();
  const { changeMarketState } = useMarket();
  const { pieceRef, tile, handleDragStart, handleDragEnd, addToGrid, setDefaultValues, changePieceAnimation } =
    usePiece(piece);

  /**
   * Function descrese uses property of current piece from marketContent.
   * @param {PieceType} piece
   * @returns {PieceType}
   */
  const decreasePieceUse = (piece: PieceType): PieceType => ({
    ...piece,
    uses: piece.uses - 1,
  });

  const animationCompleteHandle = () => {
    if (tile.animate === "drag") {
      addToGrid();
      changeMarketState(decreasePieceUse(piece));

      setDefaultValues();
    }
    if (["return", "reset"].includes(tile.animate)) {
      changePieceAnimation("inactive");
    }
  };

  return (
    <Stack
      direction="horizontal"
      className={`justify-content-center align-items-center cell${
        ((score.gold < piece.upgradeCost[piece.level - 1] || piece.uses === 0) && tile.animate !== "drag") ||
        (score.gameStats.power === 0 && piece.rule !== "power")
          ? " locked"
          : ""
      }`}
    >
      <motion.div
        className={`piece ${piece.rule}`}
        drag={
          score.gold > piece.upgradeCost[piece.level - 1] &&
          piece.uses !== 0 &&
          ["active", "inactive"].includes(tile.animate) &&
          ((score.gameStats.power || 0) > 0 || piece.rule === "power")
        }
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, true)}
        animate={tile.animate}
        initial="inactive"
        variants={{
          ...pieceVariants,
          drag: { ...pieceVariants.drag, ...tile.vector },
          return: { ...pieceVariants.return, ...tile.vector },
          reset: {
            ...pieceVariants.reset,
            x: [0, tile.vector.x],
            y: [0, tile.vector.y],
          },
        }}
        transition={{
          duration: score.speed.pieceTransition,
          ease: "anticipate",
        }}
        onAnimationComplete={animationCompleteHandle}
        ref={pieceRef}
      >
        {children}
      </motion.div>
      <PieceInfo piece={piece} />
    </Stack>
  );
};

export default MarketCell;
