import React, { useEffect } from "react";
import { motion } from "framer-motion";
import usePiece from "../../hooks/usePiece";
import { PieceType } from "../../contexts/GameContext";

interface PieceProps {
  piece: PieceType;
}

const Piece: React.FC<PieceProps> = ({ piece }) => {
  const { pieceRef, tile, handleDragStart, handleDragEnd, hidePiece } =
    usePiece(piece);

  // if (!tile.show) return <React.Fragment />;

  const variants = {
    initial: { scale: 0 },
    active: { scale: 1 },
    drag: { ...tile.vector, scale: 1 },
    sell: {
      scale: 0,
      rotate: 45,
      radius: "50%",
    },
    inactive: { scale: 0 },
  };

  const defaultTransition = {
    duration: 0.4,
    ease: "anticipate",
  };

  // useEffect(() => {
  //   console.log(tile.animate);
  // }, [tile]);

  return (
    <motion.div
      className={piece.rule}
      drag
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={tile.animate}
      initial="initial"
      variants={variants}
      exit="inactive"
      transition={defaultTransition}
      onAnimationComplete={hidePiece}
      ref={pieceRef}
    />
  );
};

export default Piece;
