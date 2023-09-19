import React from "react";
import { useGame } from "../contexts/GameContext";
import "../styles/shop.scss";
import Piece from "../components/Piece";
import options from "../config.json";
import { useScore } from "../contexts/ScoreContext";

const Shop: React.FC = () => {
  const { game, resizeGrid } = useGame();
  const { score, removeSomeGold } = useScore();

  const handleClick = () => {
    const { maxSize, gridUpgrades, size } = options.grid;
    if (game.currentGridSize === maxSize) return;

    if (gridUpgrades[game.currentGridSize - size].cost <= score.gold) {
      removeSomeGold(gridUpgrades[game.currentGridSize - size].cost);
      resizeGrid();
    }
  };

  return (
    <div className="shop">
      <div className="random-component-gen">
        <Piece />
      </div>
      <button onClick={handleClick}>Resize Grid</button>
    </div>
  );
};

export default Shop;
