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
    changePieceAnimation,
  } = usePiece(piece);

  const animationCompleteHandle = () => {
    if (animate === "exit") changePieceAnimation("exit");
    if (tile.animate === "drag") {
      addToGrid();
    }
    if (tile.animate === "return") changePieceAnimation("return");
  };

  return (
    <motion.div
      className={`piece ${piece.rule}`}
      drag={["active", "inactive"].includes(tile.animate)}
      onDragStart={handleDragStart}
      onDragEnd={(e) => handleDragEnd(e, false)}
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
