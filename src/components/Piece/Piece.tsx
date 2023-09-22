import React, { useEffect } from "react";
import { motion } from "framer-motion";
import usePiece from "../../hooks/usePiece";
import { PieceType } from "../../contexts/GameContext";
import { pieceTransition, pieceVariants } from "../../modules/Piece/utils";

interface PieceProps {
  piece: PieceType;
}

const Piece: React.FC<PieceProps> = ({ piece }) => {
  const { pieceRef, tile, handleDragStart, handleDragEnd, hidePiece } =
    usePiece(piece);

  useEffect(() => {
    console.log(tile);
  }, [tile]);

  return (
    <motion.div
      className={piece.rule}
      drag
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={tile.animate}
      initial="initial"
      variants={{
        ...pieceVariants,
        drag: { ...pieceVariants.drag, ...tile.vector },
      }}
      transition={pieceTransition}
      onAnimationComplete={hidePiece}
      ref={pieceRef}
    />
  );
};

export default Piece;
