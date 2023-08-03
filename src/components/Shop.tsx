import React from "react";
import { useGame } from "../contexts/GameContext";

const MAX_GRID_SIZE = 5;

const Shop: React.FC = () => {
  const { game, resizeGrid } = useGame();

  const handleClick = () => {
    if (Math.sqrt(game.grid.length) < MAX_GRID_SIZE && game.score > 1) {
      let start = game.grid.length;
      game.grid.length = Math.pow(Math.sqrt(game.grid.length) + 1, 2);
      resizeGrid(game.grid.fill({ name: "" }, start));
    }
  };

  return <div onClick={handleClick}>xd</div>;
};

export default Shop;
