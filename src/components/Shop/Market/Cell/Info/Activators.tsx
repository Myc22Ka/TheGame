import React from "react";
import { Stack } from "react-bootstrap";
import { GameStats, PieceType } from "../../../../../modules/Piece/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { statsIcons } from "../../../../../modules/Piece/utils";
import styles from "../../../../../styles/style.module.scss";
import { changeCammelCaseToSpace } from "../../../../../utils/changeToCamelCase";
import VisualizeValue from "./VisualizeValue";

type ActivatorsPropsType = {
  piece: PieceType;
};

const Activators: React.FC<ActivatorsPropsType> = ({ piece }) => {
  return (
    <Stack>
      {Object.entries(piece.activators).map(([activator, value]) => {
        return (
          <Stack
            key={activator}
            direction="horizontal"
            gap={2}
            className="justify-content-between"
          >
            <Stack direction="horizontal" gap={2}>
              <FontAwesomeIcon
                icon={statsIcons.find((e) => e.rule === activator)!.icon}
                size="lg"
                color={styles.main}
              />
              <div className="activator">
                {changeCammelCaseToSpace(activator)}
              </div>
            </Stack>
            <VisualizeValue activator={activator as GameStats} value={value} />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Activators;
