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
};

const PieceConfig: React.FC<PieceConfigPropsType> = ({ handleClose, show }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <PieceModalTitle />
      <Description show={show} />
      <Buttons handleClose={handleClose} />
      <PieceStatus />
    </Modal>
  );
};

export default PieceConfig;
