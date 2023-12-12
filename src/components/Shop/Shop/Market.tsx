import React, { useState } from "react";
import options from "../../../config.json";
import BuyPiece from "./BuyPiece";
import { Stack } from "react-bootstrap";
import Switch from "./Switch";
import { PieceType } from "../../../modules/Piece/types";

export type activeStateType = "Shop" | "Upgrades";

const Market: React.FC = () => {
  const [activeState, setActiveState] = useState<activeStateType>("Shop");
  const [market, setMarket] = useState<PieceType[]>(options.pieces.types);

  const changeActiveState = (newActivetate: activeStateType) =>
    setActiveState(newActivetate);

  const changeMarketState = (newPieceState: PieceType) => {
    setMarket((prevMarket) => {
      const updatedMarket = [...prevMarket];
      const index = updatedMarket.findIndex(
        (piece) => piece.id === newPieceState.id
      );

      if (index !== -1) {
        updatedMarket[index] = newPieceState;
      }

      return updatedMarket;
    });
  };

  return (
    <Stack direction="vertical" style={{ flex: 0 }}>
      <Switch activeState={activeState} changeActiveState={changeActiveState} />
      <div className="p-3 devider"></div>
      {activeState === "Shop" ? (
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
            <BuyPiece
              piece={piece}
              key={i}
              changeMarketState={changeMarketState}
            />
          ))}
        </div>
      ) : (
        <div>Hi</div>
      )}
      <div className="p-3 devider"></div>
    </Stack>
  );
};

export default Market;
