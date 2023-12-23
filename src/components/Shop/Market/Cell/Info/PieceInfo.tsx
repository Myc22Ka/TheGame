import React from "react";
import Info from "./Info";
import { PieceType } from "../../../../../modules/Piece/types";
import options from "../../../../../config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

type PieceInfoPropsType = {
  piece: PieceType;
};

const PieceInfo: React.FC<PieceInfoPropsType> = ({ piece }) => {
  return (
    <React.Fragment>
      <Info piece={piece} />
      <div className="h6 m-0 uses py-1 px-3">
        {piece.uses}/{options.pieces.types.find((e) => e.id === piece.id)?.uses}
      </div>
      <div className="h6 m-0 price py-1 px-3">
        {piece.buy} <FontAwesomeIcon icon={faCoins} size="sm" />
      </div>
    </React.Fragment>
  );
};

export default PieceInfo;
