import React, { useCallback } from "react";
import { motion } from "framer-motion";
import usePiece from "../../hooks/usePiece";
import { PieceType } from "../../contexts/GameContext";

type PiecePropsType = {
  piece: PieceType;
};

const Piece: React.FC<PiecePropsType> = ({ piece }) => {
  const { pieceRef, tile, handleDragStart, handleDragEnd, hidePiece } =
    usePiece(piece);

  if (!tile.show) return <></>;

  return (
    <motion.div
      className={`${piece.rule}${tile.animationTrigger ? " animated" : ""}`}
      drag
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={tile.dragEnd ? calculateAnimation() : {}}
      transition={{
        duration: 0.4,
        ease: "anticipate",
      }}
      onAnimationComplete={hidePiece}
      ref={pieceRef}
    />
  );
};

export default Piece;
