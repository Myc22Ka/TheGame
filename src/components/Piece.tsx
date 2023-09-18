import React from "react";
import { motion } from "framer-motion";
import usePiece from "../hooks/usePiece";

const Piece: React.FC = () => {
  const { pieceRef, tile, handleDragStart, handleDragEnd } = usePiece();

  return (
    <motion.div
      className={tile.piece.name}
      drag
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={tile.animate}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 100 }}
      ref={pieceRef}
    >
      {tile.piece.name}
    </motion.div>
  );
};

export default Piece;
