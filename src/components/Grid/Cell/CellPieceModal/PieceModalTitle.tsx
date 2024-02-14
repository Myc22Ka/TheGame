import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Stack } from "react-bootstrap";
import { GridEntry } from "src/modules/Piece/types";
import { piecesIcons } from "src/modules/Piece/utils";

type PieceModalTitlePropsType = {
  cell: GridEntry;
};

const PieceModalTitle: React.FC<PieceModalTitlePropsType> = ({ cell }) => {
  return (
    <Modal.Header className="justify-content-center align-items-center" style={{ borderBottom: "none" }}>
      <Stack direction="vertical" className="justify-content-center align-items-center">
        <Modal.Title className="my-2">{cell.insideCell.name}</Modal.Title>
        <div className={`piece ${cell.insideCell.rule} info-piece my-1`}>
          <FontAwesomeIcon icon={piecesIcons.find((e) => e.rule === cell.insideCell.rule)!.icon} size="3x" />
        </div>
      </Stack>
    </Modal.Header>
  );
};

export default PieceModalTitle;
