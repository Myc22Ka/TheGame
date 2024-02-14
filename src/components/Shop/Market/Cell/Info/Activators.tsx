import React from "react";
import { Stack } from "react-bootstrap";
import { GameStats } from "src/modules/Piece/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { statsIcons } from "src/modules/Piece/utils";
import styles from "src/styles/style.module.scss";
import { changeCammelCaseToSpace } from "src/utils/changeToCamelCase";
import VisualizeValue from "./VisualizeValue";
import { ActivatorsType } from "src/modules/Score/types";

type ActivatorsPropsType = {
  activators: ActivatorsType;
  level: number;
};

const Activators: React.FC<ActivatorsPropsType> = ({ activators, level }) => {
  return (
    <Stack>
      {Object.entries(activators).map(([activator, value]) => {
        return (
          <Stack key={activator} direction="horizontal" gap={2} className="justify-content-between">
            <Stack direction="horizontal" gap={2}>
              <FontAwesomeIcon
                icon={statsIcons.find((e) => e.rule === activator)!.icon}
                size="lg"
                color={styles.main}
              />
              <div className="activator">{changeCammelCaseToSpace(activator)}</div>
            </Stack>
            <VisualizeValue activator={activator as GameStats} value={value[level - 1]} />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Activators;
