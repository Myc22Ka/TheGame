import React from "react";
import { GameStats } from "src/modules/Piece/types";
import { piecesRangeValues } from "src/modules/Piece/utils";
import { Stack } from "react-bootstrap";
import styles from "src/styles/style.module.scss";

type VisualizeValuePropsType = {
  activator: GameStats;
  value: number;
};

const VisualizeValue: React.FC<VisualizeValuePropsType> = ({
  activator,
  value,
}) => {
  let closest: number;
  let length: number = 0;

  const foundRange = piecesRangeValues.find(
    (element) => element.rule === activator
  );

  if (foundRange) {
    closest = foundRange.range.reduce(function (prev, curr) {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });

    length = foundRange.range.findIndex((e) => e === closest) + 1;
  }

  const size = "20px";

  return (
    <Stack direction="horizontal" gap={1}>
      {[...Array(length)].map((_, i) => (
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

export default VisualizeValue;
