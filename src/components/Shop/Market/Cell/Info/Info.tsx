import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { PieceType } from "../../../../../modules/Piece/types";
import InfoMenu from "./InfoMenu";

type InfoPropsType = {
  piece: PieceType;
};

const Info: React.FC<InfoPropsType> = ({ piece }) => {
  const [show, setShow] = useState(false);

  /**
   * Function closes info menu.
   * @returns {void}
   */
  const handleClose = (): void => setShow(false);

  /**
   * Function opens info menu.
   * @returns {void}
   */
  const handleShow = (): void => setShow(true);

  return (
    <React.Fragment>
      <div className="h6 m-0 info" onClick={handleShow}>
        <FontAwesomeIcon icon={faInfoCircle} size="sm" />
      </div>

      <InfoMenu piece={piece} show={show} handleClose={handleClose} />
    </React.Fragment>
  );
};

export default Info;
