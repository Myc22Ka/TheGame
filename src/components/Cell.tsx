import React from "react";
import { GridEntry } from "../contexts/GameContext";

interface CellProps {
  cell: GridEntry;
}

const Cell: React.FC<CellProps> = ({ cell }): JSX.Element => {
  return (
    <div className="cell">
      <div>{cell.name}</div>
    </div>
  );
};

export default Cell;
