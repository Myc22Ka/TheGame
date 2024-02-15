import React from "react";
import options from "src/config.json";
import MarketCell from "../Cell/MarketCell";
import { useMarket } from "src/contexts/MarketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { piecesIcons } from "src/modules/Piece/statsIcons";

const Grid: React.FC = () => {
  const { marketContent } = useMarket();

  return (
    <div
      className="market"
      style={{
        gridTemplateColumns: `repeat(${Math.floor(Math.sqrt(options.pieces.types.length))}, 1fr)`,
        gridTemplateRows: `repeat(${Math.floor(Math.sqrt(options.pieces.types.length))}, 1fr)`,
      }}
    >
      {marketContent.pieces.map((piece) => {
        return (
          <MarketCell piece={piece} key={piece.rule}>
            <FontAwesomeIcon icon={piecesIcons[piece.rule]} size="3x" />
          </MarketCell>
        );
      })}
    </div>
  );
};

export default Grid;
