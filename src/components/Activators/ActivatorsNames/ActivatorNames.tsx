import React from "react";
import { Stack } from "react-bootstrap";
import { ActivatorsType } from "src/modules/Score/types";
import ActivatorName from "./ActivatorName";
import { GameStats } from "src/modules/Game/types";

type ActivatorNamesPropsType = {
  activators: ActivatorsType;
};

const ActivatorNames: React.FC<ActivatorNamesPropsType> = ({ activators }) => {
  return (
    <Stack direction="vertical">
      {Object.keys(activators).map((activator) => (
        <ActivatorName key={activator} activator={activator as GameStats} />
      ))}
    </Stack>
  );
};

export default ActivatorNames;
