import React from "react";
import { Stack } from "react-bootstrap";
import { PieceType } from "../../../../modules/Piece/types";
import { useScore } from "../../../../contexts/ScoreContext";
import usePiece from "../../../../hooks/usePiece";
import { motion } from "framer-motion";
import PieceInfo from "./PieceInfo";
import {
  pieceTransition,
  pieceVariants,
} from "../../../../modules/Piece/utils";

type MarketCellProps = {
  piece: PieceType;
  changeMarketState: (newMarketState: PieceType) => void;
};

const MarketCell: React.FC<MarketCellProps> = ({
  piece,
  changeMarketState,
}) => {
  const { score } = useScore();
  const {
    pieceRef,
    tile,
    handleDragStart,
    handleDragEndWithSell,
    addToGrid,
    unlockPiece,
    resetValues,
  } = usePiece(piece);

  const decreasePieceUse = (piece: PieceType) => {
    return { ...piece, uses: piece.uses - 1 };
  };

  const animationCompleteHandle = () => {
    if (tile.animate === "drag") {
      addToGrid();
      changeMarketState(decreasePieceUse(piece));
      setTimeout(resetValues, 500);
    }
    if (["return", "reset"].includes(tile.animate)) {
      unlockPiece();
    }
  };

  return (
    <Stack
      direction="horizontal"
      className={`justify-content-center align-items-center cell ${
        (score.gold < piece.buy || piece.uses === 0) && tile.animate !== "drag"
          ? " locked"
          : ""
      }`}
    >
      <motion.div
        className={`piece ${piece.rule}`}
        drag={
          score.gold > piece.buy &&
          piece.uses !== 0 &&
          ["active", "inactive"].includes(tile.animate)
        }
        onDragStart={handleDragStart}
        onDragEnd={handleDragEndWithSell}
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
        transition={pieceTransition}
        onAnimationComplete={animationCompleteHandle}
        ref={pieceRef}
      />
      <PieceInfo piece={piece} />
    </Stack>
  );
};

export default MarketCell;
