import React from "react";
import options from "../../../config.json";
import BuyPiece from "./BuyPiece";

const Market: React.FC = () => {
  return (
    <div>
      {options.pieces.types.map((piece) => {
        return (
          <div key={piece.name}>
            <BuyPiece piece={piece} />
            <div>${piece.buy}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Market;
