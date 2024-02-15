import React, { useState } from "react";
import Piece from "./Piece";
import { defaultCycle } from "src/modules/Piece/utils";
import { Stack } from "react-bootstrap";
import Switch from "../Market/MarketLogic/Switch";
import { DefaultCycleType } from "src/modules/Piece/types";
import CycleMetter from "./CycleMetter";

const RandomPieceGen: React.FC = () => {
  const [cycle, setCycle] = useState(defaultCycle);

  const updateCycle = (newStep: DefaultCycleType[], currentIndex: number) => {
    setCycle(newStep[currentIndex]);
  };

  return (
    <Stack
      direction="vertical"
      className="align-items-center justify-content-end h-100"
      gap={5}
      style={{ position: "relative" }}
    >
      <CycleMetter cycle={cycle} updateCycle={updateCycle} />
      <div className="piece-spawn">{cycle.show && <Piece piece={cycle.piece} animate={cycle.animate} />}</div>
      <Switch />
    </Stack>
  );
};

export default RandomPieceGen;
