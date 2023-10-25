import React from "react";
import { useGame } from "../../../contexts/GameContext";
import "../../../styles/shop.scss";
import options from "../../../config.json";
import { useScore } from "../../../contexts/ScoreContext";
import RandomPieceGen from "../Piece/RandomPieceGen";
import TrashCan from "./TrashCan";
import Market from "./Market";

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
      <RandomPieceGen />
      <button onClick={handleClick}>Resize Grid</button>
      <Market />
      <TrashCan />
    </div>
  );
};

export default Shop;
