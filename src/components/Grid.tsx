import React from "react";
import "../styles/grid.scss";
import Cell from "./Cell";
import { useGame } from "../contexts/GameContext";

const Grid: React.FC = () => {
  const { game } = useGame();

  return (
    <div className="grid-container">
      <div className="grid-elements">
        {game.grid.map((cell, key) => {
          return <Cell key={key} cell={cell} />;
        })}
      </div>
    </div>
  );
};

export default Grid;
