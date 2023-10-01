import React from "react";
import { motion } from "framer-motion";
import usePiece from "../../../hooks/usePiece";
import { pieceTransition, pieceVariants } from "../../../modules/Piece/utils";
import { PieceType } from "../../../modules/Piece/types";
import { useTrashcan } from "../../../contexts/TrashcanContext";

interface PieceProps {
  piece: PieceType;
  animate: "exit" | "";
}

const Piece: React.FC<PieceProps> = ({ piece, animate }) => {
  const { setActiveTrashcan } = useTrashcan();
  const {
    pieceRef,
    tile,
    handleDragStart,
    handleDragEnd,
    handleDrag,
    addToGrid,
    resetCycle,
    unlockPiece,
  } = usePiece(piece);

  const animationCompleteHandle = () => {
    if (animate === "exit") resetCycle();
    if (tile.animate === "drag") addToGrid();
    if (tile.animate === "return") unlockPiece();
    if (tile.animate === "sell") setActiveTrashcan("none");
  };

  return (
    <motion.div
      className={piece.rule}
      drag={tile.animate === "active"}
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
      onDrag={handleDrag}
    />
  );
};

export default Piece;
