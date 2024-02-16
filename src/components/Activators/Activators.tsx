import React from "react";
import { Stack } from "react-bootstrap";
import { GameStats } from "src/modules/Piece/types";
import VisualizeValue from "./Activator/VisualizeValue";
import { ActivatorsType } from "src/modules/Score/types";
import ActivatorName from "./Activator/ActivatorName";

type ActivatorsPropsType = {
  activators: ActivatorsType;
  level: number;
  show: boolean;
  showNextLevel?: boolean;
};

const Activators: React.FC<ActivatorsPropsType> = ({ activators, level, show, showNextLevel = false }) => {
  return (
    <Stack>
      {Object.entries(activators).map(([activator, value]) => {
        return (
          <Stack key={activator} direction="horizontal" gap={2} className="justify-content-between">
            <ActivatorName activator={activator as GameStats} />
            <VisualizeValue activator={activator as GameStats} value={value[level - 1]} show={show} />
            {showNextLevel && (
              <VisualizeValue activator={activator as GameStats} value={value[level - 2]} show={show} />
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Activators;
