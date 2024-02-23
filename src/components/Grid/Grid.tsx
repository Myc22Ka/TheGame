import React, { useEffect, useRef } from "react";
import "src/styles/grid.scss";
import Cell from "./Cell/InsideCell/Cell";
import { useGame } from "src/contexts/GameContext";
import { CellProvider } from "src/contexts/CellContext";

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
          return (
            <CellProvider key={key} {...cell}>
              <Cell key={key} cell={cell} />
            </CellProvider>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
