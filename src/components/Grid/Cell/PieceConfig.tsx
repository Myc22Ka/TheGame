import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useGame } from "src/contexts/GameContext";
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
  const { repairPiece } = useGame();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          variant="primary"
          onClick={() => {
            repairPiece(cell);
            handleClose();
          }}
        >
          Repair
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default PieceConfig;
