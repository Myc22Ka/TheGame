import React from "react";
import "../styles/grid.scss";
import Cell from "./Cell";

const Grid: React.FC = () => {
  return (
    <div className="grid-container">
      <div className="grid-elements">
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
    </div>
  );
};

export default Grid;
