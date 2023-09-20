import React, { useEffect, useRef } from "react";
import { useGame } from "../contexts/GameContext";
import { GridEntry } from "../contexts/GameContext";

interface CellProps {
  cell: GridEntry;
  index: number;
}

const Cell: React.FC<CellProps> = ({ cell, index }) => {
  const { addRefToCell } = useGame();
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    addRefToCell(cellRef, index);
  }, []);

  return (
    <div className="cell" ref={cellRef}>
      <div className={cell.insideCell.type} />
    </div>
  );
};

export default Cell;
