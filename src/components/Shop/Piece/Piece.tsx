import React from "react";
import { motion } from "framer-motion";
import usePiece from "../../../hooks/usePiece";
import { PieceType } from "../../../contexts/GameContext";
import { pieceTransition, pieceVariants } from "../../../modules/Piece/utils";

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
    hidePiece,
    setVisible,
  } = usePiece(piece);

  const animationCompleteHandle = () => {
    if (animate === "exit") setVisible(false);
    hidePiece();
  };

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
      onAnimationComplete={animationCompleteHandle}
      ref={pieceRef}
    />
  );
};

export default Piece;
