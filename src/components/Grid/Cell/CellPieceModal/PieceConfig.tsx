import React from "react";
import { Modal } from "react-bootstrap";
import PieceModalTitle from "./Header/PieceModalTitle";
import PieceStatus from "../InsideCell/PieceStatus";
import Buttons from "./Buttons/Buttons";
import Body from "./Body/Body";

type PieceConfigPropsType = {
  show: boolean;
  handleClose: () => void;
};

const PieceConfig: React.FC<PieceConfigPropsType> = ({ handleClose, show }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <PieceModalTitle />
      <Body show={show} />
      <Buttons handleClose={handleClose} />
      <PieceStatus />
    </Modal>
  );
};

export default PieceConfig;
