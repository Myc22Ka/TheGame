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
  destroyChance: number[];
  showNextLevel?: boolean;
};

const Activators: React.FC<ActivatorsPropsType> = ({
  activators,
  destroyChance,
  level,
  show,
  showNextLevel = false,
}) => {
  return (
    <Stack direction="horizontal" gap={1}>
      <ActivatorNames activators={activators} destroyChance={destroyChance} />
      <ActivatorsScales activators={activators} show={show} level={level - 1} destroyChance={destroyChance} />
      {showNextLevel && (
        <ShowNextLevel activators={activators} show={show} level={level - 2} destroyChance={destroyChance} />
      )}
    </Stack>
  );
};

export default Activators;
