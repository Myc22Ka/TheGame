import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { PieceType } from "../../../../modules/Piece/types";

type InfoPropsType = {
  piece: PieceType;
};

const Info: React.FC<InfoPropsType> = ({ piece }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <div className="h6 m-0 info" onClick={handleShow}>
        <FontAwesomeIcon icon={faInfoCircle} size="sm" />
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header>
          <Offcanvas.Title>Info</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{piece.id}</Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
};

export default Info;
