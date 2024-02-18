import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useCell } from "src/contexts/CellContext";
import { useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";
import styles from "src/styles/style.module.scss";
import PieceCostPower from "./PieceCostPower";

type RepairButtonPropsType = {
  handleClose: () => void;
};

const RepairButton: React.FC<RepairButtonPropsType> = ({ handleClose }) => {
  const { repairPiece } = useGame();
  const { score, updateActivators } = useScore();
  const { cell } = useCell();

  const handleRepair = () => {
    if (score.gameStats.power <= 0 || !cell.isDestroyed) return;

    handleClose();

    repairPiece(cell);
    updateActivators(cell.insideCell);
  };

  return (
    <Stack direction="horizontal" style={{ backgroundColor: styles.toExpensive, borderRadius: "0.375rem" }}>
      <Button variant="main" onClick={handleRepair}>
        <Stack gap={3} direction="horizontal">
          <FontAwesomeIcon icon={faWrench} />
          <span>Repair</span>
        </Stack>
      </Button>
      <PieceCostPower disabled={!cell.isDestroyed || score.gameStats.power <= 0} />
    </Stack>
  );
};

export default RepairButton;
