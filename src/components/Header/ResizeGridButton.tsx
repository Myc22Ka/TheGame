import { faCoins, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";
import options from "src/config.json";
import { Button, OverlayTrigger, Popover, Stack } from "react-bootstrap";
import styles from "src/styles/style.module.scss";

const colorVariants = {
  color: {
    color: ["#ffffff", styles.error, "#ffffff"],
  },
};

const ResizeGridButton: React.FC = () => {
  const { game, resizeGrid } = useGame();
  const { score, removeSomeGold } = useScore();
  const { defaultSize, gridUpgrades } = options.grid;

  /**
   * Function is used to change size of grid.
   * @returns {void}
   */
  const resizeGridHandler = (): void => {
    if (Math.sqrt(game.grid.length) === defaultSize + gridUpgrades.length)
      return;

    const upgradeCost = gridUpgrades[Math.sqrt(game.grid.length) - defaultSize];

    if (upgradeCost.cost <= score.gold) {
      removeSomeGold(upgradeCost.cost);
      resizeGrid();
      return;
    }
  };

  const isMaxed =
    Math.sqrt(game.grid.length) === defaultSize + gridUpgrades.length;

  return (
    <Stack direction="horizontal" gap={2}>
      <Button variant="main" onClick={resizeGridHandler} disabled={isMaxed}>
        <Stack gap={3} direction="horizontal">
          <FontAwesomeIcon icon={faPlus} />
          <span className="text text-uppercase fw-bold">
            {isMaxed ? "Max Cells" : "Add Cells"}
          </span>
        </Stack>
      </Button>
    </Stack>
  );
};

export default ResizeGridButton;
