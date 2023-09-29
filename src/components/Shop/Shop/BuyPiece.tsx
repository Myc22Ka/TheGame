import React from "react";
import { motion } from "framer-motion";
import usePiece from "../../../hooks/usePiece";
import { PieceType } from "../../../contexts/GameContext";
import { pieceTransition, pieceVariants } from "../../../modules/Piece/utils";

type BuyPiecePropsType = {
  piece: PieceType;
};

const BuyPiece: React.FC<BuyPiecePropsType> = ({ piece }) => {
  const { pieceRef, tile, handleDragStart, handleDragEnd } = usePiece(piece);

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
        return: { ...pieceVariants.return, ...tile.vector },
      }}
      transition={pieceTransition}
      //   onAnimationComplete={animationCompleteHandle}
      ref={pieceRef}
    />
  );
};

export default BuyPiece;
