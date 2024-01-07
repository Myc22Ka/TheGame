import React from "react";
import { Stack } from "react-bootstrap";
import { GameStats, PieceType } from "../../../../../modules/Piece/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  piecesRangeValues,
  statsIcons,
} from "../../../../../modules/Piece/utils";
import styles from "../../../../../styles/style.module.scss";
import { changeCammelCaseToSpace } from "../../../../../utils/changeToCamelCase";

type ActivatorsPropsType = {
  piece: PieceType;
};

const Activators: React.FC<ActivatorsPropsType> = ({ piece }) => {
  const visualizeValue = (activator: GameStats, value: number) => {
    let closest;
    const foundRange = piecesRangeValues.find(
      (element) => (element.rule = activator)
    );

    if (foundRange)
      closest = foundRange.range.reduce(function (prev, curr) {
        return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
      });

    const size = "20px";

    return (
      <Stack direction="horizontal" gap={1}>
        {[...Array(closest)].map((_, i) => (
          <div
            style={{
              backgroundColor: styles[activator],
              width: size,
              height: size,
              borderRadius: "4px",
            }}
            key={i}
          />
        ))}
      </Stack>
    );
  };

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
            {visualizeValue(activator as GameStats, value)}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Activators;
