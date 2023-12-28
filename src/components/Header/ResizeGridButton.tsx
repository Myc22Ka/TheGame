import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useGame } from "../../contexts/GameContext";
import { useScore } from "../../contexts/ScoreContext";
import options from "../../config.json";
import { Button, Stack } from "react-bootstrap";
import { motion } from "framer-motion";

const ResizeGridButton: React.FC = () => {
  const { game, resizeGrid } = useGame();
  const { score, removeSomeGold } = useScore();

  /**
   * Function is used to change size of grid.
   * @returns {void}
   */
  const resizeGridHandler = (): void => {
    const { defaultSize, gridUpgrades } = options.grid;
    if (Math.sqrt(game.grid.length) === defaultSize + gridUpgrades.length)
      return;

    const upgradeCost = gridUpgrades[Math.sqrt(game.grid.length) - defaultSize];

    if (upgradeCost.cost <= score.gold) {
      removeSomeGold(upgradeCost.cost);
      resizeGrid();
    }
  };

  const isMaxed =
    Math.sqrt(game.grid.length) ===
    options.grid.defaultSize + options.grid.gridUpgrades.length;

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
