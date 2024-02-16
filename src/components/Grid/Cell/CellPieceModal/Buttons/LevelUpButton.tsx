import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";
import PieceCost from "./PieceCost";
import styles from "src/styles/style.module.scss";
import { useCell } from "src/contexts/CellContext";

type LevelButtonPropsType = {
  handleClose: () => void;
};

const LevelUpButton: React.FC<LevelButtonPropsType> = ({ handleClose }) => {
  const { cell } = useCell();
  const { score, removeSomeGold, updateActivators } = useScore();
  const { levelUp } = useGame();
  const { upgradeCost, level, activators } = cell.insideCell;

  const handleLevelUp = () => {
    handleClose();
    if (!upgradeCost[level]) return;
    if (activators.power && activators.power[level] + score.gameStats.power <= 0) return;
    if (score.gold <= upgradeCost[level]) return;

    removeSomeGold(upgradeCost[level]);
    updateActivators(cell.insideCell, "-");
    levelUp(cell);
    updateActivators({ ...cell.insideCell, level: level + 1 });
  };

  return (
    <Stack direction="horizontal" style={{ backgroundColor: styles.toExpensive, borderRadius: "0.375rem" }}>
      {level !== upgradeCost.length && <PieceCost />}
      <Button
        variant="main"
        onClick={handleLevelUp}
        disabled={level === upgradeCost.length || upgradeCost[level - 1] > score.gold || cell.isDestroyed}
      >
        <Stack gap={3} direction="horizontal">
          <FontAwesomeIcon icon={faCircleUp} />
          <span>{level === upgradeCost.length ? "Max Level" : "Level Up"}</span>
        </Stack>
      </Button>
    </Stack>
  );
};

export default LevelUpButton;
