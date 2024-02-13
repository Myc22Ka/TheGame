import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useGame } from "src/contexts/GameContext";
import { useScore } from "src/contexts/ScoreContext";
import { GridEntry } from "src/modules/Grid/types";

type PieceConfigPropsType = {
  show: boolean;
  handleClose: () => void;
  cell: GridEntry;
};

const PieceConfig: React.FC<PieceConfigPropsType> = ({
  handleClose,
  show,
  cell,
}) => {
  const { repairPiece, levelUp } = useGame();
  const { updateActivators, score, removeSomeGold } = useScore();

  const handleRepair = () => {
    handleClose();

    if (score.gameStats.power <= 0) return;
    if (cell.isDestroyed) {
      repairPiece(cell);
      updateActivators(cell.insideCell);
    }
  };

  const handleLevelUp = () => {
    const { upgradeCost, level, activators } = cell.insideCell;

    handleClose();
    if (!upgradeCost[level]) return;
    if (
      activators.power &&
      activators.power[level] + score.gameStats.power <= 0
    )
      return;
    if (upgradeCost[level] + score.gold <= 0) return;

    removeSomeGold(upgradeCost[level]);
    levelUp(cell);
    updateActivators({ ...cell.insideCell, level: level + 1 });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button variant="primary" onClick={handleRepair}>
          Repair
        </Button>
        <Button onClick={handleLevelUp}>Level Up</Button>
      </Modal.Body>
    </Modal>
  );
};

export default PieceConfig;
