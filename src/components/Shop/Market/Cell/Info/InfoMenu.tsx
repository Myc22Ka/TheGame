import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { PieceType } from "src/modules/Piece/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Activators from "../../../../Activators/Activators";
import { piecesIcons } from "src/modules/Piece/statsIcons";
import Title from "src/components/Animations/Text/Title";
import Piece from "src/components/Piece/Piece";

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
      <Offcanvas.Body>
        <Stack>
          <div className="piece-description">{piece.description}</div>
          <Activators
            activators={piece.activators}
            level={piece.level}
            show={show}
            destroyChance={piece.destroyChance}
          />
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default InfoMenu;
