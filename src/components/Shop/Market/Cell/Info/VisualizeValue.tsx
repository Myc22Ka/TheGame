import React from "react";
import { GameStats } from "src/modules/Piece/types";
import { piecesRangeValues } from "src/modules/Piece/utils";
import { Stack } from "react-bootstrap";
import styles from "src/styles/style.module.scss";
import { calcLength } from "framer-motion";

type VisualizeValuePropsType = {
  activator: GameStats;
  value: number;
};

const VisualizeValue: React.FC<VisualizeValuePropsType> = ({ activator, value }) => {
  const calcLength = () => {
    const foundRange = piecesRangeValues.find((element) => element.rule === activator);
    const closest = foundRange
      ? foundRange.range.reduce((prev, curr) =>
          Math.abs(curr - Math.abs(value)) < Math.abs(prev - Math.abs(value)) ? curr : prev
        )
      : undefined;

    return foundRange ? foundRange.range.findIndex((e) => e === closest) + 1 : 0;
  };

  return (
    <Stack direction="horizontal" gap={1}>
      {[...Array(calcLength())].map((_, i) => (
        <div
          className="activator-value"
          style={{
            backgroundColor: value < 0 ? styles.disabled : styles[activator],
          }}
          key={i}
        />
      ))}
    </Stack>
  );
};

export default VisualizeValue;
