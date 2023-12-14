import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import Switch from "./Switch";
import Grid from "./Grid";

export type activeStateType = "Market" | "Upgrades";

const Market: React.FC = () => {
  const [activeState, setActiveState] = useState<activeStateType>("Market");

  const changeActiveState = (newActivetate: activeStateType) =>
    setActiveState(newActivetate);

  return (
    <Stack direction="vertical" style={{ flex: 0 }}>
      <Switch activeState={activeState} changeActiveState={changeActiveState} />
      <div className="p-3 devider"></div>
      {activeState === "Market" ? <Grid /> : <div>Hi</div>}
      <div className="p-3 devider"></div>
    </Stack>
  );
};

export default Market;
