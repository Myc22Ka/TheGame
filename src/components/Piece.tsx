import React, { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import usePiece from "../hooks/usePiece";

const Piece: React.FC = () => {
  const { pieceRef, tile, handleDragStart, handleDragEnd } = usePiece();

  const calculateAnimation = useCallback(() => {
    return tile.vector;
  }, [tile]);

  useEffect(() => {
    console.log(tile);
  }, [tile]);

  return (
    <motion.div
      className="box1"
      drag={tile.dragTime.end ? tile.isdragged : true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={tile.dragTime.end ? calculateAnimation() : {}}
      ref={pieceRef}
    />
  );
};

export default Piece;
