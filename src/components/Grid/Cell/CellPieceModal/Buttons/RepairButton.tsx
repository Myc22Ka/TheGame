import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useCell } from "src/contexts/CellContext";
import { useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";

type RepairButtonPropsType = {
  handleClose: () => void;
};

const RepairButton: React.FC<RepairButtonPropsType> = ({ handleClose }) => {
  const { repairPiece } = useGame();
  const { score, updateActivators } = useScore();
  const { cell } = useCell();

  const handleRepair = () => {
    handleClose();

    if (score.gameStats.power <= 0 || !cell.isDestroyed) return;

    repairPiece(cell);
    updateActivators(cell.insideCell);
  };

  return (
    <Button variant="main" onClick={handleRepair} disabled={!cell.isDestroyed}>
      <Stack gap={3} direction="horizontal">
        <FontAwesomeIcon icon={faWrench} />
        <span>Repair</span>
      </Stack>
    </Button>
  );
};

export default RepairButton;
