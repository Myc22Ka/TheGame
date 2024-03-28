import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import { Button, Stack } from "react-bootstrap";
import { useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";
import PieceCostMoney from "./PieceCostMoney";
import styles from "src/styles/style.module.scss";
import { useCell } from "src/contexts/CellContext";
import { motion } from "framer-motion";
import { buttonVariants, transition, variants } from "./Buttons";
import { useSpecialAbilities } from "src/hooks/useSpecialAbilities";

type LevelButtonPropsType = {
  handleClose: () => void;
};

const LevelUpButton: React.FC<LevelButtonPropsType> = ({ handleClose }) => {
  const { cell } = useCell();
  const { giveAbility } = useSpecialAbilities();
  const { upgradeCost, level, activators } = cell.insideCell;

  if (level === upgradeCost.length) return;

  const { score, removeSomeGold, updateActivators } = useScore();
  const { levelUp } = useGame();

  const handleLevelUp = useCallback(() => {
    if (
      score.gold < upgradeCost[level] ||
      cell.isDestroyed ||
      (activators.power && activators.power[level] + score.gameStats.power <= 0)
    )
      return;

    handleClose();

    removeSomeGold(upgradeCost[level]);
    setTimeout(() => {
      const updatedGrid = levelUp(cell);
      updateActivators(updatedGrid);
      giveAbility(cell.insideCell);
    }, 200);
  }, [score.gold, cell.isDestroyed, activators.power, score.gameStats.power]);

  return (
    <Stack direction="horizontal" style={{ backgroundColor: styles.toExpensive, borderRadius: "0.375rem" }}>
      <PieceCostMoney disabled={upgradeCost[level - 1] > score.gold || cell.isDestroyed} />
      <motion.div
        style={{ borderRadius: "0.4rem" }}
        whileTap={cell.isDestroyed ? buttonVariants.reject : buttonVariants.success}
        transition={transition(score)}
        animate={!cell.isDestroyed ? "active" : "inactive"}
        variants={variants}
        initial={!cell.isDestroyed ? "active" : "inactive"}
      >
        <Button variant="transparent" onClick={handleLevelUp}>
          <Stack gap={3} direction="horizontal">
            <FontAwesomeIcon icon={faCircleUp} bounce={!cell.isDestroyed} />
            <span>Level Up</span>
          </Stack>
        </Button>
      </motion.div>
    </Stack>
  );
};

export default LevelUpButton;
