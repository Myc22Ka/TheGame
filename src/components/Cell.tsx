import React, { useEffect, useRef } from "react";
import { useGame } from "../contexts/GameContext";
import { GridEntry } from "../contexts/GameContext";
import { motion } from "framer-motion";
import { pieceTransition } from "../modules/Piece/utils";

interface CellProps {
  cell: GridEntry;
  index: number;
}

const variants = {
  active: {
    scale: 1,
    borderRadius: 10,
  },
  inactive: {
    scale: 0,
    borderRadius: 100,
  },
};

const Cell: React.FC<CellProps> = ({ cell, index }) => {
  const { addRefToCell } = useGame();
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    addRefToCell(cellRef, index);
  }, []);

  return (
    <div className="cell" ref={cellRef}>
      <motion.div
        className={cell.insideCell.rule}
        initial="initial"
        variants={variants}
        transition={pieceTransition}
        animate={cell.animate}
      />
    </div>
  );
};

export default Cell;
