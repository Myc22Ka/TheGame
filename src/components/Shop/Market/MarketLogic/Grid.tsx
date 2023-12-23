import React from "react";
import options from "../../../../config.json";
import MarketCell from "../Cell/MarketCell";
import { useMarket } from "../../../../contexts/MarketContext";

const Grid: React.FC = () => {
  const { marketContent } = useMarket();

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
      {marketContent.pieces.map((piece, i) => (
        <MarketCell piece={piece} key={i} />
      ))}
    </div>
  );
};

export default Grid;
