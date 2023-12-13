import React, { useState } from "react";
import { PieceType } from "../../../../modules/Piece/types";
import options from "../../../../config.json";
import MarketCell from "../Cell/MarketCell";

const Grid: React.FC = () => {
  const [market, setMarket] = useState<PieceType[]>(options.pieces.types);

  const changeMarketState = (newPieceState: PieceType) => {
    setMarket((prevMarket) => {
      const updatedMarket = [...prevMarket];
      const index = updatedMarket.findIndex(
        (piece) => piece.id === newPieceState.id
      );

      if (index !== -1) updatedMarket[index] = newPieceState;

      return updatedMarket;
    });
  };

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
