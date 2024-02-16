import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Stack } from "react-bootstrap";
import Levels from "../Levels";
import { piecesIcons } from "src/modules/Piece/statsIcons";
import { useCell } from "src/contexts/CellContext";

const PieceModalTitle: React.FC = () => {
  const { cell } = useCell();

  return (
    <>
      <Modal.Header className="justify-content-center align-items-center" style={{ borderBottom: "none" }}>
        <Stack direction="vertical" className="justify-content-center align-items-center">
          <Modal.Title className="my-2">{cell.insideCell.name}</Modal.Title>
          <div className={`piece ${cell.insideCell.rule} info-piece my-1`}>
            <FontAwesomeIcon icon={piecesIcons[cell.insideCell.rule]} size="3x" />
          </div>
          <Levels />
        </Stack>
      </Modal.Header>
      <hr className="hr" />
    </>
  );
};

export default PieceModalTitle;
