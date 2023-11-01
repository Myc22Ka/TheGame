import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useGame } from "../../../contexts/GameContext";
import { useScore } from "../../../contexts/ScoreContext";
import options from "../../../config.json";
import { Button, Stack } from "react-bootstrap";
import { motion } from "framer-motion";

const ResizeGridButton: React.FC = () => {
  const { game, resizeGrid } = useGame();
  const { score, removeSomeGold } = useScore();

  const resizeGridHandler = () => {
    const { maxSize, gridUpgrades, size } = options.grid;
    if (game.currentGridSize === maxSize) return;

    if (gridUpgrades[game.currentGridSize - size].cost <= score.gold) {
      removeSomeGold(gridUpgrades[game.currentGridSize - size].cost);
      resizeGrid();
    }
  };

  const isMaxed = game.currentGridSize === options.grid.maxSize;

  return (
    <motion.div whileTap={{ scale: isMaxed ? 1 : 0.95 }}>
      <Button variant="main" onClick={resizeGridHandler} disabled={isMaxed}>
        <Stack gap={3} direction="horizontal">
          <FontAwesomeIcon icon={faPlus} />
          <span className="text text-uppercase fw-bold">
            {isMaxed ? "Max Cells" : "Add Cells"}
          </span>
        </Stack>
      </Button>
    </motion.div>
  );
};

export default ResizeGridButton;
