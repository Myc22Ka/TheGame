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

  const calculateAnimation = useCallback(() => {
    return tile.vector;
  }, [tile]);

  if (!tile.show) return <></>;

  return (
    <motion.div
      className="box1"
      drag
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={tile.dragEnd ? calculateAnimation() : {}}
      transition={{
        duration: 0.4,
        // damping: 20,
        // stiffness: 200,
        // restDelta: 0.01,
        // type: "spring",
      }}
      onAnimationComplete={hidePiece}
      ref={pieceRef}
    />
  );
};

export default Piece;
