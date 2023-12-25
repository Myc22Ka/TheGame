import React from "react";
import { motion } from "framer-motion";
import usePiece from "../../../hooks/usePiece";
import { pieceTransition, pieceVariants } from "../../../modules/Piece/utils";
import { PieceType } from "../../../modules/Piece/types";

interface PieceProps {
  piece: PieceType;
  animate: "exit" | "";
}

const Piece: React.FC<PieceProps> = ({ piece, animate }) => {
  const {
    pieceRef,
    tile,
    handleDragStart,
    handleDragEnd,
    addToGrid,
    resetCycle,
    unlockPiece,
  } = usePiece(piece);

  const animationCompleteHandle = () => {
    console.log(tile.animate);
    if (animate === "exit") resetCycle();
    if (tile.animate === "drag") {
      addToGrid();
    }
    if (tile.animate === "return") unlockPiece();
  };

  return (
    <motion.div
      className={piece.rule}
      drag={["active", "inactive"].includes(tile.animate)}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={animate || tile.animate}
      initial="initial"
      variants={{
        ...pieceVariants,
        drag: { ...pieceVariants.drag, ...tile.vector },
        return: { ...pieceVariants.return, ...tile.vector },
      }}
      transition={pieceTransition}
      onAnimationComplete={animationCompleteHandle}
      ref={pieceRef}
    />
  );
};

export default Piece;
