import React from "react";
import { Offcanvas } from "react-bootstrap";
import { PieceType } from "../../../../../modules/Piece/types";

type InfoMenuPropsType = {
  show: boolean;
  piece: PieceType;
  handleClose: () => void;
};

const InfoMenu: React.FC<InfoMenuPropsType> = ({
  show,
  piece,
  handleClose,
}) => {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header>
        <Offcanvas.Title>Info</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{piece.id}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default InfoMenu;
