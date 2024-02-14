import React, { useEffect } from "react";
import { Modal, Stack } from "react-bootstrap";
import { GridEntry } from "src/modules/Grid/types";
import LevelUpButton from "./Buttons/LevelUpButton";
import RepairButton from "./Buttons/RepairButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { piecesIcons } from "src/modules/Piece/utils";
import Activators from "src/components/Shop/Market/Cell/Info/Activators";
import PieceModalTitle from "./PieceModalTitle";

type PieceConfigPropsType = {
  show: boolean;
  handleClose: () => void;
  cell: GridEntry;
};

const PieceConfig: React.FC<PieceConfigPropsType> = ({ handleClose, show, cell }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <PieceModalTitle cell={cell} />
      <hr className="hr" />
      <Modal.Body>
        <div className="piece-description">{cell.insideCell.description}</div>
        <Activators
          activators={cell.insideCell.activators}
          level={Math.min(cell.insideCell.level + 1, cell.insideCell.upgradeCost.length)}
        />
      </Modal.Body>
      <hr className="hr" />
      <Modal.Body style={{ paddingTop: 0 }}>
        <Stack className="justify-content-between" direction="horizontal">
          <RepairButton handleClose={handleClose} cell={cell} />
          <LevelUpButton handleClose={handleClose} cell={cell} />
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default PieceConfig;
