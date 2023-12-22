import React from "react";
import { PieceType } from "../../../../modules/Piece/types";
import options from "../../../../config.json";
import MarketCell from "../Cell/MarketCell";

type GridPropsType = {
  market: PieceType[];
  changeMarketState: (newPieceState: PieceType) => void;
};

const Grid: React.FC<GridPropsType> = ({ market, changeMarketState }) => {
  return (
    <div
      className="market"
      style={{
        gridTemplateColumns: `repeat(${Math.floor(
          Math.sqrt(options.pieces.types.length)
        )}, 1fr)`,
        gridTemplateRows: `repeat(${Math.floor(
          Math.sqrt(options.pieces.types.length)
        )}, 1fr)`,
      }}
    >
      {market.map((piece, i) => (
        <MarketCell
          piece={piece}
          key={i}
          changeMarketState={changeMarketState}
        />
      ))}
    </div>
  );
};

export default Grid;
