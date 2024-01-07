import React from "react";
import { Modal } from "react-bootstrap";

type PieceConfigPropsType = {
  show: boolean;
  handleClose: () => void;
};

const PieceConfig: React.FC<PieceConfigPropsType> = ({ handleClose, show }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
    </Modal>
  );
};

export default PieceConfig;
