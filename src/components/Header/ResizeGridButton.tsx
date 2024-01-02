import { faCoins, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useGame } from "../../contexts/GameContext";
import { useScore } from "../../contexts/ScoreContext";
import options from "../../config.json";
import { Button, OverlayTrigger, Popover, Stack } from "react-bootstrap";
import styles from "../../styles/style.module.scss";

const colorVariants = {
  color: {
    color: ["#ffffff", styles.error, "#ffffff"],
  },
};

const ResizeGridButton: React.FC = () => {
  const { game, resizeGrid } = useGame();
  const { score, removeSomeGold } = useScore();
  const { defaultSize, gridUpgrades } = options.grid;
  const [animationState, setAnimationState] = useState("");
  const controls = useAnimation();

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
    setAnimationState("color");
    controls.start("color");
  };

  const cost = gridUpgrades[Math.sqrt(game.grid.length) - defaultSize].cost;

  const isMaxed =
    Math.sqrt(game.grid.length) === defaultSize + gridUpgrades.length;

  return (
    <Stack direction="horizontal" gap={2}>
      <OverlayTrigger
        placement="left"
        overlay={
          <Popover id="popover-positioned-right">
            <Popover.Body className="p-2">
              <Stack direction="horizontal" gap={1} className="cost-btn">
                <motion.div
                  initial="hidden"
                  animate={animationState}
                  variants={colorVariants}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="fw-bold"
                  onAnimationComplete={() => controls.stop()}
                >
                  {cost}
                </motion.div>
                <div>
                  <FontAwesomeIcon icon={faCoins} color={styles.main} />
                </div>
              </Stack>
            </Popover.Body>
          </Popover>
        }
      >
        <Button variant="main" onClick={resizeGridHandler} disabled={isMaxed}>
          <Stack gap={3} direction="horizontal">
            <FontAwesomeIcon icon={faPlus} />
            <span className="text text-uppercase fw-bold">
              {isMaxed ? "Max Cells" : "Add Cells"}
            </span>
          </Stack>
        </Button>
      </OverlayTrigger>
    </Stack>
  );
};

export default ResizeGridButton;
