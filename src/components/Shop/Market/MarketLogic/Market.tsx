import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import Switch from "./Switch";
import Grid from "./Grid";
import { PieceType } from "../../../../modules/Piece/types";
import options from "../../../../config.json";

export type activeStateType = "Market" | "Upgrades";

const Market: React.FC = () => {
  const [activeState, setActiveState] = useState<activeStateType>("Market");
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

  const changeActiveState = (newActivetate: activeStateType) =>
    setActiveState(newActivetate);

  return (
    <Stack direction="vertical" style={{ flex: 0 }}>
      <Switch activeState={activeState} changeActiveState={changeActiveState} />
      <div className="p-3 devider"></div>
      {activeState === "Market" ? (
        <Grid market={market} changeMarketState={changeMarketState} />
      ) : (
        <div>Hi</div>
      )}
      <div className="p-3 devider"></div>
    </Stack>
  );
};

export default Market;
