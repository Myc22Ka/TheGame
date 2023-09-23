import React from "react";
import { motion } from "framer-motion";
import usePiece from "../../hooks/usePiece";
import { PieceType } from "../../contexts/GameContext";
import { pieceTransition, pieceVariants } from "../../modules/Piece/utils";

interface PieceProps {
  piece: PieceType;
  animate: string;
}

const Piece: React.FC<PieceProps> = ({ piece, animate }) => {
  const { pieceRef, tile, handleDragStart, handleDragEnd, hidePiece } =
    usePiece(piece);

  return (
    <motion.div
      className={piece.rule}
      drag
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
      onAnimationComplete={() => hidePiece()}
      ref={pieceRef}
    />
  );
};

export default Piece;
