import React from "react";
import options from "../../../../config.json";
import MarketCell from "../Cell/MarketCell";
import { useMarket } from "../../../../contexts/MarketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { piecesIcons } from "../../../../modules/Piece/utils";

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
        <MarketCell piece={piece} key={i}>
          <FontAwesomeIcon icon={piecesIcons[i].icon} size="3x" />
        </MarketCell>
      ))}
    </div>
  );
};

export default Grid;
