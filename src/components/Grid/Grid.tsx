import React, { useEffect, useRef } from "react";
import "../../styles/grid.scss";
import Cell from "./Cell";
import { useGame } from "../../contexts/GameContext";

const Grid: React.FC = () => {
  const { game, defineRefForCells } = useGame();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) defineRefForCells(gridRef.current.children);
  }, [game.grid.length]);

  return (
    <div className="grid-container p-3 pt-0">
      <div
        className="grid-elements"
        ref={gridRef}
        style={{
          gridTemplateColumns: `repeat(${Math.sqrt(game.grid.length)}, 1fr)`,
          gridTemplateRows: `repeat(${Math.sqrt(game.grid.length)}, 1fr)`,
        }}
      >
        {game.grid.map((cell, key) => {
          return <Cell key={key} cell={cell} />;
        })}
      </div>
    </div>
  );
};

export default Grid;
