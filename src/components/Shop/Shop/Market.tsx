import React, { useState } from "react";
import options from "../../../config.json";
import ShopCell from "./ShopCell";
import { Stack } from "react-bootstrap";
import Switch from "./Switch";

export type activeStateType = "Shop" | "Upgrades";

const Market: React.FC = () => {
  const [activeState, setActiveState] = useState<activeStateType>("Shop");

  const changeActiveState = (stateState: activeStateType) =>
    setActiveState(stateState);

  return (
    <Stack direction="vertical" className="justify-content-end">
      <Switch activeState={activeState} changeActiveState={changeActiveState} />
      <div className="p-5 devider"></div>
      {activeState === "Shop" ? (
        <div
          className="market p-3"
          style={{
            gridTemplateColumns: `repeat(${Math.floor(
              Math.sqrt(options.pieces.types.length)
            )}, 1fr)`,
            gridTemplateRows: `repeat(${Math.floor(
              Math.sqrt(options.pieces.types.length)
            )}, 1fr)`,
          }}
        >
          {options.pieces.types.map((piece, i) => (
            <ShopCell piece={piece} key={i} />
          ))}
        </div>
      ) : (
        <div>Hi</div>
      )}
    </Stack>
  );
};

export default Market;
