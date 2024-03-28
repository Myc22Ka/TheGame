import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { PieceType } from "src/modules/Piece/types";
import Title from "src/components/Animations/Text/Title";
import Piece from "src/components/Piece/Piece";
import Body from "./Body";

type InfoMenuPropsType = {
  show: boolean;
  piece: PieceType;
  handleClose: () => void;
};

const InfoMenu: React.FC<InfoMenuPropsType> = ({ show, piece, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header className="justify-content-center align-items-center">
        <Stack direction="vertical" className="justify-content-center align-items-center">
          <Title title={piece.name} />
          <Piece piece={piece} show={show} />
        </Stack>
      </Offcanvas.Header>
      <hr className="hr" />
      <Body piece={piece} show={show} />
    </Offcanvas>
  );
};

export default InfoMenu;
