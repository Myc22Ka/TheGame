import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";
import PieceCostMoney from "./PieceCostMoney";
import styles from "src/styles/style.module.scss";
import { useCell } from "src/contexts/CellContext";
import { motion } from "framer-motion";

const iconVariants = {
  inactive: { y: 0, x: 0 },
  active: { y: [0, 1, -2.69, 0] },
};
const buttonVariants = {
  reject: { scale: 1, x: [0, -5, 5, -2.5, 2.5, 0], rotate: [0, -10, 10, -5, 5, 0] },
  success: { scale: 1.05, x: [0, 0] },
};

type LevelButtonPropsType = {
  handleClose: () => void;
};

type ButtonAnimateStates = "inactive" | "active";

const LevelUpButton: React.FC<LevelButtonPropsType> = ({ handleClose }) => {
  const { score, removeSomeGold, updateActivators, currentGameSpeed } = useScore();
  const { levelUp } = useGame();
  const { cell } = useCell();
  const [animateState, setAnimateState] = useState<ButtonAnimateStates>("inactive");
  const { upgradeCost, level, activators } = cell.insideCell;

  const handleLevelUp = () => {
    if (
      score.gold <= upgradeCost[level] ||
      cell.isDestroyed ||
      (activators.power && activators.power[level] + score.gameStats.power <= 0) ||
      !upgradeCost[level]
    ) {
      return;
    }
    handleClose();

    removeSomeGold(upgradeCost[level]);
    updateActivators(cell.insideCell, "-");
    levelUp(cell);
    updateActivators({ ...cell.insideCell, level: level + 1 });
  };

  const handleHoverStart = () => setAnimateState("active");
  const handleHoverEnd = () => setAnimateState("inactive");
  return (
    <Stack direction="horizontal" style={{ backgroundColor: styles.toExpensive, borderRadius: "0.375rem" }}>
      {level !== upgradeCost.length && (
        <PieceCostMoney
          disabled={level === upgradeCost.length || upgradeCost[level - 1] > score.gold || cell.isDestroyed}
        />
      )}
      <motion.div
        whileTap={cell.isDestroyed ? buttonVariants.reject : buttonVariants.success}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        transition={{
          duration: currentGameSpeed({ devider: 6000 }),
          ease: "easeInOut",
        }}
      >
        <Button variant="main" onClick={handleLevelUp}>
          <Stack gap={3} direction="horizontal">
            {!cell.isDestroyed ? (
              <motion.div
                animate={animateState}
                transition={{
                  times: [0, 0.5, 1],
                  duration: currentGameSpeed({ devider: 1500 }),
                  repeat: animateState === "active" ? Infinity : 0,
                  ease: "easeInOut",
                }}
                initial="inactive"
                variants={iconVariants}
              >
                <FontAwesomeIcon icon={faCircleUp} />
              </motion.div>
            ) : (
              <FontAwesomeIcon icon={faCircleUp} />
            )}
            <span>{level === upgradeCost.length ? "Max Level" : "Level Up"}</span>
          </Stack>
        </Button>
      </motion.div>
    </Stack>
  );
};

export default LevelUpButton;
