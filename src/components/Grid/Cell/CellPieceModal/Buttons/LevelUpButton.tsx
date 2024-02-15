import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";
import { GridEntry } from "src/modules/Grid/types";

type LevelButtonPropsType = {
  handleClose: () => void;
  cell: GridEntry;
};

const LevelUpButton: React.FC<LevelButtonPropsType> = ({ handleClose, cell }) => {
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
  );
};

export default LevelUpButton;
