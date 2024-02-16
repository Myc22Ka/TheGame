import React from "react";
import { Stack } from "react-bootstrap";
import ActivatorsScales from "./ActivatorsScales/ActivatorsScales";
import { ActivatorsType } from "src/modules/Score/types";
import ActivatorNames from "./ActivatorsNames/ActivatorNames";
import ShowNextLevel from "./ShowNextLevel";

type ActivatorsPropsType = {
  activators: ActivatorsType;
  level: number;
  show: boolean;
  showNextLevel?: boolean;
};

const Activators: React.FC<ActivatorsPropsType> = ({ activators, level, show, showNextLevel = false }) => {
  return (
    <Stack direction="horizontal" gap={1}>
      <ActivatorNames activators={activators} />
      <ActivatorsScales activators={activators} show={show} level={level - 1} />
      {showNextLevel && <ShowNextLevel activators={activators} show={show} level={level - 2} />}
    </Stack>
  );
};

export default Activators;
