import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { PieceType } from "../../../modules/Piece/types";

type InfoPropsType = {
  piece: PieceType;
};

const Info: React.FC<InfoPropsType> = ({ piece }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <div className="h6 m-0 px-3 py-1 info" onClick={handleShow}>
        <FontAwesomeIcon icon={faInfo} size="sm" />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>{piece.id}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Info;
