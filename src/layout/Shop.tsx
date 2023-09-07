import React from "react";
import { emptyCell, useGame } from "../contexts/GameContext";
import "../styles/shop.scss";
import DraggableComponent from "../components/DraggableComponent";

const MAX_GRID_SIZE: number = 5;

const Shop: React.FC = () => {
  const { game, resizeGrid } = useGame();

  const handleClick = () => {
    if (Math.sqrt(game.grid.length) < MAX_GRID_SIZE && game.score > 1) {
      let start = game.grid.length;
      game.grid.length = Math.pow(Math.sqrt(game.grid.length) + 1, 2);
      resizeGrid(game.grid.fill(emptyCell, start));
    }
  };

  return (
    <div className="shop">
      <div className="random-component-gen">
        <DraggableComponent />
      </div>
      <button onClick={handleClick}>Resize Grid</button>
    </div>
  );
};

export default Shop;
