import React, { ReactNode } from "react";
import { Stack } from "react-bootstrap";
import { PieceType } from "../../../../modules/Piece/types";
import { useScore } from "../../../../contexts/ScoreContext";
import usePiece from "../../../../hooks/usePiece";
import { motion } from "framer-motion";
import PieceInfo from "./Info/PieceInfo";
import { pieceVariants } from "../../../../modules/Piece/utils";
import { useMarket } from "../../../../contexts/MarketContext";
import { getPieceTransition } from "../../../../modules/game_utils";

type MarketCellProps = {
  piece: PieceType;
  children?: ReactNode;
};

const MarketCell: React.FC<MarketCellProps> = ({ children, piece }) => {
  const { score } = useScore();
  const { changeMarketState, changePrices } = useMarket();
  const {
    pieceRef,
    tile,
    handleDragStart,
    handleDragEnd,
    addToGrid,
    setDefaultValues,
    changePieceAnimation,
  } = usePiece(piece);

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
      setTimeout(setDefaultValues, 500);
    }
    if (["return", "reset"].includes(tile.animate)) {
      changePieceAnimation("inactive");
    }
  };

  return (
    <Stack
      direction="horizontal"
      className={`justify-content-center align-items-center cell${
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
        transition={getPieceTransition(score)}
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
