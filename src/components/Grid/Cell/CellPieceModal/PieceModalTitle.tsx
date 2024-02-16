import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Stack } from "react-bootstrap";
import { GridEntry } from "src/modules/Piece/types";
import Levels from "../Levels";
import { piecesIcons } from "src/modules/Piece/statsIcons";

type PieceModalTitlePropsType = {
  cell: GridEntry;
};

const PieceModalTitle: React.FC<PieceModalTitlePropsType> = ({ cell }) => {
  return (
    <>
      <Modal.Header className="justify-content-center align-items-center" style={{ borderBottom: "none" }}>
        <Stack direction="vertical" className="justify-content-center align-items-center">
          <Modal.Title className="my-2">{cell.insideCell.name}</Modal.Title>
          <div className={`piece ${cell.insideCell.rule} info-piece my-1`}>
            <FontAwesomeIcon icon={piecesIcons[cell.insideCell.rule]} size="3x" />
          </div>
          <Levels cell={cell} />
        </Stack>
      </Modal.Header>
      <hr className="hr" />
    </>
  );
};

export default PieceModalTitle;
