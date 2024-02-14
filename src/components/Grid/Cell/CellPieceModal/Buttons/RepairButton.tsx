import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";
import { GridEntry } from "src/modules/Grid/types";

type RepairButtonPropsType = {
  handleClose: () => void;
  cell: GridEntry;
};

const RepairButton: React.FC<RepairButtonPropsType> = ({ handleClose, cell }) => {
  const { repairPiece } = useGame();
  const { score, updateActivators } = useScore();

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
