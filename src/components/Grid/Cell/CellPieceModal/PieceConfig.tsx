import React from "react";
import { Modal } from "react-bootstrap";
import { GridEntry } from "src/modules/Grid/types";
import PieceModalTitle from "./PieceModalTitle";
import PieceStatus from "../PieceStatus";
import Description from "./Body/Description";
import Buttons from "./Buttons/Buttons";

type PieceConfigPropsType = {
  show: boolean;
  handleClose: () => void;
  cell: GridEntry;
};

const PieceConfig: React.FC<PieceConfigPropsType> = ({ handleClose, show, cell }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <PieceModalTitle cell={cell} />
      <Description show={show} cell={cell} />
      <Buttons handleClose={handleClose} cell={cell} />
      <PieceStatus cell={cell} />
    </Modal>
  );
};

export default PieceConfig;
